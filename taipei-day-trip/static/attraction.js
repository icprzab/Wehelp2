var page = 0;

function getCategories() {
    fetch("/api/categories")
        .then(function (response) {
            response.json()
                .then(function (data) {
                    let dataLength3 = data.data.length;
                    for (let i = 0; i < dataLength3; i++) {
                        let categories = document.createElement("button");
                        categories.textContent = data.data[i];
                        categories.setAttribute("onclick", `inputCategory("${data.data[i]}")`);
                        document.getElementById("dialog").appendChild(categories).setAttribute("class", "flexbox");
                    }
                })
        })
}
getCategories();

function inputCategory(inputData) {
    var input = document.getElementById("inputAttraction");
    input.value = inputData;
};

var dialog = document.getElementById("dialog");
function showDialog() {
    dialogOutside.style.display = "flex";
    dialog.style.display = "flex";
}

function closeDialog() {
    dialogOutside.style.display = "none";
    dialog.style.display = "none";
}

function getData() {
    var inputAttraction = document.getElementById("inputAttraction").value;
    fetch("/api/attractions?keyword=" + inputAttraction + "&page=" + page)
        .then(function (response) {
            response.json()
                .then(function (data) {
                    if (data.nextPage === null) {
                        page = 0;
                        observer.unobserve(document.getElementsByClassName("footer")[0]);
                        let dataLength = data.data.length;
                        for (let i = 0; i < dataLength; i++) {
                            let attractions = document.createElement("div");
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

                            let attractions = document.createElement("div");
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
                })
        })
}

var options = {
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.5
};

var observer = new IntersectionObserver(handleIntersect, options);
observer.observe(document.getElementsByClassName("footer")[0]);

function handleIntersect(entries) {
    if (entries[0].isIntersecting) {
        getData();
    }
};

document.getElementById("taipei101Button").addEventListener("click", function () {
    page = 0;
    observer.unobserve(document.getElementsByClassName("footer")[0]);
    document.getElementById("flex-container2").innerHTML = "";
    observer.observe(document.getElementsByClassName("footer")[0]);
})




