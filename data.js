/* =========================================================
   SAKA GURU — Data materi Minggu 10
   Kepemimpinan dan Kerja Sama Tim (Sub-CPMK 10)
   MK Kepemimpinan Pendidikan · Prodi PAI · Universitas Sunan Gresik
   ========================================================= */
window.SAKA = {
  meta: {
    app: "SAKA GURU",
    tagline: "Ruang Imersif Kepemimpinan & Kerja Sama Tim",
    mk: "Kepemimpinan Pendidikan (AI3I23)",
    pekan: "Minggu 10 · Sub-CPMK 10",
    subcpmk: "Mahasiswa mampu menerapkan kepemimpinan kolaboratif dalam membangun dan mengelola kerja sama tim.",
    indikator: "Kemampuan membagi tugas, berkoordinasi, berkomunikasi, membangun kepercayaan, dan menyelesaikan tugas tim.",
    dosen: "Sulalatun Nikma, S.Pd., M.Pd.",
    prodi: "Pendidikan Agama Islam — Universitas Sunan Gresik",
    kelas: "B25"
  },

  topik: [
    {
      id: 1, kode: "tim", judul: "Konsep Tim & Kerja Sama", ikon: "🤝", warna: "#0284c7",
      lokal: { nama: "Gotong Royong", asal: "Nusantara",
        isi: "Gotong royong bukan sekadar 'kerja bareng', tetapi kesediaan memikul beban bersama demi kemaslahatan. Inilah ruh sebuah TIM: ada tujuan bersama dan rasa saling memiliki hasil." },
      dalil: { ar: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ ۖ وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ", arti: "“…dan tolong-menolonglah kamu dalam (mengerjakan) kebajikan dan takwa, dan jangan tolong-menolong dalam berbuat dosa dan permusuhan.”", sumber: "QS. Al-Mā'idah [5]: 2" },
      ringkas: "Tim adalah sekelompok kecil orang dengan keahlian yang saling melengkapi, berkomitmen pada tujuan, sasaran kinerja, dan pendekatan kerja yang sama, serta saling bertanggung jawab atas hasilnya (Katzenbach & Smith, 1993). Tidak setiap kumpulan guru adalah tim: <b>kelompok kerja</b> menjumlahkan hasil individu, sedangkan <b>tim</b> menghasilkan karya kolektif yang lebih besar dari jumlah bagiannya (sinergi).",
      poin: [
        "<b>Kelompok kerja</b>: pemimpin kuat & tunggal, akuntabilitas individual, hasil = jumlah kerja individu.",
        "<b>Tim</b>: kepemimpinan dibagi, akuntabilitas individual <i>dan</i> bersama (mutual accountability), hasil = produk kolektif.",
        "Kerja sama (<i>cooperation</i>) adalah perilaku saling membantu; tim adalah <i>struktur</i> yang membuat kerja sama itu terarah pada tujuan.",
        "Dalam pendidikan, tim tampak pada tim pengembang kurikulum satuan pendidikan, KKG/MGMP, tim kegiatan kokurikuler, tim TPPK, dan panitia PPDB/SPMB."
      ],
      contoh: [
        { jenjang: "SD/MI", teks: "Panitia lomba 17 Agustus di MI yang hanya membagi lomba per guru lalu bekerja sendiri-sendiri adalah <i>kelompok kerja</i>. Ketika mereka merumuskan tujuan bersama (\"lomba yang menumbuhkan sportivitas\"), saling mengisi ketika ada guru yang sakit, dan mengevaluasi bersama — mereka berubah menjadi <i>tim</i>." },
        { jenjang: "SMP/MTs", teks: "Guru PAI, IPS, dan Bahasa Indonesia di sebuah MTs menyusun satu projek \"Sedekah Sampah\" lintas mapel. Penilaian tidak lagi per mapel, tetapi satu produk bersama — ciri akuntabilitas kolektif." },
        { jenjang: "SMA/MA/SMK", teks: "Tim TPPK (Pencegahan dan Penanganan Kekerasan) di SMA: guru BK, wakasek kesiswaan, wali kelas, dan perwakilan komite memiliki keahlian berbeda yang saling melengkapi untuk satu tujuan: sekolah yang aman." }
      ],
      aktivitas: { tipe: "pasang", judul: "Kelompok kerja atau Tim?", instruksi: "Tentukan apakah tiap situasi di sekolah ini lebih tepat disebut Kelompok Kerja atau Tim.",
        opsi: ["Kelompok Kerja", "Tim"],
        item: [
          { t: "Lima guru kelas VI mengoreksi ujian masing-masing lalu menyetor nilai ke operator.", k: "Kelompok Kerja" },
          { t: "Guru PAI dan guru Seni menyusun satu pentas Maulid; keberhasilan dinilai dari pentas, bukan per guru.", k: "Tim" },
          { t: "Rapat dinas: kepala sekolah membacakan pengumuman, guru mencatat dan bubar.", k: "Kelompok Kerja" },
          { t: "MGMP Fikih menyusun bank soal bersama, saling mereview, dan menanggung kualitasnya bersama.", k: "Tim" },
          { t: "Piket harian: tiap guru bertugas di harinya tanpa koordinasi dengan guru lain.", k: "Kelompok Kerja" }
        ] },
      diskusi: [
        "Di sekolah/madrasah tempat Anda PPL atau mengajar, sebutkan satu 'kelompok' yang seharusnya menjadi 'tim'. Apa yang hilang?",
        "Apakah gotong royong otomatis membuat sebuah tim efektif? Kapan gotong royong justru menjadi 'kerja ramai-ramai tanpa arah'?"
      ],
      sumber: ["Katzenbach, J. R., & Smith, D. K. (1993). The Wisdom of Teams. Harvard Business School Press.", "Robbins, S. P., & Judge, T. A. (2019). Organizational Behavior (18th ed.). Pearson."]
    },
    {
      id: 2, kode: "bentuk", judul: "Pembentukan Tim Efektif", ikon: "🏗️", warna: "#0369a1",
      lokal: { nama: "Sambatan", asal: "Jawa",
        isi: "Dalam tradisi sambatan, warga desa membangun rumah joglo bersama: mula-mula canggung, lalu ada beda pendapat soal letak saka, kemudian sepakat aturan, lalu bekerja cepat, dan akhirnya selamatan. Persis tahap Tuckman!" },
      dalil: { ar: "إِنَّ اللَّهَ يُحِبُّ الَّذِينَ يُقَاتِلُونَ فِي سَبِيلِهِ صَفًّا كَأَنَّهُم بُنْيَانٌ مَّرْصُوصٌ", arti: "“Sesungguhnya Allah mencintai orang-orang yang berjuang di jalan-Nya dalam barisan yang teratur, seakan-akan mereka seperti suatu bangunan yang tersusun kokoh.”", sumber: "QS. Aṣ-Ṣaff [61]: 4" },
      ringkas: "Tim tidak lahir efektif; ia <b>berkembang</b>. Tuckman (1965) memetakan tahap <i>forming – storming – norming – performing</i>, lalu Tuckman & Jensen (1977) menambah <i>adjourning</i>. Hackman (2002) menegaskan lima kondisi tim efektif: tim yang nyata (batas anggota jelas), arah yang menantang, struktur yang memungkinkan, konteks organisasi yang mendukung, dan pembinaan (coaching) yang tepat waktu.",
      poin: [
        "<b>Forming</b> — saling mengenal, sopan, bergantung pada pemimpin. Pemimpin: menjelaskan tujuan & peran (<i>directing</i>).",
        "<b>Storming</b> — muncul beda pendapat dan konflik peran. Pemimpin: memfasilitasi, mendengar, menegakkan adab musyawarah (<i>coaching</i>).",
        "<b>Norming</b> — sepakat norma, aturan main, cara kerja. Pemimpin: memperkuat komitmen (<i>supporting</i>).",
        "<b>Performing</b> — mandiri, produktif, saling mengisi. Pemimpin: mendelegasikan (<i>delegating</i>).",
        "<b>Adjourning</b> — tugas selesai, evaluasi & apresiasi. Pemimpin: refleksi dan syukur bersama.",
        "Ukuran ideal tim kerja umumnya kecil (± 5–9 orang) agar komunikasi tetap efektif."
      ],
      contoh: [
        { jenjang: "SD/MI", teks: "Kepala MI membentuk Tim Literasi (5 guru). Minggu pertama semua ragu (forming); lalu berdebat antara pojok baca atau jam wajib membaca (storming); sepakat \"15 menit membaca + jurnal\" (norming); program berjalan mandiri (performing); ditutup gelar karya & syukuran (adjourning)." },
        { jenjang: "SMP/MTs", teks: "Tim kegiatan kokurikuler bertema \"Kearifan Lokal Gresik\" macet di tahap storming karena guru senior merasa idenya diabaikan. Kepala madrasah memfasilitasi musyawarah dan membuat kesepakatan tertulis — tim pun bergerak ke norming." },
        { jenjang: "SMA/MA/SMK", teks: "Tim persiapan akreditasi SMK dibentuk dengan anggota lintas jurusan. Kepala sekolah menerapkan kondisi Hackman: target jelas (nilai A), SK tim, ruang kerja & anggaran, serta coaching mingguan." }
      ],
      aktivitas: { tipe: "urut", judul: "Susun Tahapan Tim Literasi", instruksi: "Urutkan peristiwa Tim Literasi MI berikut sesuai tahap perkembangan tim Tuckman (dari awal ke akhir).",
        item: [
          "Anggota saling berkenalan dan menunggu arahan kepala MI. (Forming)",
          "Terjadi perdebatan: pojok baca atau jam wajib membaca? (Storming)",
          "Disepakati aturan: 15 menit membaca setiap pagi + jurnal baca. (Norming)",
          "Program berjalan, guru saling menggantikan tanpa diminta. (Performing)",
          "Gelar karya literasi, evaluasi, dan syukuran penutupan. (Adjourning)"
        ] },
      diskusi: [
        "Tim di sekolah Anda paling sering 'terjebak' di tahap mana? Apa intervensi pemimpin yang tepat?",
        "Mengapa storming tidak boleh dihindari, melainkan dikelola? Kaitkan dengan adab musyawarah."
      ],
      sumber: ["Tuckman, B. W. (1965). Developmental sequence in small groups. Psychological Bulletin, 63(6), 384–399.", "Tuckman, B. W., & Jensen, M. A. C. (1977). Stages of small-group development revisited. Group & Organization Studies, 2(4), 419–427.", "Hackman, J. R. (2002). Leading Teams: Setting the Stage for Great Performances. Harvard Business School Press."]
    },
    {
      id: 3, kode: "tugas", judul: "Pembagian Tugas & Tanggung Jawab", ikon: "🧩", warna: "#0ea5e9",
      lokal: { nama: "Rewang", asal: "Jawa Timur",
        isi: "Saat hajatan desa, tak ada yang bingung: ada 'among tamu', 'pawon' (dapur), 'peladen', dan 'sinoman'. Setiap orang tahu perannya dan siapa yang dituakan. Rewang adalah matriks RACI versi kampung." },
      dalil: { ar: "كُلُّكُمْ رَاعٍ وَكُلُّكُمْ مَسْئُولٌ عَنْ رَعِيَّتِهِ", arti: "“Setiap kalian adalah pemimpin, dan setiap kalian akan dimintai pertanggungjawaban atas yang dipimpinnya.”", sumber: "HR. al-Bukhārī dan Muslim" },
      ringkas: "Pembagian tugas yang baik menjawab dua hal: <b>siapa mengerjakan apa</b> dan <b>siapa menanggung hasilnya</b>. Alat praktisnya adalah <b>matriks RACI</b>: <i>Responsible</i> (pelaksana), <i>Accountable</i> (penanggung jawab akhir — hanya satu orang), <i>Consulted</i> (dimintai masukan), <i>Informed</i> (diberi tahu). Belbin (1981/2010) menambahkan bahwa tim butuh keragaman <b>peran tim</b> (mis. penggagas, koordinator, pelaksana, penyelesai, spesialis), bukan sekadar jabatan.",
      poin: [
        "Prinsip <b>the right man on the right place</b> — dalam Islam: menyerahkan amanah kepada ahlinya (QS. An-Nisā' [4]: 58).",
        "Satu tugas = <b>satu A</b>. Dua penanggung jawab berarti tidak ada penanggung jawab.",
        "Delegasi bukan melempar beban: berikan wewenang, sumber daya, dan tenggat yang jelas.",
        "Waspadai <i>social loafing</i> (kemalasan sosial): kontribusi individu harus tetap terlihat.",
        "Peran Belbin: Plant, Resource Investigator, Co-ordinator, Shaper, Monitor Evaluator, Teamworker, Implementer, Completer Finisher, Specialist."
      ],
      contoh: [
        { jenjang: "SD/MI", teks: "Manasik haji MI: Kepala MI = A (penanggung jawab), guru PAI = R (materi & praktik), guru PJOK = R (alur gerak & keamanan), komite = C, wali murid = I." },
        { jenjang: "SMP/MTs", teks: "Penyusunan jadwal ujian MTs gagal karena waka kurikulum dan operator sama-sama merasa 'A'. Setelah RACI dibuat, waka kurikulum = A, operator = R, guru mapel = C, siswa = I — konflik selesai." },
        { jenjang: "SMA/MA/SMK", teks: "Pesantren kilat Ramadan SMA: tiap rombel dipegang dua guru sebagai R, ketua OSIS bidang keagamaan sebagai R pendamping, dan wakasek kesiswaan sebagai satu-satunya A." }
      ],
      aktivitas: { tipe: "pasang", judul: "Rancang RACI Manasik Haji MI", instruksi: "Pilih peran RACI yang paling tepat untuk tiap pihak dalam kegiatan Manasik Haji MI.",
        opsi: ["R — Responsible", "A — Accountable", "C — Consulted", "I — Informed"],
        item: [
          { t: "Kepala MI (menandatangani & menanggung keberhasilan kegiatan)", k: "A — Accountable" },
          { t: "Guru PAI (menyiapkan materi dan memimpin praktik manasik)", k: "R — Responsible" },
          { t: "Pembimbing KBIH setempat (dimintai masukan tata cara)", k: "C — Consulted" },
          { t: "Wali murid (menerima surat pemberitahuan jadwal)", k: "I — Informed" },
          { t: "Guru PJOK (mengatur alur gerak dan keselamatan siswa)", k: "R — Responsible" }
        ] },
      diskusi: [
        "Mengapa dalam RACI hanya boleh ada satu 'A'? Hubungkan dengan hadis 'kullukum rā‘in'.",
        "Bagaimana kepala sekolah mencegah guru yang rajin menjadi 'tempat buangan tugas'?"
      ],
      sumber: ["Belbin, R. M. (2010). Team Roles at Work (2nd ed.). Butterworth-Heinemann.", "Robbins, S. P., & Judge, T. A. (2019). Organizational Behavior (18th ed.). Pearson.", "Project Management Institute. (2021). A Guide to the Project Management Body of Knowledge (PMBOK Guide, 7th ed.). PMI."]
    },
    {
      id: 4, kode: "koordinasi", judul: "Koordinasi", ikon: "🥁", warna: "#0891b2",
      lokal: { nama: "Gamelan & Kendang", asal: "Jawa",
        isi: "Dalam gamelan, kendang mengatur irama, gong menandai akhir gatra, saron membawa balungan, bonang menghias. Tidak ada yang bermain paling keras — semua tunduk pada irama bersama. Itulah koordinasi." },
      dalil: { ar: "وَلَا تَنَازَعُوا فَتَفْشَلُوا وَتَذْهَبَ رِيحُكُمْ", arti: "“…dan janganlah kamu berbantah-bantahan, yang menyebabkan kamu menjadi gentar dan hilang kekuatanmu.”", sumber: "QS. Al-Anfāl [8]: 46" },
      ringkas: "Koordinasi adalah <b>pengelolaan ketergantungan antaraktivitas</b> (Malone & Crowston, 1994) agar kerja yang terbagi menyatu kembali menuju tujuan. Mintzberg (1979) menyebut mekanisme koordinasi: <i>penyesuaian timbal balik</i> (komunikasi langsung), <i>supervisi langsung</i>, dan <i>standardisasi</i> (proses, hasil, keterampilan). Di sekolah, koordinasi diwujudkan lewat rapat yang efektif, kalender akademik, SOP, dan kanal komunikasi yang jelas.",
      poin: [
        "Koordinasi <b>vertikal</b> (kepala sekolah ↔ wakasek ↔ guru) dan <b>horizontal</b> (antar-guru, antar-mapel).",
        "Tanda koordinasi lemah: jadwal bentrok, kegiatan tumpang tindih, informasi sampai terlambat, saling menyalahkan.",
        "Alat: kalender akademik bersama, notulen + tindak lanjut, grup pesan dengan aturan, papan tugas (kanban), SOP.",
        "Rapat efektif: agenda jelas, waktu terbatas, keputusan & PIC tercatat, ditindaklanjuti.",
        "Pemimpin sebagai 'kendang': memberi tempo, bukan memainkan semua instrumen."
      ],
      contoh: [
        { jenjang: "SD/MI", teks: "Jadwal sholat Dhuha berjamaah bentrok dengan senam pagi. Kepala MI menyatukan jadwal dalam satu kalender bersama dan menetapkan PIC per hari — standardisasi proses." },
        { jenjang: "SMP/MTs", teks: "Tiga mapel memberi tugas proyek di minggu yang sama sehingga siswa kewalahan. Waka kurikulum membuat 'peta beban tugas' mingguan yang wajib diisi guru — penyesuaian timbal balik." },
        { jenjang: "SMA/MA/SMK", teks: "Saat Asesmen Nasional, proktor, teknisi, dan pengawas berkoordinasi lewat SOP tertulis dan grup pesan dengan aturan 'laporan tiap sesi' — koordinasi berbasis standar dan komunikasi." }
      ],
      aktivitas: { tipe: "kasus", judul: "Kendang di Rapat Guru", instruksi: "Pilih tindakan koordinasi terbaik.",
        soal: "Jelang Haflah Akhirussanah, panitia konsumsi memesan makanan untuk 300 orang, sementara panitia acara mengundang 450 tamu. Informasi baru diketahui H-2. Apa langkah koordinasi paling tepat dari kepala madrasah ke depan?",
        pilihan: [
          { t: "Menegur ketua panitia konsumsi di depan rapat agar menjadi pelajaran.", ok: false, fb: "Teguran publik tidak menyelesaikan akar masalah: tidak ada mekanisme berbagi data antarseksi." },
          { t: "Menetapkan satu data induk (daftar tamu) yang dikelola sekretaris, rapat koordinasi mingguan antarseksi, dan notulen berisi PIC + tenggat.", ok: true, fb: "Tepat! Ini menggabungkan standardisasi (data induk), penyesuaian timbal balik (rapat antarseksi), dan akuntabilitas (PIC)." },
          { t: "Mengambil alih semua keputusan panitia agar tidak ada kesalahan.", ok: false, fb: "Sentralisasi berlebihan membuat pemimpin menjadi 'leher botol' dan mematikan inisiatif tim." },
          { t: "Membiarkan saja karena panitia sudah dewasa dan pasti belajar sendiri.", ok: false, fb: "Laissez-faire mengabaikan fungsi pemimpin untuk membangun sistem koordinasi." }
        ] },
      diskusi: [
        "Jika sekolah adalah gamelan, siapa 'kendang', 'gong', dan 'saron' di sekolah Anda? Apa jadinya bila semua ingin jadi kendang?",
        "Grup WhatsApp sekolah: alat koordinasi atau sumber kekacauan? Rumuskan 3 aturan mainnya."
      ],
      sumber: ["Malone, T. W., & Crowston, K. (1994). The interdisciplinary study of coordination. ACM Computing Surveys, 26(1), 87–119.", "Mintzberg, H. (1979). The Structuring of Organizations. Prentice-Hall.", "Bush, T. (2020). Theories of Educational Leadership and Management (5th ed.). SAGE."]
    },
    {
      id: 5, kode: "kolaborasi", judul: "Kolaborasi", ikon: "🏮", warna: "#0284c7",
      lokal: { nama: "Damar Kurung Gresik", asal: "Gresik",
        isi: "Damar Kurung — lampion khas Gresik yang dilestarikan Mbah Masmundari — punya empat sisi bergambar yang berbeda, namun diterangi satu pelita yang sama. Kolaborasi: ragam perspektif, satu cahaya tujuan." },
      dalil: { ar: "الْمُؤْمِنُ لِلْمُؤْمِنِ كَالْبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا", arti: "“Seorang mukmin dengan mukmin lainnya bagaikan satu bangunan, sebagian menguatkan sebagian yang lain.”", sumber: "HR. al-Bukhārī dan Muslim" },
      ringkas: "Jika koordinasi adalah <i>menyelaraskan</i> kerja yang sudah dibagi, kolaborasi adalah <b>menciptakan bersama</b>: berbagi tujuan, sumber daya, risiko, dan kepemilikan hasil. Di sekolah, bentuk paling kuat adalah <b>Komunitas Belajar Profesional</b> (<i>Professional Learning Community</i>) — guru bekerja bersama berfokus pada belajar siswa, budaya kolaboratif, dan hasil (DuFour et al., 2016). Contoh lokal: KKG, MGMP, <i>lesson study</i>, dan komunitas belajar di satuan pendidikan.",
      poin: [
        "Kontinum: <b>komunikasi → kooperasi → koordinasi → kolaborasi</b> (makin dalam keterlibatan & kepemilikan bersama).",
        "Syarat kolaborasi: tujuan bersama, saling ketergantungan positif, rasa aman untuk berbeda pendapat, dan waktu terstruktur.",
        "<i>Lesson study</i>: Plan – Do – See; guru merancang, satu mengajar, yang lain mengamati siswa, lalu refleksi bersama.",
        "Kolaborasi eksternal: orang tua, komite, pesantren, puskesmas, DUDI (untuk SMK), tokoh masyarakat.",
        "Musyawarah (QS. Asy-Syūrā [42]: 38) adalah fondasi kolaborasi dalam tradisi Islam."
      ],
      contoh: [
        { jenjang: "SD/MI", teks: "KKG gugus di Kecamatan Manyar melakukan lesson study materi wudu kelas II: satu guru tampil, empat lainnya mengamati kesulitan siswa, lalu merevisi RPP bersama." },
        { jenjang: "SMP/MTs", teks: "MTs bekerja sama dengan puskesmas dan orang tua dalam program \"Kantin Sehat Halal-Thayyib\" — perencanaan, pelaksanaan, dan evaluasi dilakukan bersama." },
        { jenjang: "SMA/MA/SMK", teks: "SMK jurusan tata boga berkolaborasi dengan UMKM pudak & otak-otak bandeng Gresik: kurikulum teaching factory disusun bersama industri." }
      ],
      aktivitas: { tipe: "urut", judul: "Kontinum Kerja Bersama", instruksi: "Urutkan dari tingkat keterlibatan paling dangkal ke paling dalam.",
        item: [
          "Komunikasi — saling berbagi informasi jadwal kegiatan.",
          "Kooperasi — saling membantu bila diminta, tujuan masing-masing.",
          "Koordinasi — menyelaraskan jadwal & tugas agar tidak bentrok.",
          "Kolaborasi — merancang, melaksanakan, dan menanggung hasil bersama."
        ] },
      diskusi: [
        "Mengapa banyak MGMP/KKG berhenti menjadi 'forum berbagi soal' dan belum menjadi komunitas belajar? Apa peran kepala sekolah?",
        "Rancang satu kolaborasi madrasah–pesantren–masyarakat di Gresik yang berdampak pada belajar siswa."
      ],
      sumber: ["DuFour, R., DuFour, R., Eaker, R., Many, T. W., & Mattos, M. (2016). Learning by Doing: A Handbook for Professional Learning Communities at Work (3rd ed.). Solution Tree.", "UNESCO. (2024). Global Education Monitoring Report 2024/5: Leadership in Education — Lead for Learning. Paris: UNESCO."]
    },
    {
      id: 6, kode: "motivasi", judul: "Motivasi Anggota Tim", ikon: "🔥", warna: "#0369a1",
      lokal: { nama: "Tut Wuri Handayani", asal: "Ki Hajar Dewantara",
        isi: "Dari belakang, pemimpin memberi dorongan (handayani). Motivasi bukan ditarik paksa dari depan, melainkan dinyalakan dari dalam diri anggota — sejalan dengan teori motivasi modern." },
      dalil: { ar: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى", arti: "“Sesungguhnya amal itu tergantung niatnya, dan setiap orang mendapatkan sesuai apa yang ia niatkan.”", sumber: "HR. al-Bukhārī dan Muslim" },
      ringkas: "<b>Self-Determination Theory</b> (Deci & Ryan, 2000) menjelaskan bahwa motivasi intrinsik tumbuh bila tiga kebutuhan psikologis terpenuhi: <b>otonomi</b> (merasa punya pilihan), <b>kompetensi</b> (merasa mampu & berkembang), dan <b>keterhubungan</b> (merasa diterima). Herzberg membedakan <i>faktor higiene</i> (gaji, kondisi kerja — mencegah ketidakpuasan) dan <i>motivator</i> (pengakuan, tanggung jawab, pencapaian — menumbuhkan kepuasan). Dalam Islam, motivasi terdalam adalah niat ikhlas (lillāhi ta‘ālā) yang diperkuat dengan penghargaan yang adil.",
      poin: [
        "<b>Otonomi</b>: libatkan guru dalam keputusan; beri ruang memilih metode.",
        "<b>Kompetensi</b>: pelatihan, mentoring, umpan balik spesifik, tantangan bertahap.",
        "<b>Keterhubungan</b>: budaya saling sapa, apresiasi, kegiatan kebersamaan (mis. ngaji bareng guru).",
        "Hindari motivasi hanya berbasis hadiah/hukuman — dapat menggerus motivasi intrinsik.",
        "Apresiasi tulus & spesifik lebih kuat dari pujian umum: sebut perilaku dan dampaknya."
      ],
      contoh: [
        { jenjang: "SD/MI", teks: "Kepala MI memberi \"Pojok Apresiasi Guru\" tiap Jumat: menyebut satu praktik baik spesifik (mis. \"Bu Aini membuat media wudu dari botol bekas, siswa kelas I jadi paham urutan\")." },
        { jenjang: "SMP/MTs", teks: "Guru muda yang pasif diajak menjadi PIC kegiatan Pondok Ramadan dengan mentor guru senior — otonomi + kompetensi + keterhubungan sekaligus." },
        { jenjang: "SMA/MA/SMK", teks: "Kepala SMA memberi guru otonomi memilih topik komunitas belajar sesuai minat (AI untuk asesmen, diferensiasi, dsb.), lalu hasilnya dipresentasikan dalam 'Gelar Praktik Baik'." }
      ],
      aktivitas: { tipe: "pasang", judul: "Diagnosis Kebutuhan Motivasi (SDT)", instruksi: "Tentukan kebutuhan psikologis mana yang paling dipenuhi oleh tiap tindakan kepala sekolah.",
        opsi: ["Otonomi", "Kompetensi", "Keterhubungan"],
        item: [
          { t: "Guru dipersilakan memilih sendiri model pembelajaran untuk projek kelasnya.", k: "Otonomi" },
          { t: "Guru baru didampingi mentor dan diberi umpan balik setelah observasi kelas.", k: "Kompetensi" },
          { t: "Setiap Kamis malam ada ngaji bersama dan makan bersama keluarga guru.", k: "Keterhubungan" },
          { t: "Pelatihan bertahap membuat asesmen diagnostik, dari contoh hingga mandiri.", k: "Kompetensi" },
          { t: "Tim guru menentukan sendiri jadwal rapat komunitas belajarnya.", k: "Otonomi" }
        ] },
      diskusi: [
        "Seorang guru honorer bekerja keras tetapi mulai 'padam'. Faktor higiene apa dan motivator apa yang perlu disentuh?",
        "Bagaimana menyelaraskan niat ikhlas dengan sistem penghargaan yang adil tanpa menjadikan guru 'pemburu insentif'?"
      ],
      sumber: ["Deci, E. L., & Ryan, R. M. (2000). The \"what\" and \"why\" of goal pursuits. Psychological Inquiry, 11(4), 227–268.", "Herzberg, F. (1968). One more time: How do you motivate employees? Harvard Business Review, 46(1), 53–62.", "Dewantara, K. H. (1977). Bagian Pertama: Pendidikan. Yogyakarta: Majelis Luhur Persatuan Taman Siswa."]
    },
    {
      id: 7, kode: "percaya", judul: "Membangun Kepercayaan", ikon: "🛡️", warna: "#0ea5e9",
      lokal: { nama: "Ajining Diri Saka Lathi", asal: "Jawa",
        isi: "\"Harga diri seseorang terletak pada ucapannya.\" Pemimpin dipercaya bila kata dan perbuatannya selaras — janji ditepati, rahasia dijaga, keputusan adil." },
      dalil: { ar: "إِنَّ خَيْرَ مَنِ اسْتَأْجَرْتَ الْقَوِيُّ الْأَمِينُ", arti: "“…sesungguhnya orang yang paling baik yang engkau ambil untuk bekerja adalah orang yang kuat (mampu) lagi dapat dipercaya.”", sumber: "QS. Al-Qaṣaṣ [28]: 26" },
      ringkas: "Mayer, Davis & Schoorman (1995) menyatakan kepercayaan dibangun dari tiga persepsi: <b>kemampuan</b> (<i>ability</i>), <b>kebajikan/kepedulian</b> (<i>benevolence</i>), dan <b>integritas</b> (<i>integrity</i>) — selaras dengan sifat <i>al-qawiyy al-amīn</i>. Lencioni (2002) menempatkan <b>ketiadaan kepercayaan</b> sebagai dasar piramida lima disfungsi tim: tanpa kepercayaan → takut konflik → komitmen semu → menghindari akuntabilitas → abai pada hasil. Edmondson (1999) menambahkan pentingnya <b>rasa aman psikologis</b>: anggota berani bertanya, mengaku salah, dan memberi ide tanpa takut dipermalukan.",
      poin: [
        "Kepercayaan dibangun pelan-pelan, runtuh seketika — konsistensi adalah kuncinya.",
        "Pemimpin memulai dengan <b>kerentanan</b>: mengakui kesalahan sendiri lebih dulu.",
        "Rasa aman psikologis ≠ serba-boleh; standar tetap tinggi, tetapi kesalahan menjadi bahan belajar.",
        "Integritas: kata = perbuatan; keadilan dalam pembagian tugas & penghargaan.",
        "Tschannen-Moran (2014): di sekolah, kepercayaan kepala sekolah–guru berkorelasi dengan kolaborasi dan prestasi siswa."
      ],
      contoh: [
        { jenjang: "SD/MI", teks: "Kepala SD mengakui di rapat bahwa keputusan jadwal ekstrakurikuler kemarin keliru karena tidak bertanya dulu. Sejak itu, guru lebih berani menyampaikan kendala." },
        { jenjang: "SMP/MTs", teks: "Wali kelas yang gagal menangani kasus perundungan tidak dipermalukan, tetapi diajak membedah kasus bersama tim BK — rasa aman psikologis tumbuh, laporan kasus jadi lebih cepat." },
        { jenjang: "SMA/MA/SMK", teks: "Kepala MA mempublikasikan penggunaan dana BOS secara terbuka di papan informasi dan rapat komite — integritas yang terlihat memulihkan kepercayaan orang tua." }
      ],
      aktivitas: { tipe: "urut", judul: "Bangun Piramida Lencioni", instruksi: "Susun lima disfungsi tim dari DASAR piramida (paling mendasar) hingga PUNCAK.",
        item: [
          "Ketiadaan kepercayaan (absence of trust)",
          "Takut konflik (fear of conflict)",
          "Kurang komitmen (lack of commitment)",
          "Menghindari akuntabilitas (avoidance of accountability)",
          "Abai terhadap hasil (inattention to results)"
        ] },
      diskusi: [
        "Hubungkan tiga komponen kepercayaan Mayer dkk. dengan sifat al-qawiyy al-amīn. Mana yang paling sulit dibangun kepala sekolah baru?",
        "Rapat guru di tempat Anda: apakah 'tenang' karena sepakat, atau karena takut konflik?"
      ],
      sumber: ["Mayer, R. C., Davis, J. H., & Schoorman, F. D. (1995). An integrative model of organizational trust. Academy of Management Review, 20(3), 709–734.", "Lencioni, P. (2002). The Five Dysfunctions of a Team. Jossey-Bass.", "Edmondson, A. (1999). Psychological safety and learning behavior in work teams. Administrative Science Quarterly, 44(2), 350–383.", "Tschannen-Moran, M. (2014). Trust Matters: Leadership for Successful Schools (2nd ed.). Jossey-Bass."]
    },
    {
      id: 8, kode: "kolaboratif", judul: "Kepemimpinan Kolaboratif", ikon: "🌿", warna: "#0284c7",
      lokal: { nama: "Trilogi Ki Hajar Dewantara", asal: "Taman Siswa",
        isi: "Ing ngarsa sung tuladha (di depan memberi teladan), ing madya mangun karsa (di tengah membangun semangat), tut wuri handayani (di belakang memberi dorongan). Pemimpin kolaboratif berpindah posisi sesuai kebutuhan tim." },
      dalil: { ar: "وَشَاوِرْهُمْ فِي الْأَمْرِ ۖ فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ", arti: "“…dan bermusyawarahlah dengan mereka dalam urusan itu. Kemudian apabila engkau telah membulatkan tekad, maka bertawakallah kepada Allah.”", sumber: "QS. Āli ‘Imrān [3]: 159" },
      ringkas: "Kepemimpinan kolaboratif memandang kepemimpinan sebagai <b>praktik yang tersebar</b> (<i>distributed leadership</i>) di antara kepala sekolah, guru, dan pemangku kepentingan — bukan milik satu orang (Spillane, 2006; Harris, 2008). Pemimpin berperan sebagai fasilitator, perancang sistem, dan penumbuh pemimpin baru. UNESCO (2024) menegaskan bahwa kepemimpinan yang dibagi dan berfokus pada pembelajaran adalah kunci perbaikan mutu sekolah.",
      poin: [
        "Kepemimpinan = interaksi <b>pemimpin – pengikut – situasi</b> (Spillane, 2006).",
        "Distribusi bukan sekadar delegasi tugas, melainkan berbagi <b>pengaruh & keputusan</b>.",
        "Bentuk nyata: guru penggerak/guru inti memimpin komunitas belajar, siswa dilibatkan dalam OSIS/IPM, komite ikut merancang program.",
        "Keterampilan kunci: mendengar aktif, memfasilitasi musyawarah, mengelola konflik konstruktif, membangun konsensus.",
        "Musyawarah lalu 'azam' (keputusan tegas) dan tawakal — kolaboratif tetapi tidak ragu-ragu (QS. Āli ‘Imrān: 159)."
      ],
      contoh: [
        { jenjang: "SD/MI", teks: "Kepala MI menunjuk tiga guru inti sebagai 'pemimpin kelas rendah, tinggi, dan literasi Al-Qur'an'. Mereka memimpin rapat kecil sendiri dan melapor bulanan." },
        { jenjang: "SMP/MTs", teks: "Penyusunan visi MTs melibatkan guru, siswa, orang tua, dan kiai kampung lewat musyawarah terbuka — semua merasa memiliki visi itu." },
        { jenjang: "SMA/MA/SMK", teks: "Kepala SMK membentuk 'tim pengungkit mutu' berisi guru muda yang mahir teknologi dan guru senior yang paham budaya sekolah — saling memimpin sesuai keahlian." }
      ],
      aktivitas: { tipe: "pasang", judul: "Posisi Pemimpin: Ngarsa, Madya, atau Wuri?", instruksi: "Tentukan posisi trilogi Ki Hajar Dewantara yang paling tepat untuk tiap tindakan pemimpin.",
        opsi: ["Ing ngarsa sung tuladha", "Ing madya mangun karsa", "Tut wuri handayani"],
        item: [
          { t: "Kepala sekolah datang paling awal dan ikut sholat Dhuha bersama siswa.", k: "Ing ngarsa sung tuladha" },
          { t: "Kepala sekolah duduk bersama tim, memantik ide, dan menyemangati saat diskusi buntu.", k: "Ing madya mangun karsa" },
          { t: "Guru muda memimpin program; kepala sekolah cukup memberi dukungan & umpan balik.", k: "Tut wuri handayani" },
          { t: "Kepala madrasah menjadi yang pertama mengumpulkan modul ajar sesuai tenggat.", k: "Ing ngarsa sung tuladha" }
        ] },
      diskusi: [
        "Apa beda kepemimpinan kolaboratif dengan pemimpin yang 'tidak berani mengambil keputusan'? Gunakan QS. Āli ‘Imrān: 159.",
        "Di pesantren yang budaya kiainya sentral, bagaimana kepemimpinan terdistribusi dapat diterapkan tanpa mengurangi takzim?"
      ],
      sumber: ["Spillane, J. P. (2006). Distributed Leadership. Jossey-Bass.", "Harris, A. (2008). Distributed School Leadership: Developing Tomorrow's Leaders. Routledge.", "UNESCO. (2024). Global Education Monitoring Report 2024/5: Leadership in Education — Lead for Learning. Paris: UNESCO.", "Bush, T. (2020). Theories of Educational Leadership and Management (5th ed.). SAGE."]
    },
    {
      id: 9, kode: "evaluasi", judul: "Evaluasi Kinerja Tim", ikon: "📊", warna: "#0369a1",
      lokal: { nama: "Mulat Sarira Hangrasa Wani", asal: "Jawa (Mangkunegara I)",
        isi: "\"Berani mawas diri.\" Evaluasi bukan mencari kambing hitam, melainkan keberanian bercermin bersama untuk menjadi lebih baik — sejalan dengan muhasabah." },
      dalil: { ar: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ", arti: "“Wahai orang-orang yang beriman! Bertakwalah kepada Allah dan hendaklah setiap diri memperhatikan apa yang telah diperbuatnya untuk hari esok.”", sumber: "QS. Al-Ḥasyr [59]: 18" },
      ringkas: "Hackman (2002) menilai tim efektif dari <b>tiga kriteria</b>: (1) <b>hasil</b> memenuhi standar pengguna (siswa, orang tua), (2) <b>kapabilitas tim</b> makin kuat untuk bekerja sama ke depan, dan (3) <b>anggota</b> belajar & puas. Evaluasi dilakukan pada <b>proses</b> (komunikasi, koordinasi, partisipasi) dan <b>hasil</b> (target program). Alat praktis: indikator kinerja, rubrik, survei 360°, <b>After Action Review</b> (Apa yang direncanakan? Apa yang terjadi? Mengapa berbeda? Apa yang dipelajari?), dan siklus <b>PDCA</b>. Di Indonesia, data <b>Rapor Pendidikan</b> dapat menjadi titik awal perencanaan berbasis data.",
      poin: [
        "Evaluasi tim ≠ evaluasi individu yang dijumlahkan; nilai juga kualitas interaksi.",
        "Gunakan data, bukan kesan: daftar hadir, notulen, capaian target, survei kepuasan, hasil belajar siswa.",
        "After Action Review berfokus pada <b>pembelajaran</b>, bukan menyalahkan.",
        "Umpan balik efektif: spesifik, berbasis perilaku, tepat waktu, disertai rencana tindak lanjut.",
        "Muhasabah kolektif: syukuri capaian, akui kekurangan, rencanakan perbaikan (PDCA)."
      ],
      contoh: [
        { jenjang: "SD/MI", teks: "Setelah program Gerakan Literasi, Tim MI melakukan After Action Review 45 menit: target 80% siswa kelas III lancar membaca, tercapai 68%; penyebab: jurnal baca tidak dipantau. Rencana: buddy reading kelas atas–bawah." },
        { jenjang: "SMP/MTs", teks: "MTs memakai rubrik kinerja tim kokurikuler (kejelasan tujuan, pembagian peran, ketepatan waktu, kualitas produk, refleksi) yang diisi oleh anggota tim, siswa, dan kepala madrasah." },
        { jenjang: "SMA/MA/SMK", teks: "Kepala SMA membaca Rapor Pendidikan: indikator iklim kebinekaan rendah. Tim kesiswaan merancang program, mengukur dengan survei internal tiap semester, lalu menyesuaikan (PDCA)." }
      ],
      aktivitas: { tipe: "pasang", judul: "Pertanyaan After Action Review", instruksi: "Pasangkan tiap pernyataan rapat evaluasi Tim Literasi dengan langkah AAR yang sesuai.",
        opsi: ["Apa yang direncanakan?", "Apa yang terjadi?", "Mengapa berbeda?", "Apa yang dipelajari/diperbaiki?"],
        item: [
          { t: "Target kita 80% siswa kelas III lancar membaca di akhir semester.", k: "Apa yang direncanakan?" },
          { t: "Hasil tes akhir: 68% siswa lancar membaca.", k: "Apa yang terjadi?" },
          { t: "Jurnal baca di rumah tidak dipantau dan tidak ada kerja sama dengan orang tua.", k: "Mengapa berbeda?" },
          { t: "Semester depan: buddy reading dan grup orang tua per kelas dengan laporan mingguan.", k: "Apa yang dipelajari/diperbaiki?" }
        ] },
      diskusi: [
        "Rancang 5 indikator kinerja untuk tim kegiatan Ramadan di sekolah: mana indikator proses, mana indikator hasil?",
        "Bagaimana menyampaikan hasil evaluasi buruk kepada tim tanpa mematikan motivasi? Kaitkan dengan mulat sarira."
      ],
      sumber: ["Hackman, J. R. (2002). Leading Teams. Harvard Business School Press.", "Salas, E., Sims, D. E., & Burke, C. S. (2005). Is there a \"Big Five\" in teamwork? Small Group Research, 36(5), 555–599.", "Deming, W. E. (1986). Out of the Crisis. MIT Press."]
    }
  ],

  /* Evaluasi akhir */
  kuis: [
    { q: "Ciri utama yang membedakan TIM dari kelompok kerja adalah…", o: ["Jumlah anggotanya lebih banyak", "Adanya akuntabilitas bersama atas produk kolektif", "Dipimpin oleh kepala sekolah langsung", "Rapat dilakukan setiap minggu"], a: 1 },
    { q: "Tim Literasi berdebat keras soal program pojok baca vs jam wajib membaca. Menurut Tuckman, tim berada di tahap…", o: ["Forming", "Norming", "Storming", "Adjourning"], a: 2 },
    { q: "Dalam matriks RACI, aturan yang benar adalah…", o: ["Setiap tugas boleh memiliki banyak 'A'", "Setiap tugas hanya memiliki satu 'A'", "'I' adalah pelaksana utama", "'C' menanggung hasil akhir"], a: 1 },
    { q: "Analogi kendang dalam gamelan paling tepat menggambarkan fungsi pemimpin sebagai…", o: ["Pemain paling keras", "Pengatur irama/koordinasi bersama", "Penonton yang menilai", "Penanggung semua instrumen"], a: 1 },
    { q: "Guru merancang RPP bersama, satu mengajar, lainnya mengamati siswa, lalu refleksi. Ini adalah…", o: ["Supervisi akademik", "Lesson study", "Rapat dinas", "Penilaian kinerja guru"], a: 1 },
    { q: "Menurut Self-Determination Theory, memberi guru kebebasan memilih metode memenuhi kebutuhan…", o: ["Kompetensi", "Keterhubungan", "Otonomi", "Higiene"], a: 2 },
    { q: "Dasar piramida lima disfungsi tim Lencioni adalah…", o: ["Takut konflik", "Abai terhadap hasil", "Ketiadaan kepercayaan", "Kurang komitmen"], a: 2 },
    { q: "QS. Al-Qaṣaṣ: 26 'al-qawiyy al-amīn' paling sejalan dengan komponen kepercayaan Mayer dkk. berupa…", o: ["Ability & integrity", "Otonomi & kompetensi", "Forming & storming", "Responsible & accountable"], a: 0 },
    { q: "'Ing madya mangun karsa' berarti pemimpin…", o: ["Di depan memberi teladan", "Di tengah membangun semangat/kehendak", "Di belakang memberi dorongan", "Di luar sebagai pengawas"], a: 1 },
    { q: "Distributed leadership menurut Spillane menekankan bahwa kepemimpinan adalah…", o: ["Jabatan formal kepala sekolah", "Interaksi pemimpin, pengikut, dan situasi", "Pembagian honor kegiatan", "Kewenangan yayasan"], a: 1 },
    { q: "Tiga kriteria efektivitas tim menurut Hackman adalah hasil, kapabilitas tim, dan…", o: ["Jumlah rapat", "Pembelajaran & kepuasan anggota", "Besarnya anggaran", "Popularitas pemimpin"], a: 1 },
    { q: "Pertanyaan 'Mengapa hasil berbeda dari rencana?' merupakan bagian dari…", o: ["Matriks RACI", "After Action Review", "Teori Herzberg", "Tahap forming"], a: 1 }
  ],

  /* Bank kasus offline (dipakai bila AI tidak aktif) */
  kasusOffline: {
    1: ["Di sebuah MI di Bungah, Gresik, guru kelas I–VI selalu 'sibuk sendiri'. Saat akreditasi, dokumen tiap kelas berbeda format dan banyak yang hilang. Kepala MI baru ingin mengubah 'kumpulan guru' menjadi tim. Apa langkah pertama yang Anda sarankan, dan bagaimana nilai ta‘āwun dijadikan budaya kerja?"],
    2: ["Tim Kokurikuler SMP di Cerme sudah dua bulan dibentuk, namun setiap rapat berakhir dengan debat antara guru senior dan guru muda tentang tema projek. Diagnosis tahap Tuckman tim ini dan susun tiga intervensi kepala sekolah."],
    3: ["Peringatan Isra Mi'raj di MTs selalu kacau: tiga guru merasa sebagai ketua, dua guru tidak tahu tugasnya. Susun matriks RACI untuk lima tugas utama dan jelaskan cara mencegah social loafing."],
    4: ["Di SMK, jadwal praktik industri bentrok dengan jadwal ujian sekolah karena Waka Humas dan Waka Kurikulum tidak saling berbagi informasi. Rancang mekanisme koordinasi (vertikal & horizontal) menggunakan analogi gamelan."],
    5: ["KKG PAI gugus di Kecamatan Kebomas hanya berkumpul untuk berbagi soal ujian. Rancang program lesson study satu semester yang mengubah KKG menjadi komunitas belajar profesional."],
    6: ["Bu Rahma, guru honorer MI yang dulu kreatif, kini datang tepat waktu tetapi tidak lagi berinisiatif. Analisis dengan Self-Determination Theory dan teori Herzberg, lalu susun rencana motivasi yang selaras dengan nilai ikhlas."],
    7: ["Kepala SMA baru mendapati rapat guru selalu sepi pendapat, tetapi keluhan ramai di grup WhatsApp pribadi. Gunakan piramida Lencioni dan konsep psychological safety untuk menyusun strategi membangun kepercayaan 3 bulan."],
    8: ["Sebuah pesantren-madrasah ingin menerapkan kepemimpinan terdistribusi, tetapi para ustaz terbiasa menunggu dawuh kiai. Rancang model kepemimpinan kolaboratif yang tetap menjaga adab takzim, gunakan trilogi Ki Hajar Dewantara."],
    9: ["Program Tahfidz MI menargetkan siswa kelas VI hafal Juz 30, tetapi hanya 55% tercapai. Susun After Action Review lengkap dan rubrik evaluasi kinerja tim tahfidz untuk tahun depan."]
  },

  /* Kata kunci untuk umpan balik offline */
  kunci: {
    1: ["tujuan bersama", "akuntabilitas", "sinergi", "saling melengkapi", "gotong royong", "ta'awun", "kolektif", "komitmen"],
    2: ["forming", "storming", "norming", "performing", "adjourning", "musyawarah", "kesepakatan", "coaching", "tujuan"],
    3: ["raci", "responsible", "accountable", "consulted", "informed", "amanah", "delegasi", "peran", "belbin", "social loafing"],
    4: ["koordinasi", "jadwal", "kalender", "sop", "rapat", "notulen", "pic", "standardisasi", "komunikasi", "kendang"],
    5: ["kolaborasi", "lesson study", "komunitas belajar", "plc", "musyawarah", "refleksi", "kkg", "mgmp", "bersama"],
    6: ["otonomi", "kompetensi", "keterhubungan", "apresiasi", "herzberg", "niat", "ikhlas", "intrinsik", "mentor"],
    7: ["kepercayaan", "integritas", "kemampuan", "kepedulian", "lencioni", "rasa aman", "psychological safety", "amanah", "konsisten", "transparan"],
    8: ["distributed", "terdistribusi", "musyawarah", "ing ngarsa", "ing madya", "tut wuri", "fasilitator", "partisipasi", "syura"],
    9: ["indikator", "rubrik", "after action review", "aar", "pdca", "data", "muhasabah", "umpan balik", "rapor pendidikan", "tindak lanjut"]
  }
};
