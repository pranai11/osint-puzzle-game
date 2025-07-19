// OSINT Investigation Game - JavaScript

// Game data
const gameData = {
  levels: [
    {
      id: 1,
      title: "Landmark Investigation",
      difficulty: "Beginner",
      description: "Learn basic image reverse search techniques",
      image: "/api/placeholder/600/400",
      scenario: "You've found this image posted anonymously online claiming to show a 'secret government facility.' Your task is to identify what this building actually is and where it's located.",
      questions: [
        {
          id: "q1",
          text: "Where was this photo taken?",
          type: "text",
          answer: "Paris, France",
          hints: [
            "Look for architectural clues in the image",
            "The architectural style appears European",
            "This appears to be a famous landmark"
          ]
        },
        {
          id: "q2", 
          text: "What is the name of this building?",
          type: "text",
          answer: "Eiffel Tower",
          hints: [
            "This is one of the world's most famous landmarks",
            "It's an iron lattice tower",
            "Located in Paris"
          ]
        }
      ],
      tools: ["reverse-search", "maps"],
      techniques: ["Reverse image search", "Landmark identification", "Visual analysis"]
    },
    {
      id: 2,
      title: "Username Investigation", 
      difficulty: "Beginner",
      description: "Track a username across social media platforms",
      scenario: "An online investigation requires you to find more information about the user 'TechNinja2024'. Use OSINT techniques to discover more about this person.",
      questions: [
        {
          id: "q1",
          text: "What social media platform does this user primarily use?",
          type: "multiple",
          options: ["Twitter", "Instagram", "LinkedIn", "TikTok"],
          answer: "Twitter",
          hints: [
            "Check username availability across platforms",
            "Look for profile activity patterns", 
            "Consider the username style"
          ]
        },
        {
          id: "q2",
          text: "Based on posting patterns, what timezone is this user likely in?",
          type: "multiple", 
          options: ["EST (UTC-5)", "PST (UTC-8)", "GMT (UTC+0)", "JST (UTC+9)"],
          answer: "PST (UTC-8)",
          hints: [
            "Analyze posting times",
            "Look for location clues in posts",
            "Consider when they're most active"
          ]
        }
      ],
      tools: ["social-search", "timezone-analyzer"],
      techniques: ["Username enumeration", "Social media analysis", "Timezone analysis"]
    },
    {
      id: 3,
      title: "EXIF Data Analysis",
      difficulty: "Intermediate", 
      description: "Extract and analyze image metadata",
      image: "/api/placeholder/600/400",
      scenario: "You've received an image that may contain important metadata. Extract and analyze the EXIF data to answer the investigation questions.",
      questions: [
        {
          id: "q1",
          text: "When was this photo taken?",
          type: "text",
          answer: "2024-03-15 14:30:22",
          hints: [
            "Check the EXIF data for timestamp",
            "Look for DateTimeOriginal field",
            "Time is usually in YYYY-MM-DD HH:MM:SS format"
          ]
        },
        {
          id: "q2",
          text: "What camera model was used?",
          type: "text", 
          answer: "iPhone 15 Pro",
          hints: [
            "Look in the camera information section",
            "Check the Make and Model fields",
            "Mobile phones often include detailed model info"
          ]
        }
      ],
      tools: ["exif-reader", "metadata-analyzer"],
      techniques: ["EXIF data extraction", "Metadata analysis", "Digital forensics"]
    },
    {
      id: 4,
      title: "Domain Investigation",
      difficulty: "Intermediate",
      description: "Investigate website ownership and registration details", 
      scenario: "A suspicious website 'secretinfo-leaked.com' has been spreading misinformation. Investigate the domain to uncover who might be behind it.",
      questions: [
        {
          id: "q1",
          text: "When was this domain registered?",
          type: "text",
          answer: "2024-01-15",
          hints: [
            "Use WHOIS lookup tools",
            "Look for creation date information",
            "Domain age can indicate legitimacy"
          ]
        },
        {
          id: "q2",
          text: "What country is the registrant likely from?",
          type: "multiple",
          options: ["United States", "Russia", "China", "Privacy Protected"],
          answer: "Privacy Protected", 
          hints: [
            "Check registrant information in WHOIS",
            "Look for country codes or addresses",
            "Many suspicious domains use privacy protection"
          ]
        }
      ],
      tools: ["whois-lookup", "domain-analyzer"],
      techniques: ["Domain analysis", "WHOIS investigation", "Infrastructure analysis"]
    },
    {
      id: 5,
      title: "Advanced Geolocation",
      difficulty: "Advanced",
      description: "Determine location using visual clues and analysis",
      image: "/api/placeholder/600/400",
      scenario: "This image was found on a forum with no location information. Use advanced geolocation techniques to determine where it was taken.",
      questions: [
        {
          id: "q1", 
          text: "What country was this photo taken in?",
          type: "text",
          answer: "Japan",
          hints: [
            "Look for text/signage in the image",
            "Analyze architectural styles",
            "Check for cultural indicators"
          ]
        },
        {
          id: "q2",
          text: "What are the approximate coordinates?",
          type: "text",
          answer: "35.6762, 139.6503",
          hints: [
            "Use landmarks to triangulate position", 
            "Cross-reference with mapping tools",
            "Tokyo coordinates are around 35.67°N, 139.65°E"
          ]
        }
      ],
      tools: ["maps", "landmark-db", "coordinate-finder"],
      techniques: ["Visual geolocation", "Landmark analysis", "Coordinate determination"]
    },
    {
      id: 6,
      title: "Multi-Source Investigation", 
      difficulty: "Advanced",
      description: "Combine multiple OSINT techniques for complex investigation",
      scenario: "A comprehensive investigation involving an anonymous social media account that posted threatening messages. Use all available OSINT techniques to build a profile.",
      questions: [
        {
          id: "q1",
          text: "What is the likely real name of the account holder?",
          type: "text", 
          answer: "John Smith",
          hints: [
            "Cross-reference usernames across platforms",
            "Look for name variations and aliases",
            "Check profile information for consistency"
          ]
        },
        {
          id: "q2",
          text: "In which city do they likely reside?",
          type: "text",
          answer: "Seattle, WA",
          hints: [
            "Analyze posting times for timezone clues",
            "Look for location tags in photos",
            "Check local references in posts"
          ]
        }
      ],
      tools: ["social-search", "reverse-search", "exif-reader", "whois-lookup", "maps"],
      techniques: ["Multi-source analysis", "Profile building", "Data correlation"]
    }
  ],
  achievements: [
    {id: "first-solve", name: "First Success", description: "Complete your first level"},
    {id: "speed-demon", name: "Speed Demon", description: "Complete a level in under 5 minutes"}, 
    {id: "perfect-score", name: "Perfect Score", description: "Get 100% on any level"},
    {id: "note-taker", name: "Diligent Investigator", description: "Use the notebook feature"},
    {id: "tool-master", name: "Tool Master", description: "Use all available tools in a level"},
    {id: "completionist", name: "OSINT Master", description: "Complete all levels"}
  ]
};

