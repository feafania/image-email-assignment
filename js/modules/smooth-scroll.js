export function initSmoothScroll() {
  $('a[href^="#"], a[href^="./#"]').on("click", function (event) {
    const href = $(this).attr("href");

    if (!href) {
      return;
    }

    const target = href.includes("#") ? `#${href.split("#")[1]}` : href;

    if (target === "#") {
      return;
    }

    const $target = $(target);

    if (!$target.length) {
      return;
    }

    event.preventDefault();

    $("html, body").stop().animate(
      {
        scrollTop: $target.offset().top,
      },
      {
        duration: 600,
        easing: "linear",
      }
    );
  });
}