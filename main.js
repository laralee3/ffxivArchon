// Runs on document ready state
$(function() {
    ////////////////////////////////////////////////////
    // Variable declarations
    ////////////////////////////////////////////////////

    // Jquery object references
    var content = $('.content');
    var home = $('.home');
    var intro = $('.intro');
    var menu = $('.menu');
    var navigation = $('.navigation');
    var raid = $('.raid');

    var close = navigation.find('.close');
    var hamburger = menu.find('.hamburger');

    var linkHome = navigation.find('.link-home');
    var linkRaid = navigation.find('.link-raid');

    // Jquery classnames, strings, etc.
    var visible = 'visible';

    ////////////////////////////////////////////////////
    // Functions
    ////////////////////////////////////////////////////

    function toggleMenu() {
        if (navigation.hasClass(visible)) {
            menu.addClass(visible);
            navigation.removeClass(visible);
        } else {
            menu.removeClass(visible);
            navigation.addClass(visible);
        }
    }

    function navigateToView(target){
        switch (target) {
            case 'raid':
                raid.addClass(visible);
                home.removeClass(visible);
                break;
            case 'contact':

                break;
            case 'home':
            case 'default':
                home.addClass(visible);
                raid.removeClass(visible);
                break;
        }

        toggleMenu();
    }

    ////////////////////////////////////////////////////
    // Init
    ////////////////////////////////////////////////////

    // Intro -> title animation
    setTimeout(function() {
        intro.animate({
            opacity: 0
        }, 500);

        setTimeout(function() {
            intro.hide();
            home.add(content).add(menu).addClass(visible);
        }, 250);
    }, 1500); // Matches animation cycle for intro

    // Functionality
    hamburger.add(close).on('click', function() {
        toggleMenu();
    });

    linkHome.on('click', function() {
        navigateToView('home');
    });

    linkRaid.on('click', function() {
        navigateToView('raid');
    });
});