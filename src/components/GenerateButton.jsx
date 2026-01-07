export function GenerateButton() {
  return (
    <button type="submit" class="generate" id="generate-button">
      <span class="generate__text">Generate</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        class="generate__icon"
        aria-hidden="true"
      >
        <path d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z" />
      </svg>
    </button>
  );
}