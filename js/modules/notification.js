const NOTIFICATION_DURATION = 3000;
const DISAPPEARING_DURATION = 300;

export function showNotification(
  message,
  type = "info"
) {
  const $container = $("#notifications");

  const $notification = $("<div>")
    .addClass("notification")
    .addClass(`notification--${type}`)
    .text(message);

  $container.append($notification);

  requestAnimationFrame(() => {
    $notification.addClass("notification--visible");
  });

  setTimeout(() => {
    $notification.removeClass(
      "notification--visible"
    );

    setTimeout(() => {
      $notification.remove();
    }, DISAPPEARING_DURATION);

  }, NOTIFICATION_DURATION);
}