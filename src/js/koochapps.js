/**
 * Created by gaston on 20/06/16.
 */

$(document).ready(function() {
    $( '.parallax' ).parallax();
    $( ".button-collapse" ).sideNav();

    var myIcon = new SVGMorpheus( '#icons' );

    var array = [ 'logo1', 'logo2', 'logo3' ];
    var index = 0;

    setInterval( function () {
        myIcon.to( array[ index ] );
        if ( ++index === array.length ) {
            index = 0;
        }
    }, 3000 );

    /**
     * Scroll smooth
     */
    var offset = -100;
    if ( window.innerWidth < 601 ) {
        offset = -15;
    }

    $( function () {
        $( 'a[href*="#"]:not([href="#"])' ).click( function () {
            if ( location.pathname.replace( /^\//, '' ) == this.pathname.replace( /^\//, '' ) && location.hostname == this.hostname ) {
                var target = $( this.hash );
                target = target.length ? target : $( '[name=' + this.hash.slice( 1 ) + ']' );
                if ( target.length ) {
                    $( '.button-collapse' ).sideNav( 'hide' );
                    $( 'html, body' ).animate( {
                        scrollTop: target.offset().top + offset
                    }, 500 );
                    return false;
                }
            }
        } );
    } );

    /**
     * inputs validations
     */

    var inputsToValidate = document.querySelectorAll( '.input-field.validar' );
    var submit = false;

    (function addValidation(){
        for(var i = 0;i < inputsToValidate.length; i++){
            inputsToValidate[i].querySelector('[required]').onblur = validate;
        }
    })();

    function validate(){
        if(!this.checkValidity() && submit){
            this.parentNode.classList.add('invalid-field');
        }else{
            this.parentNode.classList.remove('invalid-field');
        }
    }

    /**
     * submit form
     */
    document.getElementById('enviar').onclick = submitForm;


    function submitForm(){
        var areValid = true, element;
        submit = true;
        for(var i = 0;i < inputsToValidate.length; i++) {
            element = inputsToValidate[ i ].querySelector( '[required]' );
            if(!element.checkValidity()){
                element.parentNode.classList.add('invalid-field');
                areValid= false;
            }
        }
        setValidatyCaptcha(validCaptcha);

        if(areValid && validCaptcha){
            showActivity();
            sendMessage();
        }else{
            failModal({status:400}); //TODO check status
        }
    }

    function sendMessage(){
        sendHint('Email');
        var fields = document.querySelectorAll( '.input-field [type]' );
        var data = {};
        for(var i=0; i < fields.length; i++){
            data[ fields[ i ].name ] = fields[ i ].value;
        }
        data['g-recaptcha-response'] = grecaptcha.getResponse();
        $.ajax({
          method: 'POST',
          url: env.endPoint,
          headers: {
            'Content-Type': 'application/json'
          },
          crossDomain:true,
          data: JSON.stringify(data) }).done(succesModal).fail(failModal);
    }

    function succesModal() {
        sendHint('Success');
        var modal = $('#successSend');
        showModal(modal,cleanData);
        hideActivity();
    }

    function failModal(errorCode) {
        var messageError = $('[data-error='+ errorCode.status +']' ); //TODO check status
        sendHint('Error',messageError.html());
        messageError.removeClass('hide');
        messageError.addClass('show');
        var modal = $('#failSend');
        showModal(modal,resetErrors);
        hideActivity();
    }

    function showModal(modal,callback,withoutTimeOut){
        modal.openModal({
            ready: !withoutTimeOut ? setTimeOutModal(modal,callback) : function(){},
            complete:function(){
                if(callback){
                    callback();
                }
                if(!withoutTimeOut) {
                    clearTimeout( modal.idTimeOut );
                }
            }
        });
    }

    function setTimeOutModal(context,callback){
        context.idTimeOut = setTimeout(function(){
            context.closeModal({
                complete:function(){
                    if(callback){
                        callback();
                    }
                }
            });
        },3000);
    }

    function showActivity(){
        var modal = $('#activity');
        showModal(modal,null,true);
    }

    function hideActivity(){
        $('#activity').closeModal();
    }

    /**
     * Clean data from form
     */

    function cleanData(){
        var fields = document.querySelectorAll( '.input-field [type]' );
        for(var i=0; i < fields.length; i++){
            fields[i].value = "";
        }
        resetCaptcha();
    }

    function resetErrors(){
        var errors = $('[data-error]' ),error;
        for(var i = 0; i < errors.length; i++){
            error = $(errors[i]);
            if(error.hasClass('show')){
                error.removeClass('show');
                error.addClass('hide');
            }
        }
    }
});

var validCaptcha = false;

function setValidatyCaptcha(valid){
    validCaptcha = valid === undefined ? true : valid;
    if(validCaptcha){
        $('.g-recaptcha').removeClass('invalid-field');
    }else{
        $('.g-recaptcha').addClass('invalid-field');
    }
}

function resetCaptcha(){
    grecaptcha.reset();
    validCaptcha = false;
}

function showCaptcha(){
    grecaptcha.render('krecaptcha',{
        sitekey: env.sitekey,
        callback: setValidatyCaptcha
    });
}

/**
 * Analytics
 */
function sendHint(type, descripcion){
    switch (type){
        case 'PDF':
            ga('send', 'event', 'link', 'click', 'http://koochapps.com/cv-koochapps.pdf');
            break;
        case 'Facebook':
            ga('send', 'event', 'link', 'click', 'https://www.facebook.com/koochapps');
            break;
        case 'Email':
            ga('send', 'event', 'button', 'click', 'send email');
            break;
        case 'Error':
            ga('send', 'event', 'error', 'response', descripcion);
            break;
        case 'Success':
            ga('send', 'event', 'success', 'response');
            break;
        case 'Integrante':
            ga('send', 'event', 'link', 'click', descripcion);
            break;
        case 'NavBar':
            ga('send', 'event', 'link', 'click', descripcion);
            break;
    }
}