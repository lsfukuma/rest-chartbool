$(document).ready(function(){

    // oggetto vuoto per il totale di vendite per mese
    var monthSale = {};
    $.ajax({
        'url': 'http://157.230.17.132:4024/sales',
        'method': 'GET',
        'success': function(sales){
            console.log(sales);
            //ciclare l'array per togliere i dati necessari
            for (var i = 0; i < sales.length; i++) {
                //creo una variabile per recuperare la quantita venduta
                var amount = sales[i].amount
                // console.log(amount);
                //creo una variabile per recuperare la data della vendita
                var dateSale = moment(sales[i].date, "DD/MM/YYYY").format("MM");
                // console.log(dateSale);

                // console.log(dateSale);
                //creo una variabile per recuperare il nome do numero_vendita_corrente
                var salesman = sales[i].salesman
                // console.log(salesman);
                if(!dateSale.hasOwnProperty(dateSale)) {
                    //il nome del venditore apparre per la prima volta, allora è inserito come nuova chiave nell'oggetto creato precedentemente con la quantità venduta nel mese
                    monthSale[dateSale] = amount;
                } else {
                    //il nome del venditore esiste già, dunque faccio la somma delle venditore
                    monthSale[dateSale] += amount;
                }
            }//fine ciclo for

            //estraggo le chiavi dell'oggetto creato precedentemente monthSale
            var key = Object.keys(monthSale);
            console.log(key);
            //estraggo i valori dell'oggetto monthSale
            var salesMonth = Object.values(monthSale)
            console.log(salesMonth);


            //---------chart
            var ctx = $('#myChart')[0].getContext('2d');
            var myLineChart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
            labels: key,
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: salesMonth
            }]
            },

            // Configuration options go here
            options: {}
        });



        'error': function(){
            alert('error');
        }
    }); //fine ajax

});//fine document
