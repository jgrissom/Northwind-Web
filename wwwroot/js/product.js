$(function () {
    getProducts()
    function getProducts() {
        var id = $('#product_rows').data('id');
        var discontinued = $('#Discontinued').prop('checked') ? "" : "/discontinued/false";
        $.getJSON({
            url: "../../api/category/" + id + "/product" + discontinued,
            success: function (response, textStatus, jqXhr) {
                $('#product_rows').html("");
                for (var i = 0; i < response.length; i++){
                    var css = response[i].discontinued ? " class=\"discontinued\"" : "";
                    var row = "<tr" + css + " data-id=\"" + response[i].productId + "\" data-name=\"" + response[i].productName + "\" data-price=\"" + response[i].unitPrice + "\">"
                        + "<td>" + response[i].productName + "</td>"
                        + "<td class=\"text-right\">$" + response[i].unitPrice.toFixed(2) + "</td>"
                        + "<td class=\"text-right\">" + response[i].unitsInStock + "</td>"
                        + "</tr>";
                    $('#product_rows').append(row);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // log the error to the console
                console.log("The following error occured: " + textStatus, errorThrown);
            }
        });
    }
    $('#CategoryId').on('change', function(){
        $('#product_rows').data('id', $(this).val());
        getProducts();
    });
    $('#Discontinued').on('change', function(){
        getProducts();
    });
    // delegated event listener
    $('#product_rows').on('click', 'tr', function(){
        $('#ProductId').html($(this).data('id'));
        $('#ProductName').html($(this).data('name'));
        $('#UnitPrice').html($(this).data('price').toFixed(2));
        // calculate and display total in modal
        $('#Quantity').change();
        $('#cartModal').modal();
    });
    // update total when cart quantity is changed
    $('#Quantity').change(function () {
        var total = parseInt($(this).val()) * parseFloat($('#UnitPrice').html());
        $('#Total').html(numberWithCommas(total.toFixed(2)));
    });
    // function to display commas in number
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    $('#addToCart').on('click', function(){
        $('#cartModal').modal('hide');
        $.ajax({
            headers: { "Content-Type": "application/json" },
            url: "../../api/addtocart",
            type: 'post',
            data: JSON.stringify({
                    "id": Number($('#ProductId').html()),
                    "email": $('#User').data('email'),
                    "qty": Number($('#Quantity').val()) 
                }),
            success: function (response, textStatus, jqXhr) {
                // success
                console.log(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // log the error to the console
                console.log("The following error occured: " + jqXHR.status, errorThrown);
            }
        });
    });
});
