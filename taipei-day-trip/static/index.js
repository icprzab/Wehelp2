var page = 0;
var sectionTopLogin = document.getElementById("sectionTopLogin");
var sectionTopLogout = document.getElementById("sectionTopLogout");
var options = {
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.5
};

var windowBackground = document.getElementById("windowBackground");
var windowOutside = document.getElementById("windowOutside");
var windowPage = document.getElementById("windowPage");
var signupText = document.getElementById("signupText");
var signinText = document.getElementById("signinText");
var inputName = document.getElementById("inputName");
var memberText = document.getElementById("memberText");
var login = document.getElementById("login");
var signup = document.getElementById("signup");
var inputEmail = document.getElementById("inputEmail");
var inputPassword = document.getElementById("inputPassword");
var emailRepeat = document.getElementById("emailRepeat");
var signupSuccess = document.getElementById("signupSuccess");
var loginFail = document.getElementById("loginFail");
var signupFail = document.getElementById("signupFail");
var dialog = document.getElementById("dialog");
var dialogOutside = document.getElementById("dialogOutside");
var inputAttraction = document.getElementById("inputAttraction");
var taipei101Button = document.getElementById("taipei101Button");
var clickDialog = 0;
var body = document.querySelector("body");

let model = {
    dataCheckLogin: null,
    dataCategories: null,
    dataGetAttractions: null,
    dataLoginButton: null,
    dataSignupButton: null,
    dataLogoutButton: null,
    responseStatus: null,
    dataReturnBooking: null,
    checkLogin: function () {
        return fetch(
            "/api/user/auth", {
            method: "GET"
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.dataCheckLogin = data.data;
            });
    },
    categories: function () {
        return fetch(
            "/api/categories", {
            method: "GET"
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.dataCategories = data;
            });
    },

    getAttractions: function () {
        let inputAttractionValue = inputAttraction.value;
        return fetch("/api/attractions?keyword=" + inputAttractionValue + "&page=" + page)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.dataGetAttractions = data;
            });
    },

    loginButton: function () {
        let inputLogin = {
            "email": inputEmail.value,
            "password": inputPassword.value,
        };
        return fetch("/api/user/auth", {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(inputLogin),
            cache: "no-cache",
            headers: {
                "content-type": "application/json"
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.dataLoginButton = data;
            });
    },

    signupButton: function () {
        let inputSignup = {
            "name": inputName.value,
            "email": inputEmail.value,
            "password": inputPassword.value,
        };

        return fetch("/api/user", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(inputSignup),
            cache: "no-cache",
            headers: {
                "content-type": "application/json"
            }
        })
            .then((response) => {
                this.responseStatus = response.status;
                return response.json();
            })
            .then((data) => {
                this.dataSignupButton = data;
            });
    },

    logoutButton: function () {
        return fetch("/api/user/auth", {
            method: "DELETE"
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.dataLogoutButton = data;
            });
    },

    returnBooking: function () {
        return fetch(
            "/api/user/auth", {
            method: "GET"
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.dataReturnBooking = data.data;
            });
    },
}


