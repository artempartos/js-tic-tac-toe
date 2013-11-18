(function () {
    pixels = document.getElementsByClassName("pixel");
    var RAND = true;
    WIN = false;
    WIN_PIX = {};

    sym = function(){
        RAND ? symbol = 'x' : symbol = 'o';
        RAND = !RAND;
        return symbol;
    }

    for (var i=0;i<pixels.length; i++)
    {
        pixel = pixels[i]
        pixel.onclick = function() {
            if (this.innerHTML == '' && !WIN) {
                this.innerHTML = sym();
                check_state();
            }
        }
    }
})()

var check_state = function(){
    pixs = document.getElementsByClassName("pixel");
    var results = {}
    for (var i=0;i<pixs.length; i++)
    {
        pix = pixs[i]
        results[i] = {id: pix.id, value: pix.innerHTML }
    }

    if (check_combine(results)) {
        win();
    }
}

var check_combine = function(r) {
    return check(r[0],r[1],r[2]) || check(r[0],r[3],r[6]) || check(r[6],r[7],r[8]) || check(r[1],r[4],r[7])
        || check(r[2],r[5],r[8]) || check(r[0],r[4],r[8]) || check(r[2],r[4],r[6]) || check(r[3],r[4],r[5])
}

var check = function(first, second, third){
    if (first.value == second.value && first.value == third.value && (first.value == 'o' || first.value == 'x'))
    {
        WIN_PIX = [first, second, third]
        return true
    }
}

var win = function() {
    WIN = true
    console.log("WIN!")
    for (var i=0;i<WIN_PIX.length; i++)
    {
        el = document.getElementById(WIN_PIX[i].id)
        el.className += " red";
    }
}