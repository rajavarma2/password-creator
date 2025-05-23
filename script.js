const lengthInput = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const passwordInput = document.getElementById('password');
const generateBtn = document.getElementById('generate');
const strengthBar = document.getElementById('strength').firstElementChild;
const strengthText = document.getElementById('strength-text');

const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');

// Update displayed password length in real time
lengthInput.addEventListener('input', () => {
  lengthValue.textContent = lengthInput.value;
});

// Handle password generation
generateBtn.addEventListener('click', () => {
  const len = parseInt(lengthInput.value);
  const hasUpper = uppercase.checked;
  const hasLower = lowercase.checked;
  const hasNumber = numbers.checked;
  const hasSymbol = symbols.checked;

  const password = generatePassword(len, hasUpper, hasLower, hasNumber, hasSymbol);
  passwordInput.value = password;
  checkStrength(password);
});

// Generate a random password based on options
function generatePassword(length, upper, lower, number, symbol) {
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  let allChars = "";
  if (upper) allChars += upperChars;
  if (lower) allChars += lowerChars;
  if (number) allChars += numberChars;
  if (symbol) allChars += symbolChars;

  if (allChars === "") return "⚠️ Select at least one option";

  let password = "";
  for (let i = 0; i < length; i++) {
    const rand = Math.floor(Math.random() * allChars.length);
    password += allChars[rand];
  }
  return password;
}

// Check password strength and show it visually
function checkStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[\W]/.test(password)) strength++;

  // Visual strength bar percentage
  const percent = Math.min(strength * 20, 100);
  strengthBar.style.width = percent + "%";

  if (strength <= 2) {
    strengthBar.style.background = "red";
    strengthText.textContent = "Weak";
  } else if (strength === 3 || strength === 4) {
    strengthBar.style.background = "orange";
    strengthText.textContent = "Medium";
  } else {
    strengthBar.style.background = "green";
    strengthText.textContent = "Strong";
  }
}
