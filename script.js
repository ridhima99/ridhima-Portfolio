// script.js
// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Download Resume Function
function downloadResume() {
    // Create a dummy link for resume download
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual resume URL
    link.download = 'Ridhima_Gupta_Resume.pdf';
    link.target = '_blank';
    
    // For demo purposes, open a placeholder
    window.open('https://via.placeholder.com/800x1100/667eea/ffffff?text=Ridhima+Gupta+Resume', '_blank');
    
    // Show notification
    showNotification('Resume download started!');
}

// Notification Function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingCard = document.querySelector('.floating-card');
    if (floatingCard) {
        floatingCard.style.transform = `translateY(-50%) translateX(${scrolled * 0.5}px)`;
    }
});

// Add hover effects to project cards
document.querySelectorAll('.project-card, .certificate-card, .cloud-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});
// 🔥 EmailJS Contact Form - Works on GitHub Pages
// 🔥 Beautiful Success Popup Functions
// 🔥 Beautiful Success Popup Functions
function showSuccessPopup() {
    const popup = document.createElement('div');
    popup.className = 'success-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-icon">✅</div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you! I'll get back to you soon.</p>
            <button onclick="this.parentElement.parentElement.remove()" class="popup-close">Close</button>
        </div>
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.classList.add('show'), 100);
}

function showErrorPopup() {
    const popup = document.createElement('div');
    popup.className = 'error-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-icon">❌</div>
            <h3>Failed to Send</h3>
            <p>Please try emailing directly or refresh and try again.</p>
            <button onclick="this.parentElement.parentElement.remove()" class="popup-close">Close</button>
        </div>
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.classList.add('show'), 100);
}

// 🔥 EmailJS Contact Form with Beautiful Popup
emailjs.init("MA-qHDs_52t1YHVtw");

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const btn = e.target.querySelector('button');
    btn.innerHTML = 'Sending...';
    btn.disabled = true;
    
    emailjs.send("service_gx0o2wd", "template_0u2ajgl", {
        from_name: document.getElementById('user_name').value,
        from_email: document.getElementById('user_email').value,
        message: document.getElementById('user_message').value,
    }).then(function() {
        showSuccessPopup();  // ✅ Beautiful popup instead of alert
        this.reset();
    }, function(error) {
        showErrorPopup();    // ❌ Beautiful error popup
        console.error('EmailJS Error:', error);
    }).finally(() => {
        btn.innerHTML = 'Send Message';
        btn.disabled = false;
    });
});
