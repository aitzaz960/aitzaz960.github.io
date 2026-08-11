export default function ThemeToggle({ isNight, onToggle, showLabel = true, id }) {
  return (
    <button
      id={id}
      type="button"
      className="themebtn"
      onClick={onToggle}
      aria-pressed={isNight}
      aria-label={showLabel ? undefined : 'Toggle dark mode'}
    >
      <span className="themebtn__dot" aria-hidden="true" />
      {showLabel && (
        <span className="themebtn__label">{isNight ? 'Day shift' : 'Night shift'}</span>
      )}
    </button>
  );
}
