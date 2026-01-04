import getUserSettings from './getUserSettings.js';
import generatePassword from './generatePassword.js';
import {
  getStrengthLevel,
  showStrengthLevel,
  resetAllBars,
} from './strengthChecker.js';

/**
 * ============================================================================
 * DOM SELECTORS
 * ============================================================================
 */

// Password display section
const passwordInput = document.getElementById('password');
const copyButton = document.getElementById('copy-button');
const copiedFeedback = document.querySelector('.password__copy--feedback');

// Settings section
const rangeInput = document.getElementById('character-length');
const lengthElement = document.getElementById('character-length-value');
const checkboxesContainer = document.querySelector('.checkboxes');

// Strength indicator section
const strengthElement = document.getElementById('strength-level');

// Generate button
const generateButton = document.getElementById('generate-button');

/**
 * ============================================================================
 * EVENT LISTENERS
 * ============================================================================
 */

initializeEventListeners();

function initializeEventListeners() {
  copyButton.addEventListener('click', handleCopyPassword);
  rangeInput.addEventListener('input', handleLengthChange);
  generateButton.addEventListener('click', handleGeneratePassword);
}

/**
 * ============================================================================
 * EVENT HANDLERS
 * ============================================================================
 */

/**
 * Copies the generated password to clipboard and shows feedback message
 */
async function handleCopyPassword() {
  try {
    await navigator.clipboard.writeText(passwordInput.value);
    copiedFeedback.classList.remove('hidden');
    setTimeout(() => copiedFeedback.classList.add('hidden'), 4000);
  } catch (error) {
    copiedFeedback.textContent = 'Failed to copy';
    copiedFeedback.classList.remove('hidden');
    setTimeout(() => copiedFeedback.classList.add('hidden'), 4000);
  }
}

/**
 * Updates the character length display and slider visual progress
 */
function handleLengthChange(e) {
  lengthElement.textContent = e.target.value;
  const percentage =
    ((e.target.value - e.target.min) / (e.target.max - e.target.min)) * 100;
  e.target.style.setProperty('--value-percent', `${percentage}%`);
}

/**
 * Validates settings, generates password, and updates UI
 */
function handleGeneratePassword(e) {
  e.preventDefault();

  const settings = getUserSettings();
  clearErrorMessages();

  const validationError = validateSettings(settings);
  if (validationError) {
    showError(validationError);
    return;
  }

  const generatedPassword = generatePassword(settings);
  passwordInput.value = generatedPassword;
  showStrengthLevel(getStrengthLevel(generatedPassword), strengthElement);
}

/**
 * ============================================================================
 * HELPER FUNCTIONS
 * ============================================================================
 */

/**
 * Validates user settings for valid password generation
 * @param {Object} settings - User settings object
 * @param {string} settings.length - Desired password length
 * @param {boolean} settings.uppercase - Include uppercase letters
 * @param {boolean} settings.lowercase - Include lowercase letters
 * @param {boolean} settings.numbers - Include numbers
 * @param {boolean} settings.symbols - Include symbols
 * @returns {string|null} Error message if invalid, null if valid
 */
function validateSettings(settings) {
  const hasCharacterType =
    settings.uppercase ||
    settings.lowercase ||
    settings.numbers ||
    settings.symbols;

  if (settings.length === '0') {
    clearPasswordAndHideStrength();
    return 'Select a character length!';
  }

  if (!hasCharacterType) {
    clearPasswordAndHideStrength();
    return 'Select at least one character type!';
  }

  return null;
}

/**
 * Displays error message to the user in the checkboxes section
 * @param {string} message - Error message to display
 */
function showError(message) {
  const errorElement = document.createElement('p');
  errorElement.textContent = message;
  errorElement.className = 'error-message';

  checkboxesContainer.appendChild(errorElement);
  strengthElement.classList.add('hidden');
}

/**
 * Removes all error messages from the UI
 */
function clearErrorMessages() {
  checkboxesContainer
    .querySelectorAll('.error-message')
    .forEach((error) => error.remove());
}

/**
 * Clears the password field, hides strength indicator, and resets strength bars
 */
function clearPasswordAndHideStrength() {
  passwordInput.value = '';
  strengthElement.classList.add('hidden');
  resetAllBars();
}
