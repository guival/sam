(function(window, document){
    'use strict';
    var consecutivo = 2;
    
    _.controlador('contacto', {
        contacto: {},
        contactos: [],
                  
        crear: function(formulario){
            this.contacto.nombre = formulario.nombre.value;
            this.contacto.correo = formulario.correo.value;
            this.contacto.edad = parseInt(formulario.edad.value, 10);
            this.contacto.nacimiento = formulario.nacimiento.value;
            this.contacto.recibir = formulario.recibir.checked?'1':'0';
            this.contacto.color = formulario.color.value;
            
            consecutivo = consecutivo + 1;
            this.contacto.identificador = consecutivo;
            
            // MySql
            //var json_upload = "json_contact=" + JSON.stringify({name:"John Rambo", time:"2pm"});
            var json_upload = "json_contact=" + JSON.stringify(this.contacto);
            var xhrC = new XMLHttpRequest();
            
            xhrC.addEventListener('load', function(){
                //setTimeout(function(){
                    alert(xhrC.responseText);
                //}, 500);
            }, false);
            
            xhrC.open("POST", "php/addContact.php", true);
            xhrC.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhrC.send(json_upload);
            // MySql
            
            //this.contactos.push(this.contacto);
            //alert("contacto creado con el ID: " + consecutivo);
            
            this.contacto = {};
            formulario.reset();
        },
        
        eliminar: function(id){
            
            var self = this;
            if(confirm("Desea eliminar el contacto?")){
                
                var xhrD = new XMLHttpRequest();
                xhrD.addEventListener('load', function(){
                    //setTimeout(function(){
                        alert(xhrD.responseText);
                    //}, 500);
                }, false);
                
                var str = "php/delContact.php?q=" + id;
                console.log("ID: ["+str+"]");

                xhrD.open('GET', str, true); //asincrónica (true)
                xhrD.send(null);
                
                //setTimeout(function(){
                    this.listar();
                //}, 500);
            }
        },
        
        //1.- Confirmación de la Actualización
        confirmaActualizar: function(id){

            if(confirm("Desea actualizar este contacto?")){

                var self = this;
                var xhrS = new XMLHttpRequest();
                xhrS.addEventListener('load', function(){
                    var objDatos = JSON.parse(xhrS.responseText);
                    self.contacto.identificador = objDatos.co_id;
                    self.contacto.nombre        = objDatos.co_nombre;
                    self.contacto.correo        = objDatos.co_correo;
                    self.contacto.edad          = objDatos.co_edad;
                    self.contacto.nacimiento    = objDatos.co_nacimiento;
                    self.contacto.recibir       = objDatos.co_acepta;
                    self.contacto.color         = objDatos.co_color;
                }, false);
                
                var str = "php/selContact.php?q=" + id;
                console.log("ID: ["+str+"]");

                xhrS.open('GET', str, true); //asincrónica (true)
                xhrS.send(null);
                
                setTimeout(function(){
                    window.location.hash = "#/actualizar-contacto";
                }, 500);
                
            }
        },
        
        //2.- Preparar la Actualización
        preparaActualizacion: function(){
            var formulario = _.get('frmActualiza');
            formulario.identificador.value = this.contacto.identificador;
            formulario.nombre.value = this.contacto.nombre;
            formulario.correo.value = this.contacto.correo;
            formulario.edad.value = this.contacto.edad;
            formulario.nacimiento.value = this.contacto.nacimiento;
            formulario.recibir.checked = this.contacto.recibir;
            formulario.color.value = this.contacto.color;
        },
        
        //3.- Actualizar contacto
        actualizar: function(formulario){
            
            this.contacto.identificador = formulario.identificador.value;
            this.contacto.nombre = formulario.nombre.value;
            this.contacto.correo = formulario.correo.value;
            this.contacto.edad = parseInt(formulario.edad.value, 10);
            this.contacto.nacimiento = formulario.nacimiento.value;
            this.contacto.recibir = formulario.recibir.checked;
            this.contacto.color = formulario.color.value;
            
            var json_upload_u = "json_contact_u=" + JSON.stringify(this.contacto);
            var xhrU = new XMLHttpRequest();
            xhrU.addEventListener('load', function(){
                alert(xhrU.responseText);
            }, false);
            
            xhrU.open("POST", "php/updContact.php", true);
            xhrU.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhrU.send(json_upload_u);
            
            this.contacto = {};
            formulario.reset();
            window.location.hash = "#/listar-contactos";
        },
        
        listar: function(){
            var cuerpo   = _.get('cuerpoTabla'),
                template = _.get('fila'),
                fragmento = document.createDocumentFragment(),
                i = 0,
                max = 0,
                clon, id, nombre, correo,
                edad, nacimiento, acepta, color,
                acciones, eliminar, actualizar,
                self = this;
            
            //Mysql
            var xhrMysql = new XMLHttpRequest();
            xhrMysql.addEventListener('load', function(){
                
                //Para que la función no se ejecute antes de la carga de la vista, se usa setTimeout
                //setTimeout(function(){
                    
                    var cadCodificadaJSON = xhrMysql.responseText;
                    console.log("ResponseText: ["+xhrMysql.responseText+"]");
                    var objDatos = JSON.parse(xhrMysql.responseText);
                    //var objDatos = eval("(" + cadCodificadaJSON + ")"); //Creamos el objeto utilizando la cad. codificada
                           
                    max = Object.keys(objDatos).length;
                    console.log("max: ["+max+"]");
                   
                    //document.getElementById("divDetalles").innerHTML = objDatos.detalles[0] + ", " + objDatos.detalles[1] + ", " + objDatos.detalles[2];
                    
                    cuerpo.innerHTML='';
                    
                    //for(;i<max;i++){
                    for (i in objDatos) {

                        clon = template.content.cloneNode(true);

                        id = clon.querySelector('.identificador');
                        nombre = clon.querySelector('.nombre');
                        correo = clon.querySelector('.correo');
                        edad = clon.querySelector('.edad');
                        nacimiento = clon.querySelector('.nacimiento');
                        acepta = clon.querySelector('.acepta');
                        color = clon.querySelector('.color');

                        acciones = clon.querySelector('.acciones');
                        eliminar = acciones.querySelector('.eliminar');
                        actualizar = acciones.querySelector('.actualizar');

                        eliminar.dataset.id = objDatos[i].co_id;
                        eliminar.addEventListener('click', function(e){
                            e.preventDefault();
                            self.eliminar(e.target.dataset.id);
                        }, false);

                        actualizar.dataset.id = objDatos[i].co_id;
                        actualizar.addEventListener('click', function(e){
                            e.preventDefault();
                            self.confirmaActualizar(e.target.dataset.id);
                        }, false);

                        id.textContent         = objDatos[i].co_id;
                        nombre.textContent     = objDatos[i].co_nombre;
                        correo.textContent     = objDatos[i].co_correo;
                        edad.textContent       = objDatos[i].co_edad;
                        nacimiento.textContent = objDatos[i].co_nacimiento;
                        acepta.textContent     = objDatos[i].co_acepta;
                        color.textContent      = objDatos[i].co_color;

                        fragmento.appendChild(clon);
                    } //For
                    
                    cuerpo.appendChild(fragmento);
                    
                //}, 500);
                
            }, false);
            
            var str = "php/listarContactos.php?q=" + "1";
            //var str = "php/respuestaJSON.php";
            console.log("str: ["+str+"]");
            
            xhrMysql.open('GET', str, true); //asincrónica (true)
            xhrMysql.send(null);
            //Mysql
        }
    
    });
})(window, document);