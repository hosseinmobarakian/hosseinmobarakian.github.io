// main js file to controll project 
alert("salam");
var actionPromise = true;
var papersController = document.getElementById("papers-controller");
var pageCounter = 0;
var sectionLength = document.querySelectorAll("#papers-controller > .section").length;

function stopAction() {
    actionPromise = false;
    setTimeout(() => {
        actionPromise = true;
    }, 2000);
}

function animationScroll(itsMoveBottom) {
    if (!actionPromise)
        return

    var element = $("#switcher");
    element.removeClass("toggle-switcher-animation-reverse");
    element.removeClass("toggle-switcher-animation");


    setTimeout(() => {

        if (itsMoveBottom) {
            element.addClass("toggle-switcher-animation");

            (pageCounter < sectionLength - 1) ? pageCounter++ : "";
        }
        else {
            element.addClass("toggle-switcher-animation-reverse");

            (pageCounter > 0) ? pageCounter-- : "";
        }



    }, 50);

    setTimeout(() => {
        papersController.style.top = -100 * pageCounter + "%";
    }, 600);

    stopAction();
}

$(document).ready(function () {
    var touches = [];
    var lastTouchY = 0;






    var manitor = document.getElementById("manitor");

    // detect wheel mouse move
    manitor.addEventListener("wheel", scrollAction);

    function scrollAction(e) {
        console.log(e.wheelDeltaY);
        if (e.wheelDeltaY == 120) {
            animationScroll(false);
        }
        else if (e.wheelDeltaY == -120) {
            animationScroll(true);
        }
    }

    // detect scroll with touch 
    manitor.addEventListener("touchmove", touchMove, false);
    function touchMove(e) {
        touches.push(e.changedTouches[0].screenY);

        if (touches[touches.length - 1] < (touches[touches.length - 2] ?? firstTouchY)) {
            animationScroll(true);
        }
        else if (touches[touches.length - 1] > (touches[touches.length - 2] ?? firstTouchY)) {
            animationScroll(false);
        }
    }

    manitor.addEventListener("touchend", touchEnd, false);
    function touchEnd(e) {
        lastTouchY = e.changedTouches[0].screenY;
    }


});

