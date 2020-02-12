

$(document).ready(function(){
    //preloader
    var prealoaderOption = $(window);
    prealoaderOption.on("load", function () {
        var preloader = jQuery('.preloader');
        var preloaderArea = jQuery('.preloader-area');
        preloader.fadeOut();
        preloaderArea.delay(350).fadeOut('slow');
    });

    //nav scrolling
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop();
        // if (scrollTop > 100) {
        //     $('nav').addClass('fixed-top custom-nav-bg', 100);
        //     // $('nav').css('position', 'fixed');
        // }else{
        //     $('nav').removeClass('fixed-top custom-nav-bg', 100);
        // }
        if (scrollTop > 20) {
            $("#myBtn").fadeIn(function(){
                $(this).css('display', "block");
            });
        }else{
            $("#myBtn").fadeOut(function(){
                $(this).css('display', "none");
            });
        }
    });

    //meanmenu
    jQuery(document).ready(function () {
        jQuery('header nav').meanmenu();
    });



    // SmoothScroll
    $("#myBtn").click(function () {
        //1 second of animation time
        //html works for FFX but not Chrome
        //body works for Chrome but not FFX
        //This strange selector seems to work universally
        $("html, body").animate({scrollTop: 0}, 1000);
    });

    // Testimonials owlCarousel
    $('#testimonials .owl-carousel').owlCarousel({
        items:1,
        loop:true,
        margin: 15,
        mouseDrag:false,
        autoplay:true,
        smartSpeed:500
    });

    //product slider
    if( $('.slider-for').length > 0){
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: true,
            focusOnSelect: true
        });

        $('a[data-slide]').click(function(e) {
            e.preventDefault();
            var slideno = $(this).data('slide');
            $('.slider-nav').slick('slickGoTo', slideno - 1);
        });
    }

    //clients owlCarousel
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });

    // init Isotope
    if( $('.grid').length > 0){
        var $grid = $('.grid').isotope({
            itemSelector: '.element-item',
            layoutMode: 'fitRows',
            getSortData: {
                name: '.name',
                symbol: '.symbol',
                number: '.number parseInt',
                category: '[data-category]',
                weight: function( itemElem ) {
                    var weight = $( itemElem ).find('.weight').text();
                    return parseFloat( weight.replace( /[\(\)]/g, '') );
                }
            }
        });

        //gallery js
        // filter functions
        var filterFns = {
            // show if number is greater than 50
            numberGreaterThan50: function() {
                var number = $(this).find('.number').text();
                return parseInt( number, 10 ) > 50;
            },
            // show if name ends with -ium
            ium: function() {
                var name = $(this).find('.name').text();
                return name.match( /ium$/ );
            }
        };

        // bind filter button click
        $('#filters').on( 'click', 'button', function() {
            var filterValue = $( this ).attr('data-filter');
            // use filterFn if matches value
            filterValue = filterFns[ filterValue ] || filterValue;
            $grid.isotope({ filter: filterValue });
        });

        // bind sort button click
        $('#sorts').on( 'click', 'button', function() {
            var sortByValue = $(this).attr('data-sort-by');
            $grid.isotope({ sortBy: sortByValue });
        });

        // change is-checked class on buttons
        $('.button-group').each( function( i, buttonGroup ) {
            var $buttonGroup = $( buttonGroup );
            $buttonGroup.on( 'click', 'button', function() {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $( this ).addClass('is-checked');
            });
        });

    }

});
