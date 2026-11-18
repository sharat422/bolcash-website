export const DISCLAIMER_TEXT =
  "This is general information, not tax or legal advice. Confirm with a CA.";

/** Goes at the end of every tax or legal guide. */
export function Disclaimer() {
  return (
    <p
      role="note"
      className="mt-8 rounded-md border-l-4 border-accent bg-surface-2 p-4 font-medium"
    >
      {DISCLAIMER_TEXT}
    </p>
  );
}
