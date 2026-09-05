import validationRules from "../config/validation.js";
import { getOrCreateErrorElement, removeErrorElement } from "../util/error-helper.js";
import { breakpoints } from "../util/breakpoints.js";

const debounceInterval = 200;
const successResetDelay = 1000;

export function initFormValidation() {
  const $form = $("#assignment-form");
  if (!$form.length) return;

  $form.attr("novalidate", true);

  const fields = $form.find("input, textarea");
  const validateOnInput = !breakpoints.isMobile();

  fields.each(function () {
    initFieldState($(this));
  });

  fields.on("blur", function () {
    const $field = $(this);
    $field.data("touched", true);
    validateField($field);
  });

  if (validateOnInput) {

    fields.on("input", function () {
      const $field = $(this);
      const currentValue = $field.val().trim();
      const initialValue = $field.data("initialValue");

      clearTimeout($field.data("debounceTimer"));
      const timer = setTimeout(() => {
        if ($field.data("touched")) {
          validateField($field);
        }
      }, debounceInterval);

      $field.data("debounceTimer", timer);
    });
  }
}

export function isFormValid($form) {
  $form.data("submitted", true);
  const fields = $form.find("input, textarea");

  const $submitBtn = $form.find('button[type="submit"]');
  $submitBtn.prop("disabled", true);

  let validForm = true;

  fields.each(function () {
    const $field = $(this);
    $field.data("touched", true);

    if (!validateField($field)) {
      validForm = false;
    }
  });

  if (validForm) {
    $form.addClass("is-success");

    clearTimeout($form.data("successTimer"));
    const timer = setTimeout(() => {
      resetForm($form);
    }, successResetDelay);
    $form.data("successTimer", timer);

  } else {
    fields.filter(".is-invalid").first().focus();
  }

  $submitBtn.prop("disabled", false);
  return validForm;
}

function validateField($field) {
  const touched = $field.data("touched");
  const formSubmitted = $field.closest("form").data("submitted");

  if (!formSubmitted && !touched) {
    return true;
  }

  const value = $field.val().trim();
  const fieldId = $field.attr("id");
  const rules = validationRules[fieldId];

  clearError($field);

  if (!rules) {
    return true;
  }

  if (!isRequiredValid(value, rules)) {
    showError(
      $field,
      rules.message || validationRules.default.message
    );
    return false;
  }

  if (!value) {
    return true;
  }

  if (!isRegexValid(value, rules)) {
    showError($field, rules.message);
    return false;
  }

  clearError($field);

  return true;
}

function isRequiredValid(value, rules) {
  return !rules.required || value.length > 0;
}

function isRegexValid(value, rules) {
  return !rules.regex || rules.regex.test(value);
}

function initFieldState($field) {
  $field.data({
    touched: false,
    initialValue: $field.val().trim()
  });
}

function showError($field, message) {
  $field.addClass("is-invalid").attr("aria-invalid", "true");

  const $error = getOrCreateErrorElement($field, message);

  $field.attr("aria-describedby", $error.attr("id"));
}

function clearError($field) {
  $field
    .removeClass("is-invalid")
    .removeAttr("aria-invalid")
    .removeAttr("aria-describedby");
  removeErrorElement($field);
}


function resetForm($form) {
  $form.removeClass("is-success");
  $form.data("submitted", false);

  const fields = $form.find("input, textarea");

  fields.each(function () {
    const $field = $(this);
    clearTimeout($field.data("debounceTimer"));

    // $field.val("");
    clearError($field);
    initFieldState($field);
  });
}
