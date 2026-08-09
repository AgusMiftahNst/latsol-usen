import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client Lazily / Helper
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// ==================== API ENDPOINTS ====================

// 1. AI Question Explanation & Fast Tricks
app.post('/api/gemini/explain', async (req, res) => {
  try {
    const { question, options, selectedAnswer, correctAnswer, category, subCategory } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question content is required' });
    }

    const ai = getGeminiClient();

    const prompt = `Anda adalah seorang Pakar dan Coach BKN Tutor CPNS 2026 berpengalaman.
Berikan pembahasan mendalam, rinci, dan mudah dipahami untuk soal latihan tes CPNS Kategori ${category || 'SKD'} (${subCategory || 'Umum'}):

SOAL:
"${question}"

PILIHAN JAWABAN:
${JSON.stringify(options, null, 2)}

JAWABAN PENGGUNA: ${selectedAnswer || 'Belum Dijawab'}
JAWABAN BENAR / KUNCI: ${correctAnswer || 'Sesuai Bobot BKN'}

Tugas Anda:
1. Jelaskan konsep dasar materi/pasal/rumus dari soal ini.
2. Jelaskan mengapa kunci jawaban tersebut benar dan mengapa opsi lain kurang tepat.
3. Berikan "Rumus Cepat / Trik Super BKN" (jika TIU: cara hitung cepat/silogisme, jika TWK: jembatan keledai/mnemonic/kata kunci, jika TKP: kata kunci filosofi ASN BKN).
4. Berikan pesan motivasi singkat khas Tutor CPNS.

Formatkan jawaban dalam teks rapi dengan bullet points, tebal (bold), dan bahasa Indonesia yang menyemangati.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });

    return res.json({
      explanation: response.text || 'Gagal menghasilkan pembahasan AI.',
    });
  } catch (error: any) {
    console.error('Error generating AI explanation:', error);
    return res.status(500).json({
      error: error?.message || 'Terjadi kesalahan saat memproses pembahasan AI.',
    });
  }
});

// 2. AI Question Generator for CPNS (Generate custom practice questions)
app.post('/api/gemini/generate-questions', async (req, res) => {
  try {
    const { category, subCategory, count = 3, difficulty = 'HOTS' } = req.body;

    const ai = getGeminiClient();

    const prompt = `Buatkan ${count} soal latihan CPNS SKD berkualitas tinggi untuk Kategori: ${category || 'TWK'} (Subkategori: ${subCategory || 'Umum'}), dengan tingkat kesulitan: ${difficulty}.

ATURAN FORMAL BKN:
1. Kategori TWK/TIU:
   - Harus memiliki 5 pilihan jawaban (A, B, C, D, E).
   - Memiliki 1 kunci jawaban benar (A/B/C/D/E).
   - Soal harus sesuai standar SPMB/CAT BKN terkini (misal HOTS studi kasus untuk TWK, soal cerita/deret untuk TIU).
2. Kategori TKP (Tes Karakteristik Pribadi):
   - Memiliki 5 pilihan jawaban (A, B, C, D, E).
   - Setiap pilihan memiliki skor berbobot dari 1 sampai 5.
3. Setiap soal harus dilengkapi dengan "explanation" (pembahasan detail) dan "quickTrick" (trik cepat/kata kunci).

Kembalikan jawaban DALAM FORMAT JSON BERIKUT (tanpa markdown tambahan):
[
  {
    "id": "ai-gen-1",
    "category": "${category || 'TWK'}",
    "subCategory": "${subCategory || 'Umum'}",
    "difficulty": "${difficulty}",
    "yearSource": "Simulasi AI SKD BKN 2026",
    "question": "Teks soal lengkap...",
    "options": [
      { "key": "A", "text": "Teks pilihan A", "score": 5 },
      { "key": "B", "text": "Teks pilihan B", "score": 4 },
      { "key": "C", "text": "Teks pilihan C", "score": 3 },
      { "key": "D", "text": "Teks pilihan D", "score": 2 },
      { "key": "E", "text": "Teks pilihan E", "score": 1 }
    ],
    "correctAnswer": "A", // HANYA untuk TWK/TIU
    "explanation": "Pembahasan rinci...",
    "quickTrick": "Tips trik cepat..."
  }
]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    let rawText = response.text || '[]';
    // Clean potential markdown wrap
    rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const generatedQuestions = JSON.parse(rawText);

    return res.json({ questions: generatedQuestions });
  } catch (error: any) {
    console.error('Error generating custom questions:', error);
    return res.status(500).json({
      error: error?.message || 'Gagal membuat soal latihan baru.',
    });
  }
});

// 3. AI Tutor Chat Assistant
app.post('/api/gemini/tutor-chat', async (req, res) => {
  try {
    const { messages, userQuestion } = req.body;

    const ai = getGeminiClient();

    const systemInstruction = `Anda adalah "Coach CPNS Master", konsultan dan tutor AI persiapan ujian CPNS / SKD (TWK, TIU, TKP) BKN.
Karakter Anda:
- Ramah, profesional, solutif, menyemangati, dan sangat menguasai kisi-kisi resmi MenPAN-RB & BKN.
- Anda paham strategi menjawab cepat (time management 100 menit untuk 110 soal), passing grade (TWK 65, TIU 80, TKP 166), jembatan keledai TWK, cara cepat numerik TIU, dan filosofi nilai 5 TKP.
- Jika pengguna bertanya rumus/konsep/materi, jelaskan dengan langkah ringkas dan contoh konkret.`;

    const chat = ai.chats.create({
      model: 'gemini-3.6-flash',
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    // Replay conversation history if any
    if (Array.isArray(messages) && messages.length > 0) {
      for (const m of messages) {
        if (m.sender === 'user') {
          await chat.sendMessage({ message: m.text });
        }
      }
    }

    const response = await chat.sendMessage({ message: userQuestion });

    return res.json({ reply: response.text });
  } catch (error: any) {
    console.error('Error in AI Tutor chat:', error);
    return res.status(500).json({
      error: error?.message || 'Gagal menghubungi Coach CPNS AI.',
    });
  }
});

// ==================== VITE / STATIC MIDDLEWARE ====================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server CPNS Practice running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
