gapi.load("auth2", () => {
    auth2 = gapi.auth2.init({
        client_id: "319647294384-m93pfm59lb2i07t532t09ed5165let11.apps.googleusercontent.com"
    });
    document.querySelector("#google-login").addEventListener("click", doLogin); 

    async function doLogin() { // Adds click listener to #google-login button which will do the login
        try {
            var googleUser = await gapi.auth2.getAuthInstance().signIn(); // Prompts the user to sign in with google and get a GoogleUser corresponding to them
        } catch (e) {
            console.log("error with login prompt:", e); // If there is an error (eg. closed the prompt, something else went wrong) log it and don't continue
            return;
        }
        await fetch("/auth/v1/google", { // Sends the googleUser's id_token which has all the data we want to the server with a POST request
            method: "POST",
            body: JSON.stringify({
                token: googleUser.getAuthResponse().id_token
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        // Redirects user to admin page regardless of authorization. The /admin route takes care of authorization
        window.location = "/admin";
    }
});