// Game state
let gameState = {
  currentLevel: 1,
  score: 0,
  totalScore: 0,
  completedLevels: [],
  earnedAchievements: [],
  startTime: null,
  levelStartTime: null,
  currentAnswers: {},
  hintsUsed: {},
  toolsUsed: [],
  notebookUsed: false
};

// OSINT Tools simulation data
const toolsData = {
  'reverse-search': {
    name: '🔍 Reverse Image Search',
    results: [
      {
        title: 'Eiffel Tower - Paris, France',
        description: 'The iconic iron lattice tower located on the Champ de Mars in Paris, France. Built in 1889.',
        url: 'wikipedia.org/wiki/Eiffel_Tower'
      },
      {
        title: 'Paris Travel Guide - Eiffel Tower',
        description: 'Complete guide to visiting the Eiffel Tower, including history and visitor information.',
        url: 'paris-guide.com/eiffel-tower'
      }
    ]
  },
  'social-search': {
    name: '👤 Social Media Search',
    results: [
      {
        platform: 'Twitter',
        username: 'TechNinja2024',
        status: 'Active profile found',
        lastActivity: '2 hours ago',
        posts: '847 tweets',
        timezone: 'PST (UTC-8)'
      },
      {
        platform: 'Instagram',
        username: 'TechNinja2024',
        status: 'Username not found',
        lastActivity: 'N/A'
      }
    ]
  },
  'exif-reader': {
    name: '📷 EXIF Data Reader',
    metadata: {
      'Camera Make': 'Apple',
      'Camera Model': 'iPhone 15 Pro',
      'Date/Time Original': '2024-03-15 14:30:22',
      'GPS Latitude': '37.7749° N',
      'GPS Longitude': '122.4194° W',
      'ISO Speed': '100',
      'Focal Length': '26mm',
      'Aperture': 'f/1.78'
    }
  },
  'whois-lookup': {
    name: '🌐 WHOIS Lookup',
    data: {
      'Domain': 'secretinfo-leaked.com',
      'Registrar': 'NameCheap Inc.',
      'Registration Date': '2024-01-15',
      'Expiration Date': '2025-01-15',
      'Registrant': 'Privacy Protected',
      'Country': 'Privacy Protected',
      'Name Servers': 'ns1.privatens.com, ns2.privatens.com'
    }
  },
  'maps': {
    name: '🗺️ Geographic Analysis',
    locations: [
      {
        name: 'Tokyo, Japan',
        coordinates: '35.6762, 139.6503',
        landmarks: ['Tokyo Tower', 'Imperial Palace', 'Shibuya Crossing'],
        timezone: 'JST (UTC+9)'
      }
    ]
  },
  'timezone-analyzer': {
    name: '🕒 Timezone Analyzer',
    results: [
      {
        timezone: 'PST (UTC-8)',
        likelihood: 'High',
        evidence: 'Most active 9 AM - 11 PM PST',
        posts: 'Regular activity during West Coast hours'
      }
    ]
  },
  'metadata-analyzer': {
    name: '📊 Metadata Analyzer',
    data: {
      'File Size': '2.4 MB',
      'Dimensions': '4032 x 3024',
      'Color Space': 'sRGB',
      'Compression': 'JPEG',
      'Software': 'iOS 17.4.1'
    }
  },
  'domain-analyzer': {
    name: '🔍 Domain Analyzer',
    analysis: {
      'Domain Age': '11 months',
      'SSL Certificate': 'Let\'s Encrypt',
      'Server Location': 'United States',
      'Risk Score': 'High',
      'Suspicious Indicators': 'Recent registration, privacy protection'
    }
  },
  'landmark-db': {
    name: '🏛️ Landmark Database',
    matches: [
      {
        name: 'Tokyo Station',
        confidence: '85%',
        coordinates: '35.6812, 139.7671',
        description: 'Major railway station in central Tokyo'
      }
    ]
  },
  'coordinate-finder': {
    name: '📍 Coordinate Finder',
    results: {
      'Estimated Location': 'Tokyo, Japan',
      'Latitude': '35.6762',
      'Longitude': '139.6503',
      'Accuracy': '±500m',
      'Method': 'Visual landmark analysis'
    }
  }
};

