// OSINT Story Puzzle - Main Application Logic

// Game data from provided JSON
const Levels = [
  {
    id: 1,
    title: "A New Lead",
    narrative: "You receive an anonymous message containing a street photo. Your mentor Victoria Kane believes deciphering the location will uncover the first breadcrumb in a much larger data-theft conspiracy.",
    image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900",
    questions: [
      {q: "Identify the city where this photo was taken.", a: "Berlin", hints: ["Observe the distinctive tower in the skyline.", "Consider famous European TV towers."]}
    ],
    exif: {Model: "Nikon D750", CreateDate: "2022:03:15 10:22:05", GPSLatitude: "52.5200 N", GPSLongitude: "13.4050 E", Software: "Adobe Lightroom"},
    whois: {}
  },
  {
    id: 2,
    title: "Metadata Matters",
    narrative: "A reply arrives with a vacation photo supposedly proving the informant's identity. Dig into its metadata to test authenticity.",
    image_url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900",
    questions: [
      {q: "What camera model captured this image?", a: "Canon EOS 6D", hints: ["Check the EXIF data.", "Look for the 'Model' tag."]},
      {q: "Which timezone was the camera set to?", a: "UTC+1", hints: ["EXIF 'OffsetTime' tag.", "Central European Time zone."]}
    ],
    exif: {Model: "Canon EOS 6D", CreateDate: "2023:01:04 18:02:21", OffsetTime: "+01:00", GPSLatitude: "41.3949 N", GPSLongitude: "2.0787 E", Software: "Canon DPP"},
    whois: {}
  },
  {
    id: 3,
    title: "Domain of Suspicion",
    narrative: "Tracing the breadcrumbs, you discover a shady domain. Can you glean clues from registration records?",
    image_url: "https://images.unsplash.com/flagged/photo-1573164574398-123f4d968041?w=900",
    questions: [
      {q: "What city is the registrant organisation located in?", a: "Tirana", hints: ["WHOIS data reveals 'Registrant City'.", "Capital of Albania."]}
    ],
    exif: {},
    whois: {Domain: "datavault-secure.com", Registrar: "HostFast", CreationDate: "2024-05-18", RegistrantOrg: "GreyAero Holdings", RegistrantCity: "Tirana", RegistrantCountry: "AL"}
  }
];

// Game state - lives only in memory during session
window.gameState = {
  currentLevel: 1,
  completedLevels: [],
  bestScores: {},
  totalScore: 0,
  startTime: null,
  levelStartTime: null,
  hintsUsed: 0
};

// Map triangulation state
let pinCount = 0;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', init);

/**
 * Initialize the application
 */
function init() {
  setupThemeToggle();
  setupTabListeners();
  setupMapListener();
  showScreen('start-screen');
}

/**
 * Dark/light mode toggle setup
 */
function setupThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  document.documentElement.setAttribute('data-color-scheme', isDark ? 'dark' : 'light');
  toggle.textContent = isDark ? '☀️' : '🌙';
  
  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-color-scheme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-color-scheme', newTheme);
    toggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });
}

/**
 * Setup tab navigation listeners
 */
function setupTabListeners() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => switchTab(e.target.dataset.tab));
  });
}

/**
 * Setup map click listener
 */
function setupMapListener() {
  document.addEventListener('click', function(e) {
    if (e.target.id === 'map-placeholder' && pinCount < 3) {
      pinCount++;
      document.getElementById('pin-count').textContent = pinCount;
      
      if (pinCount === 3) {
        const level = Levels.find(l => l.id === window.gameState.currentLevel);
        const results = document.getElementById('map-results');
        
        // Provide coordinates based on level
        let coords = '52.5200, 13.4050'; // Berlin default
        if (level.id === 2) coords = '41.3949, 2.0787';
        if (level.id === 3) coords = '41.3275, 19.8187'; // Tirana
        
        results.innerHTML = `<div class="result"><strong>Triangulated Coordinates:</strong> ${coords}</div>`;
        document.getElementById('map-placeholder').textContent = 'Triangulation complete!';
      }
    }
  });
}

/**
 * Show specified screen, hide others
 */
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

// ===== GLOBAL FUNCTIONS FOR NAVIGATION =====

/**
 * Start a new game from level 1
 */
