/**
 * Feature Flags Manager
 * Manages feature toggles for the application
 */

class FeatureFlagManager {
    constructor() {
        // Default feature flags
        this.defaultFlags = {
            darkMode: false,
            confettiEffect: false,
            soundEffects: false,
            animatedBackground: false,
            showGreetingCounter: false
        };
        
        // Load flags from localStorage or use defaults
        this.flags = this.loadFlags();
    }
    
    /**
     * Load flags from localStorage
     */
    loadFlags() {
        const stored = localStorage.getItem('featureFlags');
        if (stored) {
            try {
                return { ...this.defaultFlags, ...JSON.parse(stored) };
            } catch (e) {
                console.error('Error loading feature flags:', e);
                return { ...this.defaultFlags };
            }
        }
        return { ...this.defaultFlags };
    }
    
    /**
     * Save flags to localStorage
     */
    saveFlags() {
        localStorage.setItem('featureFlags', JSON.stringify(this.flags));
    }
    
    /**
     * Check if a feature is enabled
     * @param {string} flagName - The name of the feature flag
     * @returns {boolean}
     */
    isEnabled(flagName) {
        return this.flags[flagName] === true;
    }
    
    /**
     * Enable a feature
     * @param {string} flagName - The name of the feature flag
     */
    enable(flagName) {
        if (flagName in this.flags) {
            this.flags[flagName] = true;
            this.saveFlags();
            console.log(`✅ Feature "${flagName}" enabled`);
            return true;
        }
        console.warn(`⚠️ Feature "${flagName}" not found`);
        return false;
    }
    
    /**
     * Disable a feature
     * @param {string} flagName - The name of the feature flag
     */
    disable(flagName) {
        if (flagName in this.flags) {
            this.flags[flagName] = false;
            this.saveFlags();
            console.log(`❌ Feature "${flagName}" disabled`);
            return true;
        }
        console.warn(`⚠️ Feature "${flagName}" not found`);
        return false;
    }
    
    /**
     * Toggle a feature on/off
     * @param {string} flagName - The name of the feature flag
     */
    toggle(flagName) {
        if (flagName in this.flags) {
            this.flags[flagName] = !this.flags[flagName];
            this.saveFlags();
            console.log(`🔄 Feature "${flagName}" toggled to: ${this.flags[flagName]}`);
            return this.flags[flagName];
        }
        console.warn(`⚠️ Feature "${flagName}" not found`);
        return false;
    }
    
    /**
     * Get all flags
     */
    getAllFlags() {
        return { ...this.flags };
    }
    
    /**
     * Reset all flags to defaults
     */
    reset() {
        this.flags = { ...this.defaultFlags };
        this.saveFlags();
        console.log('🔄 All feature flags reset to defaults');
    }
}

// Create global instance
const featureFlags = new FeatureFlagManager();

// Make it accessible in console for debugging
window.featureFlags = featureFlags;