// Initialize game when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing game...');
  initializeGame();
});

function initializeGame() {
  console.log('Initializing game...');
  updateProgressStats();
  renderLevels();
  renderAchievements();
  
  // Show welcome screen initially
  showScreen('welcome-screen');
  console.log('Game initialized');
}

// Screen management
function showScreen(screenId) {
  console.log('Showing screen:', screenId);
  
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  // Show target screen
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
    console.log('Screen shown successfully:', screenId);
  } else {
    console.error('Screen not found:', screenId);
  }
}

// Make functions globally available
window.showLevelSelect = function() {
  console.log('showLevelSelect called');
  showScreen('level-select-screen');
  updateProgressStats();
  renderLevels();
  renderAchievements();
};

window.showGameScreen = function(levelId) {
  console.log('showGameScreen called with levelId:', levelId);
  const level = gameData.levels.find(l => l.id === levelId);
  if (!level) {
    console.error('Level not found:', levelId);
    return;
  }
  
  gameState.currentLevel = levelId;
  gameState.currentAnswers = {};
  gameState.hintsUsed = {};
  gameState.toolsUsed = [];
  gameState.levelStartTime = Date.now();
  gameState.notebookUsed = false;
  
  showScreen('game-screen');
  loadLevel(level);
  startTimer();
};

