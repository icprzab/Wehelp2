var attractionID = location.pathname;
var split = attractionID.split("/");
var id = split[2];
var sectionTopLogin = document.getElementById("sectionTopLogin");
var sectionTopLogout = document.getElementById("sectionTopLogout");
var windowOutside = document.getElementById("windowOutside");
var attractionName = document.getElementById("attraction-name");
var attractionDate = document.getElementById("attraction-date");
var attractionTime = document.getElementById("attraction-time");
var attractionPrice = document.getElementById("attraction-price");
var attractionAddress = document.getElementById("attraction-address");
var totalPrice = document.getElementById("total-price");
var deleteButton = document.getElementById("delete");
var image = document.getElementById("image");
var bookingInfo = document.getElementById("booking-info");
var bookingContent = document.getElementById("booking-content");
var bookingContentOutside = document.getElementById("booking-content-outside");
var footer = document.getElementById("footer");
var i = 0;

let model = {
    dataJWT: null,
    dataBookingInfo: null,
    dataLogoutButton: null,
    dataDeleteBooking: null,
    responseStatus: null,
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
    },

    bookingInfo: function () {
        return fetch("/api/booking", {
            method: "GET"
        })
            .then((response) => {
                this.responseStatus = response.status;
                return response.json();
            })
            .then((data) => {
                this.dataBookingInfo = data;
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

    deleteBooking: function () {
        return fetch("/api/booking", {
            method: "DELETE"
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.dataDeleteBooking = data;
            });
    },

}

let view = {
    renderInit: function (data) {
        if (data === null) {
            location.replace('http://172.20.10.2:3000/');
        }
        if (data !== null) {
            let bookingName = document.getElementById("booking-name");
            bookingName.innerHTML = "您好，" + data.name + "，待預訂的行程如下：";
            contorller.bookingInfo();
        }
    },

    renderFrontPage: function () {
        location.replace('http://172.20.10.2:3000/');
    },

    renderBookingInfo: function (data, responseStatus) {
        if (responseStatus == 200) {
            bookingInfo.style.display = "block";
            bookingContentOutside.style.display = "flex";
            attractionName.innerHTML = data.data.attraction.name;
            attractionDate.innerHTML = data.data.date;
            attractionTime.innerHTML = data.data.time;
            attractionPrice.innerHTML = data.data.price;
            attractionAddress.innerHTML = data.data.attraction.address;
            totalPrice.innerHTML = data.data.price;
            deleteButton.style.display = "flex";
            let img = document.createElement("img");
            img.src = data.data.attraction.image[0];
            image.appendChild(img).setAttribute("class", "imageInside");
        }

        if (responseStatus == 403) {
            bookingInfo.style.display = "none";
            bookingContentOutside.style.display = "none";
            let noBooking = document.createElement("div");
            noBooking.textContent = "目前沒有任何待預訂的行程";
            document.getElementById("noBooking").appendChild(noBooking).setAttribute("class", "noBooking");
            footer.style.height = "calc(100vh - 222px)";
            footer.style.alignItems = "start";
            footer.style.marginTop = "40px"
            footer.style.padding = "45px 0px 0px 0px";
        }

    },

    renderLogoutButton: function (data) {
        if (data.ok == true) {
            location.replace('http://172.20.10.2:3000/');
        }
        else {
            location.reload(true);
        }
    },

    renderDeleteBooking: function (data) {
        if (data.ok == true) {
            location.reload(true);
        }
        else {
            location.reload(true);
        }
    },

    renderBookingPage: function () {
        location.reload(true);
    },

    renderBlankSpace: function () {
        let creditCardNumber = document.getElementById("credit-card-number").value;
        if (creditCardNumber.length == 4 || creditCardNumber.length == 9 || creditCardNumber.length == 14) {
            document.getElementById("credit-card-number").value = creditCardNumber + " ";
        }
    },

    renderIsInputNumber: function (evt) {
        var x = evt.which || evt.keyCode;
        var ch = String.fromCharCode(x);
        if (!(/[0-9]/.test(ch))) {
            evt.preventDefault();
        }
    },

    renderSlash: function () {
        let creditCarDate = document.getElementById("credit-card-date").value;
        if (creditCarDate.length == 2) {
            document.getElementById("credit-card-date").value = creditCarDate + " / ";
        }
        if (creditCarDate.length == 3) {
            document.getElementById("credit-card-date").value = creditCarDate + "/ ";
        }
        if (creditCarDate.length == 4) {
            document.getElementById("credit-card-date").value = creditCarDate + " ";
        }
    },

};

let contorller = {
    init: async function () {
        await model.init();
        view.renderInit(model.dataJWT);
    },

    frontPage: function () {
        view.renderFrontPage();
    },

    bookingInfo: async function () {
        await model.bookingInfo();
        view.renderBookingInfo(model.dataBookingInfo, model.responseStatus);
    },

    logoutButton: async function () {
        await model.logoutButton();
        view.renderLogoutButton(model.dataLogoutButton);
    },

    deleteBooking: async function () {
        await model.deleteBooking();
        view.renderDeleteBooking(model.dataDeleteBooking);
    },

    bookingPage: function () {
        view.renderBookingPage();
    },

    blankSpace: function () {
        view.renderBlankSpace();
    },

    isInputNumber: function (evt) {
        view.renderIsInputNumber(evt);
    },

    slash: function () {
        view.renderSlash();
    },
}
contorller.init();




TPDirect.setupSDK(APP_ID, 'APP_KEY', 'sandbox')

var fields = {
    number: {
        element: 4242424242424242,
    },
    expirationDate: {
        element: 01 / 23,
    },
    ccv: {
        element: 123,
    }
}

TPDirect.card.setup({
    fields: fields,
    // 此設定會顯示卡號輸入正確後，會顯示前六後四碼信用卡卡號
    isMaskCreditCardNumber: true,
    maskCreditCardNumberRange: {
        beginIndex: 6,
        endIndex: 11
    }
})


TPDirect.card.onUpdate(function (update) {
    // update.canGetPrime === true
    // --> you can call TPDirect.card.getPrime()
    if (update.canGetPrime) {
        // Enable submit Button to get prime.
        // submitButton.removeAttribute('disabled')
    } else {
        // Disable submit Button to get prime.
        // submitButton.setAttribute('disabled', true)
    }

    // cardTypes = ['mastercard', 'visa', 'jcb', 'amex', 'unknown']
    if (update.cardType === 'visa') {
        // Handle card type visa.
    }

    // number 欄位是錯誤的
    if (update.status.number === 2) {
        // setNumberFormGroupToError()
    } else if (update.status.number === 0) {
        // setNumberFormGroupToSuccess()
    } else {
        // setNumberFormGroupToNormal()
    }

    if (update.status.expiry === 2) {
        // setNumberFormGroupToError()
    } else if (update.status.expiry === 0) {
        // setNumberFormGroupToSuccess()
    } else {
        // setNumberFormGroupToNormal()
    }

    if (update.status.ccv === 2) {
        // setNumberFormGroupToError()
    } else if (update.status.ccv === 0) {
        // setNumberFormGroupToSuccess()
    } else {
        // setNumberFormGroupToNormal()
    }
})


// TPDirect.card.getTappayFieldsStatus()

// call TPDirect.card.getPrime when user submit form to get tappay prime
// $('form').on('submit', onSubmit)

function onSubmit(event) {
    event.preventDefault()
    // 取得 TapPay Fields 的 status
    const tappayStatus = TPDirect.card.getTappayFieldsStatus()

    // 確認是否可以 getPrime
    if (tappayStatus.canGetPrime === false) {
        console.log('can not get prime')
        return
    }

    // Get prime
    TPDirect.card.getPrime((result) => {
        if (result.status !== 0) {
            console.log('get prime error ' + result.msg)

        }
        console.log('get prime 成功，prime: ' + result.card.prime)
        // send prime to your server, to pay with Pay by Prime API .
        // Pay By Prime Docs: https://docs.tappaysdk.com/tutorial/zh/back.html#pay-by-prime-api
    })
}