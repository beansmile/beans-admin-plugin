export function sleep(time) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, time);
  });
}