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
    var static1Table = $('.static-1 table');
    var static2Table = $('.static-2 table');

    // View reference; all new views here
    var views = {
        home: $('.home'),
        calendar: $('.calendar'),
        contact: $('.contact'),
        statics: $('.statics')
    };

    var close = navigation.find('.close');
    var galleryimage = gallery.find('.gallery-image');
    var hamburger = menu.find('.hamburger');
    var links = navigation.find('.link');

    // Jquery classnames, strings, etc.
    var tablerow = '<tr>';
    var tablecell = '<td>';
    var img = '<img>';
    var visible = 'visible';
    var imageNumber = 1; // Crappy gallery, but a start
    var totalImages = 10;
    var classiconPath = 'assets/classicons/';

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
    // Google Sheets logic
    ////////////////////////////////////////////////////

    function displayStaticData(targetTable, static, groupname) {
        targetTable.append($(tablerow).append($(tablecell).html(groupname).addClass('static-name')))

        for (var x = 0, len = static.length; x < len; x++) {
            var role = $(tablecell).html(static[x][0]).addClass('role');
            var job = $(tablecell).addClass('job').append($(img).attr('src', classiconPath + static[x][1].toLowerCase() + '.png'));
            var name = $(tablecell).html(static[x][2]).addClass('name');
            targetTable.append($(tablerow).append(role).append(job).append(name));
        }
    }

    function processSheetData(staticsData) {
        displayStaticData(static1Table, staticsData.slice(0, 8), 'Static 1');
        displayStaticData(static2Table, staticsData.slice(8, 16), 'Static 2');
    }

    function gapiStart() {
        gapi.client.init({
            'apiKey': 'AIzaSyB_2EAeM5pOoIVun2P5wINwX1VsxnEcuUM',
            'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4']
        }).then(function() {
            return gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: '1JBQIwakvprtZawyGDDs0ETaLwlitaTzoScaJEjMFf1Y',
                range: 'Sheet1!A2:C17',
            });
        }).then(function(response) {
            processSheetData(response.result.values);
        }, function(reason) {
            console.log('Error: ' + reason.result.error.message);
        });
    };

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
            menu.addClass('slidein');
            views.home.find('.hometext').addClass('slidein');
        }, 250);
    }, 1500); // Matches animation cycle for intro

    hamburger.add(close).on('click', function() {
        toggleMenu();
    });

    navigation.find('.link').on('click', function() {
        navigateToView($(this).text());
    });

    gapi.load('client', gapiStart);
});