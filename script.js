// Мобильное меню
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Плавное закрытие меню при клике на ссылку
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) {
            navLinks.style.display = 'none';
        }
    });
});

// Эффект появления при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Наблюдение за элементами
document.querySelectorAll('.feature-card, .benefit-item, .contact-item, .step').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Анимация счетчика статистики
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(counter);
        }
        element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
    }, 16);
}

// Запуск анимации статистики при прокрутке до секции
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.stat-item h3').forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.match(/\d+/)[0]);
                    const format = text.replace(/\d+/, '');
                    
                    animateCounter(stat, number);
                });
                
                statsObserver.unobserve(statsSection);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Активный пункт навигации при прокрутке
window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    
    document.querySelectorAll('section').forEach(section => {
        let sectionHeight = section.offsetHeight;
        let sectionTop = section.offsetTop - 100;
        let sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            
            const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// Эффект parallax
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `0% ${window.pageYOffset * 0.5}px`;
    }
});

// Добавление стиля для активной ссылки
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Автоматическое закрытие мобильного меню при изменении размера окна
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks) {
        navLinks.style.display = 'flex';
    } else if (navLinks) {
        navLinks.style.display = 'none';
    }
});

// Инициализация мобильного меню
if (window.innerWidth <= 768 && navLinks) {
    navLinks.style.display = 'none';
}

// Функция для копирования контактной информации
document.querySelectorAll('.contact-item p').forEach(p => {
    p.style.cursor = 'pointer';
    p.addEventListener('click', function() {
        const text = this.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = this.textContent;
            this.textContent = 'Скопировано!';
            setTimeout(() => {
                this.textContent = originalText;
            }, 2000);
        });
    });
});

// Плавная прокрутка для кнопок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Эффект hover для кнопок с дополнительной анимацией
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

console.log('SafeScan Bot сайт загружен успешно!');
