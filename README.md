# ☁️ A Little Surprise — Interactive Birthday Website (Sky Blue + White) 💙

A clean, Pinterest-inspired interactive birthday surprise storytelling website with **3D card tilt animations**, **live Name & DOB personalization**, **couple memory photos**, **interactive 3D photo stack**, and **star & heart emoji fountain sprays** on every button click!

Built with pure HTML5, CSS3, and Vanilla JavaScript with zero external frameworks or backend dependencies.

---

## 🎨 Theme & Aesthetic

- **Primary Colors**: Sky Blue (`#87CEEB`), Soft Sky Blue (`#BFE8F7`), Ice Blue (`#EAF8FC`), and Warm White (`#FCFEFF`).
- **Text**: Dark Navy / Charcoal (`#243447`) with Slate Blue (`#64748B`).
- **Style**: Cute, elegant, minimalist, romantic, and mobile-first.
- **Story Flow**:
  1. **Screen 0: Personalization Gate** — Prominent featured hero photo of the couple in a 3D polaroid frame, plus live Name & Date of Birth input fields that automatically update the entire website!
  2. **Screen 1: Welcome** — "A Little Surprise" with floating sky-blue sparkles and an enlarged romantic memory photo badge.
  3. **Screen 2: Balloons** — Floating pastel sky-blue and pearl-white balloons alongside an enlarged couple outdoor photo frame.
  4. **Screen 3: Birthday Cake** — Cute tiered cake with glowing candle and an enlarged photo of her radiant smile. Clicking "Make a Wish" triggers candle flame aura and sparkle bursts.
  5. **Screen 4: Flowers** — Delicate white flowers, baby's breath, and soft sky-blue blossoms with an enlarged joyful photo.
  6. **Screen 5: Envelope** — 3D interactive envelope with an enlarged photo peeking out. Clicking unseals the flap and slides out the letter.
  7. **Screen 6: Personal Letter** — Heartfelt stationery card with postage stamp showing the entered DOB, personalized headings (`Happy Birthday, [NAME] 💙`), and staggered paragraph reveals.
  8. **Screen 7: Our Memories 📸** — Interactive 3D Polaroid Photo Stack featuring 6 memories with romantic captions and navigation controls.
  9. **Screen 8: Final Celebration** — Celebratory sky-blue and white confetti, floating balloons, personalized heading, and a glowing button leading to the grand finale.
  10. **Screen 9: To My Best Friend (Climax)** — Dedicated emotional tribute card featuring the couple photo, heartfelt messages in Tamil & English (*"Nee enaku kedaicha romba periya gift... en best friend! 💙"*), Replay button, and native Web Share.

---

## 📂 Project Structure

```text
Sweetha Birthday Project/
├── index.html        # Clean semantic HTML5 multi-screen structure (Screens 0 to 9)
├── style.css         # Sky Blue & White theme, 3D tilt, enlarged photos & responsive styling
├── script.js         # Interactive storytelling engine, confetti, 3D stack & audio
├── assets/           # Original vector SVG illustrations & audio
│   ├── balloons.svg  # Bouquet of sky-blue and pearl balloons
│   ├── cake.svg      # Birthday cake illustration with glowing candle
│   ├── flowers.svg   # White flowers, baby's breath & blue blossoms
│   ├── envelope.svg  # Elegant envelope illustration
│   ├── character.svg # Cute cloud character
│   ├── final.svg     # Celebration gift box illustration
│   ├── sparkle.svg   # Soft magical sparkle
│   ├── music.webm    # Background song downloaded from YouTube
│   └── photos/       # Couple memory photos
│       ├── best_friend.jpg # Featured couple photo (Entry & End Card)
│       ├── photo_1.jpg     # Couple outdoor photo
│       ├── photo_2.jpg     # Heart filter selfie
│       ├── photo_3.jpg     # Outdoor playful photo with red dupatta
│       ├── photo_4.jpg     # Dining table candid photo
│       └── photo_5.jpg     # Puppy filter playful selfie
└── README.md         # Documentation and deployment guides
```

---

## 1. How to Run the Website Locally

You can preview the website immediately without needing complex build steps:

### Method A: Directly in Browser
- Double-click `index.html` or drag-and-drop it into Chrome, Edge, Safari, or Firefox.

### Method B: Using VS Code Live Server (Recommended)
1. Install the **Live Server** extension in VS Code.
2. Right-click on `index.html` in the file explorer.
3. Select **"Open with Live Server"**.
4. Your browser will automatically open `http://127.0.0.1:5500`.

