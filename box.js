document.addEventListener('DOMContentLoaded', () => {
    const outerBox = document.getElementById('outerBox');
    let boxCount = 1;
    const counter = document.getElementById('count');
    
    outerBox.addEventListener('click', function addInnerBox(e) {
        // Create new box
        const newBox = document.createElement('div');
        newBox.className = 'box';
        newBox.innerHTML = '📦';
        e.stopPropagation();
        
        // Random color for each box
        const hue = Math.floor(Math.random() * 360);
        newBox.style.background = `linear-gradient(135deg, hsl(${hue}, 80%, 70%), hsl(${(hue + 30) % 360}, 80%, 60%))`;
        
        // Add animation
        newBox.style.transform = 'scale(0)';
        newBox.style.opacity = '0';
        
        // Add to DOM
        this.appendChild(newBox);
        
        // Animate in
        setTimeout(() => {
            newBox.style.transform = 'scale(1)';
            newBox.style.opacity = '1';
            newBox.style.transition = 'all 0.3s ease';
        }, 10);
        
        // Update counter
        boxCount++;
        counter.textContent = boxCount;
        
        // Add click event to new box
        newBox.addEventListener('click', addInnerBox);
        
        // Play sound
        const popSound = new Audio('pop.mp3');
        popSound.volume = 0.3;
        popSound.play();
        
        // Prevent too many boxes
        if (boxCount > 50) {
            const boxes = document.querySelectorAll('.box');
            if (boxes.length > 50) {
                boxes[0].remove();
                boxCount--;
                counter.textContent = boxCount;
            }
        }
    });
    
    // Add confetti when reaching certain counts
    const observer = new MutationObserver(() => {
        if (boxCount === 10 || boxCount === 25 || boxCount === 50) {
            createConfetti();
        }
    });
    
    observer.observe(counter, { childList: true });
});

function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '1000';
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['🎉', '✨', '🎊', '🌟', '💫'][Math.floor(Math.random() * 5)];
        confetti.style.position = 'absolute';
        confetti.style.fontSize = `${20 + Math.random() * 20}px`;
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = '-50px';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.opacity = '0';
        confettiContainer.appendChild(confetti);
        
        const animationDuration = 2 + Math.random() * 3;
        
        // Animate in
        setTimeout(() => {
            confetti.style.transition = `top ${animationDuration}s ease-out, opacity 0.5s`;
            confetti.style.top = `${100 + Math.random() * 20}vh`;
            confetti.style.opacity = '1';
        }, 10);
        
        // Remove after animation
        setTimeout(() => {
            confetti.style.opacity = '0';
            setTimeout(() => confetti.remove(), 500);
        }, animationDuration * 1000);
    }
    
    setTimeout(() => confettiContainer.remove(), 5000);
}
