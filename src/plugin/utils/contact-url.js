/**
 * 拼接路径path
 *
 * @param  {Array} 例：contactUrl('a', 'b', 'c')
 * @param  {Array} 例：contactUrl(['a', 'b', 'c'], true)
 *
 * @return {String}     例：'a/b/c'
 */
export function contactUrl(...res) {
  let pathArray = res;
  let isTrim = true;
  let firstCharAt = '';
  let lastCharAt = '';
  if (res[0] instanceof Array) {
    pathArray = res[0];
    // 如果第一个参数是数组，那第二个参数为表示是否去掉前后的 '/'
    isTrim = res[1] === false ? false : true;
  }

  if (!isTrim) {
    firstCharAt = String(pathArray[0])[0] === '/' ? '/' : '';
    const last = String(pathArray[pathArray.length - 1]);
    lastCharAt = last[last.length - 1] === '/' ? '/' : '';
  }

  const path = pathArray.filter(Boolean).map(item => String(item).replace(/^\/|\/$/g, '')).join('/');
  return firstCharAt + path + lastCharAt;
}
