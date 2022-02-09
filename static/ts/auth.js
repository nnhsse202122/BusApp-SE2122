gapi.load("auth2", () => {
    auth2 = gapi.auth2.init({
        client_id: "319647294384-m93pfm59lb2i07t532t09ed5165let11.apps.googleusercontent.com"
    });
    gapi.signin2.render("login-btn", {
        "scope": "profile email",
        "width": 240,
        "height": 50,
        "longtitle": true,
        "theme": "dark",
        "onsuccess": (user) => {
            document.cookie = `token=${user.getAuthResponse().id_token}`;
            window.location.replace("/admin");
        }
    });
});