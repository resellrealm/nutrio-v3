import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addMeal, addFavourite } from '../store/mealsSlice';
import { addXp, checkAchievements } from '../store/achievementsSlice';
import { incrementMealCount, incrementScanCount } from '../store/userSlice';
import { isPremium, hasFeature, FEATURES } from '../utils/subscription';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

import './MealAnalyzer.css';

const MealAnalyzer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const meals = useSelector((state) => state.meals);

  const [mealData, setMealData] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
  });

  const [busy, setBusy] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMealData((prev) => ({ ...prev, [name]: value }));
  };

  // --------- BARCODE SCAN (Premium) ----------
  const handleBarcodeScanner = async () => {
    if (!hasFeature(FEATURES.BARCODE_SCANNER)) {
      setShowPremiumModal(true);
      return;
    }

    try {
      setBusy(true);

      // Request camera permission for MLKit scanner
      await BarcodeScanner.requestPermissions();

      // Start scan (opens camera view)
      const { barcodes } = await BarcodeScanner.scan();

      setBusy(false);

      if (barcodes?.length) {
        const code = barcodes[0].rawValue || barcodes[0].displayValue || '';

        // Record a scan in your stats
        dispatch(incrementScanCount());

        // TODO: call your product nutrition API with `code`
        // Example placeholder: mock values after scanning
        setMealData({
          name: `Barcode ${code}`,
          calories: '250',
          protein: '12',
          carbs: '31',
          fat: '8',
        });

        alert(`Scanned: ${code}\n(Replace mock with your nutrition API lookup)`);
      } else {
        alert('No barcode detected.');
      }
    } catch (err) {
      console.error('Barcode scan error:', err);
      setBusy(false);
      alert('Could not start barcode scan. Check camera permissions.');
    }
  };

  // --------- PHOTO SCAN (Free) ----------
  const handlePhotoAnalyze = async () => {
    try {
      setBusy(true);

      // Let user take or pick a photo
      const photo = await Camera.getPhoto({
        source: CameraSource.Prompt, // Camera or Photo Library
        quality: 70,
        resultType: CameraResultType.Base64,
        allowEditing: false,
      });

      if (!photo?.base64String) {
        setBusy(false);
        return;
      }

      const base64 = photo.base64String;

      // TODO: send `base64` to your analyzer (e.g., Nutritionix image API or your own API)
      // const result = await fetch('https://your-analyzer/api', { ...base64... })
      // const nutrition = await result.json();

      // Placeholder: mock nutrition from image
      setMealData({
        name: 'Analyzed from Photo',
        calories: '420',
        protein: '28',
        carbs: '36',
        fat: '18',
      });

      setBusy(false);
      alert('Photo analyzed (mock). Wire this to your analyzer API.');
    } catch (err) {
      console.error('Photo analyze error:', err);
      setBusy(false);
      alert('Could not access camera/photos. Check permissions.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mealData.name || !mealData.calories) {
      alert('Please enter at least meal name and calories');
      return;
    }

    const meal = {
      name: mealData.name,
      calories: parseFloat(mealData.calories) || 0,
      protein: parseFloat(mealData.protein) || 0,
      carbs: parseFloat(mealData.carbs) || 0,
      fat: parseFloat(mealData.fat) || 0,
    };

    dispatch(addMeal(meal));
    dispatch(incrementMealCount());
    dispatch(addXp(10)); // Base XP

    dispatch(
      checkAchievements({
        totalMeals: user.stats.totalMeals + 1,
        currentStreak: user.stats.currentStreak,
        favouritesCount: meals.favourites.length,
        scansCompleted: user.stats.scansCompleted,
      })
    );

    setMealData({ name: '', calories: '', protein: '', carbs: '', fat: '' });
    alert('Meal logged successfully! +10 XP');
  };

  const handleSaveAsFavourite = () => {
    if (!mealData.name || !mealData.calories) {
      alert('Please enter meal details first');
      return;
    }

    const favourite = {
      name: mealData.name,
      calories: parseFloat(mealData.calories) || 0,
      protein: parseFloat(mealData.protein) || 0,
      carbs: parseFloat(mealData.carbs) || 0,
      fat: parseFloat(mealData.fat) || 0,
    };

    dispatch(addFavourite(favourite));
    alert('Saved to favourites!');
  };

  return (
    <div className="meal-analyzer">
      <h2 className="page-title">Analyze Meal</h2>
      <p className="page-subtitle">Scan a barcode, analyze a photo, or enter manually</p>

      {/* Quick Actions */}
      <div className="analyze-actions">
        <button
          className="scanner-btn btn-primary"
          onClick={handleBarcodeScanner}
          disabled={busy}
          aria-label="Scan food barcode"
        >
          {busy ? '⏳ Scanning…' : '📦 Scan Barcode'}
          {!isPremium() && <span className="premium-badge">⭐ Premium</span>}
        </button>

        <button
          className="scanner-btn btn-secondary"
          onClick={handlePhotoAnalyze}
          disabled={busy}
          aria-label="Analyze meal photo"
        >
          {busy ? '⏳ Opening…' : '📸 Analyze Photo'}
        </button>
      </div>

      <p className="scanner-subtitle">
        {hasFeature(FEATURES.BARCODE_SCANNER)
          ? 'Scan product barcodes for instant nutrition info'
          : 'Upgrade to Premium to unlock barcode scanning'}
      </p>

      {/* Manual Entry */}
      <form onSubmit={handleSubmit} className="meal-form card">
        <h3 className="form-title">Enter Meal Details</h3>

        <div className="form-group">
          <label htmlFor="name">Meal Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={mealData.name}
            onChange={handleInputChange}
            placeholder="e.g., Chicken Salad"
            required
          />
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="calories">Calories *</label>
            <input
              type="number"
              id="calories"
              name="calories"
              value={mealData.calories}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="protein">Protein (g)</label>
            <input
              type="number"
              id="protein"
              name="protein"
              value={mealData.protein}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              step="0.1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="carbs">Carbs (g)</label>
            <input
              type="number"
              id="carbs"
              name="carbs"
              value={mealData.carbs}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              step="0.1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fat">Fat (g)</label>
            <input
              type="number"
              id="fat"
              name="fat"
              value={mealData.fat}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              step="0.1"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={handleSaveAsFavourite}>
            ❤️ Save as Favourite
          </button>
          <button type="submit" className="btn-primary">
            ✅ Log Meal
          </button>
        </div>
      </form>

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="modal-overlay" onClick={() => setShowPremiumModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">⭐ Premium Feature</h3>
            <p className="modal-text">Barcode scanning is a premium feature. Upgrade to Premium to unlock:</p>
            <ul className="modal-list">
              <li>📱 Barcode scanner for instant nutrition info</li>
              <li>❤️ Unlimited favourite meals</li>
              <li>📊 6 months of history retention</li>
              <li>📈 Advanced analytics</li>
            </ul>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowPremiumModal(false)}>
                Close
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  setShowPremiumModal(false);
                  navigate('/account');
                }}
              >
                View Plans
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealAnalyzer;
