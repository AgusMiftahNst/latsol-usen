import { Question } from '../types';

export const INITIAL_QUESTIONS: Question[] = [
  // ==================== TWK (TES WAWASAN KEBANGSAAN) ====================
  {
    id: 'twk-01',
    category: 'TWK',
    subCategory: 'Pancasila & Lambang Negara',
    difficulty: 'HOTS',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Di era digital saat ini, marak terjadi penyebaran berita bohong (hoaks) dan ujaran kebencian di media sosial yang berpotensi memecah belah persatuan bangsa. Tindakan seorang warga negara yang secara aktif memverifikasi kebenaran informasi sebelum membagikannya merupakan cerminan pengamalan Pancasila, khususnya Sila ke-...',
    options: [
      { key: 'A', text: 'Sila Pertama, karena menjaga kejujuran dan norma moral ketuhanan.' },
      { key: 'B', text: 'Sila Kedua, karena menghargai hak asasi orang lain dari perundungan cyber.' },
      { key: 'C', text: 'Sila Ketiga, karena menjaga keutuhan, persatuan, dan keharmonisan bangsa.' },
      { key: 'D', text: 'Sila Keempat, karena mengutamakan musyawarah digital dalam berpendapat.' },
      { key: 'E', text: 'Sila Kelima, karena bersikap adil dalam menggunakan teknologi publik.' },
    ],
    correctAnswer: 'C',
    explanation: 'Pengamalan Sila Ketiga "Persatuan Indonesia" menekankan pada upaya menjaga keutuhan, persatuan, dan kesatuan bangsa serta mencegah disintegrasi yang disebabkan oleh ujaran kebencian atau berita hoaks.',
    quickTrick: 'Kata kunci: "memecah belah persatuan" & "menjaga keutuhan" ➔ Sila Ke-3 (Persatuan Indonesia).'
  },
  {
    id: 'twk-02',
    category: 'TWK',
    subCategory: 'UUD 1945 & Konstitusi',
    difficulty: 'Sedang',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Berdasarkan Amandemen UUD 1945, Mahkamah Konstitusi (MK) memiliki wewenang menguji undang-undang terhadap UUD 1945. Di samping itu, MK juga berwenang memutus sengketa kewenangan lembaga negara. Lembaga negara yang kewenangannya dapat disengketakan di MK adalah lembaga negara yang...',
    options: [
      { key: 'A', text: 'Kewenangannya diberikan langsung oleh Undang-Undang Dasar 1945.' },
      { key: 'B', text: 'Dibentuk berdasarkan Peraturan Pemerintah.' },
      { key: 'C', text: 'Kewenangannya diatur dalam Peraturan Daerah.' },
      { key: 'D', text: 'Dibentuk oleh keputusan Presiden secara independen.' },
      { key: 'E', text: 'Kewenangannya diatur khusus dalam Keputusan Menteri.' },
    ],
    correctAnswer: 'A',
    explanation: 'Sesuai Pasal 24C ayat (1) UUD 1945, MK berwenang memutus sengketa kewenangan lembaga negara yang kewenangannya diberikan oleh Undang-Undang Dasar 1945 (UUD 1945).',
    quickTrick: 'Garis bawahi: MK menguji UUD ➔ Lembaga yang disengketakan harus lembaga yang kewenangannya diatur dalam UUD 1945.'
  },
  {
    id: 'twk-03',
    category: 'TWK',
    subCategory: 'Nasionalisme & Bela Negara',
    difficulty: 'HOTS',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Seorang ASN bertugas di daerah terpencil yang minim fasilitas Internet dan infrastruktur. Kendati demikian, ia tetap berinovasi menciptakan media pembelajaran sederhana berbasis kearifan lokal agar anak-anak di daerah tersebut tidak ketinggalan pelajaran. Sikap ASN tersebut merupakan wujud nyata dari...',
    options: [
      { key: 'A', text: 'Nasionalisme etnis yang kaku' },
      { key: 'B', text: 'Bela negara melalui pengabdian sesuai profesi untuk kemajuan bangsa' },
      { key: 'C', text: 'Sikap chauvinisme terhadap daerah tempat bertugas' },
      { key: 'D', text: 'Patriotisme defensif dalam menghadapi ancaman militer' },
      { key: 'E', text: 'Kepatuhan mutlak tanpa ada dorongan integritas moral' },
    ],
    correctAnswer: 'B',
    explanation: 'Bela Negara tidak hanya berupa pengangkatan senjata, melainkan juga "Pengabdian Sesuai Profesi" untuk mengatasi ketimpangan pendidikan dan memajukan kesejahteraan umum sesuai amanat Pembukaan UUD 1945.',
    quickTrick: 'Tindakan profesi positif melayani masyarakat di daerah terisolir ➔ Bela Negara via Pengabdian Profesi.'
  },
  {
    id: 'twk-04',
    category: 'TWK',
    subCategory: 'NKRI & Sejarah Nasional',
    difficulty: 'Sedang',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Konferensi Meja Bunder (KMB) yang berlangsung di Den Haag pada tahun 1949 menghasilkan keputusan penting bagi kedaulatan Indonesia. Salah satu hasil keputusan utama KMB adalah...',
    options: [
      { key: 'A', text: 'Pembentukan garis demarkasi Van Mook di Jawa dan Sumatera.' },
      { key: 'B', text: 'Pengakuan kedaulatan oleh Belanda kepada Republik Indonesia Serikat (RIS).' },
      { key: 'C', text: 'Pengembalian wilayah Irian Barat secara langsung tanpa syarat pada tahun 1950.' },
      { key: 'D', text: 'Pembentukan tentara KNIL di bawah komando Sekutu.' },
      { key: 'E', text: 'Pelaksanaan Pemilu pertama Indonesia tahun 1955.' },
    ],
    correctAnswer: 'B',
    explanation: 'Hasil KMB (23 Agustus - 2 November 1949): 1) Belanda mengakui kedaulatan kepada RIS paling lambat akhir Desember 1949; 2) Penyesuaian masalah Irian Barat ditunda 1 tahun; 3) Pembentukan Uni Indonesia-Belanda.',
    quickTrick: 'KMB 1949 ➔ Pengakuan Kedaulatan RIS oleh Belanda.'
  },
  {
    id: 'twk-05',
    category: 'TWK',
    subCategory: 'Bhinneka Tunggal Ika',
    difficulty: 'Mudah',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Semboyan Bhinneka Tunggal Ika yang menjadi cengkeraman Burung Garuda Pancasila diambil dari kitab kuno peninggalan Kerajaan Majapahit, yaitu...',
    options: [
      { key: 'A', text: 'Kitab Negarakertagama karya Empu Prapanca' },
      { key: 'B', text: 'Kitab Sutasoma karya Empu Tantular' },
      { key: 'C', text: 'Kitab Arjunawiwaha karya Empu Kanwa' },
      { key: 'D', text: 'Kitab Pararaton karya Anonim' },
      { key: 'E', text: 'Kitab Smaradhana karya Empu Dharmaja' },
    ],
    correctAnswer: 'B',
    explanation: 'Frasa Bhinneka Tunggal Ika dipetik dari Kakawin Sutasoma karangan Empu Tantular pada abad ke-14 masa Kerajaan Majapahit.',
    quickTrick: 'Bhinneka Tunggal Ika ➔ Sutasoma (Empu Tantular).'
  },
  {
    id: 'twk-06',
    category: 'TWK',
    subCategory: 'Bahasa Indonesia',
    difficulty: 'Sedang',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Manakah di antara kalimat berikut yang merupakan contoh kalimat efektif sesuai kaidah PUEBI/EYD?',
    options: [
      { key: 'A', text: 'Bagi seluruh peserta ujian CPNS diharapkan membawa kartu ujian asli.' },
      { key: 'B', text: 'Seluruh peserta ujian CPNS diharapkan membawa kartu ujian asli.' },
      { key: 'C', text: 'Untuk para peserta-peserta ujian dilarang tidak boleh membawa HP.' },
      { key: 'D', text: 'Pemerintah daripada negara Indonesia menaikkan anggaran pendidikan.' },
      { key: 'E', text: 'Sangat amat bagus sekali performa peserta dalam simulasi tes CAT.' },
    ],
    correctAnswer: 'B',
    explanation: 'Kalimat B efektif karena memiliki subjek jelas ("Seluruh peserta ujian CPNS") dan predikat ("diharapkan membawa..."). Kalimat A salah karena diawali kata depan "Bagi" sehingga merusak subjek. Kalimat C pleonasme ("para peserta-peserta").',
    quickTrick: 'Hindari kata depan di awal subjek (seperti "Bagi...", "Untuk..."). Pilih subjek yang lugas.'
  },
  {
    id: 'twk-07',
    category: 'TWK',
    subCategory: 'Pancasila & Lambang Negara',
    difficulty: 'HOTS',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Kedudukan Pancasila sebagai Staatsfundamentalnorm (norma dasar negara) mengandung arti bahwa...',
    options: [
      { key: 'A', text: 'Pancasila dapat diubah kapan saja sesuai keputusan mayoritas anggota DPR/MPR.' },
      { key: 'B', text: 'Pancasila menjadi landasan hukum tertinggi yang mengikat seluruh peraturan perundang-undangan di bawahnya.' },
      { key: 'C', text: 'Pancasila hanya berlaku untuk kalangan ASN dan TNI/Polri.' },
      { key: 'D', text: 'Pancasila merupakan produk hukum yang setara dengan Peraturan Daerah.' },
      { key: 'E', text: 'Pancasila bersifat sementara hingga terbentuk ketetapan MPR baru.' },
    ],
    correctAnswer: 'B',
    explanation: 'Staatsfundamentalnorm berarti Pancasila adalah norma dasar hukum tertinggi negara yang menjadi sumber dari segala sumber hukum (Grundnorm) di Indonesia.',
    quickTrick: 'Staatsfundamentalnorm = Landasan hukum tertinggi / Sumber dari segala sumber hukum.'
  },
  {
    id: 'twk-08',
    category: 'TWK',
    subCategory: 'UUD 1945 & Konstitusi',
    difficulty: 'Sedang',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Pasal 27 ayat (3) UUD 1945 mengatur salah satu hak dan kewajiban warga negara Indonesia, yaitu...',
    options: [
      { key: 'A', text: 'Hak mendapatkan pendidikan yang layak' },
      { key: 'B', text: 'Kewajiban ikut serta dalam upaya pembelaan negara' },
      { key: 'C', text: 'Kewajiban membayar pajak dan retribusi daerah' },
      { key: 'D', text: 'Hak atas kebebasan memeluk agama dan beribadah' },
      { key: 'E', text: 'Hak berserikat dan berkumpul mengeluarkan pendapat' },
    ],
    correctAnswer: 'B',
    explanation: 'Pasal 27 ayat (3) UUD 1945 berbunyi: "Setiap warga negara berhak dan wajib ikut serta dalam upaya pembelaan negara."',
    quickTrick: 'Pasal 27 (1) = Kedudukan Hukum, (2) = Pekerjaan Layak, (3) = Pembelaan Negara.'
  },

  // ==================== TIU (TES INTELEGENSI UMUM) ====================
  {
    id: 'tiu-01',
    category: 'TIU',
    subCategory: 'Verbal Analogi',
    difficulty: 'Mudah',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'PADI : BERAS : NASI = ... : ... : ...',
    options: [
      { key: 'A', text: 'KAPAS : BENANG : PAkaian' },
      { key: 'B', text: 'KAYU : MEJA : KURSI' },
      { key: 'C', text: 'GANDUM : TERIGU : ROTI' },
      { key: 'D', text: 'AIR : ES : UAP' },
      { key: 'E', text: 'POHON : DAUN : BUNGa' },
    ],
    correctAnswer: 'C',
    explanation: 'Hubungan sekuensial proses pengolahan bahan mentah ➔ bahan setengah jadi ➔ bahan jadi konsumsi. Padi diolah jadi beras, beras dimasak jadi nasi. Gandum diolah jadi terigu, terigu dibuat jadi roti.',
    quickTrick: 'Pola: Bahan Mentah ➔ Bahan Olahan ➔ Produk Akhir Makanan. (Gandum ➔ Terigu ➔ Roti).'
  },
  {
    id: 'tiu-02',
    category: 'TIU',
    subCategory: 'Numerik Deret Angka',
    difficulty: 'Sedang',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Berapakah angka berikutnya dalam deret berikut ini: 3, 5, 9, 17, 33, ...?',
    options: [
      { key: 'A', text: '49' },
      { key: 'B', text: '55' },
      { key: 'C', text: '65' },
      { key: 'D', text: '67' },
      { key: 'E', text: '72' },
    ],
    correctAnswer: 'C',
    explanation: 'Pola penambahan: +2, +4, +8, +16. Setiap penambahan dikali 2. Penambahan berikutnya adalah +32. Jadi 33 + 32 = 65.',
    quickTrick: 'Rumus cepat: Un = (Un-1 * 2) - 1 ➔ (33 * 2) - 1 = 66 - 1 = 65. Atau cek selisih ganda: +2, +4, +8, +16, (+32) ➔ 33 + 32 = 65.'
  },
  {
    id: 'tiu-03',
    category: 'TIU',
    subCategory: 'Verbal Silogisme',
    difficulty: 'HOTS',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Premis 1: Semua peserta latihan soal CPNS yang tekun akan lulus tes SKD.\nPremis 2: Sebagian peserta yang lulus tes SKD mendapat nilai TWK di atas 100.\nKesimpulan yang paling tepat dan sah adalah...',
    options: [
      { key: 'A', text: 'Semua peserta yang tekun mendapat nilai TWK di atas 100.' },
      { key: 'B', text: 'Sebagian peserta latihan soal CPNS yang tekun mendapat nilai TWK di atas 100.' },
      { key: 'C', text: 'Semua peserta yang mendapat nilai TWK di atas 100 adalah peserta yang tidak tekun.' },
      { key: 'D', text: 'Peserta yang tidak tekun dipastikan gagal tes SKD.' },
      { key: 'E', text: 'Tidak dapat ditarik kesimpulan dari kedua premis tersebut.' },
    ],
    correctAnswer: 'B',
    explanation: 'Aturan Silogisme: Jika salah satu premis berupa partikular/sebagian ("Sebagian..."), maka kesimpulan HARUS mengandung kata "Sebagian". Karena semua yang tekun pasti lulus SKD, dan sebagian yang lulus SKD dapat TWK > 100, maka sebagian peserta yang tekun mendapat nilai TWK > 100.',
    quickTrick: 'Aturan Kata "Sebagian": Premis Umum + Premis Sebagian ➔ Kesimpulan SEBAGIAN.'
  },
  {
    id: 'tiu-04',
    category: 'TIU',
    subCategory: 'Numerik Berhitung Cepat',
    difficulty: 'Sedang',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Hitunglah nilai dari: (0,75 x 88) + (12,5% x 320) = ...',
    options: [
      { key: 'A', text: '96' },
      { key: 'B', text: '106' },
      { key: 'C', text: '116' },
      { key: 'D', text: '124' },
      { key: 'E', text: '132' },
    ],
    correctAnswer: 'B',
    explanation: 'Ubah ke pecahan biasa:\n0,75 = 3/4 ➔ 3/4 x 88 = 66.\n12,5% = 1/8 ➔ 1/8 x 320 = 40.\n66 + 40 = 106.',
    quickTrick: 'Rumus Cepat Pecahan Istimewa: 0,75 = 3/4; 12,5% = 1/8. Maka (3/4 x 88) + (1/8 x 320) = 66 + 40 = 106.'
  },
  {
    id: 'tiu-05',
    category: 'TIU',
    subCategory: 'Numerik Soal Cerita',
    difficulty: 'HOTS',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Sebuah pekerjaan renovasi gedung kementerian dapat diselesaikan oleh 12 orang pekerja dalam waktu 20 hari. Jika setelah 5 hari bekerja proyek terhenti selama 3 hari karena cuaca buruk, berapa jumlah tambahan pekerja yang dibutuhkan agar proyek selesai tepat waktu?',
    options: [
      { key: 'A', text: '2 orang' },
      { key: 'B', text: '3 orang' },
      { key: 'C', text: '4 orang' },
      { key: 'D', text: '5 orang' },
      { key: 'E', text: '6 orang' },
    ],
    correctAnswer: 'B',
    explanation: 'Sisa hari normal = 20 - 5 = 15 hari.\nSisa hari akibat terhenti 3 hari = 15 - 3 = 12 hari.\nPerbandingan berbalik nilai:\nPekerja x Sisa Hari Normal = (Pekerja + Tambahan) x Sisa Hari Nyata\n12 x 15 = P_baru x 12\n180 = 12 x P_baru ➔ P_baru = 15 orang.\nTambahan pekerja = 15 - 12 = 3 orang.',
    quickTrick: 'Rumus Cepat Pekerja Terhenti: Tambahan Pekerja = (Pekerja Awal x Hari Libur) / Sisa Hari Kerja = (12 x 3) / 12 = 3 orang!'
  },
  {
    id: 'tiu-06',
    category: 'TIU',
    subCategory: 'Verbal Analitis',
    difficulty: 'HOTS',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Enam orang calon ASN (A, B, C, D, E, F) duduk melingkar dalam sesi wawancara.\n- A duduk berhadapan dengan D.\n- B berada di antara A dan C.\n- F berada tepat di sebelah kanan D.\nSiapakah yang berada tepat di sebelah kiri A?',
    options: [
      { key: 'A', text: 'B' },
      { key: 'B', text: 'C' },
      { key: 'C', text: 'D' },
      { key: 'D', text: 'E' },
      { key: 'E', text: 'F' },
    ],
    correctAnswer: 'A',
    explanation: 'Posisi melingkar (searah jarum jam): Jika D di 12, maka A di 6. F di kanan D (jam 11 jika menghadap pusat). B di antara A dan C. Maka urutan melingkar menghadap pusat membawa B berada di sebelah kiri A.',
    quickTrick: 'Buat denah lingkaran 6 titik. Tentukan A & D (seberang). B di antara A & C berarti B bersebelahan langsung dengan A.'
  },
  {
    id: 'tiu-07',
    category: 'TIU',
    subCategory: 'Numerik Deret Angka',
    difficulty: 'HOTS',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Tentukan dua angka selanjutnya dari deret angka berikut: 2, 4, 3, 9, 4, 16, 5, ..., ...',
    options: [
      { key: 'A', text: '20, 6' },
      { key: 'B', text: '25, 6' },
      { key: 'C', text: '25, 7' },
      { key: 'D', text: '30, 6' },
      { key: 'E', text: '36, 7' },
    ],
    correctAnswer: 'B',
    explanation: 'Deret ini memiliki 2 pola berlarik (loncat 1):\nLarik 1: 2, 3, 4, 5, (6) ➔ berurutan +1.\nLarik 2: 4 (2²), 9 (3²), 16 (4²), (25 / 5²).\nMaka angka berikutnya adalah 25 dan 6.',
    quickTrick: 'Pola Kuadrat Loncat: Posisi genap adalah n² (2², 3², 4², 5² = 25). Posisi ganjil n (+1 ➔ 6).'
  },
  {
    id: 'tiu-08',
    category: 'TIU',
    subCategory: 'Penalaran Figural',
    difficulty: 'Sedang',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Manakah di antara kata berikut yang TIDAK termasuk dalam kelompoknya (Ketidaksamaan verbal/figural)?',
    options: [
      { key: 'A', text: 'Panah' },
      { key: 'B', text: 'Peluru' },
      { key: 'C', text: 'Pedang' },
      { key: 'D', text: 'Tombak' },
      { key: 'E', text: 'Rudal' },
    ],
    correctAnswer: 'C',
    explanation: 'Pedang adalah senjata jarak dekat (tikam/tebas), sedangkan Panah, Peluru, Tombak, dan Rudal merupakan senjata proyektil/dilempar/ditembakkan jarak jauh.',
    quickTrick: 'Kategori: Senjata Proyektil (ditembakkan) vs Senjata Jarak Dekat (Pedang).'
  },

  // ==================== TKP (TES KARAKTERISTIK PRIBADI) ====================
  {
    id: 'tkp-01',
    category: 'TKP',
    subCategory: 'Pelayanan Publik',
    difficulty: 'Sedang',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Saat Anda sedang melayani antrean warga yang sangat padat di loket pelayanan instansi, datang seorang lansia yang tampak kebingungan dan lelah berdiri tanpa membawa nomor antrean. Apa sikap terbaik Anda?',
    options: [
      { key: 'A', text: 'Meminta lansia tersebut mengambil nomor antrean di mesin antrean dan menunggu giliran secara tertib.', score: 2 },
      { key: 'B', text: 'Menyapa dengan ramah, memberikan tempat duduk khusus, serta membantu mengambilkan nomor antrean atau mendahulukannya sesuai prosedur pelayanan inklusif lansia.', score: 5 },
      { key: 'C', text: 'Menyuruh rekan kerja lain untuk mengurus lansia tersebut agar antrean di loket Anda tidak terganggu.', score: 3 },
      { key: 'D', text: 'Mengabaikannya karena harus fokus pada orang yang sudah mengantre terlebih dahulu demi keadilan.', score: 1 },
      { key: 'E', text: 'Meminta warga lain di antrean untuk mengalah tanpa Anda memberikan bantuan langsung.', score: 4 },
    ],
    explanation: 'Pelayanan Publik bertemakan inklusivitas & kepedulian terhadap kelompok rentan (lansia/disabilitas). Poin 5 diberikan pada tindakan solutif ramah, prosedural, serta memprioritaskan kelompok rentan tanpa merugikan sistem.',
    quickTrick: 'BKN Standard TKP Pelayanan Publik: Ramah + Bantuan Langsung Prioritas Rentan = Skor 5.'
  },
  {
    id: 'tkp-02',
    category: 'TKP',
    subCategory: 'Jejaring Kerja',
    difficulty: 'Sedang',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Unit kerja Anda dipimpin oleh kepala divisi baru yang merencanakan otomatisasi laporan menggunakan aplikasi digital baru. Sebagian besar rekan senior merasa enggan belajar karena terbiasa menggunakan cara manual. Tindakan Anda adalah...',
    options: [
      { key: 'A', text: 'Mengikuti sikap mayoritas rekan senior agar menjaga keharmonisan hubungan di kantor.', score: 1 },
      { key: 'B', text: 'Mempelajari sistem baru tersebut terlebih dahulu, lalu secara proaktif mengajak dan membimbing rekan senior cara menggunakannya.', score: 5 },
      { key: 'C', text: 'Melaporkan rekan senior kepada kepala divisi agar mereka diberikan sanksi administrasi.', score: 2 },
      { key: 'D', text: 'Menggunakan sistem baru hanya untuk pekerjaan pribadi Anda sendiri tanpa memedulikan rekan lain.', score: 3 },
      { key: 'E', text: 'Mengusulkan kepada pimpinan agar sistem lama tetap dipakai berdampingan tanpa batas waktu.', score: 4 },
    ],
    explanation: 'Jejaring Kerja & Kolaborasi: Menunjukkan kepemimpinan informal, kemauan belajar hal baru (adaptif TIK), serta merangkul tim untuk tumbuh bersama.',
    quickTrick: 'Inisiatif belajar sendiri + membimbing tim secara persuasif = Skor 5.'
  },
  {
    id: 'tkp-03',
    category: 'TKP',
    subCategory: 'Profesionalisme',
    difficulty: 'HOTS',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Seseorang yang mengaku sebagai kerabat dekat pejabat kementerian datang ke meja kerja Anda dan menawarkan imbalan uang tunai agar berkas perizinannya dapat diproses lebih cepat dari standar waktu layanan harian (SOP). Respons Anda adalah...',
    options: [
      { key: 'A', text: 'Menerima imbalan tersebut karena merasa tidak ada orang lain yang melihat.', score: 1 },
      { key: 'B', text: 'Menolak imbalan tersebut dengan tegas dan sopan, serta menegaskan bahwa seluruh pelayanan diproses sesuai urutan SOP tanpa diskriminasi.', score: 5 },
      { key: 'C', text: 'Menolak uangnya tetapi tetap mempercepat prosesnya karena takut berpengaruh pada jabatan Anda.', score: 2 },
      { key: 'D', text: 'Melaporkan kejadian tersebut ke bagian unit gratifikasi/Saber Pungli setelah berpura-pura menerimanya.', score: 3 },
      { key: 'E', text: 'Meminta yang bersangkutan membawa rekomendasi tertulis langsung dari pejabat tersebut.', score: 4 },
    ],
    explanation: 'Integritas & Anti Gratifikasi (Profesionalisme): Menolak secara tegas & sopan, berpegang teguh pada SOP dan transparansi tanpa diskriminasi.',
    quickTrick: 'Tolak gratifikasi + Tegakkan SOP secara ramah & sopan = Skor 5.'
  },
  {
    id: 'tkp-04',
    category: 'TKP',
    subCategory: 'Teknologi Informasi & Komunikasi',
    difficulty: 'Sedang',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Instansi tempat Anda bekerja mulai menerapkan sistem kerja Work From Anywhere (WFA) menggunakan aplikasi manajemen tugas cloud. Anda belum terbiasa dengan fitur integrasi otomatisasi aplikasi tersebut. Sikap Anda adalah...',
    options: [
      { key: 'A', text: 'Meminta izin untuk tetap bekerja di kantor (WFO) agar tidak perlu mempelajari aplikasi baru.', score: 2 },
      { key: 'B', text: 'Mencari tutorial mandiri, mengikuti pelatihan internal, dan mengoptimalkan penggunaan aplikasi untuk meningkatkan efisiensi kerja.', score: 5 },
      { key: 'C', text: 'Menunggu arahan dan instruksi rinci dari atasan sebelum menyentuh aplikasi tersebut.', score: 3 },
      { key: 'D', text: 'Mengerjakan tugas dengan metode lama lalu mengunggah hasilnya ke aplikasi di akhir pekan.', score: 4 },
      { key: 'E', text: 'Mengeluhkan kerumitan aplikasi di grup percakapan non-formal rekan kerja.', score: 1 },
    ],
    explanation: 'TIK (Teknologi Informasi): Menunjukkan sikap adaptif terhadap perkembangan teknologi digital dan keinginan belajar mandiri (self-learning).',
    quickTrick: 'Proaktif belajar mandiri TIK + implementasi optimal = Skor 5.'
  },
  {
    id: 'tkp-05',
    category: 'TKP',
    subCategory: 'Sosial Budaya',
    difficulty: 'Sedang',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Anda ditugaskan dalam tim kerja lintas daerah yang anggotanya memiliki latar belakang budaya, adat istiadat, dan gaya bicara yang berbeda dari Anda. Dalam rapat pertama, terjadi kesalahpahaman karena perbedaan intonasi bicara. Tindakan Anda adalah...',
    options: [
      { key: 'A', text: 'Meminta pimpinan untuk memindahkan Anda ke tim yang rekannya berasal dari daerah yang sama.', score: 1 },
      { key: 'B', text: 'Mencoba memahami keberagaman kebiasaan rekan tim, bersikap terbuka, serta mengedepankan komunikasi empati demi kelancaran tugas.', score: 5 },
      { key: 'C', text: 'Mengingatkan rekan tersebut agar mengubah gaya bicaranya sesuai standar kebiasaan daerah Anda.', score: 2 },
      { key: 'D', text: 'Diam dan membatasi interaksi hanya sebatas tugas formal tertulis saja.', score: 3 },
      { key: 'E', text: 'Mengajak tim membuat aturan kesepakatan tata cara berkomunikasi yang netral dan menghargai perbedaan.', score: 4 },
    ],
    explanation: 'Sosial Budaya: Terbuka, toleran, menghargai keberagaman suku/budaya di NKRI, dan mampu beradaptasi dalam lingkungan majemuk.',
    quickTrick: 'Terbuka + Empati Budaya + Menjalin Kerja Sama Baik = Skor 5.'
  },
  {
    id: 'tkp-06',
    category: 'TKP',
    subCategory: 'Anti Radikalisme',
    difficulty: 'HOTS',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Di grup percakapan instansi Anda, salah seorang oknum pegawai membagikan tautan artikel yang mengajak untuk menolak ideologi Pancasila dan menggantinya dengan sistem paham ekstrim tertentu. Bagaimana respons Anda sebagai ASN?',
    options: [
      { key: 'A', text: 'Mendiamkan saja karena tidak ingin memperkeruh suasana internal grup.', score: 2 },
      { key: 'B', text: 'Mengingatkan secara santun bahwa konten tersebut bertentangan dengan kewajiban ASN menjaga Pancasila, serta melaporkan ke pimpinan/unit kerja terkait.', score: 5 },
      { key: 'C', text: 'Membalas unggahan tersebut dengan kata-kata kasar dan amarah di grup.', score: 1 },
      { key: 'D', text: 'Keluar dari grup percakapan tanpa memberikan konfirmasi apa pun.', score: 3 },
      { key: 'E', text: 'Menghubungi pegawai tersebut secara pribadi dan menasihatinya tanpa perlu melibatkan pimpinan.', score: 4 },
    ],
    explanation: 'Anti Radikalisme: ASN berkedudukan sebagai perekat dan pemersatu bangsa yang wajib setia kepada Pancasila & UUD 1945. Tindakan terbaik adalah menegur santun di koridor aturan dan melaporkan secara resmi untuk ditindaklanjuti.',
    quickTrick: 'Tegur santun + Lapor resmi ke instansi penjaga keutuhan NKRI = Skor 5.'
  },

  // Extra rich set for fuller test coverage
  {
    id: 'twk-09',
    category: 'TWK',
    subCategory: 'Pancasila & Lambang Negara',
    difficulty: 'Sedang',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Lambang Pohon Beringin pada dada Burung Garuda melambangkan Sila Ketiga Pancasila. Makna filosofis utama dari penggunaan simbol Pohon Beringin adalah...',
    options: [
      { key: 'A', text: 'Kekuatan ekonomi gotong royong masyarakat desa.' },
      { key: 'B', text: 'Tempat berteduh dan berlindung seluruh rakyat Indonesia di bawah naungan NKRI.' },
      { key: 'C', text: 'Musyawarah mufakat yang berakar dari budaya nenek moyang.' },
      { key: 'D', text: 'Kesetaraan hukum tanpa memandang perbedaan agama.' },
      { key: 'E', text: 'Keadilan sosial dalam pembagian hasil sumber daya alam.' },
    ],
    correctAnswer: 'B',
    explanation: 'Pohon Beringin memiliki sulur dan akar yang menjalar ke mana-mana yang melambangkan keragaman budaya yang menyatu di bawah naungan tempat berteduh/berlindung Negara Kesatuan Republik Indonesia.',
    quickTrick: 'Pohon Beringin ➔ Tempat berteduh & bersatunya keberagaman NKRI.'
  },
  {
    id: 'tiu-09',
    category: 'TIU',
    subCategory: 'Numerik Soal Cerita',
    difficulty: 'Sedang',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Seorang calon peserta CPNS menempuh jarak 180 km menggunakan sepeda motor. Jika ia berangkat pukul 07.00 WIB dengan kecepatan rata-rata 60 km/jam dan beristirahat selama 30 menit di perjalanan, pukul berapakah ia sampai di tujuan?',
    options: [
      { key: 'A', text: 'Pukul 10.00 WIB' },
      { key: 'B', text: 'Pukul 10.30 WIB' },
      { key: 'C', text: 'Pukul 11.00 WIB' },
      { key: 'D', text: 'Pukul 11.30 WIB' },
      { key: 'E', text: 'Pukul 12.00 WIB' },
    ],
    correctAnswer: 'B',
    explanation: 'Waktu tempuh murni = Jarak / Kecepatan = 180 km / 60 km/jam = 3 jam.\nTotal waktu termasuk istirahat = 3 jam + 30 menit = 3 jam 30 menit.\nWaktu Tiba = 07.00 + 03.30 = 10.30 WIB.',
    quickTrick: 'Waktu Murni = 180 / 60 = 3 jam. Tambahkan Istirahat 30 menit ➔ 07.00 + 3.5 jam = 10.30 WIB.'
  },
  {
    id: 'tkp-07',
    category: 'TKP',
    subCategory: 'Pelayanan Publik',
    difficulty: 'HOTS',
    yearSource: 'Standar BKN SKD CPNS',
    question: 'Di masa batas akhir penyerahan berkas verifikasi kelayakan bantuan, terjadi pemadaman listrik di gedung pelayanan dan sistem komputer mati total. Banyak pemohon panik. Apa langkah Anda?',
    options: [
      { key: 'A', text: 'Mengumumkan bahwa pelayanan ditunda hingga besok pagi ketika listrik menyala kembali.', score: 2 },
      { key: 'B', text: 'Segera berkoordinasi menyalakan genset darurat dan menerapkan pencatatan manual sementara agar berkas pemohon tetap diterima tepat waktu.', score: 5 },
      { key: 'C', text: 'Meminta pemohon pulang dan mengirimkan berkas lewat pos.', score: 1 },
      { key: 'D', text: 'Tetap duduk di meja kerja menunggu teknisi memperbaiki listrik tanpa memberi kepastian.', score: 3 },
      { key: 'E', text: 'Menyarankan pemohon komplain ke pihak PLN secara langsung.', score: 1 },
    ],
    explanation: 'Pelayanan Publik dalam kondisi darurat: Berpikir cepat, inisiatif genset/pencatatan manual (plan B) demi memberikan kepastian layanan kepada masyarakat.',
    quickTrick: 'Inisiatif darurat (genset + pencatatan manual) agar layanan publik tidak terhenti = Skor 5.'
  }
];

export const SUBTOPIC_LIST: Record<QuestionCategory, string[]> = {
  TWK: [
    'Pancasila & Lambang Negara',
    'UUD 1945 & Konstitusi',
    'Bhinneka Tunggal Ika',
    'NKRI & Sejarah Nasional',
    'Nasionalisme & Bela Negara',
    'Bahasa Indonesia'
  ],
  TIU: [
    'Verbal Analogi',
    'Verbal Silogisme',
    'Verbal Analitis',
    'Numerik Deret Angka',
    'Numerik Berhitung Cepat',
    'Numerik Soal Cerita',
    'Penalaran Figural'
  ],
  TKP: [
    'Pelayanan Publik',
    'Jejaring Kerja',
    'Sosial Budaya',
    'Teknologi Informasi & Komunikasi',
    'Profesionalisme',
    'Anti Radikalisme'
  ]
};
