import { createSignal } from 'solid-js';

export function CharacterLength() {
  const [length, setLength] = createSignal(0);

  function handleLengthChange(e) {
    setLength(e.target.value);
    const percentage =
      ((e.target.value - e.target.min) / (e.target.max - e.target.min)) * 100;
    e.target.style.setProperty('--value-percent', `${percentage}%`);
  }

  return (
    <fieldset class="character-length">
      <div class="character-length__header">
        <legend class="character-length__label">Character Length</legend>
        <span
          class="character-length__value"
          id="character-length-value"
          aria-live="polite"
        >
          {length()}
        </span>
      </div>
      <input
        type="range"
        class="character-length__range"
        name="character-length"
        id="character-length"
        min="0"
        max="20"
        value={length()}
        onInput={(e) => handleLengthChange(e)}
      />
    </fieldset>
  );
}
