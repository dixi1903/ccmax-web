/*global $, jQuery, google, angular, geocoder*/

function getAddress() {
    "use strict";
    
    var geocoder, numero, calle, colonia, municipio, estado, pais, zip;
    
    geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ address: "20.6558107,-103.3991779"}, function (results, status) {
        var lat, lng, i, count, input;

        if (status === google.maps.GeocoderStatus.OK) {
            
            count = results[0].address_components.length;

            for (i = 0; i < count; i++){
                
                switch (results[0].address_components[i].types[0]) {
                    case "street_number":
                        numero = results[0].address_components[i].long_name;
                        input = document.getElementById("numero-in");
                        input.value = numero;
                        break;
                      
                    case "route":
                        calle = results[0].address_components[i].long_name;
                        input = document.getElementById("calle-in");
                        input.value = calle;
                        break;
                     
                    case "neighborhood":
                        colonia = results[0].address_components[i].long_name;
                        input = document.getElementById("colonia-in");
                        input.value = colonia;
                        break;
                    
                    case "locality":
                        municipio = results[0].address_components[i].long_name;
                        break;
                        
                    case "administrative_area_level_1":
                        estado = results[0].address_components[i].long_name;
                        break;
                    
                    case "country":
                        pais = results[0].address_components[i].long_name;
                        break;
                    
                    case "postal_code":
                        zip = results[0].address_components[i].long_name;
                        input = document.getElementById("zip-in");
                        input.value = zip;
                        break;
                }
            }
            
        } else {
            window.alert("Geocode was not successful for the following reason: " + status);
        }
    });
}      

//angular.module('App', ['ui.bootstrap']);

getAddress();

 $(document).ready(function(){
      var count, calles;
        
        $.getJSON('http://api.geonames.org/findNearbyStreetsOSMJSON?lat=20.6558107&lng=-103.3991779&username=dixi1903', function(data) {
            calles = [];
            
            $.each(data.streetSegment, function(i, field){
                if(calles.indexOf(field.name) === -1)
                {
                    calles.push(field.name);
                }
            });
            
            
            $( ".calle-input" ).autocomplete({
                source: calles
            });

        });
});

/* $(document).ready(function () {

    $('#buscar').click(function () {
        $.getJSON('http://api.geonames.org/findNearbyStreetsOSMJSON?lat=20.6558107&lng=-103.3991779&username=demo', function(data) {
            window.alert(data);
        });
    });
});*/


 