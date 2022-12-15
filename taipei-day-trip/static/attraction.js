
var attractionID = location.pathname;
var split = attractionID.split("/");
var id = split[2];
var counter = 1;
var sectionTopLogin = document.getElementById("sectionTopLogin");
var sectionTopLogout = document.getElementById("sectionTopLogout");

let model = {
    dataJWT: null,
    init: function () {
        return fetch(
            "/api/user/auth", {
            method: "GET"
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.dataJWT = data.data;
            });
    }
}
let view = {
    render: function (data) {
        console.log(data)
        if (data === null) {
            sectionTopLogin.style.display = "flex";
            sectionTopLogout.style.display = "none";
        }
        if (data !== null) {
            sectionTopLogin.style.display = "none";
            sectionTopLogout.style.display = "flex";
        }
    },
};

let contorller = {
    init: async function () {
        await model.init();
        view.render(model.dataJWT);
    }
}
contorller.init();

var windowBackground = document.getElementById("windowBackground");
var windowOutside = document.getElementById("windowOutside");
function showWindow() {
    windowBackground.style.display = "flex";
    windowOutside.style.display = "flex";
}

function closeWindow() {
    windowBackground.style.display = "none";
    windowOutside.style.display = "none";
}

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

function signupPage() {
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
}

function signinPage() {
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
}

function signupButton() {
    let inputSignup = {
        "name": inputName.value,
        "email": inputEmail.value,
        "password": inputPassword.value,
    };

    fetch("/api/user", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(inputSignup),
        cache: "no-cache",
        headers: {
            "content-type": "application/json"
        }
    })
        .then(function (response) {
            response.json()
                .then(function (data) {
                    if (data.ok == true) {    //null大小寫有差
                        windowPage.style.height = "360px";
                        signupSuccess.style.display = "flex";
                        emailRepeat.style.display = "none";
                        loginFail.style.display = "none";
                        signupFail.style.display = "none";
                    }

                    if (response.status == 400) {
                        windowPage.style.height = "360px";
                        signupSuccess.style.display = "none";
                        emailRepeat.style.display = "flex";
                        loginFail.style.display = "none";
                        signupFail.style.display = "none";
                    }

                    if (response.status == 500) {
                        windowPage.style.height = "360px";
                        signupSuccess.style.display = "none";
                        emailRepeat.style.display = "none";
                        loginFail.style.display = "none";
                        signupFail.style.display = "flex";
                    }
                })
        })
}


function loginButton() {
    let inputLogin = {
        "email": inputEmail.value,
        "password": inputPassword.value,
    };

    fetch("/api/user/auth", {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(inputLogin),
        cache: "no-cache",
        headers: {
            "content-type": "application/json"
        }
    })
        .then(function (response) {
            response.json()
                .then(function (data) {
                    if (data.ok == true) {    //null大小寫有差
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
                })
        })
}

function logoutButton() {
    fetch("/api/user/auth", {
        method: "DELETE"
    })
        .then(function (response) {
            response.json()
                .then(function (data) {
                    if (data.ok == true) {    //null大小寫有差
                        location.reload(true);
                        sectionTopLogin.style.display = "flex";
                        sectionTopLogout.style.display = "none";
                    }
                })
        })
}

function getData() {
    fetch("/api/attraction/" + id)
        .then(function (response) {
            response.json()
                .then(function (data) {
                    let imageLength = data.data.images.length

                    for (let i = 0; i < imageLength; i++) {
                        let img = document.createElement("img");
                        img.src = data.data.images[i];
                        document.getElementById("attraction-image").appendChild(img).setAttribute("class", "attraction-image1 fade");
                        img.style.zIndex = -i;

                        let dot = document.createElement("div");
                        document.getElementById("attraction-dot-outside").appendChild(dot).setAttribute("class", "attraction-dot");

                        let dotEach = document.createElement("button");
                        dotEach.setAttribute("onclick", `currentSlide(${[i + 1]})`);
                        dotEach.setAttribute("id", `dot${[i + 1]}`);

                        dot.appendChild(dotEach).setAttribute("class", "attraction-dot1");
                        document.getElementById("dot1").style.backgroundColor = "black";
                    }

                    let attractionName = document.createElement("div");
                    attractionName.textContent = data.data.name;
                    document.getElementById("attraction-name").appendChild(attractionName).setAttribute("class", "attraction-name1");

                    let attractionCAT = document.createElement("div");
                    attractionCAT.textContent = data.data.category + " at " + data.data.mrt;
                    document.getElementById("attraction-name").appendChild(attractionCAT).setAttribute("class", "attraction-name2");


                    let attractionTextInfo = document.createElement("div");
                    attractionTextInfo.textContent = data.data.description;
                    document.getElementById("attraction-text-info").appendChild(attractionTextInfo).setAttribute("class", "attraction-text-info");

                    let attractionTextAddress1 = document.createElement("div");
                    attractionTextAddress1.textContent = "景點地址：";
                    document.getElementById("attraction-text-address").appendChild(attractionTextAddress1).setAttribute("class", "attraction-text-address1");

                    let attractionTextAddress2 = document.createElement("div");
                    attractionTextAddress2.textContent = data.data.address;
                    document.getElementById("attraction-text-address").appendChild(attractionTextAddress2).setAttribute("class", "attraction-text-address2");

                    let attractionTextTrans1 = document.createElement("div");
                    attractionTextTrans1.textContent = "交通方式：";
                    document.getElementById("attraction-text-trans").appendChild(attractionTextTrans1).setAttribute("class", "attraction-text-trans1");

                    let attractionTextTrans2 = document.createElement("div");
                    attractionTextTrans2.textContent = data.data.transport;
                    document.getElementById("attraction-text-trans").appendChild(attractionTextTrans2).setAttribute("class", "attraction-text-trans2");
                })
        })
}

getData();
var text = document.getElementById("attraction-booking5-fee2");
var button1 = document.getElementById("attraction-booking4-button1");
var button2 = document.getElementById("attraction-booking4-button2");

function first() {
    text.innerHTML = "新台幣 2000 元";
    button1.style.backgroundColor = "#448899";
    button2.style.backgroundColor = "white";
};

function second() {
    text.innerHTML = "新台幣 2500 元";
    button1.style.backgroundColor = "white";
    button2.style.backgroundColor = "#448899";
};


let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("attraction-image1");
    let dots = document.getElementsByClassName("attraction-dot1");
    document.getElementById("dot1").style.backgroundColor = "white";
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "flex";
    document.getElementById("dot1").style.backgroundColor = "";
    dots[slideIndex - 1].className += " active";
}






