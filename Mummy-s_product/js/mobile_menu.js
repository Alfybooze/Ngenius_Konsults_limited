// Enhanced Mobile Menu Logic
class MobileMenuManager {
    constructor() {
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.navLinks = document.getElementById('navLinks');
        this.icon = this.mobileMenuBtn.querySelector('i');
        this.isMenuOpen = false;
        this.breakpoint = 768; // Adjust based on your CSS media query
        
        this.init();
    }
    
    init() {
        // Add event listeners
        this.mobileMenuBtn.addEventListener('click', (e) => this.toggleMenu(e));
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Close menu when clicking on nav links (mobile)
        this.navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= this.breakpoint) {
                    this.closeMenu();
                }
            });
        });
    }
    
    toggleMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.navLinks.classList.add('active');
        this.icon.classList.remove('fa-bars');
        this.icon.classList.add('fa-times');
        this.mobileMenuBtn.setAttribute('aria-expanded', 'true');
        this.mobileMenuBtn.setAttribute('aria-label', 'Close navigation menu');
        this.isMenuOpen = true;
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
        
        // Focus trap for accessibility
        this.trapFocus();
    }
    
    closeMenu() {
        this.navLinks.classList.remove('active');
        this.icon.classList.remove('fa-times');
        this.icon.classList.add('fa-bars');
        this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        this.mobileMenuBtn.setAttribute('aria-label', 'Open navigation menu');
        this.isMenuOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Return focus to menu button
        this.mobileMenuBtn.focus();
    }
    
    handleOutsideClick(e) {
        // Only close if menu is open and click is outside menu area
        if (this.isMenuOpen && 
            !this.mobileMenuBtn.contains(e.target) && 
            !this.navLinks.contains(e.target)) {
            this.closeMenu();
        }
    }
    
    handleResize() {
        // Close menu when resizing above breakpoint
        if (window.innerWidth > this.breakpoint && this.isMenuOpen) {
            this.closeMenu();
        }
    }
    
    handleKeyPress(e) {
        // Close menu with Escape key
        if (e.key === 'Escape' && this.isMenuOpen) {
            this.closeMenu();
        }
    }
    
    trapFocus() {
        // Get all focusable elements within the nav menu
        const focusableElements = this.navLinks.querySelectorAll(
            'a, button, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // Focus the first element
        firstElement.focus();
        
        // Add tab key listener for focus trap
        const handleTabKey = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };
        
        // Add the listener
        document.addEventListener('keydown', handleTabKey);
        
        // Remove listener when menu closes
        const removeListener = () => {
            document.removeEventListener('keydown', handleTabKey);
        };
        
        // Store reference to remove later
        this.removeTabListener = removeListener;
    }
}

// Alternative: Simple function-based approach (if you prefer)
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const icon = mobileMenuBtn.querySelector('i');
    let isMenuOpen = false;
    
    // Set initial ARIA attributes
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('aria-label', 'Open navigation menu');
    
    function toggleMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            navLinks.classList.add('active');
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            mobileMenuBtn.setAttribute('aria-label', 'Close navigation menu');
            document.body.style.overflow = 'hidden';
        } else {
            navLinks.classList.remove('active');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.setAttribute('aria-label', 'Open navigation menu');
            document.body.style.overflow = '';
        }
    }
    
    function closeMenu() {
        if (isMenuOpen) {
            navLinks.classList.remove('active');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.setAttribute('aria-label', 'Open navigation menu');
            document.body.style.overflow = '';
            isMenuOpen = false;
        }
    }
    
    // Event listeners
    mobileMenuBtn.addEventListener('click', toggleMenu);
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && 
            !mobileMenuBtn.contains(e.target) && 
            !navLinks.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
    
    // Close menu when clicking nav links (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Choose one of the approaches:
    
    // Option 1: Class-based approach (recommended)
    const menuManager = new MobileMenuManager();
    
    // Option 2: Function-based approach
    // initMobileMenu();
});