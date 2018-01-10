/**
 * 解析url参数
 * @example ?id=123456&a=b
 * @return Object {id:1213,a:b}
 */
export function urlParse () {
  let url = window.location.search
  let Obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg) // 结果是一个数组['?id=1213','&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      Obj[key] = val
    })
  }
  return Obj
}
