import { gapi } from "gapi-script";
let auth2;
gapi.load("auth2", () => {
    let auth2 = gapi.auth2.init({
        client_id: "245771948528-c31us1t1k3l0tpmlcm2kq8jd33jmd6rj.apps.googleusercontent.com"
    });
});
gapi.signin2.render("login-btn", {
    "scope": "profile email",
    "width": 240,
    "height": 50,
    "longtitle": true,
    "theme": "dark"
});