window.submitAnswers = function() {
  console.log('submitAnswers called');
  const level = gameData.levels.find(l => l.id === gameState.currentLevel);
  let correctAnswers = 0;
  let totalQuestions = level.questions.length;
  
  // Collect answers
  level.questions.forEach(question => {
    let userAnswer = '';
    
    if (question.type === 'text') {
      const input = document.getElementById(`answer-${question.id}`);
      userAnswer = input ? input.value.trim() : '';
    } else if (question.type === 'multiple') {
      const selected = document.querySelector(`input[name="question-${question.id}"]:checked`);
      userAnswer = selected ? selected.value : '';
    }
    
    gameState.currentAnswers[question.id] = userAnswer;
    
    // Check if answer is correct (case-insensitive for text)
    const isCorrect = question.type === 'text' 
      ? userAnswer.toLowerCase().includes(question.answer.toLowerCase()) || 
        question.answer.toLowerCase().includes(userAnswer.toLowerCase())
      : userAnswer === question.answer;
    
    if (isCorrect) {
      correctAnswers++;
    }
  });
  
  // Calculate score
  let levelScore = 0;
  const baseScore = 100;
  const accuracy = correctAnswers / totalQuestions;
  levelScore = Math.round(baseScore * accuracy);
  
  // Time bonus (bonus for completing under 10 minutes)
  const timeElapsed = (Date.now() - gameState.levelStartTime) / 1000 / 60; // minutes
  if (timeElapsed < 10) {
    const timeBonus = Math.round((10 - timeElapsed) * 5);
    levelScore += timeBonus;
  }
  
  // Subtract hint penalties
  Object.values(gameState.hintsUsed).forEach(hints => {
    levelScore -= hints.length * 10;
  });
  
  levelScore = Math.max(0, levelScore);
  gameState.score = levelScore;
  gameState.totalScore += levelScore;
  
  // Mark level as completed
  if (!gameState.completedLevels.includes(gameState.currentLevel)) {
    gameState.completedLevels.push(gameState.currentLevel);
  }
  
  // Check achievements
  checkAchievements(levelScore, accuracy, timeElapsed);
  
  // Show results
  showResults(level, correctAnswers, totalQuestions, levelScore);
};

window.openTool = function(toolId) {
  console.log('openTool called with toolId:', toolId);
  const tool = toolsData[toolId];
  if (!tool) {
    console.error('Tool not found:', toolId);
    return;
  }
  
  // Track tool usage
  if (!gameState.toolsUsed.includes(toolId)) {
    gameState.toolsUsed.push(toolId);
  }
  
  // Mark tool as active
  document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // Show tool modal
  const modal = document.getElementById('tool-modal');
  const title = document.getElementById('tool-modal-title');
  const body = document.getElementById('tool-modal-body');
  
  title.textContent = tool.name;
  body.innerHTML = renderToolInterface(toolId, tool);
  
  modal.classList.add('active');
};

window.closeToolModal = function() {
  console.log('closeToolModal called');
  document.getElementById('tool-modal').classList.remove('active');
};

window.showHint = function(questionId, hintIndex) {
  console.log('showHint called', questionId, hintIndex);
  const level = gameData.levels.find(l => l.id === gameState.currentLevel);
  const question = level.questions.find(q => q.id === questionId);
  
  if (!question || !question.hints || hintIndex >= question.hints.length) return;
  
  const modal = document.getElementById('hint-modal');
  const hintText = document.getElementById('hint-text');
  
  hintText.textContent = question.hints[hintIndex];
  modal.classList.add('active');
  
  // Store hint info for acceptance
  modal.dataset.questionId = questionId;
  modal.dataset.hintIndex = hintIndex;
};

window.acceptHint = function() {
  const modal = document.getElementById('hint-modal');
  const questionId = modal.dataset.questionId;
  const hintIndex = parseInt(modal.dataset.hintIndex);
  
  // Track hint usage
  if (!gameState.hintsUsed[questionId]) {
    gameState.hintsUsed[questionId] = [];
  }
  gameState.hintsUsed[questionId].push(hintIndex);
  
  // Deduct points
  gameState.score -= 10;
  updateScore();
  
  closeHintModal();
};

window.closeHintModal = function() {
  document.getElementById('hint-modal').classList.remove('active');
};

window.nextLevel = function() {
  const nextLevelId = gameState.currentLevel + 1;
  if (nextLevelId <= gameData.levels.length) {
    showGameScreen(nextLevelId);
  } else {
    showLevelSelect();
  }
};

window.retryLevel = function() {
  showGameScreen(gameState.currentLevel);
};

window.clearNotes = function() {
  document.getElementById('notebook').value = '';
};

