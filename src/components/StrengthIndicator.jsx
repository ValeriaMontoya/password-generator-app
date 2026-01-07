export function StrengthIndicator(props) {
  const renderStrengthBars = (strengthLevel) => {
    const strengthToBars = {
      'Too Weak!': 1,
      Weak: 2,
      Medium: 3,
      Strong: 4,
    };

    const colorClass =
      {
        'Too Weak!': 'strength__bar-fill--red',
        Weak: 'strength__bar-fill--orange',
        Medium: 'strength__bar-fill--yellow',
        Strong: 'strength__bar-fill--green',
      }[strengthLevel] || '';

    const barCount = strengthToBars[strengthLevel] || 0;

    return Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        class={`strength__bar-fill ${index < barCount ? colorClass : ''} ${
          index < barCount ? 'strength__bar-fill--active' : ''
        }`}
      ></div>
    ));
  };

  return (
    <div class="strength" role="status" aria-live="polite">
      <h2 class="strength__label">Strength</h2>
      <p
        class={`strength__level ${props.strengthLevel() ? '' : 'hidden'}`}
        id="strength-level"
        aria-label="Password strength level"
      >
        {props.strengthLevel()}
      </p>
      <div
        class="strength__bar"
        role="progressbar"
        aria-label="Password strength indicator"
        aria-valuemin="0"
        aria-valuemax="4"
      >
        <Show when={props.strengthLevel()}>
          {renderStrengthBars(props.strengthLevel())}
        </Show>
      </div>
    </div>
  );
}
