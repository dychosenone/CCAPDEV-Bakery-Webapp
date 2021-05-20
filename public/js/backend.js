$(document).ready(function(){


    // Add to Cart Asynchronous Function
    $('#addToCart').click(function(e) {
        e.preventDefault();
        
        var option = $("#sizes").prop('selectedIndex');
        console.log(option);
        
        $.get('/addToCart', {option: option, productId : productId}, function (result){
            var textContainer = document.createElement('div');
            textContainer.classList.add("message-body");
            textContainer.innerHTML = 'Successfully added to cart.';

            var container = document.createElement('div');
            container.classList.add("message");
            container.classList.add("is-success");

            container.append(textContainer);
            
            $('#errors').append(container);

            setTimeout(function () {
                $('#errors').empty();
            }, 1000);
        });

    });

    // Add Review Asynchronous Function
    $('#addReview').click(function (e) {
        e.preventDefault();
        var review = $('#review-body').val();

        $.post(`/products/${productId}/addReview`, {review : review}, function (result) {

            $('#review-body').val('');
            $('#reviews').load(' #reviews');

            var textContainer = document.createElement('div');
            textContainer.classList.add("message-body");
            textContainer.innerHTML = result.message;

            var container = document.createElement('div');
            container.classList.add("message");

            if(result.status == "success") {
                container.classList.add("is-success");
            } else if(result.status == "error"){
                container.classList.add("is-danger");
            }
            
            container.append(textContainer);
            
            $('#errors').append(container);

            setTimeout(function () {
                $('#errors').empty();
            }, 1000);
        });


    });

    $(document).on('click', '#deleteReview', function(e) {
        e.preventDefault();

        $.get(`/products/${productId}/deleteReview`, {}, function(result) {

            $('#reviews').load(' #reviews');
            console.log('deleted');

            var textContainer = document.createElement('div');
            textContainer.classList.add("message-body");
            textContainer.innerHTML = result.message;

            var container = document.createElement('div');
            container.classList.add("message");

            if(result.status == "success") {
                container.classList.add("is-success");
            } else if(result.status == "error"){
                container.classList.add("is-danger");
            }
            
            container.append(textContainer);
            
            $('#errors').append(container);

            setTimeout(function () {
                $('#errors').empty();
            }, 1000);
        });
    });

    $(document).on('click', '#deleteCartItem', function(e) {
        e.preventDefault();

        var productId = $(this).closest('tr').find("#productId").text();
        console.log(productId);

        $.get('cart/deleteItem', {productId : productId}, function(result) {
            $('#cart').load(' #cart');

            var textContainer = document.createElement('div');
            textContainer.classList.add("message-body");
            textContainer.innerHTML = result.message;

            var container = document.createElement('div');
            container.classList.add("message");

            if(result.status == "success") {
                container.classList.add("is-success");
            } else if(result.status == "error"){
                container.classList.add("is-danger");
            }
            
            container.append(textContainer);
            
            $('#errors').append(container);

            setTimeout(function () {
                $('#errors').empty();
            }, 1000);
        });
    });

    $(document).on('click', '#addToFavorites', function(e) {
        e.preventDefault();
        console.log('pressed');
        $.get('/favorites/addToFavorites', {productId : productId, userId : userId}, function(result){

            $('#favorites').load(' #favorites');

            var textContainer = document.createElement('div');
            textContainer.classList.add("message-body");
            textContainer.innerHTML = result.message;

            var container = document.createElement('div');
            container.classList.add("message");

            if(result.status == "success") {
                container.classList.add("is-success");
            } else if(result.status == "error"){
                container.classList.add("is-danger");
            }
            
            container.append(textContainer);
            
            $('#errors').append(container);

            setTimeout(function () {
                $('#errors').empty();
            }, 1000);
        });
    });

    $(document).on('click', '#removeFromFavorites', function(e) {
        e.preventDefault();
        console.log('pressed');
        $.get('/favorites/removeFromFavorites', {productId : productId, userId : userId}, function(result){

            $('#favorites').load(' #favorites');

            var textContainer = document.createElement('div');
            textContainer.classList.add("message-body");
            textContainer.innerHTML = result.message;

            var container = document.createElement('div');
            container.classList.add("message");

            if(result.status == "success") {
                container.classList.add("is-success");
            } else if(result.status == "error"){
                container.classList.add("is-danger");
            }
            
            container.append(textContainer);
            
            $('#errors').append(container);

            setTimeout(function () {
                $('#errors').empty();
            }, 1000);

        });
    });

});