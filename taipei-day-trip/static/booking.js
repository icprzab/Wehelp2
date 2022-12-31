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
var creditCardNumber = document.getElementById("credit-card-number");
var creditCardDate = document.getElementById("credit-card-date");
var creditCardCCV = document.getElementById("credit-card-ccv");

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

    getPrime: function (event) {
        event.preventDefault()
        const tappayStatus = TPDirect.card.getTappayFieldsStatus()
        if (tappayStatus.canGetPrime === false) {
            console.log('can not get prime')
            return
        }

        TPDirect.card.getPrime(async (result) => {
            const res = await pay({
                "prime": result.card.prime,
            });
        });

        const pay = async (data) => {
            console.log(data)
            let contactName = document.getElementById("contact-name");
            let contactEmail = document.getElementById("contact-email");
            let contactPhone = document.getElementById("contact-phone");
            let orderInfo = {
                "prime": data["prime"],
                "order": {
                    "price": this.dataBookingInfo["data"]["price"],
                    "trip": {
                        "attraction": {
                            "id": this.dataBookingInfo["data"]["attraction"]["id"],
                            "name": this.dataBookingInfo["data"]["attraction"]["name"],
                            "address": this.dataBookingInfo["data"]["attraction"]["address"],
                            "image": this.dataBookingInfo["data"]["attraction"]["image"]
                        },
                        "date": this.dataBookingInfo["data"]["date"],
                        "time": this.dataBookingInfo["data"]["time"]
                    },
                    "contact": {
                        "name": contactName.value,
                        "email": contactEmail.value,
                        "phone": contactPhone.value
                    }
                }
            };

            return fetch("/api/orders", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(orderInfo),
                cache: "no-cache",
                headers: {
                    "content-type": "application/json"
                }
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let orderNumber = data.number
                    if (data.ok == true) {
                        location.replace("http://54.248.52.136:3000/thankyou?number=" + orderNumber + "&paid=success");
                    }

                    if (data.ok == false) {
                        location.replace("http://54.248.52.136:3000/thankyou?number=" + orderNumber + "&paid=fail");
                    }


                });
        }
    }
}

let view = {
    renderInit: function (data) {
        if (data === null) {
            location.replace("http://54.248.52.136:3000/");
        }
        if (data !== null) {
            let bookingName = document.getElementById("booking-name");
            bookingName.innerHTML = "您好，" + data.name + "，待預訂的行程如下：";
            contorller.bookingInfo();
        }
    },

    renderTapPay: function () {

        TPDirect.setupSDK(`${APP_ID}`, `${APP_KEY}`, 'sandbox')

        var fields = {
            number: {
                element: '#card-number',
                placeholder: '**** **** **** ****'
            },
            expirationDate: {
                element: document.getElementById('card-expiration-date'),
                placeholder: 'MM / YY'
            },
            ccv: {
                element: '#card-ccv',
                placeholder: 'CVV'
            }
        }

        TPDirect.card.setup({
            fields: fields,
            styles: {
                'input': {
                    'color': 'gray',
                    'font-family': 'Noto Sans TC',
                },
                'input.ccv': {
                    'font-size': '16px'
                },
                'input.expiration-date': {
                    'font-size': '16px'
                },
                'input.card-number': {
                    'font-size': '16px'
                },
                ':focus': {
                    'color': 'black',
                    'border-color': 'black',
                    'border-width': '1.5px'
                },
                '.valid': {
                    'color': 'green'
                },
                '.invalid': {
                    'color': 'red'
                },
                '@media screen and (max-width: 400px)': {
                    'input': {
                        'color': 'black'
                    }
                }
            },
            isMaskCreditCardNumber: true,
            maskCreditCardNumberRange: {
                beginIndex: 6,
                endIndex: 11
            }
        })
    },

    renderFrontPage: function () {
        location.replace("http://54.248.52.136:3000/");
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
            location.replace("http://54.248.52.136:3000/");
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

    renderIsInputNumber: function (evt) {
        var x = evt.which || evt.keyCode;
        var ch = String.fromCharCode(x);
        if (!(/[0-9]/.test(ch))) {
            evt.preventDefault();
        }
    },
};

let contorller = {
    init: async function () {
        await model.init();
        await view.renderInit(model.dataJWT);
        view.renderTapPay();
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

    isInputNumber: function (evt) {
        view.renderIsInputNumber(evt);
    },

    order: function (event) {
        model.getPrime(event);
    },

}

contorller.init();


