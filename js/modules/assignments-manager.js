import assignedImages from "../config/assigned-images-data.js";
import ERROR_MESSAGES from "../config/errors.js";

export function addImageToAssignments() {
  const email = $("#email").val()?.trim();
  if (!email) { throw new Error(ERROR_MESSAGES.INVALID_EMAIL) }

  if (!assignedImages[email]) {
    assignedImages[email] = [];
  }
  const image = $("#current-image").attr("src");

  if (!image) { throw new Error(ERROR_MESSAGES.IMAGE_NOT_FOUND) }

  if (assignedImages[email].includes(image)) {
    throw new Error(ERROR_MESSAGES.IMAGE_ALREADY_EXISTS)
  }

  assignedImages[email].push(image);
  return { email, image };
}
export function removeImageFromAssignments({ email, image } = {}) {
  if (!email) {
    throw new Error(ERROR_MESSAGES.INVALID_EMAIL);
  }

  if (!image) {
    throw new Error(ERROR_MESSAGES.IMAGE_NOT_FOUND);
  }

  if (!assignedImages[email]) {
    throw new Error(ERROR_MESSAGES.INVALID_EMAIL);
  }

  assignedImages[email] = assignedImages[email].filter(
    (img) => img !== image
  );

  if (!assignedImages[email].length) {
    removeAssignment(email);
  }
}

export function removeAssignment(email) {
  delete assignedImages[email];
}

export function hasAssignment(email) {
  return !!assignedImages[email];
}
``