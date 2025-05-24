// Password strength logic
const passwordInput = document.getElementById('passwordInput');
const strengthBar = document.getElementById('strengthBar');
const strengthLabel = document.getElementById('strengthLabel');
const emojiFeedback = document.getElementById('emojiFeedback');
const crackTime = document.getElementById('crackTime');
const suggestions = document.getElementById('suggestions');
const togglePassword = document.getElementById('togglePassword');
const themeToggle = document.getElementById('themeToggle');

// Criteria elements
const criteria = {
  length: document.getElementById('lengthCriteria'),
  upper: document.getElementById('upperCriteria'),
  lower: document.getElementById('lowerCriteria'),
  number: document.getElementById('numberCriteria'),
  symbol: document.getElementById('symbolCriteria'),
};

// Emoji and label by score
const feedbacks = [
  { emoji: "😞", label: "Very Weak", color: "var(--strength-weak)" },
  { emoji: "😕", label: "Weak", color: "var(--strength-fair)" },
  { emoji: "😐", label: "Fair", color: "var(--strength-good)" },
  { emoji: "🙂", label: "Strong", color: "var(--strength-strong)" },
  { emoji: "😎", label: "Very Strong", color: "var(--strength-very-strong)" }
];

// Estimate crack time (very basic, for demo)
function estimateCrackTime(password) {
  if (!password) return "";
  const entropy = Math.log2(
    (/[a-z]/.test(password) ? 26 : 0) +
    (/[A-Z]/.test(password) ? 26 : 0) +
    (/[0-9]/.test(password) ? 10 : 0) +
    (/[^A-Za-z0-9]/.test(password) ? 32 : 0)
  ) * password.length;
  if (entropy < 28) return "Instantly crackable";
  if (entropy < 36) return "A few seconds";
  if (entropy < 60) return "A few hours";
  if (entropy < 80) return "A few years";
  return "Centuries";
}

// Suggestions
function getSuggestions(password) {
  const tips = [];
  if (password.length < 8) tips.push("Use at least 8 characters.");
  if (!/[A-Z]/.test(password)) tips.push("Add uppercase letters.");
  if (!/[a-z]/.test(password)) tips.push("Add lowercase letters.");
  if (!/[0-9]/.test(password)) tips.push("Add numbers.");
  if (!/[^A-Za-z0-9]/.test(password)) tips.push("Add symbols.");
  if (tips.length === 0) return "Great password!";
  return tips.join(" ");
}

// Strength calculation
function calculateStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

// Update UI
function updateStrengthUI() {
  const password = passwordInput.value;
  const score = calculateStrength(password);

  // Update bar
  const percent = Math.min(score, 5) * 20;
  strengthBar.style.width = percent + "%";
  strengthBar.style.background = feedbacks[Math.max(0, score - 1)].color;

  // Update label and emoji
  strengthLabel.textContent = feedbacks[Math.max(0, score - 1)].label;
  emojiFeedback.textContent = feedbacks[Math.max(0, score - 1)].emoji;

  // Update criteria
  criteria.length.classList.toggle('valid', password.length >= 8);
  criteria.upper.classList.toggle('valid', /[A-Z]/.test(password));
  criteria.lower.classList.toggle('valid', /[a-z]/.test(password));
  criteria.number.classList.toggle('valid', /[0-9]/.test(password));
  criteria.symbol.classList.toggle('valid', /[^A-Za-z0-9]/.test(password));

  // Crack time
  crackTime.textContent = estimateCrackTime(password);

  // Suggestions
  suggestions.textContent = getSuggestions(password);
}

// Show/hide password
togglePassword.addEventListener('click', () => {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
  togglePassword.innerHTML = type === "password"
    ? '<i class="fa-solid fa-eye"></i>'
    : '<i class="fa-solid fa-eye-slash"></i>';
});

// Theme toggle
themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  const dark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', dark ? 'light' : 'dark');
  themeToggle.innerHTML = dark
    ? '<i class="fa-solid fa-moon"></i>'
    : '<i class="fa-solid fa-sun"></i>';
});

// Live update
passwordInput.addEventListener('input', updateStrengthUI);

// Initial UI
updateStrengthUI();

// Particle background
function createParticles() {
  const container = document.querySelector('.particles');
  if (!container) return;
  container.innerHTML = '';
  const colors = [
    "rgba(99,102,241,0.13)", "rgba(34,197,94,0.13)", "rgba(251,191,36,0.13)", "rgba(6,182,212,0.13)"
  ];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.width = p.style.height = `${18 + Math.random() * 32}px`;
    p.style.left = `${Math.random() * 100}vw`;
    p.style.top = `${Math.random() * 100}vh`;
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = `${14 + Math.random() * 10}s`;
    container.appendChild(p);
  }
}
createParticles();
window.addEventListener('resize', createParticles);