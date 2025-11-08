# 🥗 Nutrio v3.0 - Complete Bundle

A comprehensive nutrition tracking app built with React, Vite, and Capacitor for iOS.

## 📦 What's Included

This is the **complete, production-ready** Nutrio v3 application with all features fully implemented:

### ✅ Core Features
- **React 18** + **Vite** for fast development
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Capacitor 6** for iOS native capabilities
- **Custom logo** (nutrio-app-conc2.png) integrated throughout

### ✅ UI/UX Features
- **Dashboard with motivational quote** (only on Dashboard page)
- **Safe-area header** prevents content from going under iOS status bar
- **Glass effect hamburger menu** with smooth animations
- **Bottom navigation** for easy mobile access
- **Responsive design** optimized for mobile

### ✅ Premium Features & Restrictions
- **Barcode Scanner** (Premium only)
  - Uses `@capacitor-community/barcode-scanner`
  - Shows upgrade modal for Basic users
- **Favourites Management**
  - Basic: Limited to 3 favourite meals
  - Premium: Unlimited favourites
  - Delete button on all favourite cards
- **History Retention**
  - Basic: 7 days of history
  - Premium: 6 months (180 days) of history
- **Plan Management** in Account page

### ✅ Achievements System
- **27+ achievements** with various categories:
  - First steps & milestones
  - Streak achievements
  - Nutrition goals
  - Level milestones
  - Consistency rewards
  - Special achievements
- **Improved XP curve** for better progression
- **Achievement tracking** with real-time updates

### ✅ Complete iOS Setup
- Full iOS project configuration
- Camera permissions for barcode scanner
- Status bar styling
- Safe area handling

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Xcode 14+ (for iOS development)
- CocoaPods (for iOS dependencies)

### Installation

1. **Extract the bundle**
   ```bash
   unzip nutrio-v3-complete.zip
   cd nutrio-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Capacitor CLI globally** (if not already installed)
   ```bash
   npm install -g @capacitor/cli
   ```

4. **Build the web app**
   ```bash
   npm run build
   ```

5. **Initialize iOS project** (first time only)
   ```bash
   npx cap add ios
   ```

6. **Sync with iOS**
   ```bash
   npx cap sync ios
   ```

7. **Configure iOS permissions**
   
   Open `ios/App/App/Info.plist` and add camera permissions:
   ```xml
   <key>NSCameraUsageDescription</key>
   <string>This app requires camera access to scan barcodes for nutrition information.</string>
   ```

8. **Open in Xcode**
   ```bash
   npx cap open ios
   ```

9. **Run on simulator or device**
   - Select a simulator or connected device in Xcode
   - Click the "Run" button (▶️)

## 📱 Development Workflow

### Web Development
```bash
# Start development server
npm run dev

# Build for production
npm run build
```

### iOS Development
```bash
# After making changes to web code
npm run build
npx cap sync ios

