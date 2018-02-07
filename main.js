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
        calendar: $('.calendar'),
        contact: $('.contact'),
        home: $('.home'),
        statics: $('.statics')
    };

    var close = navigation.find('.close');
    var galleryimage = gallery.find('.gallery-image');
    var hamburger = menu.find('.hamburger');
    var links = navigation.find('.link');

    // Jquery classnames, strings, etc.
    var classiconPath = 'assets/classicons/';
    var div = '<div>';
    var imageNumber = 1; // Crappy gallery, but a start
    var img = '<img>';
    var table = '<table>';
    var tablerow = '<tr>';
    var tablecell = '<td>';
    var totalImages = 10;
    var visible = 'visible';

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
                    document.location.hash = target;
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

    function preloadImg() {
        var arrayOfImages = [];

        for (var x = 0; x < totalImages; x++) {
            arrayOfImages.push('assets/gallery/' + x + '.png');
        }

        $(arrayOfImages).each(function(){
            $('<img />').attr('src',this).appendTo('body').css('display','none');
        });
    }

    ////////////////////////////////////////////////////
    // Google Sheets logic
    ////////////////////////////////////////////////////

    function displayStaticData(targetTable, static, staticNum) {
        targetTable.append($(tablerow).append($(tablecell).html(static[0][3]).attr('colspan','4').addClass('static-name')))

        for (var x = 0, len = static.length; x < len; x++) {
            var role = $(tablecell).html(static[x][0]).addClass('role');
            var job = $(tablecell).addClass('job').append($(img).attr('src', classiconPath + static[x][1].toLowerCase() + '.png'));
            var name = $(tablecell).html(static[x][2]).addClass('name');
            targetTable.append($(tablerow).append(role).append(job).append(name));
        }

        targetTable.append($(tablerow).append($(tablecell).addClass('empty-row')));
    }

    function processSheetData(staticsData) {
        var staticsDataLen = staticsData.length;
        var numOfStatics = Math.floor(staticsDataLen / 8);

        views.statics.find('.statics-container').append($(div).addClass('static').append(table));
        
        for (var x = 0; x < numOfStatics; x++) {
            var staticNum = x + 1;
            displayStaticData($('.static table'), staticsData.slice(x * 8, staticNum * 8), staticNum);
        }
    }

    function gapiStart() {
        gapi.client.init({
            'apiKey': 'AIzaSyB_2EAeM5pOoIVun2P5wINwX1VsxnEcuUM',
            'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4']
        }).then(function() {
            return gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: '1JBQIwakvprtZawyGDDs0ETaLwlitaTzoScaJEjMFf1Y',
                range: 'Sheet1!A2:D',
            });
        }).then(function(response) {
            processSheetData(response.result.values);
        }, function(reason) {
            console.log('Error: ' + reason && reason.result && reason.result.error.message);
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

        preloadImg();

        setTimeout(function() {
            var hashTarget = document.location.hash.replace('#','').toLowerCase();

            intro.hide();
            
            if (document.location.hash && views.hasOwnProperty(hashTarget)) {
                views[hashTarget].add(content).add(menu).addClass(visible);
            } else {
                views.home.add(content).add(menu).addClass(visible);
                views.home.find('.hometext').addClass('slidein');
            }
            
            galleryAnimation();
            menu.addClass('slidein');
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