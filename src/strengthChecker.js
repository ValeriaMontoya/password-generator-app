/**
 * Evaluates password strength based on length and character variety
 * @param {string} password - Password to evaluate
 * @returns {string} Strength level: 'Too Weak!', 'Weak', 'Medium', or 'Strong'
 */
export function getStrengthLevel(password) {
  const length = password.length;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const characterTypes = [
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
    hasSymbols,
  ].filter(Boolean).length;

  if (length < 6 || characterTypes === 1) {
    return 'Too Weak!';
  } else if (length < 10 && characterTypes >= 2) {
    return 'Weak';
  } else if (length < 14 && characterTypes >= 3) {
    return 'Medium';
  } else if (length >= 14 && characterTypes === 4) {
    return 'Strong';
  } else {
    return 'Medium';
  }
}

/**
 * Gets all strength bar fill elements from the DOM
 * @returns {NodeList} Collection of strength bar elements
 */
function getBars() {
  return document.querySelectorAll('.strength__bar-fill');
}

/**
 * Resets the visual state of a strength bar before applying new classes.
 *
 * @param {HTMLElement} bar - The DOM element representing a strength bar
 */
export function clearBarClasses(bar) {
  bar.classList.remove(
    'strength__bar-fill--active',
    'strength__bar-fill--red',
    'strength__bar-fill--orange',
    'strength__bar-fill--yellow',
    'strength__bar-fill--green',
    'strength__bar-fill--default'
  );
}

/**
 * Resets all strength bars to their default (empty) state
 */
export function resetAllBars() {
  const bars = getBars();
  bars.forEach((bar) => {
    clearBarClasses(bar);
    bar.classList.add('strength__bar-fill--default');
  });
}

/**
 * Updates the strength indicator UI with visual bars and text label
 * @param {string} strengthLevel - Strength level to display
 * @param {HTMLElement} strengthElement - DOM element to update with strength text
 */
export function showStrengthLevel(strengthLevel, strengthElement) {
  strengthElement.textContent = strengthLevel;
  strengthElement.classList.remove('hidden');

  const bars = getBars();

  const setBarClasses = (count, colorClass) => {
    bars.forEach((bar, index) => {
      clearBarClasses(bar);
      if (index < count) {
        bar.classList.add('strength__bar-fill--active', colorClass);
      } else {
        bar.classList.add('strength__bar-fill--default');
      }
    });
  };

  switch (strengthLevel) {
    case 'Too Weak!':
      setBarClasses(1, 'strength__bar-fill--red');
      break;
    case 'Weak':
      setBarClasses(2, 'strength__bar-fill--orange');
      break;
    case 'Medium':
      setBarClasses(3, 'strength__bar-fill--yellow');
      break;
    case 'Strong':
      setBarClasses(4, 'strength__bar-fill--green');
      break;
    default:
      bars.forEach((bar) => {
        clearBarClasses(bar);
        bar.classList.add('strength__bar-fill--default');
      });
      break;
  }
}
