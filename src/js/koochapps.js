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


    function submitForm(){//TODO cambiar el estado de areValid para que empiece a funcionar el envio de mails
        var areValid = false, element, modal;
        submit = true;
        for(var i = 0;i < inputsToValidate.length; i++) {
            element = inputsToValidate[ i ].querySelector( '[required]' );
            if(!element.checkValidity()){
                element.parentNode.classList.add('invalid-field');
                areValid= false;
            }
        }

        if(areValid){
            modal = $('#successSend');
            modal.openModal({
                ready: setTimeOutModal(modal,cleanData),
                complete:function(){
                    cleanData();
                    clearTimeout(modal.idTimeOut);
                }
            });
        }else{
            modal =$('#failSend');
            modal.openModal({
                ready:setTimeOutModal(modal),
                complete:function(){
                    clearTimeout(modal.idTimeOut);
                }
            });
        }

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

    /**
     * Clean data from form
     */

    function cleanData(){
        var fields = document.querySelectorAll( '.input-field [type]' );
        for(var i=0; i < fields.length; i++){
            fields[i].value = "";
        }
    }

});


