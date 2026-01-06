import { createSignal } from 'solid-js';
import { PasswordDisplay } from './components/PasswordDisplay';
import { CharacterLength } from './components/CharacterLength';
import { CharacterOptions } from './components/CharacterOptions';
import { StrengthIndicator } from './components/StrengthIndicator';
import { GenerateButton } from './components/GenerateButton';

function App() {
  const [password, setPassword] = createSignal('');
  const [strengthLevel, setStrengthLevel] = createSignal('');
  const [error, setError] = createSignal('');

  function handleSubmit(e) {
    e.preventDefault();
    const settings = getUserSettings(e);
    const validationError = validateSettings(settings);
    if (validationError) {
      setError(validationError);
      setPassword('');
      setStrengthLevel('');
      return;
    }

    setError('');
    generatePassword(settings);
  }

  function getUserSettings(e) {
    const formData = new FormData(e.target);

    return {
      length: formData.get('character-length'),
      uppercase: formData.has('uppercase'),
      lowercase: formData.has('lowercase'),
      numbers: formData.has('numbers'),
      symbols: formData.has('symbols'),
    };
  }

  function validateSettings(settings) {
    const hasCharacterType =
      settings.uppercase ||
      settings.lowercase ||
      settings.numbers ||
      settings.symbols;

    if (settings.length === '0') {
      return 'Select a character length!';
    }

    if (!hasCharacterType) {
      return 'Select at least one character type!';
    }

    return null;
  }

  function getStrengthLevel(password) {
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
      setStrengthLevel('Too Weak!');
    } else if (length < 10 && characterTypes >= 2) {
      setStrengthLevel('Weak');
    } else if (length < 14 && characterTypes >= 3) {
      setStrengthLevel('Medium');
    } else if (length >= 14 && characterTypes === 4) {
      setStrengthLevel('Strong');
    } else {
      setStrengthLevel('Medium');
    }
  }

  function generatePassword(settings) {
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

    setPassword(generatedPassword);
    getStrengthLevel(generatedPassword);
  }

  return (
    <main class="password-generator">
      <h1 class="password-generator__title">Password Generator</h1>

      <PasswordDisplay password={password} />

      <form
        action=""
        class="settings"
        id="settings-form"
        novalidate
        onSubmit={(e) => handleSubmit(e)}
      >
        <CharacterLength />

        <CharacterOptions />

        {error() && <p class="error-message">{error()}</p>}

        <StrengthIndicator strengthLevel={strengthLevel} />

        <GenerateButton />
      </form>
    </main>
  );
}

export default App;
