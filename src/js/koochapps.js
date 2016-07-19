/**
 * Created by gaston on 20/06/16.
 */

var apiKey = "AIzaSyC09rRuL8LrQ4NoE6b6PYHER8mKg5ATVDM";

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

    var array= ['icon1','icon2'];
    index = 0;

    setInterval(function(){
        myIcon.to(array[index]);
        if(++index === array.length){
            index = 0;
        }
    }, 3000);
});


/*var options = [
    {selector: '.cartas', offset: 0, callback: function() {
        Materialize.showStaggeredList('.cartas');
    }}
];
Materialize.scrollFire(options);*/

function handleClientLoad() {
    gapi.client.setApiKey(obj.api);
    window.setTimeout(checkAuth, 1);
}
function checkAuth() {
    gapi.auth.authorize({
        client_id: obj.client_id,
        scope: obj.scopes,
        immediate: true
    }, handleAuthResult);
}
function handleAuthResult(authResult){
    console.log(authResult);
}

function sendEmail(){
    sendMessage({
        'Subject':'esto es un asunto',
        'From':'gaston.kaltner@gmail.com'
    },"esto es un mensaje",alert("se envio con exito"));
}

function sendMessage(headers_obj, message, callback) {
    var email = '';
    for(var header in headers_obj)
        email += header += ": "+headers_obj[header]+"\r\n";
    email += "\r\n" + message;
    var sendRequest = gapi.client.gmail.users.messages.send({
        'userId': 'me',
        'resource': {
            'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
        }
    });
    return sendRequest.execute(callback);
}

var obj = {
    api:"AIzaSyCFqxVIuHqZd_Odmp-sgUbJpUZEQvgNGV0",
    client_id:"756788320951-p8jjvfand90vc2f6ampptq1mpqle1fur.apps.googleusercontent.com",
    scopes:'https://www.googleapis.com/auth/gmail.send'
};


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