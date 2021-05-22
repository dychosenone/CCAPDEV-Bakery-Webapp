$(document).ready(function(){
    $('.container-js').delay(500).fadeIn('slow');

    $('#next-register').click(function (e){
        e.preventDefault();
        $('#register-1').fadeOut('slow');
        $('#register-2').delay(500).fadeIn('slow');
    });

    $('#register-previous').click(function(e) {
        e.preventDefault();
        $('#register-2').fadeOut('slow');
        $('#register-1').delay(500).fadeIn('slow');
    });

    $('#same-address').click(function (){
        if($('#same-address').is(':checked')) {
            $('#billing-address').prop('disabled', true);
        }
        else{
            $('#billing-address').prop('disabled', false);
        }
    })

    $('#next-checkout-1').click(function (e) {
        e.preventDefault();
        $('#checkout-1').fadeOut('slow');
        $('#checkout-2').delay(500).fadeIn('slow');
    })

    // Admin Page

    $(".orderstatus .button1").click(
        function() {$(this).toggleClass("active")}
    )

    $(".orderstatus .button2").click(
        function() {$(this).toggleClass("active")}
    )

    $(".orderstatus .button3").click(
        function() {$(this).toggleClass("active")}
    )


});