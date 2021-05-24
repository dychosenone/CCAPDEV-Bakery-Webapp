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

    $('#saveReview').click(function (e) {
        e.preventDefault();
        var review = $('#reviewText').val();
        var contentId = '#' + $(this).closest('#reviewArticle').find("#reviewText").attr('id');
        var inputId = '#' + $(this).closest('#reviewArticle').find("#input").attr('id');
        console.log(review);
        $.post(`/products/${productId}/editReview`, {review: review}, function (result) {
            $(inputId).hide();
            $(contentId).replaceWith(function (){
                return '<p id="reviewcontents">' + result.review + '</p>';

            })
        });


    });

    $(document).on('click', '#editReview', function(e) {
        e.preventDefault();
        var content = $(this).closest('#reviewArticle').find("#reviewcontents").text();
        var contentId = '#' + $(this).closest('#reviewArticle').find("#reviewcontents").attr('id');
        var inputId = '#' + $(this).closest('#reviewArticle').find("#input").attr('id');

        console.log(contentId);
        $(contentId).replaceWith(function (){
            return '<input type="text" id="reviewText" name="review" class="text input-styled" value="' + content + '" >';
        })

        $(inputId).show();
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
        $.get('/favorites/addToFavorites', {productId : productId}, function(result){

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
        $.get('/favorites/removeFromFavorites', {productId : productId}, function(result){

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

    $(document).on('click', '#removeFavorites', function(e) {
        e.preventDefault();

        var productId = $(this).closest('tr').find("#productId").text();

        $.get('/favorites/removeFromFavorites', {productId : productId}, function(result){

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

    $('#checkout').click(function(e) {
        e.preventDefault();
        console.log('pressed');
        $.get('/checkout/checkoutItems', function(result) {
            if(result.status == 'success') {
                window.location = result.redirect;
            }
        })
    });
    
    $(".product-modal-open").click(function (e) {
        e.preventDefault();

        var orderId = $(this).closest('tr').find("#orderId").text();

        $.get('/transactions/details', {orderId : orderId}, function(result) {

            $('#orderNumber').text('Order # ' + result.orderId);
            $('#billingAddress').text(result.billingAddress);
            $('#deliveryAddress').text(result.deliveryAddress);

            $('#subtotal').text(result.subtotal);
            $('#deliveryFee').text(result.deliveryFee);
            $('#total').text(result.subtotal + result.deliveryFee);

            result.orders.forEach(function(element) {


                $('#cartBody').append(`
                <tr>
                    <td> ${element.quantity} </td>
                    <td> ${element.productName} </td>
                    <td> ${element.price / element.quantity} </td>
                    <td> ${element.price} </td>
                </tr>
                `)
            });
            
        });

        $('.product-modal').fadeIn('fast');
    });

    $(".product-modal-close").click(function (e) {
        e.preventDefault();
        $('.product-modal').fadeOut('fast');
        $('#cartBody').empty();
    });

    $('#search').click(function(e){
        e.preventDefault();
        var searchQuery = $('#searchInput').val();
        console.log(searchQuery);

        if(searchQuery != '') {
            window.location = `/products?search=${searchQuery}`
        }
    });

});