window.startNewGame = function() {
  window.gameState.currentLevel = 1;
  window.gameState.startTime = Date.now();
  window.gameState.completedLevels = [];
  window.gameState.bestScores = {};
  window.gameState.totalScore = 0;
  loadLevel(1);
};

/**
 * Show level selection screen
 */
window.showLevelSelect = function() {
  showScreen('level-screen');
  renderLevelList();
};

/**
 * Restart game
 */
window.restartGame = function() {
  window.gameState = {
    currentLevel: 1,
    completedLevels: [],
    bestScores: {},
    totalScore: 0,
    startTime: null,
    levelStartTime: null,
    hintsUsed: 0
  };
  window.startNewGame();
};

/**
 * Render the level selection list
 */
function renderLevelList() {
  const container = document.getElementById('level-list');
  container.innerHTML = '';
  
  Levels.forEach(level => {
    const isCompleted = window.gameState.completedLevels.includes(level.id);
    const isLocked = level.id > 1 && !window.gameState.completedLevels.includes(level.id - 1);
    
    const card = document.createElement('div');
    card.className = `level-card${isLocked ? ' locked' : ''}`;
    
    if (!isLocked) {
      card.addEventListener('click', () => loadLevel(level.id));
    }
    
    const bestScore = window.gameState.bestScores[level.id] || 0;
    
    card.innerHTML = `
      <h3>${level.title}</h3>
      <div class="badge">Level ${level.id}</div>
      ${isCompleted ? '<div class="badge" style="background:var(--color-success);color:var(--color-btn-primary-text)">✓ Complete</div>' : ''}
      ${bestScore > 0 ? `<div class="badge">Best: ${bestScore}</div>` : ''}
      ${isLocked ? '<div class="badge">🔒 Locked</div>' : ''}
    `;
    
    container.appendChild(card);
  });
}

/**
 * Load and start a specific level
 */
function loadLevel(levelId) {
  const level = Levels.find(l => l.id === levelId);
  if (!level) return;
  
  window.gameState.currentLevel = levelId;
  window.gameState.levelStartTime = Date.now();
  window.gameState.hintsUsed = 0;
  pinCount = 0; // Reset map pins
  
  showScreen('game-screen');
  
  // Populate level content
  document.getElementById('game-title').textContent = level.title;
  document.getElementById('game-narrative').textContent = level.narrative;
  
  const img = document.getElementById('game-image');
  if (level.image_url) {
    img.src = level.image_url;
    img.style.display = 'block';
  } else {
    img.style.display = 'none';
  }
  
  // Clear notebook
  document.getElementById('notebook').value = '';
  
  // Setup tabs
  switchTab('tools');
  setupToolsTab(level);
  setupHintsTab(level);
  setupSubmitTab(level);
}

/**
 * Switch between tabs in the game panel
 */
function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
  
  // Show/hide tab content
  document.querySelectorAll('.tab').forEach(tab => tab.classList.add('hidden'));
  document.getElementById(`tab-${tabName}`).classList.remove('hidden');
}

/**
 * Setup the Tools tab with OSINT simulators
 */
function setupToolsTab(level) {
  const container = document.getElementById('tab-tools');
  container.innerHTML = `
    <!-- Reverse Image Search -->
    <div class="tool-box">
      <div class="tool-header" onclick="window.toggleTool('reverse')">
        <span>🔍 Reverse Image Search</span>
        <span>▼</span>
      </div>
      <div class="tool-content hidden" id="tool-reverse">
        <button class="btn btn--sm search-btn" onclick="window.simulateReverseSearch()">Search Current Image</button>
        <div id="reverse-results"></div>
      </div>
    </div>

    <!-- EXIF Viewer -->
    <div class="tool-box">
      <div class="tool-header" onclick="window.toggleTool('exif')">
        <span>📷 EXIF Viewer</span>
        <span>▼</span>
      </div>
      <div class="tool-content hidden" id="tool-exif">
        <button class="btn btn--sm search-btn" onclick="window.showExifData()">Extract Metadata</button>
        <div id="exif-results"></div>
      </div>
    </div>

    <!-- WHOIS Lookup -->
    <div class="tool-box">
      <div class="tool-header" onclick="window.toggleTool('whois')">
        <span>🌐 WHOIS Lookup</span>
        <span>▼</span>
      </div>
      <div class="tool-content hidden" id="tool-whois">
        <input type="text" class="form-control" id="whois-input" placeholder="Enter domain...">
        <button class="btn btn--sm search-btn" onclick="window.simulateWhoisLookup()">Lookup Domain</button>
        <div id="whois-results"></div>
      </div>
    </div>

    <!-- Map Triangulation -->
    <div class="tool-box">
      <div class="tool-header" onclick="window.toggleTool('map')">
        <span>🗺️ Map Triangulation</span>
        <span>▼</span>
      </div>
      <div class="tool-content hidden" id="tool-map">
        <div style="border:1px solid var(--color-border);height:120px;background:var(--color-bg-3);border-radius:var(--radius-base);display:flex;align-items:center;justify-content:center;margin:var(--space-8) 0;cursor:pointer;" id="map-placeholder">Click 3 points to triangulate (Pins: <span id="pin-count">0</span>/3)</div>
        <div id="map-results"></div>
      </div>
    </div>
  `;
}

