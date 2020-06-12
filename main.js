$(document).ready(function(){
    var apiUrl = 'http://157.230.17.132:4024/sales'


    $.ajax({
        'url': apiUrl,
        'method': 'GET',
        'success': function(salesMonth){
            // console.log(salesMonth);
            var dataSales = monthlySales(salesMonth); // salvo in una variabile il return della funzione cha fa le operazioni di calcolo delle vendite per mese e la passo come parametro per disegnare il grafico
            chartMonthlySales(dataSales);
            //chiamata della funzione delle vendite per venditore
            var dataSalesSalesman = salesSalesman(salesMonth);
            //chiamata della funzione per creare i grafici delle vendite x venditore
            chartSalesman(dataSalesSalesman);

        }, // success
        'error': function(){
            alert('error');
        }
    }); //fine ajax

    //intercettare il click sul bottone
    $('#add-sale').on('click', function(){
        var selectedSalesman = $('.salesman-name').val();
        var selectedMonth = $('.sale-month').val();
        var dateSale = '01/'+ selectedMonth + '2017';
        var amountAdded = $('#amount-sale').val();

        $.ajax({
            'url': apiUrl,
            'method': 'POST',
            'data': {
                salesman: selectSalesman,
                date: dateSale,
                amount: amountAdded ,
            },
            'success': function(addSale){

            }, //success
            'error': function(){
                alert('error');
            }

        });//chiamata ajax metodo post
    });//fine click


    function monthlySales (sales){
        var monthSale = {
            'January': 0,
            'February': 0,
            'March': 0,
            'April': 0,
            'May': 0,
            'June': 0,
            'July': 0,
            'August': 0,
            'September': 0,
            'October': 0,
            'November': 0,
            'December': 0
        };

        //ciclare l'array per togliere i dati necessari
        for (var i = 0; i < sales.length; i++) {
            //creo una variabile per recuperare la quantita venduta
            var amount = parseInt(sales[i].amount)
            // console.log(amount);
            //creo una variabile per recuperare la data della vendita
            var dateSale = moment(sales[i].date, "DD/MM/YYYY").format("MMMM");
            console.log(dateSale);
            //faccio la somma delle vendite mensili
            monthSale[dateSale] += amount;
        }
        return monthSale
    }

    function salesSalesman(sales){
        //milestone 1.2: vendite ripartite tra venditori
        var totalSalesman = {};
        var totalSales = 0
        for (var i = 0; i < sales.length; i++) {
            var salesSalesman = parseInt(sales[i].amount);
            var nameSalesman = sales[i].salesman;
            if (!totalSalesman.hasOwnProperty(nameSalesman)) {
                totalSalesman[nameSalesman] = salesSalesman ;
            } else {
                totalSalesman[nameSalesman] += salesSalesman ;
            }
            totalSales += salesSalesman;
            // console.log(totalSales);
        }
        // ciclo for in per recuperare i nomi dei venditori e le vendite degll'oggetto totalSalesman
        for (nameSalesman in totalSalesman) {
        var amountSalesman = totalSalesman[nameSalesman];
        // calcolo la percentuale delle vendite di ogni venditore
        var percentageSalesman = (amountSalesman * 100 / totalSales).toFixed(1);
        // percentuale come label
        totalSalesman[nameSalesman] = percentageSalesman;
        }

        return totalSalesman;
    }

    function chartMonthlySales(monthSale){
        //estraggo le chiavi dell'oggetto creato precedentemente monthSale
        var key = Object.keys(monthSale);
        console.log(key);
        //estraggo i valori dell'oggetto monthSale
        var salesMonth = Object.values(monthSale)
        console.log(salesMonth);


        //---------chart
        var ctx = $('#chartMonthlySales')[0].getContext('2d');
        var myLineChart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
        labels: key,
        datasets: [{
            label: 'Vendite totale mensile nel 2017',
            backgroundColor: 'transparent',
            borderColor: 'rgb(255, 99, 132)',
            data: salesMonth
        }]
        },
    });// Chart
    }

    function chartSalesman(totalSalesman){
        var salesmanName = Object.keys(totalSalesman);
        console.log(salesmanName);
        var salesmanSales = Object.values(totalSalesman);
        console.log(salesmanSales);
        //chartMonthlySales
        var ctx = $('#chartSalesmanSales')[0].getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: salesmanName,
                datasets: [{
                    label: 'Importo per venditore',
                    data: salesmanSales,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });
    }

});//fine document
