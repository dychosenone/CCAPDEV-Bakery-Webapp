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

    $(document).on("click", "#saveReview", function (e) {
        e.preventDefault();
        var review = $("#reviewText").val();

        console.log(review);
        $.post(`/products/${productId}/editReview`, {review: review}, function (result) {
            $('#reviewText').closest('#reviewArticle').find("#input").hide();
            $("#reviewText").replaceWith(function (){
                return '<p id="reviewcontents">' + result.review + '</p>';
            })
        });


    });

    $(document).on('click', '#editReview', function(e) {
        e.preventDefault();
        var content = $('#editReview').closest('#reviewArticle').find("#reviewcontents").text();

        $('#editReview').closest('#reviewArticle').find("#reviewcontents").replaceWith(function (){
            return '<textarea id="reviewText" name="review" class="textarea input-styled">' + content + '</textarea>';
        })

        $('#editReview').closest('#reviewArticle').find("#input").show();
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

    $('#login').click(function(e) {
        e.preventDefault();
        var username = $('#loginUsername').val();
        var password = $('#loginPassword').val();

        $.post('/login', {username: username, password: password}, function (result) {
            if(result.status == 'error') {
                var textContainer = document.createElement('div');
                textContainer.classList.add("message-body");
                textContainer.innerHTML = result.body;

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
            } else {
                window.location = result.redirect;
            }
        });
    });

    $('#editAccountSubmit').click(function(e) {
        e.preventDefault();

        var fullName = $('#fullName').val();
        var email = $('#email').val();
        var deliveryAddress = $('#deliveryAddress').val();
        var billingAddress = $('#billingAddress').val();
        var contactNumber = $('#contactNumber').val();
        var alternativeContactNumber = $('#alternativeContactNumber').val();

        var details = {
            fullName: fullName, 
            email : email,
            deliveryAddress : deliveryAddress,
            billingAddress : billingAddress,
            contactNumber : contactNumber,
            alternativeContactNumber : alternativeContactNumber
        };

        $.post('/editAccount', details, function(result) {
            if(result.status == 'error') {
                console.log(result);
                result.errors.forEach(function(element) {
                    var textContainer = document.createElement('div');
                    textContainer.classList.add("message-body");
                    textContainer.innerHTML = element.msg;
    
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

            } else {
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
            }
        });
    });

});