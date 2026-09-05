import { initFormValidation, isFormValid } from "./form-validation.js";
import { addImageToAssignments }from "./assignments-manager.js";
import { updateImageGallery } from "./gallery-renderer.js";

export default function initFormSubmit() {
  const $form = $("#assignment-form");
  initFormValidation();
  $form.on("submit", function (event) {
    event.preventDefault();
    if (!isFormValid($form)) return;

    try {
      const assignment = addImageToAssignments();
      updateImageGallery(assignment);
    } catch (e) {
      console.error(e);
    }

  });

}