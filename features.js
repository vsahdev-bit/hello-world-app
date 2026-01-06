/**
 * Feature implementations that can be toggled with feature flags
 */

class Features {
    constructor() {
        this.greetingCount = this.loadGreetingCount();
        this.confettiInterval = null;
        this.visitCount = this.loadVisitCount();
        this.trackVisit();
    }
    
    /**
     * Load greeting count from localStorage
     */
    loadGreetingCount() {
        const saved = localStorage.getItem('greetingCount');
        return saved ? parseInt(saved, 10) : 0;
    }
    
    /**
     * Save greeting count to localStorage
     */
    saveGreetingCount() {
        localStorage.setItem('greetingCount', this.greetingCount.toString());
    }
    
    /**
     * Load visit count from localStorage
     */
    loadVisitCount() {
        const saved = localStorage.getItem('visitCount');
        return saved ? parseInt(saved, 10) : 0;
    }
    
    /**
     * Track a new visit
     */
    trackVisit() {
        this.visitCount++;
        localStorage.setItem('visitCount', this.visitCount.toString());
        localStorage.setItem('lastVisit', new Date().toISOString());
        console.log(`👋 Visit #${this.visitCount} tracked`);
    }
    
    /**
     * Get last visit date
     */
    getLastVisit() {
        const lastVisit = localStorage.getItem('lastVisit');
        return lastVisit ? new Date(lastVisit) : null;
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
            counterElement = document.createElement('div');
            counterElement.id = 'greetingCounter';
            counterElement.className = 'greeting-counter';
            document.querySelector('.container').appendChild(counterElement);
        }
        
        // Build counter display with visit stats
        const lastVisit = this.getLastVisit();
        const lastVisitText = lastVisit ? 
            `Last visit: ${this.formatDate(lastVisit)}` : 
            'First visit!';
        
        counterElement.innerHTML = `
            <div class="counter-stat">
                <span class="counter-label">👋 Site Visits:</span>
                <span class="counter-value">${this.visitCount}</span>
            </div>
            <div class="counter-stat">
                <span class="counter-label">🎉 Greetings Shown:</span>
                <span class="counter-value">${this.greetingCount}</span>
            </div>
            <div class="counter-date">${lastVisitText}</div>
        `;
        
        console.log('📊 Greeting counter shown');
    }
    
    updateGreetingCounter() {
        this.greetingCount++;
        this.saveGreetingCount();
        this.showGreetingCounter();
    }
    
    hideGreetingCounter() {
        const counterElement = document.getElementById('greetingCounter');
        if (counterElement) {
            counterElement.remove();
        }
        console.log('📊 Greeting counter hidden');
    }
    
    resetCounters() {
        this.greetingCount = 0;
        this.visitCount = 0;
        this.saveGreetingCount();
        localStorage.setItem('visitCount', '0');
        localStorage.removeItem('lastVisit');
        console.log('🔄 Counters reset');
    }
    
    /**
     * Format date for display
     */
    formatDate(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        
        return date.toLocaleDateString();
    }
}

// Create global instance
const features = new Features();
window.features = features;
