/**
 * Created by gaston on 20/06/16.
 */

$(document).ready(function(){
    $('.parallax').parallax();

    var images = [],
        index = 0, prevIndex = null;

     function changeImages(){
        images[prevIndex].classList.add('hide');
        images[prevIndex].classList.remove('animation-target');
        images[index].classList.remove('hide');
        images[index].classList.add('animation-target');

        if(++index === images.length){
            index = 0;
        }

        if(++prevIndex === images.length){
            prevIndex = 0;
        }
    }

    function getAllImages(){
        images = document.querySelectorAll('.tecnologias img');
        prevIndex = images.length -1;
    }



    /*setInterval(function(){
        changeImages();
    }, 3000);*/

    //getAllImages();

    var myIcon =new SVGMorpheus('#icons');

    var array= ['logo1','logo2','logo3'];
    index = 0;

    setInterval(function(){
        myIcon.to(array[index]);
        if(++index === array.length){
            index = 0;
        }
    }, 3000);
});

/**
 * Scroll smooth
 */

var offset = -150;
$(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top + offset
                }, 500);
                return false;
            }
        }
    });
});