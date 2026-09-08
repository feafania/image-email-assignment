import assignedImages from "../config/assigned-images-data.js";
import ERROR_MESSAGES from "../config/errors.js";
import { saveAssignments } from "../util/storage.js";

export function addImageToAssignments() {
  const email = $("#email").val()?.trim().toLowerCase();
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
  saveAssignments(assignedImages);
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

  saveAssignments(assignedImages);
}

export function removeAssignment(email) {
  delete assignedImages[email];
  saveAssignments(assignedImages);
}

export function hasAssignment(email) {
  return !!assignedImages[email];
}
``