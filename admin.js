/**
 * Admin panel for managing feature flags
 */

// Initialize checkboxes based on current flags
function initializeAdminPanel() {
    const flags = featureFlags.getAllFlags();
    
    Object.keys(flags).forEach(flagName => {
        const checkbox = document.getElementById(`flag-${flagName}`);
        if (checkbox) {
            checkbox.checked = flags[flagName];
        }
    });
}

// Handle checkbox changes
document.querySelectorAll('[data-flag]').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        const flagName = e.target.dataset.flag;
        
        if (e.target.checked) {
            featureFlags.enable(flagName);
        } else {
            featureFlags.disable(flagName);
        }
        
        // Apply the feature change immediately
        applyFeatureChange(flagName, e.target.checked);
    });
});

// Apply feature changes dynamically
function applyFeatureChange(flagName, enabled) {
    switch(flagName) {
        case 'darkMode':
            enabled ? features.enableDarkMode() : features.disableDarkMode();
            break;
        case 'animatedBackground':
            enabled ? features.enableAnimatedBackground() : features.disableAnimatedBackground();
            break;
        case 'showGreetingCounter':
            if (enabled) {
                features.showGreetingCounter();
            } else {
                features.hideGreetingCounter();
            }
            break;
        case 'confettiEffect':
            if (enabled) {
                features.showConfetti();
            }
            break;
        case 'soundEffects':
            if (enabled) {
                features.playClickSound();
            }
            break;
    }
}

// Reset button handler
document.getElementById('resetFlags').addEventListener('click', () => {
    if (confirm('Reset all feature flags to defaults?')) {
        featureFlags.reset();
        
        // Update all checkboxes
        document.querySelectorAll('[data-flag]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Reset all features
        features.disableDarkMode();
        features.disableAnimatedBackground();
        features.hideGreetingCounter();
        
        console.log('✅ All features reset!');
    }
});

// Add reset counters button
const resetCountersBtn = document.createElement('button');
resetCountersBtn.textContent = 'Reset Counters';
resetCountersBtn.className = 'btn-small';
resetCountersBtn.style.marginTop = '0.5rem';
resetCountersBtn.addEventListener('click', () => {
    if (confirm('Reset visit and greeting counters? This will set all counts to 0.')) {
        features.resetCounters();
        
        // Refresh counter display if visible
        if (featureFlags.isEnabled('showGreetingCounter')) {
            features.showGreetingCounter();
        }
        
        alert('✅ Counters reset successfully!');
    }
});

document.getElementById('featureFlagsPanel').appendChild(resetCountersBtn);

// Initialize on page load
initializeAdminPanel();

console.log('🎛️ Feature Flags Admin Panel Ready!');
console.log('💡 Tip: Use window.featureFlags in console to manage flags programmatically');