let view = {
    renderCheckLogin: function (data) {
        if (data === null) {
            sectionTopLogin.style.display = "flex";
            sectionTopLogout.style.display = "none";
        }
        if (data !== null) {
            sectionTopLogin.style.display = "none";
            sectionTopLogout.style.display = "flex";
        }
    },
    renderCategories: function (data) {
        let dataLength3 = data.data.length;
        for (let i = 0; i < dataLength3; i++) {
            let categories = document.createElement("button");
            categories.textContent = data.data[i];
            categories.setAttribute("onclick", `contorller.inputCategory("${data.data[i]}")`);
            document.getElementById("dialog").appendChild(categories).setAttribute("class", "flexbox");
        }
    },

    renderGetAttractions: function (data) {
        if (data.nextPage === null) {
            page = 0;
            observer.unobserve(document.getElementsByClassName("footer")[0]);
            let dataLength = data.data.length;
            for (let i = 0; i < dataLength; i++) {
                let attractions = document.createElement("a");
                attractions.setAttribute("href", " http://54.248.52.136:3000/attraction/" + data.data[i].id);
                document.getElementById("flex-container2").appendChild(attractions).setAttribute("class", "flexbox2");

                let img = document.createElement("img");
                img.src = data.data[i].images[0];
                attractions.appendChild(img).setAttribute("class", "flexbox-image");

                let attractionsData = document.createElement("div");
                attractions.appendChild(attractionsData).setAttribute("class", "attractionsBottom");

                let attractionsBottomMRT = document.createElement("div");
                attractionsBottomMRT.textContent = data.data[i].mrt;
                attractionsData.appendChild(attractionsBottomMRT).setAttribute("class", "attractionsBottomMRT");

                let attractionsBottomCAT = document.createElement("div");
                attractionsBottomCAT.textContent = data.data[i].category;
                attractionsData.appendChild(attractionsBottomCAT).setAttribute("class", "attractionsBottomCAT");

                let attractionsMiddle = document.createElement("div");
                attractions.appendChild(attractionsMiddle).setAttribute("class", "attractionsMiddle");

                let attractionsMiddleText = document.createElement("div");
                attractionsMiddleText.textContent = data.data[i].name;
                attractionsMiddle.appendChild(attractionsMiddleText).setAttribute("class", "attractionsMiddleText");
            }
            inputAttraction.value = "";
        }

        else if (data.nextPage !== null) {
            let dataLength = data.data.length;
            for (let i = 0; i < dataLength; i++) {

                let attractions = document.createElement("a");
                attractions.setAttribute("href", " http://54.248.52.136:3000/attraction/" + data.data[i].id);
                document.getElementById("flex-container2").appendChild(attractions).setAttribute("class", "flexbox2");

                let img = document.createElement("img");
                img.src = data.data[i].images[0];
                attractions.appendChild(img).setAttribute("class", "flexbox-image");

                let attractionsData = document.createElement("div");
                attractions.appendChild(attractionsData).setAttribute("class", "attractionsBottom");

                let attractionsBottomMRT = document.createElement("div");
                attractionsBottomMRT.textContent = data.data[i].mrt;
                attractionsData.appendChild(attractionsBottomMRT).setAttribute("class", "attractionsBottomMRT");

                let attractionsBottomCAT = document.createElement("div");
                attractionsBottomCAT.textContent = data.data[i].category;
                attractionsData.appendChild(attractionsBottomCAT).setAttribute("class", "attractionsBottomCAT");


                let attractionsMiddle = document.createElement("div");
                attractions.appendChild(attractionsMiddle).setAttribute("class", "attractionsMiddle");

                let attractionsMiddleText = document.createElement("div");
                attractionsMiddleText.textContent = data.data[i].name;
                attractionsMiddle.appendChild(attractionsMiddleText).setAttribute("class", "attractionsMiddleText");
            }
            page = data.nextPage;
            inputAttraction.value = "";
        }
    },

    renderInputCategory: function (data) {
        inputAttraction.value = data;
    },


    renderShowWindow: function () {
        windowBackground.style.display = "flex";
        windowOutside.style.display = "flex";
        observer.unobserve(document.getElementsByClassName("footer")[0]);
    },

    renderCloseWindow: function () {
        inputName.value = "";
        inputEmail.value = "";
        inputPassword.value = "";
        windowBackground.style.display = "none";
        windowOutside.style.display = "none";
        signupSuccess.style.display = "none";
        emailRepeat.style.display = "none";
        loginFail.style.display = "none";
        signupFail.style.display = "none";
        observer.observe(document.getElementsByClassName("footer")[0]);
    },

    renderSignupPage: function () {
        memberText.innerHTML = "註冊會員帳號";
        windowPage.style.height = "332px";
        signupText.style.display = "none";
        signinText.style.display = "flex";
        inputName.style.display = "flex";
        signup.style.display = "flex";
        login.style.display = "none";
        signupSuccess.style.display = "none";
        emailRepeat.style.display = "none";
        loginFail.style.display = "none";
        signupFail.style.display = "none";
        inputName.value = "";
        inputEmail.value = "";
        inputPassword.value = "";
    },

    renderSigninPage: function () {
        memberText.innerHTML = "登入會員帳號";
        windowPage.style.height = "275px";
        signupText.style.display = "flex";
        signinText.style.display = "none";
        inputName.style.display = "none";
        signup.style.display = "none";
        login.style.display = "flex";
        signupSuccess.style.display = "none";
        emailRepeat.style.display = "none";
        loginFail.style.display = "none";
        signupFail.style.display = "none";
        inputName.value = "";
        inputEmail.value = "";
        inputPassword.value = "";
    },
    renderLoginButton: function (data) {
        if (data.ok == true) {
            location.reload(true);
            sectionTopLogin.style.display = "none";
            sectionTopLogout.style.display = "flex";
        }
        if (data.ok !== true) {
            windowPage.style.height = "303px";
            signupSuccess.style.display = "none";
            emailRepeat.style.display = "none";
            loginFail.style.display = "flex";
            signupFail.style.display = "none";
        }
    },

    renderSignupButton: function (data) {
        if (data == 200) {
            windowPage.style.height = "360px";
            signupSuccess.style.display = "flex";
            emailRepeat.style.display = "none";
            loginFail.style.display = "none";
            signupFail.style.display = "none";
        }

        if (data == 400) {
            windowPage.style.height = "360px";
            signupSuccess.style.display = "none";
            emailRepeat.style.display = "flex";
            loginFail.style.display = "none";
            signupFail.style.display = "none";
        }

        if (data == 500) {
            windowPage.style.height = "360px";
            signupSuccess.style.display = "none";
            emailRepeat.style.display = "none";
            loginFail.style.display = "none";
            signupFail.style.display = "flex";
        }
    },

    renderLogoutButton: function (data) {
        if (data.ok == true) {
            location.reload(true);
            sectionTopLogin.style.display = "flex";
            sectionTopLogout.style.display = "none";
        }
    },

    renderSearchAttractions: function () {
        page = 0;
        observer.unobserve(document.getElementsByClassName("footer")[0]);
        document.getElementById("flex-container2").innerHTML = "";
        observer.observe(document.getElementsByClassName("footer")[0]);
    },

    handleIntersect: function (entries) {
        if (entries[0].isIntersecting) {
            contorller.getAttractions();
        }
    },

    renderRefreshPage: function () {
        location.reload(true);
    },

    renderShowDialog: function () {
        body.removeEventListener("click", contorller.closeDialog);
        dialogOutside.style.display = "flex";
        body.addEventListener("click", contorller.closeDialog);
    },

    renderCloseDialog: function (e) {
        clickDialog = 1;
        if (clickDialog = 1) {
            if (!dialogOutside.contains(e.target) && !taipei101Button.contains(e.target) && !inputAttraction.contains(e.target)) {
                dialogOutside.style.display = "none";
                body.removeEventListener("click", contorller.closeDialog);
                clickDialog = 0;
                inputAttraction.value = "";
            }
        }
    },

    renderReturnBooking: function (data) {
        if (data !== null) {
            location.replace('http://54.248.52.136:3000/booking');
        }
        if (data === null) {
            contorller.showWindow();
        }
    }

};

