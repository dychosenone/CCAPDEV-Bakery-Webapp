
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


})

