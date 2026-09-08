const list = [];
const usedImageIds = new Set();

export default async function getRandomImageUrl() {
  if (list.length === 0) {
    await getImageIdList();
  }

  if (list.length === 0) {
    throw new Error("Unable to load image list");
  }

  const availableImages = list.filter(
    (image) => !usedImageIds.has(image.id)
  );

  if (availableImages.length === 0) {
    usedImageIds.clear();
  }

  const available =
    availableImages.length > 0
      ? availableImages
      : list;

  const pic =
    available[Math.floor(Math.random() * available.length)];

  usedImageIds.add(pic.id);

  return `https://picsum.photos/id/${pic.id}/600/400`;
}

export async function getImageIdList() {
  const res = await fetch(
    "https://picsum.photos/v2/list?page=1&limit=1000"
  );

  if (!res.ok) {
    throw new Error("Unable to load image list");
  }

  const listReturned = await res.json();

  listReturned.forEach((item) => {
    list.push(item);
  });
}