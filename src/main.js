// Runs on document ready state
$(function() {
    var content = $('.content');
    var intro = $('.intro');
    var menu = $('.menu');
    var title = $('.title');

    // Intro -> title animation
    setTimeout(function() {
        intro.animate({
            opacity: 0
        }, 500);

        setTimeout(function() {
            intro.hide();
            title.show();
            menu.show();
            content.animate({
                opacity: 1
            }, 500);
        }, 250);

    }, 1500); // Matches animation cycle for intro
});