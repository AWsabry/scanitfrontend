import Cookies from "js-cookie";
import {decode, encode} from "js-base64";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";

const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const encodedToken = Cookies.get("access_token");
    const token = encodedToken && decode(encodedToken);
     if(token){
       setIsLoggedIn(true);
       if(!Cookie.get("user_email") || !Cookie.get("user_name") || !Cookie.get("download_limit")){
           const headers = {
               'Authorization': 'Bearer ' + token,
           }
         axios.post('https://api.3dscanit.org/user', {}, { headers })
             .then(response => {
                 if(!response.data.is_active){
                     alert("Your account is not active, please check your email for activation link or contact us!");
                     Cookies.remove("access_token");
                     setIsLoggedIn(false);
                     return;
                 }
               // response is a user object json
               Cookie.set("user_name", `${response.data.first_name} ${response.data.last_name}`)
               Cookie.set("user_email", response.data.email)
               Cookie.set("download_limit", response.data.download_limit)
             })
             .catch(e => {
               setIsLoggedIn(false);
             })
       }
     }else{
       setIsLoggedIn(false);
     }
  }, []);

  return isLoggedIn;
};

export default useIsLoggedIn;
