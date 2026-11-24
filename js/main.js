// JavaScript portofolio Annisa Azzahra
// Dipasang di ketiga halaman dengan defer

// 1. Daftar keahlian (halaman Beranda), data dari data/keahlian.json
const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");
async function muatKeahlian() {
try {
const response = await fetch("data/keahlian.json");
if (!response.ok) {
throw new Error(`Status ${response.status}`);
}
const skills = await response.json();
skills.forEach((skill) => {
const item = document.createElement("li");
item.textContent = `${skill.nama} (${skill.level})`;
daftarSkill.appendChild(item);
});
jumlahSkill.textContent = `Ada ${skills.length} keahlian yang
sedang saya kembangkan.`;
} catch (error) {
jumlahSkill.textContent = "Daftar keahlian gagal dimuat.";
console.error(error);
}
}
const pemuatanKeahlian = daftarSkill ? muatKeahlian() : Promise.resolve();

// 2. Tema gelap (semua halaman)
const tombolTema = document.querySelector("#tombol-tema");

// Mengambil tema yang tersimpan
const temaTersimpan = localStorage.getItem("tema");

// Menerapkan tema saat halaman dibuka
if (temaTersimpan === "gelap") {
    document.body.classList.add("gelap");
    tombolTema.textContent = "Mode Terang";
}

tombolTema.addEventListener("click", () => {
    document.body.classList.toggle("gelap");

    if (document.body.classList.contains("gelap")) {
        tombolTema.textContent = "Mode Terang";
        localStorage.setItem("tema", "gelap");
    } else {
        tombolTema.textContent = "Mode Gelap";
        localStorage.setItem("tema", "terang");
    }
});

// 3. Penghitung karakter pesan (halaman Kontak)
const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");
if (kotakPesan) {
kotakPesan.addEventListener("input", () => {
hitungKarakter.textContent = `${kotakPesan.value.length}/300
karakter`;
});
}

function buatKartu(item) {
return `
<article class="kartu">
<span class="label">${item.kategori}</span>
<h3>${item.judul}</h3>
<img src="${item.gambar}" alt="${item.alt}" width="280">
<p>${item.deskripsi}</p>
</article>`;
}

// 4. Daftar proyek dan filter (halaman Proyek)
let proyek = [];

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");

function tampilkanProyek(daftar) {
  const semuaKartu = daftar.map((item) => buatKartu(item));

  daftarProyek.innerHTML = semuaKartu.join("");

  jumlahProyek.textContent =
    `Menampilkan ${daftar.length} dari ${proyek.length} proyek`;
}

function pasangFilter(idTombol, kategori) {
  const tombol = document.querySelector(idTombol);

  if (tombol) {
    tombol.addEventListener("click", () => {
      if (kategori === "Semua") {
        tampilkanProyek(proyek);
      } else {
        const hasilFilter = proyek.filter(
          (item) => item.kategori === kategori
        );

        tampilkanProyek(hasilFilter);
      }
    });
  }
}

async function muatProyek() {
  daftarProyek.innerHTML = "Memuat proyek...";

  try {
    const response = await fetch("data/proyek.json");

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    proyek = await response.json();

    tampilkanProyek(proyek);
  } catch (error) {
    daftarProyek.textContent = "Data proyek gagal dimuat.";
    console.error(error);
  }
}

if (daftarProyek) {
  muatProyek();

  pasangFilter("#filter-semua", "Semua");
  pasangFilter("#filter-html", "HTML");
  pasangFilter("#filter-css", "CSS");
  pasangFilter("#filter-javascript", "JavaScript");
}

// 5. Repositori GitHub terbaru (halaman Proyek)
const username = "Annisaxpplg1";
const alamatRepo = `https://api.github.com/users/${username}/repos`;
const pilihan = "?per_page=100";

const daftarRepo = document.querySelector("#daftar-repo");
const statusRepo = document.querySelector("#status-repo");

async function ambilRepo() {
  statusRepo.textContent = "Memuat...";

  try {
    const response = await fetch(alamatRepo + pilihan);

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const repos = await response.json();

    repos.sort((a, b) =>
      b.updated_at.localeCompare(a.updated_at)
    );

    const enamRepo = repos.slice(0, 6);

    enamRepo.forEach((repo) => {
      const item = document.createElement("li");
      const tautan = document.createElement("a");

      tautan.href = repo.html_url;
      tautan.target = "_blank";
      tautan.textContent =
        `${repo.name} (${repo.language || "tanpa bahasa"}, ${repo.stargazers_count} bintang)`;

      item.appendChild(tautan);
      daftarRepo.appendChild(item);
    });

    statusRepo.textContent = `${enamRepo.length} repositori yang terakhir diperbarui:`;

  } catch (error) {
    statusRepo.textContent =
      "Maaf, daftar repositori gagal dimuat. Periksa username atau coba lagi nanti.";
    console.error(error);
  }
}

if (daftarRepo) {
  ambilRepo();
}
// Form keahlian baru
const formSkill = document.querySelector("#form-skill");

if (formSkill) {
  const inputSkill = formSkill.querySelector("#skill-baru");
  const inputLevel = formSkill.querySelector("#level-baru");
  const pesanSkill = document.querySelector("#pesan-skill");

  formSkill.addEventListener("submit", async (event) => {
    event.preventDefault();

    const namaSkill = inputSkill.value.trim();
    const levelSkill = inputLevel.value;

    if (!namaSkill || !levelSkill) {
      pesanSkill.textContent = "Daftar keahlian wajib diisi";
      return;
    }

    await pemuatanKeahlian;

    const item = document.createElement("li");
    item.textContent = `${namaSkill} (${inputLevel.selectedOptions[0].textContent})`;
    daftarSkill.appendChild(item);

    const jumlahSaatIni = daftarSkill.querySelectorAll("li").length;
    jumlahSkill.textContent =
      `Ada ${jumlahSaatIni} keahlian yang sedang saya kembangkan.`;

    pesanSkill.textContent = "Daftar keahlian berhasil ditambahkan";

    formSkill.reset();
  });
}
