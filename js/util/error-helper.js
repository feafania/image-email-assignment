export function getOrCreateErrorElement($field, message) {
  const errorId = `${$field.attr("id")}-error`;

  let $error = $(`#${errorId}`);

  if (!$error.length) {
    $error = createErrorElement(errorId, message);
    $field.after($error);
  } else {
    $error.text(message);
  }

  return $error;
}

export function removeErrorElement($field) {

  const errorId = `${$field.attr("id")}-error`;
  $(`#${errorId}`).remove();

}

function createErrorElement(id, message) {
  return $("<span>", {
    id,
    class: "contact__error",
    role: "alert",
    text: message
  });
}