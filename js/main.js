
import { initSmoothScroll } from "./modules/smooth-scroll.js";
import initImageButtonHandler from "./modules/image-handler.js";
import {initFormValidation} from "./modules/form-validation.js";

$(document).ready(function () {
  initSmoothScroll();
  initImageButtonHandler();
  initFormValidation();
});

