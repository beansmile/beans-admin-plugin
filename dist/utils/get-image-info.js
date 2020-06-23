export function getImageInfo(src) {
  return new Promise(function (resolve, reject) {
    var img = new Image();

    img.onload = function () {
      return resolve({
        width: img.width,
        height: img.height
      });
    };

    img.onerror = function () {
      return reject({
        width: 0,
        height: 0
      });
    };

    img.src = src;
  });
}