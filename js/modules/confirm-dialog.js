import focusTrap from "../util/focus-trap.js";

export function showConfirmation({
                                   title = "Remove item?",
                                   text = "This action cannot be undone.",
                                   confirmText = "Remove",
                                   cancelText = "Cancel"
                                 } = {}) {
  return new Promise((resolve) => {
    const $overlay = $("<div>")
      .addClass("confirm")
      .attr({
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "confirmation-title",
        "aria-describedby": "confirmation-text"
      });

    const $modal = $("<div>")
      .addClass("confirm__modal");

    const $title = $("<h3>")
      .addClass("confirm__title")
      .attr("id", "confirmation-title")
      .text(title);

    const $text = $("<p>")
      .addClass("confirm__text")
      .attr("id", "confirmation-text")
      .text(text);

    const $actions = $("<div>")
      .addClass("confirm__actions");

    const $cancel = $("<button>")
      .attr("type", "button")
      .addClass("confirm__btn confirm__btn--cancel")
      .text(cancelText);

    const $confirm = $("<button>")
      .attr("type", "button")
      .addClass("confirm__btn confirm__btn--confirm")
      .text(confirmText);

    $actions.append($cancel, $confirm);

    $modal.append(
      $title,
      $text,
      $actions
    );

    $overlay.append($modal);

    $("#confirmation-container").append($overlay);

    let isClosed = false;

    const close = (result) => {
      if (isClosed) return;

      isClosed = true;
      $overlay.remove();
      resolve(result);
    };

    focusTrap($overlay, () => {
      close(false);
    });

    $cancel.on("click", () => {
      close(false);
    });

    $confirm.on("click", () => {
      close(true);
    });

    $overlay.addClass("confirm--visible");

    $cancel[0].focus();
  });
}