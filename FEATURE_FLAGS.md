# Feature Flags Documentation

## 📋 Overview

This application uses a feature flag system to enable/disable features without deploying new code. Feature flags are stored in the browser's `localStorage`, so they persist across page reloads.

## 🚩 Available Feature Flags

### 1. **Dark Mode** (`darkMode`)
- **Description:** Switches the app to a dark color scheme
- **Default:** `false`
- **Visual Changes:**
  - Dark gradient background
  - Dark blue container
  - Adjusted text colors for readability

### 2. **Confetti Effect** (`confettiEffect`)
- **Description:** Shows colorful confetti animation when clicking the greeting button
- **Default:** `false`
- **Effect:** 50 confetti pieces fall from the top of the screen

### 3. **Sound Effects** (`soundEffects`)
- **Description:** Plays a beep sound when clicking the greeting button
- **Default:** `false`
- **Technology:** Uses Web Audio API to generate sounds

### 4. **Animated Background** (`animatedBackground`)
- **Description:** Makes the background gradient slowly shift and animate
- **Default:** `false`
- **Animation:** 5-second loop gradient movement

### 5. **Show Greeting Counter** (`showGreetingCounter`)
- **Description:** Displays a counter showing how many times you've clicked the greeting button
- **Default:** `false`
- **Display:** Shows below the greeting message

---

## 🎛️ How to Use Feature Flags

### Method 1: Admin Panel (UI)

The app includes a built-in admin panel at the bottom of the page:

1. Check/uncheck any feature flag checkbox
2. Changes apply immediately
3. Click "Reset All" to disable all flags

### Method 2: Browser Console (Programmatic)

Open your browser's developer console (F12) and use these commands:

```javascript
// Check if a feature is enabled
featureFlags.isEnabled('darkMode')

// Enable a feature
featureFlags.enable('darkMode')

// Disable a feature
featureFlags.disable('confettiEffect')

// Toggle a feature on/off
featureFlags.toggle('soundEffects')

// Get all flags
featureFlags.getAllFlags()

// Reset all flags to defaults
featureFlags.reset()
```

### Method 3: Direct localStorage Manipulation

```javascript
// View current flags
localStorage.getItem('featureFlags')

// Manually set flags
localStorage.setItem('featureFlags', JSON.stringify({
    darkMode: true,
    confettiEffect: true,
    soundEffects: false,
    animatedBackground: true,
    showGreetingCounter: true
}))

// Reload page to apply changes
location.reload()
```

---

## 🏗️ Architecture

### File Structure

```
hello-world-app/
├── featureFlags.js    - Feature flag manager class
├── features.js        - Feature implementations
├── admin.js          - Admin panel logic
├── script.js         - Main app logic (updated with flag checks)
├── styles.css        - Styles (including feature-specific CSS)
└── index.html        - HTML structure (includes admin panel)
```

### How It Works

1. **`featureFlags.js`**: Core flag manager
   - Stores flags in localStorage
   - Provides methods to enable/disable/toggle flags
   - Exposes global `featureFlags` object

2. **`features.js`**: Feature implementations
   - Contains the actual code for each feature
   - Separate functions for enabling/disabling features
   - Exposes global `features` object

3. **`script.js`**: Integration layer
   - Checks flags before executing features
   - Example: `if (featureFlags.isEnabled('soundEffects')) { ... }`
   - Initializes features on page load

4. **`admin.js`**: UI management
   - Syncs checkboxes with flag state
   - Handles user interactions
   - Applies changes immediately

---

## 🔧 Adding New Feature Flags

### Step 1: Add flag to `featureFlags.js`

```javascript
this.defaultFlags = {
    // ... existing flags
    myNewFeature: false  // Add your new flag
};
```

### Step 2: Implement feature in `features.js`

```javascript
enableMyNewFeature() {
    // Your feature code here
    console.log('✨ My new feature enabled');
}

disableMyNewFeature() {
    // Cleanup code here
    console.log('❌ My new feature disabled');
}
```

### Step 3: Use flag in `script.js`

```javascript
if (featureFlags.isEnabled('myNewFeature')) {
    features.enableMyNewFeature();
}
```

### Step 4: Add UI control in `index.html`

```html
<label class="flag-item">
    <input type="checkbox" id="flag-myNewFeature" data-flag="myNewFeature">
    <span>✨ My New Feature</span>
</label>
```

### Step 5: Add styles in `styles.css` (if needed)

```css
/* Feature Flag: My New Feature */
.my-new-feature-class {
    /* Your styles */
}
```

---

## 💡 Best Practices

1. **Default to `false`**: New features should be disabled by default
2. **Graceful degradation**: App should work without any flags enabled
3. **Clear naming**: Use descriptive flag names (camelCase)
4. **Console logging**: Log when features are enabled/disabled
5. **Cleanup**: Disable features should clean up any DOM changes
6. **Testing**: Test with all combinations of flags

---

## 🐛 Debugging

### View current flag state:
```javascript
console.table(featureFlags.getAllFlags())
```

### Reset if something breaks:
```javascript
featureFlags.reset()
location.reload()
```

### Clear all localStorage:
```javascript
localStorage.clear()
location.reload()
```

---

## 🌟 Example Use Cases

- **A/B Testing**: Enable features for specific users
- **Beta Features**: Test new functionality before full release
- **Debugging**: Turn on/off features to isolate issues
- **User Preferences**: Let users customize their experience
- **Gradual Rollout**: Enable features incrementally
- **Emergency Kill Switch**: Quickly disable problematic features

---

## 📊 Current Features Summary

| Feature | Flag Name | Default | Type |
|---------|-----------|---------|------|
| 🌙 Dark Mode | `darkMode` | false | Visual |
| 🎉 Confetti | `confettiEffect` | false | Interactive |
| 🔊 Sound | `soundEffects` | false | Audio |
| ✨ Animated BG | `animatedBackground` | false | Visual |
| 📊 Counter | `showGreetingCounter` | false | Data |

---

**Happy Feature Flagging! 🚩**
