export default function focusTrap($overlay, onEscape) {
  $overlay.on("keydown", (e) => {
    if (e.key === "Escape") {
      onEscape();
      return;
    }

    if (e.key !== "Tab") return;

    const $focusable = $overlay
      .find(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      )
      .filter(":visible");

    const first = $focusable.first()[0];
    const last = $focusable.last()[0];

    if (!first || !last) return;

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }

    if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}