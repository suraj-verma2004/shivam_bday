document.addEventListener('DOMContentLoaded', () => {
    // -- Surprise Animation Logic --
    const giftBox = document.getElementById('gift-box');
    const surpriseOverlay = document.getElementById('surprise-overlay');
    const mainContent = document.getElementById('main-content');
    const viewMessageBtn = document.getElementById('view-message-btn');
    const surprisePrompt = document.getElementById('surprise-prompt');

    let animationTriggered = false;

    giftBox.addEventListener('click', () => {
        if (animationTriggered) return; // Prevent re-triggering
        
        giftBox.classList.add('open');
        surprisePrompt.style.opacity = '0';

        // 2. PLAY THE MUSIC ON CLICK
        document.getElementById('birthday-song').play().catch(error => {
            console.log("Audio play was prevented by browser policy. User interaction is required.");
        });
        
        animationTriggered = true;

        // Show the "View Message" button after the cake animation
        setTimeout(() => {
            // Use classList.add to trigger the CSS transition
            viewMessageBtn.classList.add('visible');
        }, 2000); // 2 second delay for animation
    });

    viewMessageBtn.addEventListener('click', () => {
        surpriseOverlay.style.opacity = '0';
        
        // Use classList to make the main content visible
        mainContent.classList.remove('main-content-hidden');

        // Remove the overlay after the fade-out transition
        setTimeout(() => {
            surpriseOverlay.style.display = 'none';
        }, 500);
    });

    // -- Existing Confetti and Fade-in Logic --
    const canvas = document.getElementById('confetti-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        let particles = [];
        const particleCount = 150;
        const colors = ["#251eacff", "#94ca49ff", "#ff0000", "#ff5500", "#d23d99ff"];

        function Particle() {
            this.x = Math.random() * width;
            this.y = Math.random() * height - height;
            this.vx = Math.random() * 2 - 1;
            this.vy = Math.random() * 3 + 1;
            this.size = Math.random() * 6 + 2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        Particle.prototype.update = function() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.y > height) {
                this.y = 0 - this.size;
                this.x = Math.random() * width;
            }
        }
        Particle.prototype.draw = function() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.size, this.size);
            ctx.closePath();
            ctx.fill();
        }
        function createParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        function animate() {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            requestAnimationFrame(animate);
        }
        createParticles();
        animate();
        window.addEventListener('resize', () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            createParticles();
        });
    }

    const fadeInElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeInElements.forEach(element => { observer.observe(element); });
});
