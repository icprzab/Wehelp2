var orderKeyword = location.search;
var split = orderKeyword.split("=");
var number = split[1];
var splitNumber = number.split("&");
var sectionTopLogin = document.getElementById("sectionTopLogin");
var sectionTopLogout = document.getElementById("sectionTopLogout");
var windowOutside = document.getElementById("windowOutside");
var orderNumber = document.getElementById("orderNumber");
var footer = document.getElementById("footer");
var orderSuccess = document.getElementById("order-success");
var orderThanks = document.getElementById("order-thanks");

let model = {
    dataJWT: null,
    dataBookingInfo: null,
    dataLogoutButton: null,
    dataDeleteBooking: null,
    responseStatus: null,
    dataOrder: null,
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
    },
}

let view = {
    renderInit: function (data) {
        if (data === null) {
            location.replace('http://54.248.52.136:3000/');
        }
        if (data !== null) {
            contorller.deleteBooking()
            orderNumber.innerHTML = splitNumber[0]
            if (split[2] == "success") {
                orderSuccess.innerHTML = "行程預定成功，訂單編號如下"
                orderThanks.innerHTML = "感謝您的預定！"
            }

            if (split[2] == "fail") {
                orderSuccess.innerHTML = "付款失敗，訂單編號如下"
                orderThanks.innerHTML = "很抱歉，請重新下單"
            }

        }
    },

    renderFrontPage: function () {
        location.replace('http://54.248.52.136:3000/');
    },


    renderLogoutButton: function (data) {
        if (data.ok == true) {
            location.replace('http://54.248.52.136:3000/');
        }
        else {
            location.reload(true);
        }
    },

    renderBookingPage: function () {
        location.replace('http://54.248.52.136:3000/booking')
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


    logoutButton: async function () {
        await model.logoutButton();
        view.renderLogoutButton(model.dataLogoutButton);
    },

    bookingPage: function () {
        view.renderBookingPage();
    },

    deleteBooking: async function () {
        await model.deleteBooking();
    },


}

contorller.init();


