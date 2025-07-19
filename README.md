# OSINT Puzzle Game

This repository contains three interactive browser-based games designed to teach and practice Open-Source Intelligence (OSINT) skills:

## 1. osint-guardian_-the-digital-ghost
A modern, scenario-based OSINT investigation game with a sleek React interface. Players take on the role of a digital investigator, solving a series of realistic cases using:
- **Reverse Image Search, EXIF, and Map Triangulation tools**
- **Multiple images and evidence per level**
- **Hints system and time-based scoring**
- **Progressive difficulty and narrative scenarios**
- **Modern UI with Tailwind CSS and React**

To play locally:
1. Navigate to `osint-guardian_-the-digital-ghost/`
2. Install dependencies: `npm install`
3. Set your `GEMINI_API_KEY` in `.env.local` (if required)
4. Run: `npm run dev`

---

## 2. osint-puzzle-game
A scenario-driven investigation game where players solve a series of OSINT challenges. Each level focuses on a different real-world technique, such as:
- **Image Analysis:** Reverse image search, metadata extraction
- **Social Media Intelligence:** Username tracking, profile analysis
- **Domain Investigation:** WHOIS lookups, infrastructure analysis
- **Geolocation:** Identifying locations from visual clues

**Features:**
- Multiple levels of increasing difficulty (Beginner to Advanced)
- Interactive questions and hints
- Achievement and scoring system
- Built-in OSINT tools (reverse search, EXIF reader, WHOIS, etc.)
- Emphasis on ethical guidelines and responsible investigation

To play, open `osint-puzzle-game/index.html` in your browser.

---

## 3. osint-story-game-v2
A narrative-driven OSINT story game where you follow a branching investigation, uncovering clues through:
- **Photo and Metadata Analysis:** EXIF, camera model, GPS, and more
- **Domain and WHOIS Research:** Uncovering hidden connections
- **Story Progression:** Each level builds on the last, with a persistent investigation narrative
- **Notebook and Hints:** Take notes and use hints to solve puzzles
- **Dark/Light Mode Toggle**

To play, open `osint-story-game-v2/index.html` in your browser.

---

## Getting Started
No installation required for the HTML games. Simply clone the repository and open the desired HTML file in your web browser. For the React app, follow the instructions above.

```
git clone https://github.com/<your-username>/osint-puzzle-game.git
```

---

## License
This project is for educational purposes. See individual files for more details.
