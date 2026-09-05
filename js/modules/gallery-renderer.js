  import { hasAssignment, removeAssignment, removeImageFromAssignments } from "./assignments-manager.js";
  import ERROR_MESSAGES from "../config/errors.js";

  export function updateImageGallery({ email, image } = {}) {
    if (!email) {
      throw new Error(ERROR_MESSAGES.INVALID_EMAIL);
    }

    if (!image) {
      throw new Error(ERROR_MESSAGES.IMAGE_NOT_FOUND);
    }

    const $assignment = getAssignment(email);
    appendImageToGallery($assignment, email, image);
  }

  function getAssignment(email) {
    let $assignment = $(`.assignment-card[data-email="${email}"]`);
    if (!$assignment.length) {
      const $assignments = $(`#assignments-container`)

      $assignment = $('<article>').addClass("assignment-card").attr('data-email',email);

      const $header = $("<div>").addClass("assignment-card__header");
      const $email = $("<h3>").addClass("assignment-card__email").text(email);

      const $button = addRemoveButton(
        {
          className: "assignment-card__remove",
          ariaLabel: "Remove email block"
        },
        {
          closest: ".assignment-card",
          removeFn: removeAssignment,
          args: [email],
        }
      );

      const $gallery = $("<div>").addClass("assignment-card__gallery");

      $header.append($email,$button);

      $assignment.append($header,$gallery);

      $assignments.append($assignment);

    }

    return $assignment;
  }

  function appendImageToGallery($assignment, email, image) {
    const $imageBlock = $('<div>').addClass("assignment-card__image");
    const $image = $('<img>').attr("src",image).attr("alt","Assigned image");

    const $button = addRemoveButton(
      {
        className: "assignment-card__image-remove",
        ariaLabel: "Remove image"
      },
      {
        closest: ".assignment-card__image",
        removeFn: removeImageFromAssignments,
        args: [{ email, image }],
        removeParentIfEmpty: true
      }
    );

    $imageBlock.append($image, $button);

    const $gallery = $assignment.find('.assignment-card__gallery');
    if ($gallery.length) {
      $gallery.append($imageBlock);
    }
  }


  function addRemoveButton(
    { className,
      ariaLabel
    } = {},
    {
      closest,
      removeFn,
      args,
      removeParentIfEmpty = false
    } = {}) {
    const $button =  $("<button>")
      .addClass(className)
      .attr("aria-label", ariaLabel)
      .html('<i class="fa-solid fa-trash-can"></i>');

    $button.on('click', function(e) {

      e.stopPropagation();
      try {
        removeFn(...args);
        let $object = $(this).closest(closest);
        const email = args?.[0]?.email;

        if (removeParentIfEmpty && email && !hasAssignment([email])) {
          $object = $object.closest(".assignment-card");
        }
        $object.remove();
      } catch (e) {
        console.error(e);
      }
    });

    return $button;
  }