/**
 * Created by spring on 2018/4/8.
 */
import HttpClient from 'axios'
import Config from "../config";
export default {
  login(access) {
    return HttpClient.post('accounts/login', access, {baseURL: Config.URL_API}).then(res => {
      return res;
    })
  }
}
