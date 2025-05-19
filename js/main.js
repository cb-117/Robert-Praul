document.addEventListener('DOMContentLoaded', function() {
    // Set up Content Security Policy
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = "default-src 'self'; script-src 'self'; style-src 'self' https://cdnjs.cloudflare.com https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'none'";
    document.head.appendChild(meta);

    // Add security headers via .htaccess equivalent for GitHub Pages
    appendSecurityHeaders();

    // Set up smooth scrolling for navigation links
    setupSmoothScrolling();

    // Highlight current section in navigation
    setupScrollSpy();

    // Add placeholder profile image if none exists
    checkProfileImage();
});

function appendSecurityHeaders() {
    // GitHub Pages doesn't support custom headers, but we document what should be set
    console.info('Security headers that should be set:');
    console.info('X-Content-Type-Options: nosniff');
    console.info('X-Frame-Options: DENY');
    console.info('X-XSS-Protection: 1; mode=block');
    console.info('Referrer-Policy: strict-origin-when-cross-origin');
    console.info('Permissions-Policy: camera=(), microphone=(), geolocation=()');
}

function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop;
                window.scrollTo({
                    top: offsetTop - 70, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

function setupScrollSpy() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    });
}

function checkProfileImage() {
    const profileImg = document.querySelector('.profile-img');
    
    profileImg.addEventListener('error', function() {
        // If image fails to load, use a placeholder
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"%3E%3Ccircle cx="75" cy="75" r="75" fill="%232c3e50"/%3E%3Ccircle cx="75" cy="60" r="25" fill="%23ecf0f1"/%3E%3Cpath d="M75 95 C50 95 35 120 35 150 L115 150 C115 120 100 95 75 95 Z" fill="%23ecf0f1"/%3E%3C/svg%3E';
        console.warn('Profile image not found. Using placeholder.');
    });
}

// Add active class to navigation based on current section
document.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;

    // Get all sections
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelector('nav a[href="#' + sectionId + '"]')?.classList.add('active');
        } else {
            document.querySelector('nav a[href="#' + sectionId + '"]')?.classList.remove('active');
        }
    });
});