
document.addEventListener("DOMContentLoaded", function () {

    // 1. Optimasi gambar
    const gambar = document.querySelectorAll("img");

    gambar.forEach(function (img) {
        const posisi = img.getBoundingClientRect();

        // Gambar yang berada di luar layar ditunda.
        if (posisi.top > window.innerHeight) {
            img.loading = "lazy";
        } else {
            // Gambar yang terlihat langsung dimuat.
            img.loading = "eager";
        }

        img.decoding = "async";
    });

    // 2. Optimasi iframe
    const iframe = document.querySelectorAll("iframe");

    iframe.forEach(function (frame) {
        frame.loading = "lazy";

        if (!frame.hasAttribute("title")) {
            frame.title = "Konten tambahan";
        }
    });

    // 3. Optimasi link tab baru
    const links = document.querySelectorAll('a[target="_blank"]');

    links.forEach(function (link) {
        const rel = new Set(
            (link.rel || "").split(/\s+/).filter(Boolean)
        );

        rel.add("noopener");
        rel.add("noreferrer");

        link.rel = [...rel].join(" ");
    });

});
