/**
 * Created by spring on 2018/1/19.
 */
const ls = window.localStorage;
export default {
  getItem(key) {
    try {
      return JSON.parse(ls.getItem(key))
    } catch (err) {
      return null
    }
  },
  setItem(key, val) {
    if (val && typeof(val) != 'string') val = JSON.stringify(val)
    ls.setItem(key, val)
  },
  clear() {
    ls.clear()
  },
  keys() {
    return ls.keys()
  },
  removeItem(key) {
    ls.removeItem(key)
  }
}