let contorller = {
    init: async function () {
        await model.checkLogin();
        await view.renderCheckLogin(model.dataCheckLogin);
        await model.categories();
        await view.renderCategories(model.dataCategories);
        observer.observe(document.getElementsByClassName("footer")[0]);
    },

    getAttractions: async function () {
        await model.getAttractions();
        view.renderGetAttractions(model.dataGetAttractions);
    },

    inputCategory: function (data) {
        view.renderInputCategory(data);
    },

    showDialog: function (data) {
        view.renderShowDialog(data);
    },

    closeDialog: function (data) {
        view.renderCloseDialog(data);
    },

    showWindow: function () {
        view.renderShowWindow();
    },

    closeWindow: function () {
        view.renderCloseWindow();
    },

    signupPage: function () {
        view.renderSignupPage();
    },

    signinPage: function () {
        view.renderSigninPage();
    },

    loginButton: async function () {
        await model.loginButton();
        view.renderLoginButton(model.dataLoginButton);
    },

    signupButton: async function () {
        await model.signupButton();
        view.renderSignupButton(model.responseStatus);
    },

    logoutButton: async function () {
        await model.logoutButton();
        view.renderLogoutButton(model.dataLogoutButton);
    },

    searchAttractions: function () {
        view.renderSearchAttractions();
    },

    refreshPage: function () {
        view.renderRefreshPage();
    },

    returnBooking: async function () {
        await model.returnBooking();
        view.renderReturnBooking(model.dataReturnBooking);
    },

};

contorller.init();
var observer = new IntersectionObserver(view.handleIntersect, options);
