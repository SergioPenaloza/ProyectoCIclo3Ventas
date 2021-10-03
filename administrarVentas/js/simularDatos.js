$(document).ready(main);
function main() {
    $("#pedidoAgregar").on('click', nuevoProducto);
    $("#productoTabla").on('click', '.productoBorrar', borrarProducto);
}
function nuevoProducto() {
    var total = parseFloat($('#ven_total').val());
    var adicionar = parseFloat(document.getElementById("pro_cantidad").value) * parseFloat(document.getElementById("pro_precio").value)
    $('#ven_total').val(total + adicionar);
    fila = $("<tr>");
    fila.append("<td>" + document.getElementById("pro_id").value + "</td>");
    fila.append("<td>" + document.getElementById("pro_nombre").value + "</td>");
    fila.append("<td>" + document.getElementById("pro_cantidad").value + "</td>");
    fila.append("<td>" + document.getElementById("pro_precio").value + "</td>");
    fila.append("<td><button type=\"button\" class=\"btn btn-sm btn-primary productoBorrar\">Quitar</button></td>");
    fila.append("</tr>");
    $('#productoTabla').append(fila);

}
function borrarProducto() {
    var total = parseFloat($('#ven_total').val());
    var cantidad = $(this).parents("tr").find("td").eq(2).html();
    var precio = $(this).parents("tr").find("td").eq(3).html();
    var restar = parseFloat(cantidad) * parseFloat(precio);
    $('#ven_total').val(total - restar);
    $($(this).closest("tr")).remove()
    return false;
}