/**
 * Setup the Hints tab
 */
function setupHintsTab(level) {
  const container = document.getElementById('tab-hints');
  const allHints = level.questions.flatMap(q => q.hints || []);
  
  let hintsHtml = '<h4>Investigation Hints</h4>';
  if (allHints.length === 0) {
    hintsHtml += '<p>No hints available for this level.</p>';
  } else {
    hintsHtml += allHints.map((hint, i) => `
      <div style="margin-bottom:var(--space-12);">
        <button class="btn btn--sm btn--outline" onclick="window.revealHint(${i})" id="hint-btn-${i}">
          💡 Reveal Hint ${i + 1} (-10 points)
        </button>
        <div id="hint-text-${i}" class="hidden" style="margin-top:var(--space-8);padding:var(--space-8);background:var(--color-bg-2);border-radius:var(--radius-base);">
          ${hint}
        </div>
      </div>
    `).join('');
  }
  
  container.innerHTML = hintsHtml;
}

/**
 * Setup the Submit tab with questions
 */
function setupSubmitTab(level) {
  const container = document.getElementById('tab-submit');
  
  let questionsHtml = '<h4>Investigation Questions</h4>';
  level.questions.forEach((q, i) => {
    questionsHtml += `
      <div class="question">
        <label for="answer-${i}">${q.q}</label>
        <input type="text" class="form-control" id="answer-${i}" placeholder="Enter your answer..." autocomplete="off">
      </div>
    `;
  });
  
  questionsHtml += '<button class="btn btn--primary btn--full-width" onclick="window.submitAnswers()">Submit Investigation</button>';
  questionsHtml += '<div id="submit-results"></div>';
  
  container.innerHTML = questionsHtml;
}

// ===== GLOBAL TOOL FUNCTIONS =====

/**
 * Toggle tool visibility
 */
window.toggleTool = function(toolId) {
  const content = document.getElementById(`tool-${toolId}`);
  content.classList.toggle('hidden');
  
  // Update arrow direction
  const header = content.previousElementSibling;
  const arrow = header.querySelector('span:last-child');
  arrow.textContent = content.classList.contains('hidden') ? '▼' : '▲';
};

/**
 * Simulate reverse image search
 */
window.simulateReverseSearch = function() {
  const level = Levels.find(l => l.id === window.gameState.currentLevel);
  const results = document.getElementById('reverse-results');
  
  results.innerHTML = '<div class="result">Searching...</div>';
  
  setTimeout(() => {
    if (level.id === 1) {
      results.innerHTML = `
        <div class="result">
          <strong>Similar Image Found</strong><br>
          Berlin TV Tower (Fernsehturm Berlin) - iconic landmark in Berlin, Germany
        </div>
        <div class="result">
          <strong>Location Match</strong><br>
          Alexanderplatz area, Berlin - distinctive tower visible in skyline
        </div>
      `;
    } else {
      results.innerHTML = '<div class="result">No significant matches found in reverse search databases.</div>';
    }
  }, 1500);
};

/**
 * Show EXIF metadata
 */
window.showExifData = function() {
  const level = Levels.find(l => l.id === window.gameState.currentLevel);
  const results = document.getElementById('exif-results');
  
  if (Object.keys(level.exif).length === 0) {
    results.innerHTML = '<div class="result">No EXIF metadata available.</div>';
  } else {
    let exifHtml = '';
    Object.entries(level.exif).forEach(([key, value]) => {
      exifHtml += `<div class="result"><strong>${key}:</strong> ${value}</div>`;
    });
    results.innerHTML = exifHtml;
  }
};

