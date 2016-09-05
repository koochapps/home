/**
 * Created by gaston on 20/06/16.
 */

$(document).ready(function(){
    $('.parallax').parallax();
    $(".button-collapse").sideNav();

    var myIcon =new SVGMorpheus('#icons');

    var array= ['logo1','logo2','logo3'];
    index = 0;

    setInterval(function(){
        myIcon.to(array[index]);
        if(++index === array.length){
            index = 0;
        }
    }, 3000);

    /**
     * Scroll smooth
     */
    var offset = -100;
    if(window.innerWidth < 601){
        offset = -15;
    }

    $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('.button-collapse').sideNav('hide');
                    $('html, body').animate({
                        scrollTop: target.offset().top + offset
                    }, 500);
                    return false;
                }
            }
        });
    });
});


