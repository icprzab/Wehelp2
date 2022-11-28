var page = 0;
var pageCAT = 0;


// function getCategories() {
//     fetch("/api/categories")
//         .then(function (response) {
//             response.json()
//                 .then(function (data) {
//                     let dataLength3 = data.data.length;
//                     for (let i = 0; i < dataLength; i++) {
//                         let categories = document.createElement("div");
//                         document.getElementById("flex-container2").appendChild(categories).setAttribute("class", "flexbox2");

//                         let img = document.createElement("div");
//                         attractions.appendChild(img).setAttribute("class", "flexbox-image");
//                     }
//                 })
//         })
// }

// getCategories();


function getData() {
    fetch("/api/attractions?page=" + page)
        .then(function (response) {
            response.json()
                .then(function (data) {
                    if (data.nextPage === null) {
                        observer.unobserve(document.getElementsByClassName("footer")[0]);
                        page = 0;
                        let dataLength = data.data.length;
                        for (let i = 0; i < dataLength; i++) {
                            let attractions = document.createElement("div");
                            document.getElementById("flex-container").appendChild(attractions).setAttribute("class", "flexbox");

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

                            let attractions = document.createElement("div");
                            document.getElementById("flex-container").appendChild(attractions).setAttribute("class", "flexbox");

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
                })
        })

}

var options = {
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.5
};
let observer = new IntersectionObserver(handleIntersect, options);
observer.observe(document.getElementsByClassName("footer")[0]);
function handleIntersect(entries) {
    if (entries[0].isIntersecting) {
        getData();
    }
};

var dialog = document.getElementById("dialog");
function showDialog() {
    dialog.style.display = "block";
}

function closeDialog() {
    dialog.style.display = "none";
}

document.getElementById("taipei101Button").addEventListener("click", function () {
    observer.disconnect();
    pageCAT = 0;

    if (typeof entries !== "undefined") {
        observer2.disconnect();
        document.getElementById("flex-container").innerHTML = "";

        let observer2 = new IntersectionObserver(handleIntersect, options);
        observer2.observe(document.getElementsByClassName("footer")[0]);
        function handleIntersect(entries) {
            if (entries[0].isIntersecting) {
                getData2();
                console.log("一")
            }
        };

        function getData2() {
            console.log("二")
            let inputAttraction = document.getElementById("inputAttraction").value;
            console.log(inputAttraction)

            fetch("/api/attractions?keyword=" + inputAttraction + "&page=" + pageCAT)
                .then(function (response) {
                    response.json()
                        .then(function (data) {
                            console.log("三")
                            if (data.nextPage === null) {
                                console.log("四")
                                observer2.unobserve(document.getElementsByClassName("footer")[0]);
                                pageCAT = 0;
                                let dataLength2 = data.data.length;
                                for (let i = 0; i < dataLength2; i++) {
                                    let attractions = document.createElement("div");
                                    attractions.setAttribute("id", "flexbox");
                                    document.getElementById("flex-container").appendChild(attractions).setAttribute("class", "flexbox");

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
                                console.log("五")
                            }

                            else if (data.nextPage !== null) {
                                let dataLength2 = data.data.length;
                                console.log("六")
                                for (let i = 0; i < dataLength2; i++) {
                                    let attractions = document.createElement("div");
                                    attractions.setAttribute("id", "flexbox");
                                    document.getElementById("flex-container").appendChild(attractions).setAttribute("class", "flexbox");

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
                                pageCAT = data.nextPage;
                                console.log("七")
                            }

                        })
                })

        }
    }


    else if (typeof entries === "undefined") {
        document.getElementById("flex-container").innerHTML = "";

        let observer2 = new IntersectionObserver(handleIntersect, options);
        observer2.observe(document.getElementsByClassName("footer")[0]);
        function handleIntersect(entries) {
            if (entries[0].isIntersecting) {
                getData2();
                console.log("1")
            }
        };

        function getData2() {
            console.log("2")
            let inputAttraction = document.getElementById("inputAttraction").value;

            fetch("/api/attractions?keyword=" + inputAttraction + "&page=" + pageCAT)
                .then(function (response) {
                    response.json()
                        .then(function (data) {
                            console.log("3")
                            if (data.nextPage === null) {
                                console.log("4")
                                observer2.unobserve(document.getElementsByClassName("footer")[0]);
                                pageCAT = 0;
                                let dataLength2 = data.data.length;
                                for (let i = 0; i < dataLength2; i++) {
                                    let attractions = document.createElement("div");
                                    attractions.setAttribute("id", "flexbox");
                                    document.getElementById("flex-container").appendChild(attractions).setAttribute("class", "flexbox");

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
                                console.log("5")
                            }

                            else if (data.nextPage !== null) {
                                let dataLength2 = data.data.length;
                                console.log("6")
                                for (let i = 0; i < dataLength2; i++) {
                                    let attractions = document.createElement("div");
                                    attractions.setAttribute("id", "flexbox");
                                    document.getElementById("flex-container").appendChild(attractions).setAttribute("class", "flexbox");

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
                                pageCAT = data.nextPage;
                                console.log("7")
                            }

                        })
                })

        }
    }

})




