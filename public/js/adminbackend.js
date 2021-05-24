
$(document).ready(function(){

    //Add product functions
    $("#AddOffering").click(function(){

        const rowCount = $('#OfferingTable tr').length;

        if(rowCount < 4){
            $(this).closest('table').find('tr:last').prev().after('<tr>' +
                '<td><input type="number" name="size2" id="size2" class="input input-styled" size="11" required></td>\n' +
                '            <td><input type="number"  name="price2" id="price2" class="input input-styled" required></td>\n' +
                '            <td class="removeOffering"><button  type="button" class="button submit-button is-small">Remove</button></td>' +
                '</tr>'
            );
        }
        else if(rowCount < 5){
            $(".removeOffering").hide();
            $(this).closest('table').find('tr:last').prev().after('<tr>' +
                '<td><input type="number" name="size3" id="size3" class="input input-styled" size="11" required></td>\n' +
                '            <td><input type="number"  name="price3" id="price3" class="input input-styled" required></td>\n' +
                '            <td class="removeOffering"><button  type="button" class="button submit-button is-small">Remove</button></td>' +
                '</tr>'
            );
        }


    });

    $("tbody").on("click", ".removeOffering button", function(){
        const rowCount = $('#OfferingTable tr').length;
        if(rowCount > 4 ){
            $(".removeOffering").show();
        }
            $(this).closest ('tr').remove ();
    });

    $('#login').click(function(e) {
        e.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();

        $.post('/admin/adminlogin', {username : username, password : password}, function (result) {
            console.log(result);
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

    $('#status').on('change', function(e) {
        e.preventDefault();
        var status = $('#status option:selected').val();
        var orderId = $('#orderId').text();

        $.get('/admin/setStatus', {status : status, orderId : orderId});
    });

    $('#searchUser').click(function(e){
        e.preventDefault();
        var searchQuery = $('#searchInput').val();
        console.log(searchQuery);

        if(searchQuery != '') {
            window.location = `/admin/admin-accounts?search=${searchQuery}`
        }
    });

    $('#searchProduct').click(function(e){
        e.preventDefault();
        var searchQuery = $('#searchInput').val();
        console.log(searchQuery);

        if(searchQuery != '') {
            window.location = `/admin/admin-product?search=${searchQuery}`
        }
    });

    $('#searchOrders').click(function(e){
        e.preventDefault();
        var searchQuery = $('#searchInput').val();
        console.log(searchQuery);

        if(searchQuery != '') {
            window.location = `/admin/?search=${searchQuery}`
        }
    });

    $('#searchOrders2').click(function(e){
        e.preventDefault();
        var searchQuery = $('#searchInput').val();
        console.log(searchQuery);

        if(searchQuery != '') {
            window.location = `/admin/passedOrders?search=${searchQuery}`
        }
    });
})

