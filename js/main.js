import initImageButtonHandler from "./modules/image-handler.js";
import initFormSubmit from "./modules/submit-handler.js";
import { renderAllAssignments } from "./modules/hydration.js";

$(document).ready(function () {
  renderAllAssignments();
  initImageButtonHandler();
  initFormSubmit();
});

