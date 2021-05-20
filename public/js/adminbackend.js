$(document).ready(function(){

    //Add product functions
    $("#AddOffering").click(function(){
        const rowCount = $('#OfferingTable tr').length;

        if(rowCount < 5)
            $(this).closest('table').find('tr:last').prev().after('<tr>' +
                '<td><input type="text" class="input input-styled" size="11"></td>\n' +
                '            <td><input type="number" class="input input-styled" ></td>\n' +
                '            <td class="removeOffering"><button  type="button" class="button submit-button is-small">Remove</button></td>' +
                '</tr>'
            );
    });

    $("tbody").on("click", ".removeOffering button", function(){
        $(this).closest ('tr').remove ();
    });


    //add user functions
    $("#AddUser").click(function(){
        e.preventDefault();


    })
})

