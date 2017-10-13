(function(window, document){
    'use strict';
    
    var inicio = function(){
        
        var elemento = null,
            marco = null,
            rutas = {},
            controladores = {},
            ctrActual = null,
            
            libreria = {
                
                getID:  function(id){
                    elemento = document.getElementById(id);
                    return this;
                },
                
                get: function(id){
                    return document.getElementById(id);
                },
                
                noSubmit: function(){
                    elemento.addEventListener('submit', function(e){
                        e.preventDefault();
                    }, false);
                    return this;
                },
                
                controlador: function(nombre, ctrl){
                    controladores[nombre] = {'controlador': ctrl};
                    return this; //OJOOOOOOOOOOOOOOOOOOOOOOOO
                },
                
                getCtrl: function(){
                  return ctrActual;  
                },
                
                enrutar: function(){
                    marco = elemento;
                    return this;
                },
                
                ruta: function(ruta, plantilla, controlador, carga){
                    rutas[ruta] = {
                                    'plantilla': plantilla,
                                    'controlador': controlador,
                                    'carga': carga
                                  };
                    return this;
                },
                
                manejadorRutas: function(){
                    
                    console.log("Dentro de manejadorRutas");
                    
                    var hash = document.location.hash.substring(1) || '/',
                        destino = rutas[hash],
                        xhr = new XMLHttpRequest();
                    
                    console.log("Hash:["+document.location.hash+"]");

                    if (destino && destino.plantilla){
                        
                        //console.log("Plantilla:["+destino.plantilla+"]");
                        //console.log("Marco:["+marco.id+"]");
                        
                        /*
                        //Version anterior antes del Nivel 2 del objeto XHR
                        xhr.onreadystatechange = function() {
                            if (xhr.readyState == 4 && xhr.status == 200) {
                                marco.innerHTML = xhr.responseText;
                            }
                        };
                        //var kk = "http://localhost/spa/" + destino.plantilla;
                        //console.log("KK:["+kk+"]");
                        xhr.open("GET", destino.plantilla, true);
                        xhr.send(null);
                        */
                        
                        if (destino.controlador){
                            ctrActual = controladores[destino.controlador].controlador;
                        }
                        
                        xhr.addEventListener('load', function(){
                            marco.innerHTML = this.responseText;
                            //var kk = "http://localhost/spa/" + destino.plantilla;
                            //console.log("KK3:["+kk+"]");
                            
                            //Para que la función no se ejecute antes de la carga de la vista, se usa setTimeout
                            setTimeout(function(){
                                if(typeof(destino.carga) === 'function'){
                                    destino.carga();
                                }
                            }, 500);
                            
                        }, false);
                        xhr.open('get', destino.plantilla, true); //asincrónica (true)
                        xhr.send(null);
                        
                    } else {
                        console.log('No hay plantilla');
                        window.location.hash = '#/';
                    }
                    
                }
            };
        return libreria;
    }
    
    if(typeof window.libreria === 'undefined'){
        console.log("La 1ra vez");
        window.libreria = window._ = inicio();
        window.addEventListener('load', _.manejadorRutas, false);
        window.addEventListener('hashchange', _.manejadorRutas, false);
    } else {
        console.log('Se está llamando la librería nuevamente');
    }
    
})(window, document);
