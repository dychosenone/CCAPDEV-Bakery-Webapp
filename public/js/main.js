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

    // View Transactions Modal
    $("#product-modal-button-1").click(function () {
        $('#product-modal-1').fadeIn('fast')
    });

    $("#product-modal-close-1").click(function () {
        $('#product-modal-1').fadeOut('fast')
    });

    $("#product-modal-button-2").click(function () {
        $('#product-modal-2').fadeIn('fast')
    });

    $("#product-modal-close-2").click(function () {
        $('#product-modal-2').fadeOut('fast')
    });

    $("#product-modal-button-3").click(function () {
        $('#product-modal-3').fadeIn('fast')
    });

    $("#product-modal-close-3").click(function () {
        $('#product-modal-3').fadeOut('fast')
    });

    $("#product-modal-button-4").click(function () {
        $('#product-modal-4').fadeIn('fast')
    });

    $("#product-modal-close-4").click(function () {
        $('#product-modal-4').fadeOut('fast')
    });

    $("#product-modal-button-5").click(function () {
        $('#product-modal-5').fadeIn('fast')
    });

    $("#product-modal-close-5").click(function () {
        $('#product-modal-5').fadeOut('fast')
    });
});