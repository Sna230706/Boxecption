document.addEventListener('DOMContentLoaded', () => {
    // Set IDs and data transfer for draggable items
    document.querySelectorAll('.item').forEach((item, index) => {
        item.id = 'item-' + index;
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData("text/plain", item.id);
            item.style.opacity = '0.5';
            
            // Create a drag image
            const dragImage = item.cloneNode(true);
            dragImage.style.position = 'fixed';
            dragImage.style.top = '-9999px';
            dragImage.style.left = '-9999px';
            dragImage.style.transform = 'scale(1.2)';
            dragImage.style.opacity = '0.8';
            dragImage.style.zIndex = '1000';
            dragImage.style.pointerEvents = 'none';
            document.body.appendChild(dragImage);
            e.dataTransfer.setDragImage(dragImage, 0, 0);
            
            setTimeout(() => document.body.removeChild(dragImage), 0);
        });
        
        item.addEventListener('dragend', () => {
            item.style.opacity = '1';
        });
    });
    
    // Add sound effects
    const rejectSound = new Audio('error.mp3');
    const table = document.getElementById('table');
    const messageBox = document.getElementById('message');
    
    // Preload sounds
    rejectSound.load();
});

function allowDrop(ev) {
    ev.preventDefault();
    const table = document.getElementById('table');
    table.style.transform = 'scale(1.02)';
    table.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
}

function dropItem(ev) {
    ev.preventDefault();
    const table = document.getElementById('table');
    const messageBox = document.getElementById('message');
    
    // Reset table appearance
    table.style.transform = '';
    table.style.boxShadow = '';
    
    // Get emoji from dragged element
    const data = ev.dataTransfer.getData("text/plain");
    const item = document.getElementById(data);
    const emoji = item.textContent;
    
    // Start shake animation
    table.classList.add('shake');
    
    // Play sound
    const rejectSound = new Audio('error.mp3');
    rejectSound.volume = 0.3;
    rejectSound.play();
    
    // Savage replies
    const replies = [
        `🤨 I don't want your ${emoji}`,
        `😤 ${emoji}? You think this table is a trash bin?`,
        `🙄 Not today, ${emoji}`,
        `😬 Ew, no ${emoji} allowed`,
        `🚫 ${emoji} has been rejected.`,
        `👎 Nope. Keep your ${emoji}.`,
        `💢 How dare you try to put ${emoji} on me!`,
        `🤢 ${emoji}? That's disgusting!`,
        `😾 I'm a table, not a ${emoji} holder!`,
        `🙅‍♀️ Absolutely no ${emoji} on my surface!`,
        `🤮 ${emoji}? I might vomit!`,
        `👺 Your ${emoji} offends me!`,
        `💥 BOOM! ${emoji} rejected with extreme prejudice!`,
        `🦶 I kicked your ${emoji} to the curb!`,
        `🤺 En garde! Your ${emoji} is no match for me!`
    ];
    
    // Random savage reply
    const savage = replies[Math.floor(Math.random() * replies.length)];
    
    // Show animated message
    setTimeout(() => {
        table.classList.remove('shake');
        messageBox.textContent = savage;
        messageBox.style.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        messageBox.classList.remove('show');
        void messageBox.offsetWidth;
        messageBox.classList.add('show');
        
        // Create explosion effect
        createExplosion(ev.clientX, ev.clientY, emoji);
    }, 500);
}

function createExplosion(x, y, emoji) {
    const explosion = document.createElement('div');
    explosion.style.position = 'fixed';
    explosion.style.left = `${x}px`;
    explosion.style.top = `${y}px`;
    explosion.style.transform = 'translate(-50%, -50%)';
    explosion.style.zIndex = '1000';
    explosion.style.pointerEvents = 'none';
    document.body.appendChild(explosion);
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.textContent = emoji;
        particle.style.position = 'absolute';
        particle.style.fontSize = '1.5rem';
        particle.style.opacity = '1';
        explosion.appendChild(particle);
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        const duration = 0.5 + Math.random() * 0.5;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
    }
    
    setTimeout(() => {
        explosion.remove();
    }, 1000);
}
// Back button functionality
document.getElementById('goBack').addEventListener('click', function() {
    // Try multiple methods to ensure it works
    try {
        // Method 1: Standard relative path
        window.location.href = 'index.html';
    } catch (e) {
        try {
            // Method 2: Absolute path from root
            window.location.href = '/' + window.location.pathname.split('/')[1] + '/index.html';
        } catch (e) {
            // Method 3: Go up one level
            window.location.href = '../index.html';
        }
    }
});