$(document).ready(function () {
    //el codigo comentado debajo es una funcion que obtiene el lenguaje del navegador
    //var userLang = navigator.language || navigator.userLanguage;
    //alert("The language is: " + userLang);
    $("#btn1").click(function () {
        var Monto = $("#Valor").val();
        var Plazo = $("#Cantidad").val();
        var Tasa = $("#Tasa").val();
        var periodo = $("#Periodo").val();
        var campos = 0;
        var mensaje = "Complete los campos: \n";
        if (Monto != "") {
            campos++;
        }
        else {
            mensaje += "Monto \n";
        }
        if (Plazo != "") {
            campos++;
        }
        else {
            mensaje += "Plazo \n";
        }
        if (Tasa != "") {
            campos++;
        }
        else {
            mensaje += "Tasa \n";
        }
        if (campos > 2) {
            var PP = $("#PeriodoPlazo").val();
            Plazo = PP * Plazo;
            var I = (Tasa / 100) / periodo;
            var R;
            var deuda = Monto;
            var Interes;
            R = (Monto * I) / (1 - Math.pow((1 + I), -Plazo));
            $("#Renta").val(money_format(R));
            var totalIntereses = 0;
            var totalAmortizacion = 0;
            for (var i = 1; i < parseInt(Plazo) + 1; i++) {
                Interes = deuda * I;
                totalIntereses = Number(totalIntereses + Interes);
                Amortizacion = R - Interes;
                totalAmortizacion = Number(totalAmortizacion + Amortizacion);
                deuda = deuda - Amortizacion;
            }
            $("#Intereses").val(money_format(totalIntereses));
            Monto = Number(Monto) + Number(totalIntereses);
            $("#Inversion").val(money_format(Monto));
            $("#resultados").css({ "opacity": "0" });
            $("#resultados").animate({ opacity: 1 }, 500, function () { });
        }
        else {
            alert(mensaje);
        }
    });
    $("#btn2").click(function () {
        var Monto = $("#Valor").val();
        var Plazo = $("#Cantidad").val();
        var Tasa = $("#Tasa").val();
        var campos = 0;
        var mensaje = "Complete los campos: \n";
        if (Monto != "") {
            campos++;
        }
        else {
            mensaje += "Monto \n";
        }
        if (Plazo != "") {
            campos++;
        }
        else {
            mensaje += "Plazo \n";
        }
        if (Tasa != "") {
            campos++;
        }
        else {
            mensaje += "Tasa \n";
        }
        if (campos > 2) {
            var PP = $("#PeriodoPlazo").val();
            Plazo = PP * Plazo;
            creartabla(Monto, Plazo, Tasa);
            $("#resultados").animate({ opacity: 1 }, 500, function () { });
            $("#tabla").css({ "opacity": "0" });
            $("#tabla").animate({ opacity: 1 }, 500, function () { });
        }
        else {
            alert(mensaje);
        }
    });
    $("#btn3").click(function () {
        limpiar();
    });
    $("#PeriodoPlazo").change(function () {
        ConvertPlazo();
    });
});
function limpiar() {
    $(document).find('input[type=number]').each(function () {
        $(this).val("");
    });
    $(document).find('input[type=text]').each(function () {
        $(this).val("");
    });
    document.getElementById("tabla").innerHTML = "";
    document.getElementById("opcsTabla").innerHTML = "";
    $("#resultados").css({ "opacity": "0" });
};
function creartabla(Monto, Plazo, Tasa) {
    Monto = Number(Monto);
    Plazo = Number(Plazo);
    Tasa = Number(Tasa);
    var periodo = $("#Periodo").val();
    var I = (Tasa / 100) / periodo;
    var R;
    R = (Monto * I) / (1 - Math.pow((1 + I), -Plazo));
    var deuda = Monto;
    var Interes;
    var Amortizacion;
    var totalIntereses = 0;
    var totalAmortizacion = 0;
    var table = "<br> <table id='MiTabla' class='table'> <thead> <tr> <th style='width:15%;'> # </th> <th> Renta </th> <th> Interes </th> <th> Capital </th> <th> Deuda </th> </thead> <tbody> "
    table += "<tr style='border-bottom:solid 1px #80ced6'><td></td><td></td><td> <b> Año 1 </b> </td><td></td><td></td></tr>";
    for (var i = 1; i < parseInt(Plazo) + 1; i++) {
        Interes = deuda * I;
        totalIntereses = Number(totalIntereses + Interes);
        Amortizacion = R - Interes;
        totalAmortizacion = Number(totalAmortizacion + Amortizacion);
        deuda = deuda - Amortizacion;
        table += "<tr>";
        table += "<td>" + i.toString();
        table += "</td>";
        table += "<td>" + money_format(R);
        table += "</td>";
        table += "<td>" + money_format(Interes);
        table += "</td>";
        table += "<td>" + money_format(Amortizacion);
        table += "</td>";
        table += "<td>" + money_format(deuda);
        table += "</td>";
        table += "</tr>";
        if (i % 12 == 0 && i != parseInt(Plazo)) {
            table += "<tr><td></td><td style='text-align:right;'> </td><td><int style='border-top:1px solid black'>" + money_format(totalIntereses) + "</int></td><td><int style='border-top:solid 1px black;'>" + money_format(totalAmortizacion) + "</int></td><td></td></tr>";
            table += "<tr style='border-bottom:solid 1px #80ced6'><td></td><td></td><td>  <b> Año " + ((i / 12) + 1) + " </b></td><td></td><td></td></tr>";
        }
    }
    table += "<tr><td></td><td style='text-align:right;'> </td><td><int style='border-top:1px solid black'>" + money_format(totalIntereses) + "</int></td><td><int style='border-top:solid 1px black;'>" + money_format(totalAmortizacion) + "</int></td><td></td></tr>";
    table += "</tbody> </table> <br/> ";
    document.getElementById("tabla").innerHTML = table;
    document.getElementById("opcsTabla").innerHTML = "<div style='text-align:center; max-width:200px; margin:0 auto;'><button title='Imprimir' onclick='printDiv()'><i class='fa fa-print'></i> </button> <button title='Exportar a Excel' onclick='exportXLS()'> <i class='fa fa-file-excel-o'></i></button></div>";
    $("#Renta").val(money_format(R));
    $("#Intereses").val(money_format(totalIntereses));
    Monto = Number(Monto) + Number(totalIntereses);
    $("#Inversion").val(money_format(Monto));
};
function money_format(amount) {
    var moneda = $("#moneda").val();
    return new Intl.NumberFormat("ES-DO", { style: 'currency', currency: moneda, currencyDisplay: 'symbol' }).format(amount)
}
function printDiv() {
    var plazos = document.getElementById("Cantidad").value;
    var Monto = document.getElementById("Valor").value;
    var periodo = $("#Periodo").val();
    var PP = $("#PeriodoPlazo").val();
    plazos = PP * plazos;
    if (plazos > 11) {
        var meses = plazos % 12;
        var anos = (plazos - meses) / 12;
        if (meses != 0) {
            meses = " y " + meses + (meses > 1 ? " Meses " : " Mes ");
        }
        else {
            meses = "";
        }
        plazos = anos + (anos > 1 ? " Años " : " Año ") + meses;
    }
    else {
        plazos = plazos + (plazos > 1 ? " Meses " : " Mes ");
    }
    switch (Number(periodo)) {
        case 12: periodo = "Anual";
            break;
        case 6: periodo = "Semestral";
            break;
        case 3: periodo = "Trimestral";
            break;
        case 2: periodo = "Bimestral";
            break;
        case 1: periodo = "Mensual";
            break;
    }
    var contenido = "<h1>Tabla Amortizacion</h1>";
    contenido += "<p><b>Monto:</b>" + money_format(Monto) + "</p>";
    contenido += "<p><b>Plazo:</b>" + plazos + "</p>";
    contenido += "<p><b>Tasa:</b>" + document.getElementById("Tasa").value + "% " + periodo + "</p>";
    contenido += document.getElementById("tabla").innerHTML;
    var contenidoOriginal = document.body.innerHTML;

    document.body.innerHTML = contenido;

    window.print();

    document.body.innerHTML = contenidoOriginal;
}
function exportXLS(e) {
    var plazos = document.getElementById("Cantidad").value;
    var Monto = document.getElementById("Valor").value;
    var periodo = $("#Periodo").val();
    var PP = $("#PeriodoPlazo").val();
    plazos = PP * plazos;
    if (plazos > 11) {
        var meses = plazos % 12;
        var anos = (plazos - meses) / 12;
        if (meses != 0) {
            meses = " y " + meses + (meses > 1 ? " Meses " : " Mes ");
        }
        else {
            meses = "";
        }
        plazos = anos + (anos > 1 ? " Años " : " Año ") + meses;
    }
    else {
        plazos = plazos + (plazos > 1 ? " Meses " : " Mes ");
    }
    switch (Number(periodo)) {
        case 12: periodo = "Anual";
            break;
        case 6: periodo = "Semestral";
            break;
        case 3: periodo = "Trimestral";
            break;
        case 2: periodo = "Bimestral";
            break;
        case 1: periodo = "Mensual";
            break;
    }
    var contenido = "<h1>Tabla Amortizacion</h1>";
    contenido += "<p><b>Monto:</b>" + money_format(Monto) + "</p>";
    contenido += "<p><b>Plazo:</b>" + plazos + "</p>";
    contenido += "<p><b>Tasa:</b>" + document.getElementById("Tasa").value + "% " + periodo + "</p>";
    contenido += $('#tabla').html();
    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(contenido));
    e.preventDefault();
}
function ConvertPlazo() {
    if ($("#Cantidad").val() == "") 
        return false;

    var Plazo = Number($("#Cantidad").val());
    var PP = parseInt($("#PeriodoPlazo").val());

    if (PP === 12) {
        Plazo = Plazo / 12;
        $("#Cantidad").val(Plazo);
    } else {
        Plazo = 12 * Plazo;
        $("#Cantidad").val(Plazo);
    }
}