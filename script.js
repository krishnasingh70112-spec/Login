const card = document.getElementById('authCard');
const toast = document.getElementById('toast');
let toastTimeout;

function notify(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('visible'), 3500);
}

function setMode(mode) {
  const signup = mode === 'signup';
  card.classList.toggle('signup-mode', signup);
  document.querySelectorAll('.overlay-content button').forEach(button => {
    button.tabIndex = signup ? (button.closest('.overlay-left') ? 0 : -1) : (button.closest('.overlay-right') ? 0 : -1);
  });
  document.querySelectorAll('.form-pane input, .form-pane button').forEach(el => {
    const pane = el.closest('.form-pane');
    if (pane) el.tabIndex = pane.classList.contains(signup ? 'signup-pane' : 'signin-pane') ? 0 : -1;
  });
}

document.querySelectorAll('[data-switch]').forEach(button => {
  button.addEventListener('click', () => setMode(button.dataset.switch));
});

const themes = {
  violet: ['#7354e8', '#4b2ba9', 'rgba(115,84,232,.17)'],
  blue: ['#2875ed', '#1648a5', 'rgba(40,117,237,.17)'],
  pink: ['#e64d9a', '#a52d72', 'rgba(230,77,154,.17)'],
  green: ['#169d80', '#0c6558', 'rgba(22,157,128,.17)'],
  orange: ['#ef7c37', '#b74b1d', 'rgba(239,124,55,.17)'],
  dark: ['#435477', '#19243c', 'rgba(39,51,79,.2)']
};
function setTheme(name) {
  const [accent, dark, glow] = themes[name];
  document.documentElement.style.setProperty('--accent', accent);
  document.documentElement.style.setProperty('--accent-dark', dark);
  document.documentElement.style.setProperty('--glow', glow);
  document.querySelectorAll('.swatch').forEach(button => {
    const active = button.dataset.theme === name;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  try { localStorage.setItem('zorblix-theme', name); } catch (_) {}
}
document.querySelectorAll('.swatch').forEach(button => {
  button.addEventListener('click', () => setTheme(button.dataset.theme));
});
try { const saved = localStorage.getItem('zorblix-theme'); if (themes[saved]) setTheme(saved); } catch (_) {}

document.querySelectorAll('.show-password').forEach(button => {
  button.addEventListener('click', () => {
    const input = document.getElementById(button.dataset.for);
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    button.textContent = show ? 'Hide' : 'Show';
    button.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  });
});

document.getElementById('signinForm').addEventListener('submit', event => {
  event.preventDefault();
  notify('Sign-in form looks good! Connect a backend to log in.');
});
document.getElementById('signupForm').addEventListener('submit', event => {
  event.preventDefault();
  notify('Account form looks good! Connect a backend to register.');
});
document.getElementById('forgotBtn').addEventListener('click', () => {
  notify('Password reset needs a connected authentication service.');
});
setMode('signin');
