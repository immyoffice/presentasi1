let currentSlide = 0;
let currentLang = 'en'; // Halaman pertama otomatis Bahasa Inggris

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slide-dot');
const totalSlides = slides.length;

// Data ringkasan terjemahan Bahasa Indonesia untuk panel atas (Top Drawer)
const indonesianDrawerSummary = [
  `<strong>Sampul Presentasi:</strong><br>
   Kelancaran Bahasa Inggris bagi Guru Sekolah Dasar & Strategi Belajar Mandiri.<br>
   Oleh: <strong>Boas Sababang (NIM: 251134146)</strong>.`,

  `<strong>1. Topik Penelitian:</strong> Apakah guru SD harus lancar berbahasa Inggris?<br>
   • <strong>Fondasi yang Tepat:</strong> Anak mudah meniru gurunya (contoh: pelafalan instruksi <em>"Line up, please"</em> sejak dini).<br>
   • <strong>Sumber Belajar Global:</strong> Guru dapat memakai video sains interaktif atau game edukasi internasional.<br>
   • <strong>Membangun Kebiasaan:</strong> Menyapa siswa setiap pagi menghilangkan rasa takut dan menjadikan bahasa Inggris alat komunikasi harian.`,

  `<strong>2. Refleksi Diri:</strong><br>
   • <strong>Tingkat Pemahaman:</strong> Menengah (Intermediate) — paham percakapan harian, inti artikel, dan film bersubtitle.<br>
   • <strong>Rutinitas Harian:</strong> Menonton YouTube berbahasa Inggris, podcast/musik, dan mengatur bahasa ponsel ke bahasa Inggris.<br>
   • <strong>Bagian Favorit:</strong> Listening & kosakata lewat film/lagu karena alami tanpa tekanan.<br>
   • <strong>Tantangan Terbesar:</strong> Terlalu memikirkan aturan grammar saat berbicara & kurangnya lingkungan berbahasa Inggris.`,

  `<strong>2b. Strategi Belajar & Video Subtitle:</strong><br>
   • <strong>Strategi Utama:</strong> Mempraktikkan teknik <em>shadowing</em> (menirukan kalimat penutur asli dari video bersubtitle) dan mengutamakan penyampaian pesan terlebih dahulu daripada mengkhawatirkan grammar yang sempurna.`,

  `<strong>3. Rekomendasi English Club:</strong><br>
   • <strong>Pendapat:</strong> Wadah yang sangat suportif, praktis, dan aman untuk berlatih berbicara tanpa tekanan nilai akademik.<br>
   • <strong>Rekomendasi untuk Junior:</strong> Sangat direkomendasikan agar adik tingkat dapat membangun kepercayaan diri, memperluas relasi, dan mengasah <em>public speaking</em> sejak dini.`
];

function updateSlideUI() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });

  document.getElementById('slide-indicator').textContent = `Slide ${currentSlide + 1} / ${totalSlides}`;
  document.getElementById('progress-fill').style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;

  // Perbarui isi panel terjemahan atas sesuai slide yang aktif
  const drawerBody = document.getElementById('drawer-body');
  if (drawerBody) {
    drawerBody.innerHTML = indonesianDrawerSummary[currentSlide];
  }
}

function goToSlide(index) {
  if (index >= 0 && index < totalSlides) {
    currentSlide = index;
    updateSlideUI();
  }
}

function changeSlide(direction) {
  let nextIndex = currentSlide + direction;
  if (nextIndex >= 0 && nextIndex < totalSlides) {
    currentSlide = nextIndex;
    updateSlideUI();
  }
}

// Buka/Tutup Panel Terjemahan Bahasa Indonesia di Bagian Atas
function toggleIdDrawer() {
  const drawer = document.getElementById('id-top-drawer');
  drawer.classList.toggle('open');
  updateSlideUI();
}

// Ubah bahasa seluruh teks slide (EN <-> ID)
function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'id' : 'en';

  document.getElementById('lang-en').classList.toggle('active-lang', currentLang === 'en');
  document.getElementById('lang-id').classList.toggle('active-lang', currentLang === 'id');

  const translatableElements = document.querySelectorAll('[data-en][data-id]');
  translatableElements.forEach((el) => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });
}

// Fungsi Ekstrak Video ID dari URL YouTube apa pun
function extractYouTubeId(input) {
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = trimmed.match(regex);
  return match ? match[1] : null;
}

// Putar Video Preset Latihan Shadowing
function loadPresetVideo(videoId, btnElement) {
  const player = document.getElementById('youtube-player');
  const externalLink = document.getElementById('yt-external-link');

  player.src = `https://www.youtube.com/embed/${videoId}?cc_load_policy=1&cc_lang_pref=en&rel=0`;
  externalLink.href = `https://www.youtube.com/watch?v=${videoId}`;

  document.querySelectorAll('.preset-btn').forEach((btn) => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
}

// Putar Video dari Input URL YouTube Kustom
function loadCustomYouTube() {
  const inputField = document.getElementById('yt-url-input');
  const videoId = extractYouTubeId(inputField.value);

  if (!videoId) {
    alert('Masukkan URL YouTube atau ID Video (11 karakter) yang valid.');
    return;
  }

  const player = document.getElementById('youtube-player');
  const externalLink = document.getElementById('yt-external-link');

  player.src = `https://www.youtube.com/embed/${videoId}?cc_load_policy=1&cc_lang_pref=en&autoplay=1&rel=0`;
  externalLink.href = `https://www.youtube.com/watch?v=${videoId}`;

  document.querySelectorAll('.preset-btn').forEach((btn) => btn.classList.remove('active'));
}

// Navigasi menggunakan tombol panah Kiri / Kanan di Keyboard
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT') return;
  if (e.key === 'ArrowRight') changeSlide(1);
  if (e.key === 'ArrowLeft') changeSlide(-1);
});

// Inisialisasi tampilan awal
updateSlideUI();