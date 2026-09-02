import getRandomImageUrl from "../util/random-image.js";

export default function initImageButtonHandler() {
  $("#new-image-btn").on("click", getRandomImage);
  getRandomImage();
}

function getRandomImage() {
  const url = getRandomImageUrl();
  const $img = $("#current-image");
  if (!$img) return;

  const tester = new Image;

  tester.onload = () => $img.attr('src', url);
  tester.onerror = () => {
    $($img).attr('src', '../../assets/placeholder.png');
    console.error('Unable to load image:', url)
  };
  tester.src = url;
}