// Level management
function loadLevel(level) {
  console.log('Loading level:', level.title);
  
  // Update header
  document.getElementById('current-level-title').textContent = level.title;
  document.getElementById('current-difficulty').textContent = level.difficulty;
  document.getElementById('current-difficulty').className = `difficulty-badge ${level.difficulty.toLowerCase()}`;
  document.getElementById('current-score').textContent = '0';
  
  // Update scenario
  document.getElementById('scenario-text').textContent = level.scenario;
  
  // Handle scenario image
  const imageContainer = document.getElementById('scenario-image');
  if (level.image) {
    imageContainer.innerHTML = `<img src="${level.image}" alt="Investigation image" />`;
  } else {
    imageContainer.innerHTML = '';
  }
  
  // Render questions
  renderQuestions(level.questions);
  
  // Render tools
  renderTools(level.tools);
  
  // Clear notebook
  const notebook = document.getElementById('notebook');
  if (notebook) {
    notebook.value = '';
  }
}

function renderQuestions(questions) {
  const container = document.getElementById('questions-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-item';
    questionDiv.innerHTML = `
      <div class="question-header">
        <span class="question-text">${question.text}</span>
        <button class="hint-btn" onclick="showHint('${question.id}', 0)">💡 Hint</button>
      </div>
      <div class="question-input">
        ${renderQuestionInput(question)}
      </div>
    `;
    container.appendChild(questionDiv);
  });
}

function renderQuestionInput(question) {
  if (question.type === 'text') {
    return `<input type="text" class="form-control" id="answer-${question.id}" placeholder="Enter your answer...">`;
  } else if (question.type === 'multiple') {
    const options = question.options.map(option => `
      <label class="choice-option">
        <input type="radio" name="question-${question.id}" value="${option}">
        <span>${option}</span>
      </label>
    `).join('');
    
    return `<div class="multiple-choice">${options}</div>`;
  }
}

function renderTools(toolIds) {
  const container = document.getElementById('tools-grid');
  if (!container) return;
  
  container.innerHTML = '';
  
  toolIds.forEach(toolId => {
    const tool = toolsData[toolId];
    if (tool) {
      const toolBtn = document.createElement('button');
      toolBtn.className = 'tool-btn';
      toolBtn.innerHTML = tool.name;
      toolBtn.onclick = () => openTool(toolId);
      container.appendChild(toolBtn);
    }
  });
}

function renderLevels() {
  const container = document.getElementById('levels-grid');
  if (!container) return;
  
  container.innerHTML = '';
  
  gameData.levels.forEach(level => {
    const isCompleted = gameState.completedLevels.includes(level.id);
    const isLocked = level.id > 1 && !gameState.completedLevels.includes(level.id - 1);
    
    const levelCard = document.createElement('div');
    levelCard.className = `level-card ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`;
    
    if (!isLocked) {
      levelCard.onclick = () => showGameScreen(level.id);
    }
    
    levelCard.innerHTML = `
      <div class="level-header">
        <span class="level-number">Level ${level.id}</span>
        <span class="difficulty-badge ${level.difficulty.toLowerCase()}">${level.difficulty}</span>
      </div>
      <h3 class="level-title">${level.title}</h3>
      <p class="level-description">${level.description}</p>
      <div class="level-techniques">
        ${level.techniques.map(tech => `<span class="technique-tag">${tech}</span>`).join('')}
      </div>
    `;
    
    container.appendChild(levelCard);
  });
}

function renderAchievements() {
  const container = document.getElementById('achievements-grid');
  if (!container) return;
  
  container.innerHTML = '';
  
  gameData.achievements.forEach(achievement => {
    const isEarned = gameState.earnedAchievements.includes(achievement.id);
    
    const achievementCard = document.createElement('div');
    achievementCard.className = `achievement-card ${isEarned ? 'earned' : ''}`;
    achievementCard.innerHTML = `
      <div class="achievement-icon">${isEarned ? '🏆' : '🔒'}</div>
      <div class="achievement-name">${achievement.name}</div>
      <div class="achievement-desc">${achievement.description}</div>
    `;
    
    container.appendChild(achievementCard);
  });
}