# Quick iOS build and open
npm run ios
```

### Project Structure
```
nutrio-app/
├── src/
│   ├── assets/
│   │   └── icon.png              # Your custom logo
│   ├── components/
│   │   └── Layout/
│   │       ├── Layout.jsx        # Main layout with glass hamburger
│   │       └── Layout.css
│   ├── data/
│   │   └── achievements.js       # 27+ achievements
│   ├── pages/
│   │   ├── Dashboard.jsx         # With motivational quote
│   │   ├── MealAnalyzer.jsx      # With barcode scanner
│   │   ├── History.jsx           # With retention logic
│   │   ├── Favourites.jsx        # With 3-meal limit & delete
│   │   ├── Achievements.jsx      # Expanded achievements
│   │   └── Account.jsx           # Plan management
│   ├── store/
│   │   ├── store.js              # Redux store
│   │   ├── mealsSlice.js         # Meals & favourites
│   │   ├── achievementsSlice.js  # Achievements & XP
│   │   └── userSlice.js          # User profile & stats
│   ├── utils/
│   │   └── subscription.js       # Premium restriction logic
│   ├── App.jsx                   # Router configuration
│   ├── main.jsx                  # App entry point
│   └── index.css                 # Global styles with safe-area
├── public/
│   └── icon.png                  # App icon
├── ios/                          # iOS native project
├── package.json
├── vite.config.js
├── capacitor.config.json
└── README.md
```

## 🎨 Key Features Explained

### 1. Dashboard Quote (Only on Dashboard)
The motivational quote appears **only on the Dashboard page** and changes on each visit. It's not sticky across other pages.

### 2. Safe-Area Header
The header uses `padding-top: env(safe-area-inset-top)` to prevent content from going under the iOS status bar. The `.safe-top` class is applied to the header.

### 3. Glass Hamburger Button
The menu button has a glass morphism effect with:
- Semi-transparent background
- Backdrop blur
- Smooth hamburger-to-X animation

### 4. Barcode Scanner (Premium Only)
- Basic users see "⭐ Premium" badge and get upgrade modal
- Premium users can scan barcodes
- Requires camera permissions in iOS

### 5. Favourites System
- **Basic Plan**: Maximum 3 favourites
- **Premium Plan**: Unlimited favourites
- Delete button (🗑️) on each favourite card
- Shows upgrade modal when limit is reached

### 6. History Retention
- **Basic**: 7 days of history
- **Premium**: 180 days (6 months) of history
- Automatic cleanup of old meals based on plan

### 7. Achievements System
27+ achievements including:
- Meal logging milestones (10, 50, 100, 250, 500 meals)
- Streak achievements (7, 30, 60, 100 days)
- Special achievements (perfect day, early bird, etc.)
- Improved XP curve for better progression

### 8. Plan Management
Users can switch between Basic and Premium plans from the Account page. Premium features include:
- 📱 Barcode scanner
- ❤️ Unlimited favourites
- 📊 6 months of history
- 📈 Advanced analytics (placeholder)

## 🔧 Customization

### Changing Colors
Edit `src/index.css` CSS variables:
```css
:root {
  --primary: #4ade80;        /* Main green color */
  --primary-dark: #22c55e;   /* Darker green */
  --bg: #0a0a0a;             /* Background */
  /* ... more variables */
}
```

### Changing App Name
1. Update `name` in `package.json`
2. Update `appName` in `capacitor.config.json`
3. Update title in `index.html`

### Changing App Icon
Replace `src/assets/icon.png` and `public/icon.png` with your logo.

For iOS app icon, replace icons in `ios/App/App/Assets.xcassets/AppIcon.appiconset/`

### Adding More Achievements
Edit `src/data/achievements.js` and add new achievement objects.

## 📝 Important Notes

### Subscription System
The subscription logic is **fully functional** but uses local state. For production:
1. Integrate with a payment provider (Stripe, Apple IAP, etc.)
2. Verify subscription status with your backend
3. Update `src/utils/subscription.js` with real subscription checks

### Barcode Scanner
The barcode scanner plugin is integrated but needs:
1. Camera permissions in Info.plist
2. A backend API to fetch product data from barcodes
3. Replace the mock data in `MealAnalyzer.jsx` with real API calls

### Data Persistence
Currently uses `localStorage`. For production:
1. Consider IndexedDB for larger datasets
2. Implement cloud sync for cross-device access
3. Add proper error handling for storage failures

## 🐛 Troubleshooting

### iOS Build Issues
```bash
# Clean and rebuild
cd ios/App
pod install
cd ../..
npm run build
npx cap sync ios
```

### Camera Permission Not Working
Ensure `NSCameraUsageDescription` is in `ios/App/App/Info.plist`

### Safe Area Not Working
Make sure the header has the `safe-top` class and CSS variables are defined.

## 📄 License

This is a demo project. Use freely for learning and development.

## 🤝 Support

For issues or questions, check the inline code comments or refer to:
- [Capacitor Docs](https://capacitorjs.com/docs)
- [React Docs](https://react.dev)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)

---

**Nutrio v3.0** - Your complete nutrition tracking solution 🥗
