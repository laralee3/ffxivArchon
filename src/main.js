// Runs on document ready state
$(function() {
    ////////////////////////////////////////////////////
    // Variable declarations
    ////////////////////////////////////////////////////

    // Jquery object references
    var content = $('.content');
    var intro = $('.intro');
    var menu = $('.menu');
    var navigation = $('.navigation');

    // View reference; all new views here
    var views = {
        home: $('.home'),
        raid: $('.raid'),
        contact: $('.contact')
    };

    var close = navigation.find('.close');
    var hamburger = menu.find('.hamburger');

    var links = navigation.find('.link');

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

    function navigateToView(target) {
        for (var view in views) {
            if (views.hasOwnProperty(view)) {
                if (target.toLowerCase() === view) {
                    views[view].addClass(visible);
                } else {
                    views[view].removeClass(visible);
                }
            }
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
            views.home.add(content).add(menu).addClass(visible);
        }, 250);
    }, 1500); // Matches animation cycle for intro

    // Functionality
    hamburger.add(close).on('click', function() {
        toggleMenu();
    });

    navigation.find('.link').on('click', function() {
        navigateToView($(this).text());
    });
});