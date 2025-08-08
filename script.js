// Animate buttons when clicked
function animateButton(button) {
    button.style.transform = 'scale(0.95)';
    button.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    setTimeout(() => {
        button.style.transform = '';
        button.style.boxShadow = '';
    }, 200);
}

// Create more floating emojis
document.addEventListener('DOMContentLoaded', () => {
    const floatingEmojis = document.querySelector('.floating-emojis');
    const emojis = ['✨', '🌟', '💫', '⚡', '🎈', '💎', '🔮', '🌸'];
    
    for (let i = 0; i < 15; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = `${Math.random() * 100}%`;
        emoji.style.top = `${Math.random() * 100}%`;
        emoji.style.animationDuration = `${5 + Math.random() * 10}s`;
        emoji.style.animationDelay = `${Math.random() * 5}s`;
        floatingEmojis.appendChild(emoji);
    }
    
    // Button hover sound
    const buttons = document.querySelectorAll('.btn');
    const hoverSound = document.getElementById('hoverSound');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.volume = 0.3;
            hoverSound.play();
        });
    });
    
    // Background particles on click
    document.addEventListener('click', (e) => {
        createParticles(e.clientX, e.clientY);
    });
});

function createParticles(x, y) {
    const particles = document.createElement('div');
    particles.className = 'particles';
    document.body.appendChild(particles);
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
        particle.style.width = `${5 + Math.random() * 10}px`;
        particle.style.height = particle.style.width;
        particles.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 3;
        const lifetime = 1000 + Math.random() * 1000;
        
        const animate = () => {
            const currentX = parseFloat(particle.style.left);
            const currentY = parseFloat(particle.style.top);
            const opacity = parseFloat(particle.style.opacity || 1);
            
            particle.style.left = `${currentX + Math.cos(angle) * velocity}px`;
            particle.style.top = `${currentY + Math.sin(angle) * velocity}px`;
            particle.style.opacity = opacity - 0.02;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animate);
        
        setTimeout(() => {
            particle.style.transition = 'opacity 0.5s';
            particle.style.opacity = '0';
            setTimeout(() => particle.remove(), 500);
        }, lifetime);
    }
    
    setTimeout(() => particles.remove(), 2000);
}