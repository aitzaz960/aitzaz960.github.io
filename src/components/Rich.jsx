/**
 * Renders **double-asterisk** spans as <strong>.
 * Lets the content file stay readable without pulling in a markdown parser
 * for the one feature we actually use.
 */
export default function Rich({ text }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
      )}
    </>
  );
}
