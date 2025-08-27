# Advanced Pong Game

A modern, feature-rich Pong game built with pure **HTML**, **CSS**, and **JavaScript**. The left paddle is controlled by the player (mouse or keyboard), and the right paddle is controlled by a challenging AI. Includes collision detection, scorekeeping, speed/difficulty scaling, and responsive design.

## 🎮 Features

- **Mouse & Keyboard Controls** (W/S or ↑/↓ for player paddle)
- **Responsive Canvas** (adapts to window size)
- **Dynamic Ball Speed** (increases after each hit)
- **AI Difficulty Scaling** (AI paddle shrinks after each score)
- **Scoreboard** and **Win Detection**
- **Smooth Animations & Game Loop**
- **Deploy-ready** (static hosting, Vercel, Netlify, GitHub Pages)
- **No external dependencies**

## 🗂️ Project Structure

```
pong-advanced/
├── index.html       # Main HTML file
├── style.css        # Styling
├── script.js        # Game logic
├── README.md        # Documentation (this file)
└── deploy.sh        # Optional: quick deploy script (Vercel)
```

## 🚀 How To Run Locally

1. **Clone or Download** this repository.
2. Open `index.html` in your web browser.

## 🕹️ Controls

- **Mouse**: Move paddle by hovering over the game.
- **Keyboard**: Use `W/S` or `↑/↓` keys to move the left paddle.

## 🏓 Gameplay

- First to **10 points** wins.
- Ball gets faster after each paddle hit.
- AI paddle shrinks after scoring, making it harder for the AI.
- The game automatically resets after a winner is declared.

## 🌐 Deployment

### GitHub Pages

1. Push all files to a public GitHub repository.
2. Go to **Settings > Pages**.
3. Set **Source** to your main branch (e.g., `main`) and `/ (root)` folder.
4. Save and access your game at `https://<username>.github.io/<repo>/`.

## 📁 File Details

- `index.html`: Sets up the canvas and scoreboard.
- `style.css`: Handles layout, colors, and positioning.
- `script.js`: Contains all game logic, controls, AI, animation, and collision detection.
- `deploy.sh`: Shell script for Vercel deployment (optional).

## 💡 Customization

- Change `MAX_SCORE` in `script.js` to adjust winning score.
- Tweak paddle/ball sizes or speeds for different gameplay experience.


## 🙌 Enjoy playing!
