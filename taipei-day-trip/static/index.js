var page = 0;
var sectionTopLogin = document.getElementById("sectionTopLogin");
var sectionTopLogout = document.getElementById("sectionTopLogout");
var options = {
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.5
};
var observer = new IntersectionObserver(handleIntersect, options);

let model = {
    dataResult: null,
    checkLogin: function () {
        return fetch(
            "/api/user/auth", {
            method: "GET"
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.dataResult = data.data;
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
                this.dataResult = data;
            });
    },

    getData: function () {
        var inputAttraction = document.getElementById("inputAttraction").value;
        return fetch("/api/attractions?keyword=" + inputAttraction + "&page=" + page)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
                this.dataResult = data;
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
            categories.setAttribute("onclick", `inputCategory("${data.data[i]}")`);
            document.getElementById("dialog").appendChild(categories).setAttribute("class", "flexbox");
        }
    },

    renderAttractions: function (data) {
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
        }
    }

};

let contorller = {
    init: async function () {
        await model.checkLogin();
        await view.renderCheckLogin(model.dataResult);
        await model.categories();
        view.renderCategories(model.dataResult);
        // view.renderNextPage();
    },
    getData: async function () {
        await model.getData();
        view.renderAttractions(model.dataResult);
    }
};

contorller.init();


observer.observe(document.getElementsByClassName("footer")[0]);

function handleIntersect(entries) {
    if (entries[0].isIntersecting) {
        contorller.getData();
    }
};



function inputCategory(inputData) {
    var input = document.getElementById("inputAttraction");
    input.value = inputData;
};

var windowBackground = document.getElementById("windowBackground");
var windowOutside = document.getElementById("windowOutside");
function showWindow() {
    windowBackground.style.display = "flex";
    windowOutside.style.display = "flex";
    observer.unobserve(document.getElementsByClassName("footer")[0]);
}

function closeWindow() {
    windowBackground.style.display = "none";
    windowOutside.style.display = "none";
    observer.observe(document.getElementsByClassName("footer")[0]);
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

function singupButton() {
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

var dialog = document.getElementById("dialog");
var dialogOutside = document.getElementById("dialogOutside");
function showDialog() {
    dialogOutside.style.display = "flex";
}

function closeDialog() {
    dialogOutside.style.display = "none";
}

// function getData() {
//     var inputAttraction = document.getElementById("inputAttraction").value;
//     fetch("/api/attractions?keyword=" + inputAttraction + "&page=" + page)
//         .then(function (response) {
//             response.json()
//                 .then(function (data) {
//                     if (data.nextPage === null) {
//                         page = 0;
//                         observer.unobserve(document.getElementsByClassName("footer")[0]);
//                         let dataLength = data.data.length;
//                         for (let i = 0; i < dataLength; i++) {
//                             let attractions = document.createElement("a");
//                             attractions.setAttribute("href", " http://172.20.10.2:3000/attraction/" + data.data[i].id);
//                             document.getElementById("flex-container2").appendChild(attractions).setAttribute("class", "flexbox2");

//                             let img = document.createElement("img");
//                             img.src = data.data[i].images[0];
//                             attractions.appendChild(img).setAttribute("class", "flexbox-image");

//                             let attractionsData = document.createElement("div");
//                             attractions.appendChild(attractionsData).setAttribute("class", "attractionsBottom");

//                             let attractionsBottomMRT = document.createElement("div");
//                             attractionsBottomMRT.textContent = data.data[i].mrt;
//                             attractionsData.appendChild(attractionsBottomMRT).setAttribute("class", "attractionsBottomMRT");

//                             let attractionsBottomCAT = document.createElement("div");
//                             attractionsBottomCAT.textContent = data.data[i].category;
//                             attractionsData.appendChild(attractionsBottomCAT).setAttribute("class", "attractionsBottomCAT");

//                             let attractionsMiddle = document.createElement("div");
//                             attractions.appendChild(attractionsMiddle).setAttribute("class", "attractionsMiddle");

//                             let attractionsMiddleText = document.createElement("div");
//                             attractionsMiddleText.textContent = data.data[i].name;
//                             attractionsMiddle.appendChild(attractionsMiddleText).setAttribute("class", "attractionsMiddleText");
//                         }
//                     }

//                     else if (data.nextPage !== null) {
//                         let dataLength = data.data.length;
//                         for (let i = 0; i < dataLength; i++) {

//                             let attractions = document.createElement("a");
//                             attractions.setAttribute("href", " http://172.20.10.2:3000/attraction/" + data.data[i].id);
//                             document.getElementById("flex-container2").appendChild(attractions).setAttribute("class", "flexbox2");

//                             let img = document.createElement("img");
//                             img.src = data.data[i].images[0];
//                             attractions.appendChild(img).setAttribute("class", "flexbox-image");

//                             let attractionsData = document.createElement("div");
//                             attractions.appendChild(attractionsData).setAttribute("class", "attractionsBottom");

//                             let attractionsBottomMRT = document.createElement("div");
//                             attractionsBottomMRT.textContent = data.data[i].mrt;
//                             attractionsData.appendChild(attractionsBottomMRT).setAttribute("class", "attractionsBottomMRT");

//                             let attractionsBottomCAT = document.createElement("div");
//                             attractionsBottomCAT.textContent = data.data[i].category;
//                             attractionsData.appendChild(attractionsBottomCAT).setAttribute("class", "attractionsBottomCAT");


//                             let attractionsMiddle = document.createElement("div");
//                             attractions.appendChild(attractionsMiddle).setAttribute("class", "attractionsMiddle");

//                             let attractionsMiddleText = document.createElement("div");
//                             attractionsMiddleText.textContent = data.data[i].name;
//                             attractionsMiddle.appendChild(attractionsMiddleText).setAttribute("class", "attractionsMiddleText");
//                         }
//                         page = data.nextPage;
//                     }
//                 })
//         })
// }

document.getElementById("taipei101Button").addEventListener("click", function () {
    page = 0;
    // view.cancelNextPage();
    observer.unobserve(document.getElementsByClassName("footer")[0]);
    document.getElementById("flex-container2").innerHTML = "";
    // view.renderNextPage();
    observer.observe(document.getElementsByClassName("footer")[0]);
})




