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
            location.replace('http://54.248.52.136:3000/');
        }
        if (data !== null) {
            let bookingName = document.getElementById("booking-name");
            bookingName.innerHTML = "您好，" + data.name + "，待預訂的行程如下：";
            contorller.bookingInfo();
        }
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
            location.replace('http://54.248.52.136:3000/');
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


};

let contorller = {
    init: async function () {
        await model.init();
        view.renderInit(model.dataJWT);
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

    bookingPage: async function () {
        view.renderBookingPage();
    },

}
contorller.init();








