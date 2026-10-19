document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", function () {
    // 1. Menu injecté dans <header>
    const headerElement = document.querySelector("header");
    if (headerElement) {
        headerElement.innerHTML = `
        <div class="container nav-container">
            <a href="index.html" class="logo">Jolan Lavarenne</a>
            <button class="hamburger" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav-links"><span></span></button>
            <nav>
                <ul class="nav-links" id="nav-links">
                    <li><a href="index.html">Accueil</a></li>
                    <li><a href="projets.html">Projets</a></li>
                    <li><a href="stage-sio1.html">Stage 1</a></li>
                    <li><a href="stage-sio2.html">Stage 2</a></li>
                    <li><a href="veille.html">Veille</a></li>
                    <li><a href="cv.html">CV</a></li>
                    <li><a href="contact.html" class="btn-nav">Contact</a></li>
                </ul>
            </nav>
        </div>`;
    }

    // 2. Page active
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

    // 3. Menu mobile
    const burger = document.querySelector(".hamburger");
    const links = document.querySelector(".nav-links");
    if (burger && links) {
        burger.addEventListener("click", () => {
            const open = links.classList.toggle("mobile-menu-open");
            burger.setAttribute("aria-expanded", open);
        });
    }

    // 4. Aperçu PDF (uniquement sur les pages qui ont la modale)
    const modal = document.getElementById("pdf-modal");
    const frame = document.getElementById("pdf-frame");
    if (modal && frame) {
        document.querySelectorAll(".doc-link").forEach(link => {
            link.addEventListener("click", e => {
                // Les .docx ne s'affichent pas dans un iframe : on laisse le téléchargement
                if (link.getAttribute("href").toLowerCase().endsWith(".docx")) return;
                e.preventDefault();
                // Sur mobile/tablette tactile, l'iframe PDF s'affiche mal : on ouvre dans un nouvel onglet
                if (window.matchMedia("(pointer: coarse)").matches) { window.open(link.href, "_blank"); return; }
                frame.src = link.href;
                modal.classList.add("active");
            });
        });
        modal.addEventListener("click", e => { if (e.target === modal) closePdf(); });
        document.addEventListener("keydown", e => { if (e.key === "Escape") closePdf(); });
    }
});

function closePdf() {
    const modal = document.getElementById("pdf-modal");
    const frame = document.getElementById("pdf-frame");
    if (modal) modal.classList.remove("active");
    if (frame) frame.src = "";
}

// Boutons « Télécharger » : lancent le téléchargement sans quitter la page
document.addEventListener("DOMContentLoaded", function () {
    function saveAs(url, filename) {
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    document.querySelectorAll(".btn-download").forEach(btn => {
        btn.addEventListener("click", async e => {
            e.preventDefault();
            const href = btn.getAttribute("href");
            const filename = decodeURIComponent(href.split("/").pop());
            try {
                const res = await fetch(href);
                if (!res.ok) { alert("Fichier introuvable : " + filename); return; }
                const url = URL.createObjectURL(await res.blob());
                saveAs(url, filename);
                setTimeout(() => URL.revokeObjectURL(url), 1000);
            } catch (err) {
                // Ex. page ouverte en local (file://) : on tente le téléchargement direct
                saveAs(href, filename);
            }
        });
    });
});

// Apparition progressive des blocs au défilement
document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(
        ".project-card, .news-card, .info-card, .contact-form, .quick a, .facts div, .report section, " +
        ".main-block, .sidebar-block, .profile-photo, .solutions-section, .tools-section, .card-future");
    const counts = new Map();
    items.forEach(el => {
        const n = counts.get(el.parentNode) || 0;
        counts.set(el.parentNode, n + 1);
        el.style.setProperty("--d", (Math.min(n, 6) * 0.07) + "s");
        el.classList.add("reveal");
    });
    if (!("IntersectionObserver" in window)) { items.forEach(el => el.classList.add("in")); return; }
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    items.forEach(el => io.observe(el));
});