function renderToolInterface(toolId, tool) {
  switch(toolId) {
    case 'reverse-search':
      return `
        <div class="tool-interface">
          <div class="tool-search">
            <input type="text" class="form-control" placeholder="Enter image URL or upload image..." readonly>
            <button class="btn btn--primary">Search</button>
          </div>
          <div class="tool-results">
            <h4>Search Results:</h4>
            ${tool.results.map(result => `
              <div class="search-result">
                <div class="result-title">${result.title}</div>
                <div class="result-description">${result.description}</div>
                <small>${result.url}</small>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      
    case 'social-search':
      return `
        <div class="tool-interface">
          <div class="tool-search">
            <input type="text" class="form-control" value="TechNinja2024" readonly>
            <button class="btn btn--primary">Search</button>
          </div>
          <div class="tool-results">
            <h4>Platform Results:</h4>
            ${tool.results.map(result => `
              <div class="search-result">
                <div class="result-title">${result.platform}: ${result.username}</div>
                <div class="result-description">
                  Status: ${result.status}<br>
                  ${result.lastActivity ? `Last Activity: ${result.lastActivity}<br>` : ''}
                  ${result.posts ? `Posts: ${result.posts}<br>` : ''}
                  ${result.timezone ? `Timezone: ${result.timezone}` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      
    case 'exif-reader':
      return `
        <div class="tool-interface">
          <div class="tool-search">
            <input type="file" class="form-control" accept="image/*" disabled>
            <button class="btn btn--primary" disabled>Analyze</button>
          </div>
          <div class="metadata-display">
            <h4>EXIF Metadata:</h4>
            ${Object.entries(tool.metadata).map(([key, value]) => `
              <div class="metadata-item">
                <span class="metadata-key">${key}:</span>
                <span class="metadata-value">${value}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      
    case 'whois-lookup':
      return `
        <div class="tool-interface">
          <div class="tool-search">
            <input type="text" class="form-control" value="secretinfo-leaked.com" readonly>
            <button class="btn btn--primary">Lookup</button>
          </div>
          <div class="metadata-display">
            <h4>WHOIS Information:</h4>
            ${Object.entries(tool.data).map(([key, value]) => `
              <div class="metadata-item">
                <span class="metadata-key">${key}:</span>
                <span class="metadata-value">${value}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      
    case 'maps':
      return `
        <div class="tool-interface">
          <div class="tool-search">
            <input type="text" class="form-control" placeholder="Search location..." readonly>
            <button class="btn btn--primary">Search</button>
          </div>
          <div class="tool-results">
            <h4>Location Information:</h4>
            ${tool.locations.map(location => `
              <div class="search-result">
                <div class="result-title">${location.name}</div>
                <div class="result-description">
                  Coordinates: ${location.coordinates}<br>
                  Timezone: ${location.timezone}<br>
                  Notable Landmarks: ${location.landmarks.join(', ')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      
    default:
      // Handle other tools
      if (tool.results) {
        return `
          <div class="tool-interface">
            <div class="tool-results">
              <h4>Analysis Results:</h4>
              ${tool.results.map(result => `
                <div class="search-result">
                  <div class="result-title">${result.timezone || result.name || 'Result'}</div>
                  <div class="result-description">
                    ${result.likelihood ? `Likelihood: ${result.likelihood}<br>` : ''}
                    ${result.evidence ? `Evidence: ${result.evidence}<br>` : ''}
                    ${result.posts ? `Posts: ${result.posts}` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      } else if (tool.data || tool.metadata) {
        const data = tool.data || tool.metadata;
        return `
          <div class="tool-interface">
            <div class="metadata-display">
              <h4>Analysis Data:</h4>
              ${Object.entries(data).map(([key, value]) => `
                <div class="metadata-item">
                  <span class="metadata-key">${key}:</span>
                  <span class="metadata-value">${value}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }
      return '<p>Tool interface not implemented.</p>';
  }
}

function checkAchievements(levelScore, accuracy, timeElapsed) {
  const newAchievements = [];
  
  // First Success
  if (gameState.completedLevels.length === 1 && !gameState.earnedAchievements.includes('first-solve')) {
    gameState.earnedAchievements.push('first-solve');
    newAchievements.push('first-solve');
  }
  
  // Speed Demon
  if (timeElapsed < 5 && !gameState.earnedAchievements.includes('speed-demon')) {
    gameState.earnedAchievements.push('speed-demon');
    newAchievements.push('speed-demon');
  }
  
  // Perfect Score
  if (accuracy === 1 && Object.keys(gameState.hintsUsed).length === 0 && !gameState.earnedAchievements.includes('perfect-score')) {
    gameState.earnedAchievements.push('perfect-score');
    newAchievements.push('perfect-score');
  }
  
  // Note Taker
  if (gameState.notebookUsed && !gameState.earnedAchievements.includes('note-taker')) {
    gameState.earnedAchievements.push('note-taker');
    newAchievements.push('note-taker');
  }
  
  // Tool Master
  const level = gameData.levels.find(l => l.id === gameState.currentLevel);
  if (gameState.toolsUsed.length === level.tools.length && !gameState.earnedAchievements.includes('tool-master')) {
    gameState.earnedAchievements.push('tool-master');
    newAchievements.push('tool-master');
  }
  
  // Completionist
  if (gameState.completedLevels.length === gameData.levels.length && !gameState.earnedAchievements.includes('completionist')) {
    gameState.earnedAchievements.push('completionist');
    newAchievements.push('completionist');
  }
}

function showResults(level, correctAnswers, totalQuestions, levelScore) {
  showScreen('results-screen');
  
  // Update results header
  const accuracy = correctAnswers / totalQuestions;
  const title = accuracy === 1 ? 'Excellent Investigation!' : 
                accuracy >= 0.5 ? 'Good Investigation!' : 'Investigation Complete';
  
  document.getElementById('results-title').textContent = title;
  document.getElementById('final-score').textContent = levelScore;
  
  // Show question results
  const resultsContainer = document.getElementById('results-details');
  resultsContainer.innerHTML = '';
  
  level.questions.forEach(question => {
    const userAnswer = gameState.currentAnswers[question.id] || 'No answer';
    const isCorrect = question.type === 'text' 
      ? userAnswer.toLowerCase().includes(question.answer.toLowerCase()) || 
        question.answer.toLowerCase().includes(userAnswer.toLowerCase())
      : userAnswer === question.answer;
    
    const questionResult = document.createElement('div');
    questionResult.className = `question-result ${isCorrect ? 'correct' : 'incorrect'}`;
    questionResult.innerHTML = `
      <div class="question-result-header">
        <span class="question-text">${question.text}</span>
        <span class="result-score">${isCorrect ? '✓' : '✗'} ${isCorrect ? 25 : 0} pts</span>
      </div>
      <div class="your-answer"><strong>Your Answer:</strong> ${userAnswer}</div>
      <div class="correct-answer"><strong>Correct Answer:</strong> ${question.answer}</div>
    `;
    resultsContainer.appendChild(questionResult);
  });
  
  // Show educational content
  const educationalContainer = document.getElementById('techniques-used');
  educationalContainer.innerHTML = level.techniques.map(technique => `
    <div class="technique-explanation">
      <h4>${technique}</h4>
      <p>This technique is essential for OSINT investigations and helps analysts gather information from publicly available sources.</p>
    </div>
  `).join('');
}

// Utility functions
function updateProgressStats() {
  const totalScoreEl = document.getElementById('total-score');
  const levelsCompletedEl = document.getElementById('levels-completed');
  const achievementsEarnedEl = document.getElementById('achievements-earned');
  
  if (totalScoreEl) totalScoreEl.textContent = gameState.totalScore;
  if (levelsCompletedEl) levelsCompletedEl.textContent = gameState.completedLevels.length;
  if (achievementsEarnedEl) achievementsEarnedEl.textContent = gameState.earnedAchievements.length;
}

function updateScore() {
  const scoreEl = document.getElementById('current-score');
  if (scoreEl) scoreEl.textContent = gameState.score;
}

function startTimer() {
  gameState.levelStartTime = Date.now();
  updateTimer();
}

function updateTimer() {
  if (!gameState.levelStartTime) return;
  
  const elapsed = Date.now() - gameState.levelStartTime;
  const minutes = Math.floor(elapsed / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);
  
  const timerEl = document.getElementById('timer');
  if (timerEl) {
    timerEl.textContent = 
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  setTimeout(updateTimer, 1000);
}

// Track notebook usage
document.addEventListener('input', function(e) {
  if (e.target.id === 'notebook' && e.target.value.length > 10) {
    gameState.notebookUsed = true;
  }
});

// Modal click outside to close
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    // Close any open modals
    document.querySelectorAll('.modal.active').forEach(modal => {
      modal.classList.remove('active');
    });
  }
});