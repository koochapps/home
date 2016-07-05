/**
 * Created by gaston on 20/06/16.
 */

$(document).ready(function(){
    $('.parallax').parallax();

    var tagImg = document.getElementById('tecImg'),
        imgs = ['angular-icon.svg','javascript.svg'],
        index = 0;

    function changeImages(){
        tagImg.src ='img/' + imgs[index];
        tagImg.style.animation = 'animation 1000ms linear both';

        if(++index === 2){
            index = 0;
        }
    }

    setInterval(function(){
        changeImages();
    }, 3000);
});


/*var options = [
    {selector: '.cartas', offset: 0, callback: function() {
        Materialize.showStaggeredList('.cartas');
    }}
];
Materialize.scrollFire(options);*/