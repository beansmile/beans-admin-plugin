export function getImageInfo(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = () => reject({ width: 0, height: 0 });
    img.src = src;
  });
}
