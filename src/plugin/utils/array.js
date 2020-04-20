export function arrayMove(arr, fromIndex, toIndex) {
  const array = arr.slice();
  array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
  return array;
}
