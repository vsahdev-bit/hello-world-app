const greetBtn = document.getElementById('greetBtn');
const messageElement = document.getElementById('message');

const greetings = [
    "Hello, World! 🌍",
    "Hola, Mundo! 🌎",
    "Bonjour, Monde! 🇫🇷",
    "Ciao, Mondo! 🇮🇹",
    "Hallo, Welt! 🇩🇪",
    "こんにちは、世界! 🇯🇵",
    "你好，世界! 🇨🇳",
    "Olá, Mundo! 🇧🇷"
];

let currentIndex = 0;

greetBtn.addEventListener('click', () => {
    messageElement.textContent = greetings[currentIndex];
    currentIndex = (currentIndex + 1) % greetings.length;
    
    // Add a pulse animation
    messageElement.style.animation = 'none';
    setTimeout(() => {
        messageElement.style.animation = 'fadeIn 0.5s ease';
    }, 10);
    
    // Feature Flag: Sound Effects
    if (featureFlags.isEnabled('soundEffects')) {
        features.playClickSound();
    }
    
    // Feature Flag: Confetti Effect
    if (featureFlags.isEnabled('confettiEffect')) {
        features.showConfetti();
    }
    
    // Feature Flag: Greeting Counter
    if (featureFlags.isEnabled('showGreetingCounter')) {
        features.updateGreetingCounter();
    }
});

// Initialize features based on flags
function initializeFeatures() {
    // Dark Mode
    if (featureFlags.isEnabled('darkMode')) {
        features.enableDarkMode();
    }
    
    // Animated Background
    if (featureFlags.isEnabled('animatedBackground')) {
        features.enableAnimatedBackground();
    }
    
    // Greeting Counter
    if (featureFlags.isEnabled('showGreetingCounter')) {
        features.showGreetingCounter();
    } else {
        features.hideGreetingCounter();
    }
}

// Run on page load
initializeFeatures();
