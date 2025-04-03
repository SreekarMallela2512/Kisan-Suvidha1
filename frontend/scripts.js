// Smooth scrolling for nav links
document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Carousel functionality (if you have one)
let carouselItems = document.querySelectorAll('.carousel-item');
if (carouselItems.length > 0) {
    let currentIndex = 0;
    setInterval(() => {
        carouselItems[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % carouselItems.length;
        carouselItems[currentIndex].classList.add('active');
    }, 3000);
}

// Sticky navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('fixed-top', 'shadow');
    } else {
        navbar.classList.remove('fixed-top', 'shadow');
    }
});

// Active section highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle
const toggleButton = document.querySelector('.navbar-toggler');
const navbarLinks = document.querySelector('.navbar-collapse');

if (toggleButton && navbarLinks) {
    toggleButton.addEventListener('click', () => {
        const isVisible = navbarLinks.style.display === 'block';
        navbarLinks.style.display = isVisible ? 'none' : 'block';
    });
}

// Service modals - SINGLE VERSION (remove the duplicate)
const services = [
    {
        id: 'crop-advisory-btn',
        title: 'Crop Advisory',
        details: `
            <p>Our crop advisory service provides tailored recommendations to help you maximize your yields. Here are the main areas we focus on:</p>
            <ul>
                <li><b>Crop Selection:</b> Guidance on choosing the right crops based on soil type, climate, and market demand.</li>
                <li><b>Planting Techniques:</b> Step-by-step instructions for sowing seeds to achieve optimal spacing and depth.</li>
                <li><b>Soil Health:</b> Recommendations for fertilization and soil testing to maintain nutrient balance.</li>
                <li><b>Pest & Disease Management:</b> Methods to identify and manage common crop issues with eco-friendly solutions.</li>
                <li><b>Harvesting Best Practices:</b> Strategies to harvest at the right time for maximum quality and profit.</li>
            </ul>
            <p>We stay updated with the latest agricultural research to bring you the most effective solutions.</p>
        `
    },
    {
        id: 'weather-updates-btn',
        title: 'Weather Updates',
        details: 'Stay updated with accurate weather forecasts, rainfall predictions, and climate insights to plan your farming activities effectively.'
    },
    {
        id: 'market-prices-btn',
        title: 'Market Prices',
        details: 'Access real-time market rates for crops and produce, ensuring you make informed decisions about selling your yields.'
    },
    {
        id: 'financial-assistance-btn',
        title: 'Financial Assistance',
        details: 'Learn about subsidies, loans, and government schemes available for farmers. Get the financial support you need to grow your farming business.'
    }
];

services.forEach(service => {
    const button = document.getElementById(service.id);
    if (button) {
        button.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '1000';
            
            modal.innerHTML = `
                <div style="background: white; padding: 20px; border-radius: 8px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto;">
                    <h2 style="color: #28a745;">${service.title}</h2>
                    <div style="text-align: left;">${service.details}</div>
                    <button class="btn btn-danger mt-3" style="background: #dc3545;">Close</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            // Close modal
            modal.querySelector('button').addEventListener('click', () => {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            });
        });
    }
});

// Contact form submission - SINGLE HANDLER
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        try {
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
            
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            // Client-side validation
            if (!formData.name || !formData.email || !formData.message) {
                throw new Error('Please fill in all fields');
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                throw new Error('Please enter a valid email address');
            }
            
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to send message');
            }
            
            // Show success message
            const successAlert = document.createElement('div');
            successAlert.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3';
            successAlert.style.zIndex = '1100';
            successAlert.textContent = data.message || 'Thank you! Your message has been sent.';
            document.body.appendChild(successAlert);
            
            // Remove alert after 5 seconds
            setTimeout(() => {
                document.body.removeChild(successAlert);
            }, 5000);
            
            // Reset form
            e.target.reset();
            
        } catch (error) {
            console.error('Error:', error);
            const errorAlert = document.createElement('div');
            errorAlert.className = 'alert alert-danger position-fixed top-0 start-50 translate-middle-x mt-3';
            errorAlert.style.zIndex = '1100';
            errorAlert.textContent = error.message || 'Something went wrong. Please try again later.';
            document.body.appendChild(errorAlert);
            
            // Remove alert after 5 seconds
            setTimeout(() => {
                document.body.removeChild(errorAlert);
            }, 5000);
            
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}