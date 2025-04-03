document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});
let carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

setInterval(() => {
    carouselItems[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % carouselItems.length;
    carouselItems[currentIndex].classList.add('active');
}, 3000); // Rotate every 3 seconds
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('fixed-top', 'shadow');
    } else {
        navbar.classList.remove('fixed-top', 'shadow');
    }
});
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.querySelector('input[type="text"]');
    const email = document.querySelector('input[type="email"]');
    const message = document.querySelector('textarea');

    if (name.value === '') {
        alert('Please enter your name.');
        name.focus();
        return;
    }

    if (!email.value.includes('@')) {
        alert('Please enter a valid email.');
        email.focus();
        return;
    }

    if (message.value === '') {
        alert('Please write a message.');
        message.focus();
        return;
    }

    alert('Form submitted successfully!');
});
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
const toggleButton = document.querySelector('.navbar-toggler');
const navbarLinks = document.querySelector('.navbar-collapse');

toggleButton.addEventListener('click', () => {
    navbarLinks.style.display = (navbarLinks.style.display === 'block') ? 'none' : 'block';
});
// JavaScript for "Learn More" modals
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

    button.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center;">
                <div style="background: white; padding: 20px; border-radius: 5px; text-align: left; max-width: 500px;">
                    <h2>${service.title}</h2>
                    ${service.details}
                    <button id="close-modal" class="btn btn-danger mt-3">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Close modal logic
        const closeModal = document.getElementById('close-modal');
        closeModal.addEventListener('click', () => {
            modal.remove();
        });
    });
});

services.forEach(service => {
    const button = document.getElementById(service.id);

    button.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center;">
                <div style="background: white; padding: 20px; border-radius: 5px; text-align: center; max-width: 500px;">
                    <h2>${service.title}</h2>
                    <p>${service.details}</p>
                    <button id="close-modal" class="btn btn-danger mt-3">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Close modal logic
        const closeModal = document.getElementById('close-modal');
        closeModal.addEventListener('click', () => {
            modal.remove();
        });
    });
});

