import { initFormValidation, isFormValid } from "./form-validation.js";
import { addImageToAssignments }from "./assignments-manager.js";
import { updateImageGallery } from "./gallery-renderer.js";
import { showNotification } from "./notification.js";
import ERROR_MESSAGES from "../config/errors.js";

export default function initFormSubmit() {
  const $form = $("#assignment-form");
  initFormValidation();
  $form.on("submit", function (event) {
    event.preventDefault();
    if (!isFormValid($form)) return;

    try {
      const assignment = addImageToAssignments();
      updateImageGallery(assignment);
      showNotification("Image successfully assigned", "success");
    } catch (error) {
      if (error.message === ERROR_MESSAGES.IMAGE_ALREADY_EXISTS) {
        showNotification(error.message, "info");
        return;
      }
      console.error(error);
    }

  });

}