var deadline = new Date("April 28, 2022 23:59:59").getTime();
var x = setInterval(function() {
var now = new Date().getTime();
var t = deadline - now;
var days = Math.floor(t / (1000 * 60 * 60 * 24));
var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((t % (1000 * 60)) / 1000);


document.querySelector("ul").innerHTML = `
        <li><span>${days}</span> </br>jours</li>
        <li><span>${hours}</span> </br>heures</li>
        <li><span>${minutes}</span> </br>minutes</li>
        <li><span>${seconds}</span> </br>secondes</li>`
    if (t < 0) {
        clearInterval(x);
        document.querySelector("ul").innerHTML = ''
        document.querySelector("p").innerHTML = "AU REVOIR AHMED !";
    }
}, 1000);