// ============================================================
// PassSafe — Password Security Checker
// script.js  |  All logic runs locally. Nothing is saved.
// ============================================================


// ── Get references to the HTML elements we need ──────────────
const passwordInput = document.getElementById('password-input');
const toggleBtn     = document.getElementById('toggle-btn');
const checkBtn      = document.getElementById('check-btn');
const resultArea    = document.getElementById('result-area');
const strengthBar   = document.getElementById('strength-bar');
const strengthLabel = document.getElementById('strength-label');
const suggestionsList = document.getElementById('suggestions');

const generateBtn  = document.getElementById('generate-btn');
const genResult    = document.getElementById('gen-result');
const genPassword  = document.getElementById('gen-password');
const copyBtn      = document.getElementById('copy-btn');
const copyMsg      = document.getElementById('copy-msg');


// ── SHOW / HIDE PASSWORD ─────────────────────────────────────
// Toggle the input between type="password" and type="text"
toggleBtn.addEventListener('click', function () {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleBtn.textContent = '🙈';
    toggleBtn.setAttribute('aria-label', 'Hide password');
    toggleBtn.title = 'Hide password';
    toggleBtn.setAttribute('aria-pressed', 'true');
  } else {
    passwordInput.type = 'password';
    toggleBtn.textContent = '👁';
    toggleBtn.setAttribute('aria-label', 'Show password');
    toggleBtn.title = 'Show password';
    toggleBtn.setAttribute('aria-pressed', 'false');
  }
});


// ── CHECK PASSWORD STRENGTH ──────────────────────────────────
checkBtn.addEventListener('click', function () {
  const password = passwordInput.value;

  // If the field is empty, do nothing
  if (password.length === 0) {
    alert('Please enter a password first.');
    return;
  }

  // Analyse the password and get a result object
  const result = analysePassword(password);

  // Show the result area
  resultArea.classList.remove('hidden');

  // Update the strength bar — remove old classes, then add the new one
  strengthBar.className = 'strength-bar ' + result.level;

  // Update the label text and colour class
  strengthLabel.textContent = 'Strength: ' + result.label;
  strengthLabel.className   = result.level;

  // Populate the suggestions list
  suggestionsList.innerHTML = '';   // clear previous suggestions
  result.suggestions.forEach(function (tip) {
    const li = document.createElement('li');
    li.textContent = tip;
    suggestionsList.appendChild(li);
  });
});


// ── analysePassword(password) ────────────────────────────────
// Returns { level, label, suggestions }
// level  : "weak" | "medium" | "strong"
// label  : display text shown to the user
// suggestions : array of tip strings
function analysePassword(password) {
  // Count what character types are present
  const hasLower   = /[a-z]/.test(password);
  const hasUpper   = /[A-Z]/.test(password);
  const hasNumber  = /[0-9]/.test(password);
  const hasSymbol  = /[^a-zA-Z0-9]/.test(password);   // anything that isn't a letter or digit
  const isLong     = password.length >= 12;
  const normalizedPassword = password.toLowerCase();
  const predictableFragments = [
    'password', 'qwerty', 'asdf', 'zxcv', '1234', '2345', '3456',
    '4567', '5678', '6789', '9876', '8765', '7654', '6543',
    '5432', '4321', 'abcd', 'bcde', 'cdef', 'fedc', 'edcb',
    'dcba', 'letmein', 'welcome', 'admin'
  ];
  const hasPredictablePattern =
    predictableFragments.some(function (fragment) {
      return normalizedPassword.includes(fragment);
    }) || /(.)\1{3,}/i.test(password);

  // Give a point for each satisfied condition
  let score = 0;
  if (hasLower)  score++;
  if (hasUpper)  score++;
  if (hasNumber) score++;
  if (hasSymbol) score++;
  if (isLong)    score++;

  // Build a list of suggestions based on what is missing
  const suggestions = [];

  if (password.length < 8) {
    suggestions.push('Make it at least 8 characters long.');
  } else if (password.length < 12) {
    suggestions.push('Try making it 12+ characters for extra strength.');
  }
  if (!hasUpper)  suggestions.push('Add at least one uppercase letter (A–Z).');
  if (!hasNumber) suggestions.push('Include at least one number (0–9).');
  if (!hasSymbol) suggestions.push('Add a special character like !, @, #, or $.');
  if (hasPredictablePattern) {
    suggestions.push('Avoid common words, sequences, or repeated characters.');
  }

  // Decide the overall level based on the score
  let level, label;

  if (score <= 2) {
    level = 'weak';
    label = '🔴 Weak';
    // Always give at least one suggestion for weak passwords
    if (suggestions.length === 0) {
      suggestions.push('Try mixing uppercase, numbers, and symbols.');
    }
  } else if (score <= 3) {
    level = 'medium';
    label = '🟠 Medium';
    if (suggestions.length === 0) {
      suggestions.push('Good start! Adding symbols or length will make it stronger.');
    }
  } else {
    level = 'strong';
    label = '🟢 Strong';
    if (suggestions.length === 0) {
      suggestions.push('Great password! Remember to keep it unique and private.');
    }
  }

  if (hasPredictablePattern) {
    level = 'weak';
    label = '🔴 Weak';
  }

  return { level, label, suggestions };
}


// ── GENERATE A SECURE RANDOM PASSWORD ───────────────────────
// Uses crypto.getRandomValues() — the browser's secure random source
generateBtn.addEventListener('click', function () {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}';
  const length = getRandomInt(12, 20);   // random length between 12 and 20

  let password = '';
  for (let i = 0; i < length; i++) {
    password += characters[getRandomInt(0, characters.length - 1)];
  }

  // Show the result
  genPassword.textContent = password;
  genResult.classList.remove('hidden');
  copyMsg.classList.add('hidden');   // hide any previous "Copied!" message
  copyMsg.classList.remove('copy-error');
});


// ── COPY GENERATED PASSWORD ──────────────────────────────────
copyBtn.addEventListener('click', function () {
  const text = genPassword.textContent;
  if (!text) return;

  // Clipboard access is unavailable on some browsers or file origins.
  if (!navigator.clipboard || !navigator.clipboard.writeText) {
    copyMsg.textContent = 'Copy failed. Please copy the password manually.';
    copyMsg.classList.add('copy-error');
    copyMsg.classList.remove('hidden');
    return;
  }

  navigator.clipboard.writeText(text).then(function () {
    copyMsg.textContent = 'Copied!';
    copyMsg.classList.remove('copy-error');
    copyMsg.classList.remove('hidden');   // show "Copied!" message
    // Hide the message after 2 seconds
    setTimeout(function () {
      copyMsg.classList.add('hidden');
    }, 2000);
  }).catch(function () {
    copyMsg.textContent = 'Copy failed. Please copy the password manually.';
    copyMsg.classList.add('copy-error');
    copyMsg.classList.remove('hidden');
  });
});


// ── HELPER: getRandomInt(min, max) ───────────────────────────
// Returns a whole number between min and max (inclusive)
function getRandomInt(min, max) {
  const range = max - min + 1;
  const randomArr = new Uint32Array(1);
  const limit = Math.floor(0x100000000 / range) * range;
  let value;

  do {
    crypto.getRandomValues(randomArr);
    value = randomArr[0];
  } while (value >= limit);

  return min + (value % range);
}
