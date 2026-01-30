// ===== Navigation =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Hero Typing Animation =====
const roles = [
    'Cyber Security Engineer',
    'Cloud Security Engineer',
    'Network Engineer',
    'Penetration Tester',
    'Security Analyst'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleText = document.getElementById('roleText');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        roleText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        roleText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeRole, speed);
}

// Start typing animation
typeRole();

// ===== Particle Background =====
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 3 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = 'rgba(99, 102, 241, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
    particle.style.animationDelay = Math.random() * 5 + 's';
    particlesContainer.appendChild(particle);
}

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-category')) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                });
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.skill-category, .service-card, .project-card, .timeline-item, .detail-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ===== Certifications Carousel =====
const certTrack = document.getElementById('certTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Clone certificates for infinite scroll
const certCards = certTrack.querySelectorAll('.cert-card');
certCards.forEach(card => {
    const clone = card.cloneNode(true);
    certTrack.appendChild(clone);
});

let isPaused = false;

certTrack.addEventListener('mouseenter', () => {
    isPaused = true;
    certTrack.style.animationPlayState = 'paused';
});

certTrack.addEventListener('mouseleave', () => {
    isPaused = false;
    certTrack.style.animationPlayState = 'running';
});

let currentScroll = 0;

prevBtn.addEventListener('click', () => {
    currentScroll -= 320;
    certTrack.style.animation = 'none';
    certTrack.style.transform = `translateX(${currentScroll}px)`;
});

nextBtn.addEventListener('click', () => {
    currentScroll += 320;
    certTrack.style.animation = 'none';
    certTrack.style.transform = `translateX(${currentScroll}px)`;
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // WhatsApp integration
    const whatsappNumber = '917892281799';
    const whatsappMessage = `Hi, I'm ${name}%0A%0AEmail: ${email}%0A%0AMessage: ${message}`;
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Reset form
    contactForm.reset();
    
    // Show success message
    alert('Thank you! Your message has been sent via WhatsApp.');
});

// ===== Download Resume =====
const downloadResumeBtn = document.getElementById('downloadResume');

downloadResumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create a simple resume text file (you can replace this with actual PDF)
    const resumeContent = `
NITIN G N
Cyber Security Engineer | Cloud Security Engineer | Network Engineer

CONTACT:
Email: nitingn03@gmail.com
Phone: +91 7892281799
LinkedIn: https://www.linkedin.com/in/nitingn03
Location: Bangalore Rural, Karnataka, India

EDUCATION:
B.E in Computer Science & Engineering - Cyber Security
Akash Institute of Engineering and Technology
Currently in 3rd Year – 6th Semester
CGPA: 8.5+

EXPERIENCE:
Virtual Internship – Skill Craft Technology
15th Sept 2025 – 15th Oct 2025
- Hands-on Linux experience
- Cloud basics

SKILLS:
Programming: Java, Python, C, C++
Security: Penetration Testing, Network Security, Web Security, Digital Forensics
Tools: Nmap, Burp Suite, Wireshark, Metasploit, Kali Linux, Autopsy
Networking: TCP/IP, Firewalls, IDS/IPS, Routing & Switching
Cloud: AWS, Google Cloud Platform
Languages: English, Hindi, Kannada, Telugu

CERTIFICATIONS:
- Deloitte Cyber Security Job Simulation
- Tata Cyber Security Job Analyst
- AIG Cyber Security Simulation
- Security Blue Team – Network Analysis
- Skill Craft Internship Certificate

PROJECTS:
1. Basic Vulnerability Scanner - Network scanning using Nmap & Linux
2. Image Encryption Tool - Python-based image encryption
3. Caesar Cipher Tool - Classical cryptography implementation
4. Safe Key Logger - Ethical keylogging for education

ACHIEVEMENTS:
- GfG Campus Mantri
- Student Sports Co-ordinator, AIET (2023–2027)
- NSS Student Co-ordinator
- BIS Student Volunteer
- NSUI Student Volunteer
- ABVP Student Volunteer
    `;

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Nitin_GN_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert('Resume downloaded! (Note: Replace with actual PDF resume)');
});

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Smooth Scroll for All Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Cursor Trail Effect (Optional Enhancement) =====
let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// ===== Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Console Easter Egg =====
console.log('%c👋 Hey there!', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cLooking for something? 🔍', 'font-size: 14px; color: #8b5cf6;');
console.log('%cLet\'s connect: nitingn03@gmail.com', 'font-size: 12px; color: #b4b4c8;');
console.log('%c🔐 Cyber Security Engineer | Network Security | Cloud Security', 'font-size: 12px; color: #6366f1;');