/**
 * Simulate WHOIS lookup
 */
window.simulateWhoisLookup = function() {
  const level = Levels.find(l => l.id === window.gameState.currentLevel);
  const input = document.getElementById('whois-input').value.trim();
  const results = document.getElementById('whois-results');
  
  if (!input) {
    results.innerHTML = '<div class="result">Please enter a domain name.</div>';
    return;
  }
  
  results.innerHTML = '<div class="result">Looking up domain...</div>';
  
  setTimeout(() => {
    if (Object.keys(level.whois).length === 0) {
      results.innerHTML = '<div class="result">No WHOIS data available for this domain.</div>';
    } else {
      let whoisHtml = '';
      Object.entries(level.whois).forEach(([key, value]) => {
        whoisHtml += `<div class="result"><strong>${key}:</strong> ${value}</div>`;
      });
      results.innerHTML = whoisHtml;
    }
  }, 1000);
};

/**
 * Reveal a hint (with score penalty)
 */
window.revealHint = function(hintIndex) {
  window.gameState.hintsUsed++;
  document.getElementById(`hint-text-${hintIndex}`).classList.remove('hidden');
  document.getElementById(`hint-btn-${hintIndex}`).disabled = true;
  document.getElementById(`hint-btn-${hintIndex}`).textContent = '💡 Hint Revealed';
  document.getElementById(`hint-btn-${hintIndex}`).classList.add('btn--secondary');
};

/**
 * Submit answers and calculate score
 */
window.submitAnswers = function() {
  const level = Levels.find(l => l.id === window.gameState.currentLevel);
  const results = document.getElementById('submit-results');
  
  let correct = 0;
  const answers = [];
  
  level.questions.forEach((q, i) => {
    const userAnswer = document.getElementById(`answer-${i}`).value.trim();
    const isCorrect = userAnswer.toLowerCase().includes(q.a.toLowerCase()) || 
                     q.a.toLowerCase().includes(userAnswer.toLowerCase());
    
    if (isCorrect) correct++;
    answers.push({question: q.q, userAnswer, correctAnswer: q.a, isCorrect});
  });
  
  // Calculate score: 100 per question - (minutes*2) - (hints*10), min 10
  const timeMinutes = (Date.now() - window.gameState.levelStartTime) / 60000;
  let score = (correct * 100) - Math.floor(timeMinutes * 2) - (window.gameState.hintsUsed * 10);
  score = Math.max(10, score);
  
  // Update game state
  if (!window.gameState.completedLevels.includes(level.id)) {
    window.gameState.completedLevels.push(level.id);
  }
  window.gameState.bestScores[level.id] = Math.max(window.gameState.bestScores[level.id] || 0, score);
  window.gameState.totalScore += score;
  
  // Show results
  let resultsHtml = '<div class="summary">';
  resultsHtml += `<h4>Level Complete!</h4>`;
  resultsHtml += `<p><strong>Score: ${score}</strong> (${correct}/${level.questions.length} correct)</p>`;
  
  answers.forEach(a => {
    const icon = a.isCorrect ? '✅' : '❌';
    resultsHtml += `<div style="text-align:left;margin:var(--space-8) 0;"><strong>${icon} ${a.question}</strong><br>Your answer: ${a.userAnswer}<br>Correct: ${a.correctAnswer}</div>`;
  });
  
  // Next level or end
  if (level.id < Levels.length) {
    resultsHtml += `<button class="btn btn--primary" onclick="loadLevel(${level.id + 1})">Next Level</button>`;
  } else {
    resultsHtml += `<button class="btn btn--primary" onclick="window.showEndScreen()">View Final Results</button>`;
  }
  
  resultsHtml += `<button class="btn btn--secondary" onclick="window.showLevelSelect()">Level Select</button>`;
  resultsHtml += '</div>';
  
  results.innerHTML = resultsHtml;
};

/**
 * Show end screen with final rank
 */
window.showEndScreen = function() {
  showScreen('end-screen');
  
  // Calculate rank based on total score
  let rank = 'Junior Analyst';
  if (window.gameState.totalScore >= 250) rank = 'Senior Analyst';
  if (window.gameState.totalScore >= 280) rank = 'OSINT Maestro';
  
  document.getElementById('final-rank').textContent = `Total Score: ${window.gameState.totalScore} - Rank: ${rank}`;
};