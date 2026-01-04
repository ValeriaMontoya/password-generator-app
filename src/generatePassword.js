/**
 * Generates a random password based on user settings
 * @param {Object} settings - Password generation settings
 * @param {number} settings.length - Desired password length
 * @param {boolean} settings.uppercase - Include uppercase letters (A-Z)
 * @param {boolean} settings.lowercase - Include lowercase letters (a-z)
 * @param {boolean} settings.numbers - Include numbers (0-9)
 * @param {boolean} settings.symbols - Include symbols (!@#$%^&*...)
 * @returns {string} Generated password
 */
export default function generatePassword(settings) {
  const uppercaseLetters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
  const lowercaseLetters = uppercaseLetters.toLowerCase();
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+=-[]{}|\\:;<>?/~`';
  let characterPool = '';

  if (settings.uppercase) characterPool += uppercaseLetters;
  if (settings.lowercase) characterPool += lowercaseLetters;
  if (settings.numbers) characterPool += numbers;
  if (settings.symbols) characterPool += symbols;

  let generatedPassword = '';

  // Use cryptographically secure random values
  const randomValues = new Uint32Array(settings.length);
  crypto.getRandomValues(randomValues);

  for (let index = 0; index < settings.length; index++) {
    const randomIndex = randomValues[index] % characterPool.length;
    const randomCharacter = characterPool[randomIndex];
    generatedPassword += randomCharacter;
  }

  return generatedPassword;
}
