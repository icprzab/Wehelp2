
var attractionID = location.pathname;
var split = attractionID.split("/");
var id = split[2];
var counter = 1;

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
                        // document.getElementById(`dot${[i + 1]}`).style.backgroundColor = "white";
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

                    // let attractionImage = document.getElementById("attraction-image");
                    // let image = attractionImage.getElementsByTagName("img");
                    // let imageWidth = image[3].clientWidth;

                    // let cal = -imageWidth * counter + "px";
                    // let transform = `translateX(${cal})`;
                    // attractionImage.style.transform = `"${transform}"`;

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




// function showSlides(n) {
//     let i;
//     let slides = document.getElementsByClassName("attraction-image1");
//     let dots = document.getElementsByClassName("attraction-dot1");
//     document.getElementById("dot1").style.backgroundColor = "white";
//     if (n > slides.length) { slideIndex = 1 }
//     if (n < 1) { slideIndex = slides.length }
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }
//     for (i = 0; i < dots.length; i++) {
//         document.getElementById(`dot${[i]}`).style.backgroundColor = "white";
//     }
//     slides[slideIndex - 1].style.display = "flex";
//     document.getElementById(`dot${[slideIndex - 1]}`).style.backgroundColor = "black";
// }




