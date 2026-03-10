// ============================================
// ANIMAÇÕES DE LOGIN E SCROLL
// ============================================

// ============================================
// ANIMAÇÃO DE LOGIN (SPLASH SCREEN)
// ============================================
function initLoginAnimation() {
    // Criar splash screen
    const splash = document.createElement('div');
    splash.id = 'splash-screen';
    splash.innerHTML = `
        <div class="splash-content">
            <div class="splash-dragon">🐉</div>
            <h1 class="splash-title">País de Gales</h1>
            <p class="splash-subtitle">Tradição e Sabor</p>
            <div class="splash-loader">
                <div class="loader-bar"></div>
            </div>
        </div>
    `;
    
    document.body.insertBefore(splash, document.body.firstChild);
    
    // Remover splash após 2.5 segundos
    setTimeout(() => {
        splash.classList.add('fade-out');
        setTimeout(() => {
            splash.remove();
        }, 500);
    }, 2500);
}

// ============================================
// ANIMAÇÃO DE SCROLL (PARALLAX E FADE-IN)
// ============================================
function initScrollAnimations() {
    // Observador de intersecção para elementos aparecerem ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todos os cards e seções
    const elementsToAnimate = document.querySelectorAll(
        '.dish-card, .ingredient-card, .content-section, .recipe-card, .gallery-item'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Parallax effect no hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        });
    }

    // Efeito de fade-in ao scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);

        // Animar elementos com base no scroll
        const animatedElements = document.querySelectorAll('[data-scroll-animate]');
        animatedElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementHeight = el.offsetHeight;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight && elementTop > -elementHeight) {
                const progress = (windowHeight - elementTop) / (windowHeight + elementHeight);
                el.style.opacity = Math.min(progress, 1);
                el.style.transform = `translateY(${Math.max(0, 30 - progress * 30)}px)`;
            }
        });
    });
}

// ============================================
// ANIMAÇÃO DE SCROLL SUAVE
// ============================================
function initSmoothScrollAnimation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#0') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ============================================
// INICIALIZAR TUDO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar splash screen apenas na primeira vez
    if (!sessionStorage.getItem('splashShown')) {
        initLoginAnimation();
        sessionStorage.setItem('splashShown', 'true');
    } else {
        // Se já foi mostrado, pular direto
        document.body.style.opacity = '1';
    }
    
    initScrollAnimations();
    initSmoothScrollAnimation();
});
