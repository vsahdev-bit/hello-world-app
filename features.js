/**
 * Feature implementations that can be toggled with feature flags
 */

class Features {
    constructor() {
        this.greetingCount = 0;
        this.confettiInterval = null;
    }
    
    /**
     * Dark Mode Feature
     */
    enableDarkMode() {
        document.body.classList.add('dark-mode');
        console.log('🌙 Dark mode enabled');
    }
    
    disableDarkMode() {
        document.body.classList.remove('dark-mode');
        console.log('☀️ Dark mode disabled');
    }
    
    /**
     * Confetti Effect Feature
     */
    showConfetti() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 0.5 + 's';
                document.body.appendChild(confetti);
                
                // Remove after animation
                setTimeout(() => confetti.remove(), 3000);
            }, i * 30);
        }
        console.log('🎉 Confetti effect triggered!');
    }
    
    /**
     * Continuous Confetti (for toggle mode)
     */
    enableContinuousConfetti() {
        if (this.confettiInterval) {
            return; // Already running
        }
        
        // Show initial confetti
        this.showConfetti();
        
        // Repeat every 5 seconds
        this.confettiInterval = setInterval(() => {
            this.showConfetti();
        }, 5000);
        
        console.log('🎉 Continuous confetti enabled!');
    }
    
    disableContinuousConfetti() {
        if (this.confettiInterval) {
            clearInterval(this.confettiInterval);
            this.confettiInterval = null;
            console.log('🎉 Continuous confetti disabled!');
        }
    }
    
    /**
     * Sound Effects Feature
     */
    playClickSound() {
        // Create a simple beep sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    /**
     * Animated Background Feature
     */
    enableAnimatedBackground() {
        document.body.classList.add('animated-background');
        console.log('✨ Animated background enabled');
    }
    
    disableAnimatedBackground() {
        document.body.classList.remove('animated-background');
        console.log('🔲 Animated background disabled');
    }
    
    /**
     * Greeting Counter Feature
     */
    showGreetingCounter() {
        let counterElement = document.getElementById('greetingCounter');
        
        if (!counterElement) {
            counterElement = document.createElement('p');
            counterElement.id = 'greetingCounter';
            counterElement.className = 'greeting-counter';
            document.querySelector('.container').appendChild(counterElement);
        }
        
        counterElement.textContent = `Greetings shown: ${this.greetingCount}`;
        console.log('📊 Greeting counter shown');
    }
    
    updateGreetingCounter() {
        this.greetingCount++;
        this.showGreetingCounter();
    }
    
    hideGreetingCounter() {
        const counterElement = document.getElementById('greetingCounter');
        if (counterElement) {
            counterElement.remove();
        }
        this.greetingCount = 0;
        console.log('📊 Greeting counter hidden');
    }
}

// Create global instance
const features = new Features();
window.features = features;
