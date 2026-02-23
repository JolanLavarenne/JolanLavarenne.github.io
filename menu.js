document.addEventListener("DOMContentLoaded", function() {
    // 1. Le HTML du menu (identique partout)
    const headerHTML = `
    <div class="container nav-container">
        <a href="index.html" class="logo">Jolan Lavarenne</a>
        <nav>
            <ul class="nav-links">
                <li><a href="index.html">Accueil</a></li>
                <li><a href="projets.html">Projets</a></li>
//              <li><a href="cv.html">CV</a></li>
                <li><a href="stage-sio1.html">Stage SIO1</a></li>
                <li><a href="stage-sio2.html">Stage SIO2</a></li>
                <li><a href="veille.html">Veille</a></li>    
                <li><a href="contact.html" class="btn-nav">Contact</a></li>
            </ul>
        </nav>
    </div>
    `;

    // 2. Injection
    const headerElement = document.querySelector("header");
    if (headerElement) {
        headerElement.innerHTML = headerHTML;
    }

    // 3. Gestion de la classe Active
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        const linkHref = link.getAttribute("href");
        // Si c'est la page courante OU si on est sur la racine (index)
        if (linkHref === currentPage || (currentPage === "" && linkHref === "index.html")) {
            link.classList.add("active");
        }
    });

});
