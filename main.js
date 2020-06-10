$(document).ready(function(){
    $.ajax({
        'url': 'http://157.230.17.132:4024/sales',
        'method': 'GET',
        'success': function(data){
            console.log(data);
            //ciclare l'array per sapere togliere le vendite del mese
            var quantita = data.amount
            for (var i = 0; i < quantita.length; i++) {
                var vendita = quantita[i];
                console.log(vendita);
            }

        },
        'error': function(){
            alert('error');
        }
    }); //fine ajax
});//fine document
