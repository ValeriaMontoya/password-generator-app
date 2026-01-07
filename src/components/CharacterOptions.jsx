export function CharacterOptions() {
  return (
    <fieldset class="checkboxes">
      <legend class="visually-hidden">Character Options</legend>
      <div class="checkboxes__item">
        <input
          type="checkbox"
          class="checkboxes__input"
          name="uppercase"
          id="uppercase"
        />
        <label for="uppercase" class="checkboxes__label">
          Include Uppercase Letters
        </label>
      </div>
      <div class="checkboxes__item">
        <input
          type="checkbox"
          class="checkboxes__input"
          name="lowercase"
          id="lowercase"
        />
        <label for="lowercase" class="checkboxes__label">
          Include Lowercase Letters
        </label>
      </div>
      <div class="checkboxes__item">
        <input
          type="checkbox"
          class="checkboxes__input"
          name="numbers"
          id="numbers"
        />
        <label for="numbers" class="checkboxes__label">
          Include Numbers
        </label>
      </div>
      <div class="checkboxes__item">
        <input
          type="checkbox"
          class="checkboxes__input"
          name="symbols"
          id="symbols"
        />
        <label for="symbols" class="checkboxes__label">
          Include Symbols
        </label>
      </div>
    </fieldset>
  );
}