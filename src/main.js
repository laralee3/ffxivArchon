// Runs on document ready state
$(function() {
    ////////////////////////////////////////////////////
    // Variable declarations
    ////////////////////////////////////////////////////

    // Jquery object references
    var content = $('.content');
    var gallery = $('.gallery');
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
    var galleryimage = gallery.find('.gallery-image');
    var hamburger = menu.find('.hamburger');
    var links = navigation.find('.link');

    // Jquery classnames, strings, etc.
    var visible = 'visible';

    // state
    var imageNumber = 1; // Crappy gallery, but a start
    var totalImages = 10;

    ////////////////////////////////////////////////////
    // Functionality
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

    function galleryAnimation() {
        galleryimage.css('background-image', 'url(\'assets/gallery/' + imageNumber + '.png\')');
        imageNumber++;

        if (imageNumber > totalImages) {
            imageNumber = 1;
        }

        gallery.animate({opacity: 1}, 1000).delay(7000).animate({opacity: 0}, 2000, function() {
            galleryAnimation();
        });
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
            galleryAnimation();
        }, 250);
    }, 1500); // Matches animation cycle for intro

    hamburger.add(close).on('click', function() {
        toggleMenu();
    });

    navigation.find('.link').on('click', function() {
        navigateToView($(this).text());
    });
});