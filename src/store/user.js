/**
 * Created by spring on 2018/4/8.
 */

import LocalStorage from "./local-storage";
import Types from "./types";
import Services from '../services/login';
export default {
  state: {
    get user(){
      let user =  LocalStorage.getItem(Types.GET_USER);
      if (!user) user = {};
      return user;
    },
    set user(value){
      LocalStorage.setItem(Types.GET_USER, value);
    },
    get token() {
      if (this.user) {
        return this.user[Types.TOKEN];
      }else {
        return null;
      }
    },
      get expiretime() {
          if (this.user) {
              return this.user[Types.EXPIRE_TIME];
          }else {
              return null;
          }
      }
  },
  login(access) {
    return Services.login(access).then(res => {
      if (res.data.data) {
       this.state.user = res.data.data;
        return res.data.data
      } else {
        throw new Error(res.data.msg)
      }
    }).catch(err => Promise.reject(err))
  }
}