### Method C: Using Python
Open your terminal in this folder and run:
```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## 2. How the Name & Date of Birth Personalization Works

When you first open the website:
1. **Screen 0** appears with input fields for **Birthday Star's Name** and **Date of Birth**.
2. Type any name (e.g. *Sweetha*) and date (e.g. *September 20*).
3. Tap **"Unlock the Magic 💙 →"**.
4. That name and date will dynamically propagate across **every card in the experience**:
   - Welcome screen (`For someone very special, Sweetha...`)
   - Balloons screen (`It's your special day, Sweetha ✨`)
   - Birthday letter greeting (`Dear Sweetha,`) and title (`Happy Birthday, Sweetha 💙`)
   - Letter date stamp
   - Memories card (`Memories with Sweetha 📸`)
   - Final celebration heading (`HAPPY BIRTHDAY Sweetha 🎉`)
   - Share message text
5. Your entered name & date are also saved in `localStorage` so they stay remembered when the page is refreshed!

---

## 3. How to Edit the Birthday Letter

In `script.js`, edit the `letterParagraphs` array inside `BIRTHDAY_CONFIG`:

```javascript
letterParagraphs: [
  "Today is your special day, and I wanted to create something quiet, sincere and sweet just to remind you how deeply celebrated and appreciated you are.",
  "Your presence brings a calm, gentle brightness to everyone around you — just like a clear, cloudless morning sky. Your kindness, your laugh, and the warmth you carry make every ordinary day feel a little more meaningful.",
  "May this new chapter of your life be filled with dreams that gently take flight, peaceful moments of happiness, good health, and countless memories that make you smile from within.",
  "Never forget how truly wonderful and rare you are. May the year ahead be as bright and beautiful as your heart. Happy Birthday! 💙"
],
letterClosing: "With love & warmest wishes,",
letterSignature: "Always ✨"
```

---

## 4. How the 3D Memory Photo Stack Works

On **Screen 7 (Our Memories 📸)**:
- Displays all 5 photos inside authentic Polaroid frames with cute pushpins 📌 and sweet captions.
- Moving your mouse or touching the stack tilts the active photo in 3D space with a soft light glare reflection.
- Tapping the photo stack or clicking **‹** / **›** cycles through the memories with 3D flip animation!
- To replace or add photos, simply place your `.jpg` or `.png` files in `assets/photos/` and update the paths in `index.html`.

---

## 5. Background Music (YouTube Song)

The song from the provided YouTube link (`https://youtube.com/shorts/GMB3ZNc_ND8`) is downloaded to `assets/music.webm`.
- When the user taps **"Unlock the Magic 💙 →"** on Screen 0, music begins playing automatically (meeting browser autoplay policies).
- The floating music button (`🎵`) in the top-right corner allows pausing and resuming with animated audio equalizer waves.

---

## 6. How to Deploy to GitHub Pages (Free)

1. Create a new repository on [GitHub](https://github.com) (e.g., `sweetha-birthday`).
2. Initialize and push your files:
   ```bash
   git init
   git add .
   git commit -m "Complete interactive 3D birthday surprise website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/sweetha-birthday.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select branch **main** and folder **/(root)**, then click **Save**.
4. In 1–2 minutes, your site will be live at:
   `https://YOUR_USERNAME.github.io/sweetha-birthday/`

---

## 7. How to Deploy to Netlify (Free)

### Option A: Drag & Drop (Fastest, No Git Needed)
1. Go to [app.netlify.com](https://app.netlify.com) and log in.
2. Go to **Sites** and drag your entire `Sweetha Birthday Project` folder into the upload box.
3. Your site is deployed in seconds with a custom link (e.g., `https://sweetha-birthday.netlify.app`).

### Option B: Via Git
1. Connect your GitHub repository to Netlify.
2. Set Build Command: *(leave empty)*.
3. Set Publish Directory: *(leave empty or `.`)*.
4. Click **Deploy Site**.

---

## 8. How to Deploy to Vercel (Free)

1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **Add New...** > **Project**.
3. Import your GitHub repository.
4. Framework Preset: **Other**.
5. Click **Deploy**.
6. Your birthday site will be live on a fast global CDN!

---

## 9. How to Test on Android

1. Open Chrome on your Android phone.
2. If running locally with `python -m http.server 8000`, connect your phone to the same Wi-Fi and open `http://<YOUR_PC_IP>:8000`.
3. Check:
   - Touch cards tilt in 3D smoothly.
   - Tapping any button triggers the **star and heart emoji fountain spray**!
   - Tapping **"Share 🎁"** opens the native Android share drawer (WhatsApp, Instagram, Messages).

---

## 10. How to Test on iPhone

1. Open Safari on iPhone.
2. Check:
   - Fluid viewport sizing (`100dvh`) fits within Safari toolbars.
   - 3D transitions and photo stack flip smoothly.
   - Background song plays cleanly.
   - Tapping **"Share 🎁"** brings up the iOS AirDrop / Messages share sheet!
