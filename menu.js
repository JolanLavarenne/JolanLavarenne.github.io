document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Le HTML du menu (Avec le bouton hamburger ajouté !)
    const headerHTML = `
    <div class="container nav-container">
        <a href="index.html" class="logo">Jolan Lavarenne</a>
        
        <div class="hamburger">
            <i class="fas fa-bars"></i>
        </div>

        <nav>
            <ul class="nav-links">
                <li><a href="index.html">Accueil</a></li>
                <li><a href="projets.html">Projets</a></li>
                <li><a href="stage-sio1.html">Stage 1</a></li>
                <li><a href="stage-sio2.html">Stage 2</a></li>
                <li><a href="veille.html">Veille</a></li>
                <li><a href="cv.html">CV</a></li>
                <li><a href="contact.html" class="btn-nav">Contact</a></li>
            </ul>
        </nav>
    </div>
    `;

    // 2. Injection du menu
    const headerElement = document.querySelector("header");
    if (headerElement) {
        headerElement.innerHTML = headerHTML;
    }

    // 3. Gestion de la classe Active (Surlignage page actuelle)
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        const linkHref = link.getAttribute("href");
        if (linkHref === currentPage || (currentPage === "" && linkHref === "index.html")) {
            link.classList.add("active");
        }
    });

    // ==========================================
    // 4. LOGIQUE DU MENU MOBILE (NOUVEAU)
    // ==========================================
    const hamburgerBtn = document.querySelector(".hamburger");
    const navLinksContainer = document.querySelector(".nav-links");
    const icon = document.querySelector(".hamburger i");

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener("click", () => {
            // On ajoute/enlève la classe qui affiche le menu
            navLinksContainer.classList.toggle("mobile-menu-open");
            
            // On change l'icône : "Barres" <-> "Croix"
            if (navLinksContainer.classList.contains("mobile-menu-open")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");
            } else {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        });
    }
});
