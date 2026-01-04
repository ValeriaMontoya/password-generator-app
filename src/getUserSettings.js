/**
 * Retrieves user-selected password generation settings from the form
 * @returns {Object|null} Settings object with length, uppercase, lowercase, numbers, symbols flags
 */
export default function getUserSettings() {
  const form = document.getElementById('settings-form');

  if (!form) return null;

  const formData = new FormData(form);

  return {
    length: formData.get('character-length'),
    uppercase: formData.has('uppercase'),
    lowercase: formData.has('lowercase'),
    numbers: formData.has('numbers'),
    symbols: formData.has('symbols'),
  };
}
