// Vib on Budget - Interactive functionality

// Global functions for inline event handlers
function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('show');
}

function toggleDropdown(event) {
    event.preventDefault();
    const dropdown = event.target.closest('.dropdown');
    dropdown.classList.toggle('active');
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    // Close dropdown after clicking
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.remove('active');
}

function handleAmazonClick(element) {
    const originalText = element.textContent;
    element.textContent = 'Opening Amazon...';
    element.style.opacity = '0.7';
    
    // Reset after a short delay
    setTimeout(() => {
        element.textContent = originalText;
        element.style.opacity = '1';
    }, 1500);
    
    // The link will naturally open in a new tab due to target="_blank"
    return true;
}

function showCelebrityAlert(celebrityName) {
    alert(`Coming Soon: ${celebrityName} complete style collection! 🎉\n\nStay tuned for curated looks and affordable dupes from your favorite celebrities!`);
}

document.addEventListener('DOMContentLoaded', function() {
    // Popup functionality
    const popup = document.getElementById('popup');
    const closePopupBtn = document.querySelector('.close-popup');

    // Show popup after 2 seconds
    setTimeout(() => {
        popup.classList.add('show');
    }, 2000);

    // Close popup when clicking X
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', function() {
            closePopup();
        });
    }

    // Close popup when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closePopup();
        }
    });

    // Enhanced dropdown functionality
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdown && dropdownMenu) {
        // Handle mouse hover for desktop
        dropdown.addEventListener('mouseenter', function() {
            dropdown.classList.add('active');
        });

        dropdown.addEventListener('mouseleave', function() {
            dropdown.classList.remove('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]:not(.dropdown-item)');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects for cards
    const allCards = document.querySelectorAll('.featured-card, .budget-card, .celebrity-card, .essential-card');
    allCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('budget-card')) {
                this.style.transform = 'translateX(8px)';
            } else if (this.classList.contains('celebrity-card')) {
                this.style.transform = 'scale(1.02)';
            } else {
                this.style.transform = 'translateY(-8px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Mobile menu toggle functionality
    function createMobileMenu() {
        const navToggle = document.createElement('button');
        navToggle.className = 'nav-toggle';
        navToggle.innerHTML = '☰';
        navToggle.setAttribute('aria-label', 'Toggle navigation menu');
        navToggle.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: var(--color-text);
            padding: var(--space-8);
        `;

        const headerContent = document.querySelector('.header-content');
        const nav = document.querySelector('.nav');
        const navList = document.querySelector('.nav-list');
        
        // Insert toggle button
        headerContent.insertBefore(navToggle, nav);

        // Toggle navigation on mobile
        navToggle.addEventListener('click', function() {
            const isVisible = navList.style.display === 'flex';
            navList.style.display = isVisible ? 'none' : 'flex';
        });

        return { navToggle, navList };
    }

    const mobileMenu = createMobileMenu();

    // Handle responsive navigation
    function handleResize() {
        const { navToggle, navList } = mobileMenu;
        
        if (window.innerWidth <= 768) {
            navToggle.style.display = 'block';
            navList.style.flexDirection = 'column';
            navList.style.position = 'absolute';
            navList.style.top = '100%';
            navList.style.left = '0';
            navList.style.width = '100%';
            navList.style.background = 'var(--color-surface)';
            navList.style.boxShadow = 'var(--shadow-md)';
            navList.style.padding = 'var(--space-16)';
            navList.style.zIndex = '1000';
            navList.style.display = 'none'; // Hide by default on mobile
        } else {
            navToggle.style.display = 'none';
            navList.style.display = 'flex';
            navList.style.flexDirection = 'row';
            navList.style.position = 'static';
            navList.style.background = 'none';
            navList.style.boxShadow = 'none';
            navList.style.padding = '0';
            navList.style.width = 'auto';
        }
    }

    // Initial check and resize listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Add scroll-to-top functionality
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `;

    document.body.appendChild(scrollTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add animation on scroll for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Enhanced interaction feedback
    const interactiveElements = document.querySelectorAll('.btn, .nav-link, .dropdown-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Verify all Amazon links have proper attributes
    const amazonLinks = document.querySelectorAll('a[href*="amazon"]');
    amazonLinks.forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
        // Double check target attribute
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
        }
    });

    // Add subtle loading animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    console.log('✨ Vib on Budget website loaded successfully!');
    console.log('🔥 All Amazon links are functional and open in new tabs');
    console.log('📱 Dropdown menu is working for celebrity styles');
    console.log('🎉 Celebrity View All buttons show alerts');
    console.log('💫 Popup functionality is active');
});