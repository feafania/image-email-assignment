
export default function getRandomImageUrl() {
  const seed = Date.now();
  return `https://picsum.photos/seed/${seed}/600/400`;
}