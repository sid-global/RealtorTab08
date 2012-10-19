// **************************************************
// **   CONEXION Remota   **

var dirIP = "corprocessu.com" 
var dir_img = "http://" + dirIP + "/realtor_images"

// **   CONEXION Local   **

// var dirIP = "localhost"
// var dir_img = "C:/ALE/realtor_images"

// **************************************************
var puerto = "8001"

var fotos;
var indiceFotos;

var minimoPrecio;
var maximoPrecio;
var minimoMetros;
var maximoMetros;

var fotosLista;
var imagenesLista;
var indiceLista;

var nro_reg = 5;
var pos_inicio = 0;

function inicioSesion(login, pass){
	jQuery.get("http://"+dirIP+":"+puerto+"/t_cor_seg_users_0001_consulta_login",{"TK":"123456","login":login,"pswd":pass},function(resultado){
		if (resultado == "fracaso"){
			alert("Usuario no autorizado!");
		}
		else if (resultado == "inactivo"){
			alert("El usuario " + login + " se encuentra inactivo.");
		}
		else{
			//alert("Bienvenido " + login + "!")
			miRes0 = jQuery.parseJSON(resultado);
			//alert("Nombre completo: " + miRes0.name + " Propiedades registradas: " + miRes0.num_propias + " Propiedades compartidas: " + miRes0.num_compartidas + " Totales: " + miRes0.num_propiedades)
			localStorage.usr = login;
			location.href = "Menu.html";
		}
	})
}

function cerrarSesion(){
	localStorage.usr = "";
	location.href = "index.html"; 
}

function valorReg(tipo){
	document.getElementById('tipoReg').value=tipo;
}

function tipoReg(tipo){
	if(tipo==1)
		redireccionar('RegistroCorredor.html');
	else
		redireccionar('RegistroInmobiliaria.html');
}

function registrarCorredor(){
	var nombre = document.getElementById('nombre').value;
	var usr = document.getElementById('usr').value;
	var pass = document.getElementById('pass').value;
	var passC = document.getElementById('passC').value;
	var correo = document.getElementById('correo').value;
	var correoC = document.getElementById('correoC').value;
	var correoA = document.getElementById('correoA').value;
	var tlf1 = document.getElementById('tlf1').value;
	var tlf2 = document.getElementById('tlf2').value;
	var pagina_web = document.getElementById('pagWeb').value;
	var foto = "";
	
	var  profesion = document.getElementById('selectProfesion').value;
	var  experiencia = document.getElementById('selectAnio').value;
	
	var nombres = ["Nombre Usuario", "Nombre y Apellido", "Correo", "Confirmar correo", "Contraseña", "Confirmar contraseña", "Telefono 1", "Profesión", "Año de Inicio laboral"];
	var parametros = [usr, nombre, correo, correoC, pass, passC, tlf1, profesion, experiencia];
	
	if (!parametrosVacios(parametros, nombres)){
		if(pass == passC){
			if(correo == correoC){
				//insertarcorredor
				//insertarUSR
				jQuery.get("http://"+dirIP+":"+puerto+"/t_cor_seg_users_0001_inserta_usuario",{"TK":"123456","login":usr,"name":nombre,"pswd":pass,"email":correo,"email_alternativo":correoA,"pagina_web":pagina_web,"tlf1":tlf1,"tlf2":tlf2,"profesion":profesion,"experiencia":experiencia,"foto":foto},function(resultado){
					if(resultado == "exito"){
						alert('Usuario registrado con exito');
						redireccionar("index.html")
					}else if (resultado == "fracaso"){
						alert("El nombre de usuario ya está siendo utilizado");
						document.getElementById('usr').value = "";
					}
				})				
				
			}else{
				alert('Los correos no coinciden');
				document.getElementById('correo').value = "";
				document.getElementById('correoC').value = "";
			}
		}else{
			alert('Las contraseñas no coinciden');
			document.getElementById('pass').value = "";
			document.getElementById('passC').value = "";
		}
	}
}

function registrarInmobiliaria(){
	var nombre = document.getElementById('nombre').value;
	var usr = document.getElementById('usr').value;
	var pass = document.getElementById('pass').value;
	var passC = document.getElementById('passC').value;
	var correo = document.getElementById('correo').value;
	var correoC = document.getElementById('correoC').value;
	var correoA = document.getElementById('correoA').value;
	var tlf1 = document.getElementById('tlf1').value;
	var tlf2 = document.getElementById('tlf2').value;
	var pagina_web = document.getElementById('pagWeb').value;
	var direccion = document.getElementById('direccion').value;
	var foto = "";
	
	var fecha_ingreso = obtiene_fecha();
	var active = "S";
	var priv_admin = "N";

	
	var nombres = ["Nombre Usuario", "Nombre Inmobiliaria", "Correo", "Confirmar correo", "Contraseña", "Confirmar contraseña", "Telefono 1", "Dirección"];
	var parametros = [usr, nombre, correo, correoC, pass, passC, tlf1, direccion];
	
	if (!parametrosVacios(parametros, nombres)){
		if(pass == passC){
			if(correo == correoC){
				//insertarcorredor
				//insertarUSR
				jQuery.get("http://"+dirIP+":"+puerto+"/t_cor_seg_users_0002_inserta_usuario",{"TK":"123456","login":usr,"name":nombre,"pswd":pass,"email":correo,"email_alternativo":correoA,"pagina_web":pagina_web,"tlf1":tlf1,"tlf2":tlf2,"direccion":direccion,"foto":foto},function(resultado){
					if(resultado == "exito"){
						alert('Usuario registrado con exito');
						redireccionar("index.html")
					}else if (resultado == "fracaso"){
						alert("El nombre de usuario ya está siendo utilizado");
						document.getElementById('usr').value = "";
					}
				})				
				
			}else{
				alert('Los correos no coinciden');
				document.getElementById('correo').value = "";
				document.getElementById('correoC').value = "";
			}
		}else{
			alert('Las contraseñas no coinciden');
			document.getElementById('pass').value = "";
			document.getElementById('passC').value = "";
		}
	}
}

function parametrosVacios(parametros, nombres){
	vacios = new Array();
	resp = false;
	long=parametros.length;
	msj="OBLIGATORIAMENTE \nDebe llenar los campos:\n"
	
	for (var i=0; i < long; i++) {
		if(parametros[i] == ""){
			vacios.push(parametros[i]);
			msj += "\n - "+nombres[i];
		}
	}
	
	if (vacios.length != 0){
		resp = true;
		alert(msj);
	}
		
	return resp;
}

function listarProfesion(){
	acumulado = "<option value=''>Seleccionar</option>";
	jQuery.get("http://"+dirIP+":"+puerto+"/t_inm_profesiones_0001_consulta_profesiones",{"TK":"123456"},function(resultado){
		miRes = jQuery.parseJSON(resultado);
		$.each(miRes, function(i, elemento){
			acumulado += "<option id='"+elemento.profesion_sec+"' value='"+elemento.profesion_sec+"'>"+elemento.profesion_id+"</option>";
		})
		$("#selectProfesion").html(acumulado).selectmenu('refresh', true);
		listarAnio();
	})
}

function listarAnio(){
	acumulado = "<option value=''>Seleccionar</option>";
	var fecha=new Date();
	var anio=fecha.getFullYear();
	var i = anio;
	var lim = anio - 50
	
	while(i >= lim){
		acumulado += "<option id='"+i+"' value='"+i+"'>"+i+"</option>";
		i--;
	}
	$("#selectAnio").html(acumulado).selectmenu('refresh', true);	
}

function obtiene_fecha(){
	var fecha_actual = new Date();
	var dia = fecha_actual.getDate();
	var mes = fecha_actual.getMonth() + 1;
	var anio = fecha_actual.getFullYear();
	var hora = fecha_actual.getHours();
	var minutos = fecha_actual.getMinutes();
	var segundos = fecha_actual.getSeconds();
	if (mes < 10){mes = '0' + mes}
	if (dia < 10){dia = '0' + dia}
	if (hora < 10){hora = '0' + hora}
	if (minutos < 10){minutos = '0' + minutos}
	if (segundos < 10){segundos = '0' + segundos}
	return (anio + "-" + mes + "-" + dia);
}

function listarEstados(tipo){
	jQuery.get("http://"+dirIP+":"+puerto+"/t_cor_crm_zona_niv2_0001_consulta_estados",{"TK":"123456","cor_zona_n1_sec":1},function(resultado){
		miRes1 = jQuery.parseJSON(resultado);
		if(tipo==0)
			acumulado1 = "<option id='ALL' value='ALL'>Todos los Estados</option>";
		else
			acumulado1 = "<option id='ALL' value='ALL'>Seleccionar</option>";
		$.each(miRes1, function(i, elemento){
			acumulado1 += "<option id='" + elemento.cor_zona_n2_id + "' value='"+ elemento.cor_zona_n2_sec +"'>" + elemento.cor_zona_n2_id + "</option>";
		})
		$("#losEstados").html(acumulado1).selectmenu('refresh', true);
		listarCiudades(tipo);
	})
}

function listarCiudades(tipo){
	var  estado = document.getElementById('losEstados').value;
	if(estado != "ALL"){
		jQuery.get("http://"+dirIP+":"+puerto+"/t_cor_crm_zona_niv3_0001_consulta_ciudades",{"TK":"123456","cor_zona_n1_sec":1,"cor_zona_n2_sec":estado},function(resultado){
			miRes2 = jQuery.parseJSON(resultado);
			if(tipo==0)				
				acumulado2 = "<option id='ALL' value='ALL'>Todas las Ciudades</option>";
			else
				acumulado2 = "<option id='ALL' value='ALL'>Seleccionar</option>";		
			$.each(miRes2, function(i, elemento){
				acumulado2 += "<option id='" + elemento.cor_zona_n3_id + "' value='" + elemento.cor_zona_n3_sec + "'>" + elemento.cor_zona_n3_id + "</option>";
			})
			$("#lasCiudades").empty();
			$("#lasCiudades").html(acumulado2).selectmenu('refresh', true);
			listarZonas(tipo);
		})
	}
	else{
		$("#lasCiudades").empty();
		$("#lasZonas").empty();
		if(tipo==0){
			$("#lasCiudades").html("<option id='ALL' value='ALL'>Todas las Ciudades</option>").selectmenu('refresh', true);
			$("#lasZonas").html("<option id='ALL' value='ALL'>Todas las Zonas</option>").selectmenu('refresh', true);
		}else{
			$("#lasCiudades").html("<option id='ALL' value='ALL'>Seleccionar</option>").selectmenu('refresh', true);
			$("#lasZonas").html("<option id='ALL' value='ALL'>Seleccionar</option>").selectmenu('refresh', true);
		}
	}
}

function listarZonas(tipo){
	var  estado = document.getElementById('losEstados').value;
	var  ciudad = document.getElementById('lasCiudades').value;
	if(tipo==0)				
		str = "<option id='ALL' value='ALL'>Todas las Zonas</option>";
	else
		str = "<option id='ALL' value='ALL'>Seleccionar</option>";	
	if(estado != "ALL"){
		if(ciudad != "ALL"){
			jQuery.get("http://"+dirIP+":"+puerto+"/t_cor_crm_zona_niv4_0001_consulta_zonas",{"TK":"123456","cor_zona_n1_sec":1,"cor_zona_n2_sec":estado,"cor_zona_n3_sec":ciudad},function(resultado){
				miRes3 = jQuery.parseJSON(resultado);
				if(tipo==0)				
					acumulado3 = "<option id='ALL' value='ALL'>Todas las Zonas</option>";
				else
					acumulado3 = "<option id='ALL' value='ALL'>Seleccionar</option>";				
				$.each(miRes3, function(i, elemento){
					acumulado3 += "<option id='" + elemento.cor_zona_n4_id + "' value='" + elemento.cor_zona_n4_sec + "'>" + elemento.cor_zona_n4_id + "</option>"
				})
				$("#lasZonas").empty();
				$("#lasZonas").html(acumulado3).selectmenu('refresh', true);
			})
		}
		else{
			$("#lasZonas").empty();
			$("#lasZonas").html(str).selectmenu('refresh', true);
		}
	}
	else{
		$("#lasZonas").empty();
		$("#lasZonas").html(str).selectmenu('refresh', true);
	}
}

function setPrecios(){
	jQuery.get("http://"+dirIP+":"+puerto+"/t_cor_base_param_0002_consulta_parametro_rango_cantidad",{"TK":"123456","cor_paramsec":1},function(resultado){
		miRes4 = jQuery.parseJSON(resultado);
		$.each(miRes4, function(i, elemento){
			minimoPrecio = elemento.cor_param_cantidad1;
			maximoPrecio = elemento.cor_param_cantidad2;
			document.getElementById('minP').innerHTML = formatoNro(minimoPrecio);
			document.getElementById('maxP').innerHTML = formatoNro(maximoPrecio);
			document.getElementById('precio_min').setAttribute ("step", 100000);
			document.getElementById('precio_max').step = 500000;
		})
	})
}

function actualizaPrecioMin(nivel){
	document.getElementById('minP').innerHTML = formatoNro(parseInt(minimoPrecio+((maximoPrecio-minimoPrecio)*(nivel/100))));
}

function actualizaPrecioMax(nivel){
	document.getElementById('maxP').innerHTML = formatoNro(parseInt(minimoPrecio+((maximoPrecio-minimoPrecio)*(nivel/100))));
}

function setMetros(){
	jQuery.get("http://"+dirIP+":"+puerto+"/t_cor_base_param_0002_consulta_parametro_rango_cantidad",{"TK":"123456","cor_paramsec":2},function(resultado){
		miRes5 = jQuery.parseJSON(resultado);
		$.each(miRes5, function(i, elemento){
			minimoMetros = elemento.cor_param_cantidad1;
			maximoMetros = elemento.cor_param_cantidad2;
			document.getElementById('minM').innerHTML = formatoNro(minimoMetros);
			document.getElementById('maxM').innerHTML = formatoNro(maximoMetros);
		})
	})
}

function actualizaMetrosMin(nivel){
	document.getElementById('minM').innerHTML = formatoNro(parseInt(minimoMetros+((maximoMetros-minimoMetros)*(nivel/100))));
}

function actualizaMetrosMax(nivel){
	document.getElementById('maxM').innerHTML = formatoNro(parseInt(minimoMetros+((maximoMetros-minimoMetros)*(nivel/100))));
}

function listarHabBan(){
	jQuery.get("http://"+dirIP+":"+puerto+"/t_cor_base_param_0002_consulta_parametro_rango_cantidad",{"TK":"123456","cor_paramsec":3},function(resultado){
		miRes6 = jQuery.parseJSON(resultado);
		$.each(miRes6, function(i, elemento){
			minimoHab = elemento.cor_param_cantidad1;
			maximoHab = elemento.cor_param_cantidad2;
			acumulado = "";
			var i;
			for(i = minimoHab; i <= maximoHab; i++){
				acumulado += "<option id='Hab"+i+"' value='Hab"+i+"'>"+i+"+</option>";
			}
			$("#Habitaciones").empty();
			$("#Habitaciones").html(acumulado).selectmenu('refresh', true);
		})
	})
	jQuery.get("http://"+dirIP+":"+puerto+"/t_cor_base_param_0002_consulta_parametro_rango_cantidad",{"TK":"123456","cor_paramsec":4},function(resultado){
		miRes7 = jQuery.parseJSON(resultado);
		$.each(miRes7, function(i, elemento){
			minimoBan = elemento.cor_param_cantidad1;
			maximoBan = elemento.cor_param_cantidad2;
			acumulado = "";
			var i;
			for(i = minimoBan; i <= maximoBan; i++){
				acumulado += "<option id='Ban"+i+"' value='Ban"+i+"'>"+i+"+</option>";
			}
			$("#Banos").empty();	
			$("#Banos").html(acumulado).selectmenu('refresh', true);
		})
	})
}

function listarTiposInm(){
	jQuery.get("http://"+dirIP+":"+puerto+"/t_inm_tipo_inmueble_0001_consulta_tipo_inmueble",{"TK":"123456"},function(resultado){
		miRes8 = jQuery.parseJSON(resultado);
		acumulado = "<option id='ALL' value='ALL'>Todas los Tipos</option>";
		$.each(miRes8, function(i, elemento){
			acumulado += "<option id=" + elemento.inm_tipoinmueble_sec + " value='" + elemento.inm_tipoinmueble_sec + "'>" + elemento.inm_tipoinmueble_id + "</option>";
		})
		$("#tipo_inm").html(acumulado).selectmenu('refresh', true);
	})
}

function buscar(modalidad, pais, estado, ciudad, zona, precioMin, precioMax, metrosMin, metrosMax, habitaciones, banos, tipo, codigo){
	location.href = "#page2";
	pos_inicio = 0;
	var codigoAlt = codigo
	if(codigo == ""){
		codigoAlt = "null"
	}
	fotosLista = null;
	imagenesLista = null;
	fotosLista = new Array();
	imagenesLista = new Array();
	indiceLista = 0;
	jQuery.get("http://"+dirIP+":"+puerto+"/t_inm_inmueble_0003_consulta_busqueda_inmueble_paginado",{"TK":"123456","inm_inmueble_operacion":modalidad,"cor_zona_n1_sec":pais, "cor_zona_n2_sec":estado,"cor_zona_n3_sec":ciudad,"cor_zona_n4_sec":zona,"precioMin":precioMin,"precioMax":precioMax, "metrosMin":metrosMin, "metrosMax":metrosMax, "habs":habitaciones, "banos":banos, "inm_tipoinmueble_sec":tipo,"inm_inmueble_sec":codigoAlt, "nro_reg":nro_reg, "pos_inicio":pos_inicio},function(resultado){
		miRes9 = jQuery.parseJSON(resultado);
		acumulado = "";
		$.each(miRes9,function(i, elemento){
		if(elemento.val!="123456"){
			codigo2 = elemento.inm_inmueble_sec;
			ciudad = elemento.ciudad;
			zona = elemento.zona;
			descripcion = elemento.inm_inmueble_desc;
			precio = formatoNro(elemento.inm_inmueble_precio);
			//canon = elemento.inm_inmueble_canon_bsf;
			metros = formatoNro(elemento.inm_inmueble_mtrsconstruccion);
			habitaciones = elemento.inm_inmueble_nro_hab;
			banos = elemento.inm_inmueble_nro_banos;
			operacion = elemento.inm_inmueble_operacion;
			operacion2 = "\'"+operacion+"\'"
			operacion3 = "";
			tipoInm = elemento.inm_tipoinmueble_sec;
			if(operacion == "V"){
				operacion3 = "Venta";
			}
			else if(operacion == "A"){
				operacion3 = "Alquiler";
			}
			elTipo = tipoInmueble(tipoInm);
			
			acumulado += "<li><a onclick=\"detalle("+codigo2+","+operacion2+");\" href='#page3'><img id='pic"+codigo2+"' src='" + dir_img + "/Casita.jpg' height='100' width='100'></img><h3>"+elTipo+" en "+operacion3+"</h3><p>COD #"+codigo2+"</p><p>"+ciudad+" / "+zona+"</p><p>"+descripcion+"</p><p>BsF. "+precio+"</p><p>"+metros+" mts<sup>2</sup></p><p>Habs: "+habitaciones+" / Baños: "+banos+"</p></a></li>";
			if (elemento.foto != "null"){
				fotosLista[indiceLista] = dir_img + "/" + elemento.foto;
				imagenesLista[indiceLista] = "pic"+codigo2;
				indiceLista++;
			}
		}else{
			acumulado1 = "<li data-role='list-divider' role='heading' data-theme='a'><h3>Resultados coincidentes ("+elemento.cant+")</h3></li>";
			acumulado1 += acumulado;
			}
		})
		$("#espera").html("");
		$("#resultadosLista").html(acumulado1);
		$("#resultadosLista").listview('refresh');
		var i;
		for(i = 0; i < indiceLista; i++){
			document.images[imagenesLista[i]].src = fotosLista[i];
		}
	})
}

function buscarMas(modalidad, pais, estado, ciudad, zona, precioMin, precioMax, metrosMin, metrosMax, habitaciones, banos, tipo, codigo){
	location.href = "#page2";
	pos_inicio = pos_inicio + nro_reg; 
	
	modalidad = localStorage.modalidad;
	pais = 1;
	estado = document.getElementById('losEstados').value;
	ciudad = document.getElementById('lasCiudades').value;
	zona = document.getElementById('lasZonas').value;
	precioMin = minimoPrecio + ((maximoPrecio-minimoPrecio)*(document.getElementById('precio_min').value/100));
	precioMax = minimoPrecio + ((maximoPrecio-minimoPrecio)*(document.getElementById('precio_max').value/100)); 
	metrosMin = minimoMetros + ((maximoMetros-minimoMetros)*(document.getElementById('metros_min').value/100));
	metrosMax = minimoMetros + ((maximoMetros-minimoMetros)*(document.getElementById('metros_max').value/100));
	habitaciones = parseInt((document.getElementById('Habitaciones').options[document.getElementById('Habitaciones').selectedIndex].id).substring(3,4));
	banos = parseInt((document.getElementById('Banos').options[document.getElementById('Banos').selectedIndex].id).substring(3,4));
	tipo = document.getElementById('tipo_inm').value;
	codigo = document.getElementById('inm_sec').value
	
	var codigoAlt = codigo
	if(codigo == ""){
		codigoAlt = "null"
	}
	fotosLista = null;
	imagenesLista = null;
	fotosLista = new Array();
	imagenesLista = new Array();
	indiceLista = 0;
	jQuery.get("http://"+dirIP+":"+puerto+"/t_inm_inmueble_0003_consulta_busqueda_inmueble_paginado",{"TK":"123456","inm_inmueble_operacion":modalidad,"cor_zona_n1_sec":pais, "cor_zona_n2_sec":estado,"cor_zona_n3_sec":ciudad,"cor_zona_n4_sec":zona,"precioMin":precioMin,"precioMax":precioMax, "metrosMin":metrosMin, "metrosMax":metrosMax, "habs":habitaciones, "banos":banos, "inm_tipoinmueble_sec":tipo,"inm_inmueble_sec":codigoAlt, "nro_reg":nro_reg, "pos_inicio":pos_inicio},function(resultado){
		miRes9 = jQuery.parseJSON(resultado);
		acumulado = "";
		$.each(miRes9,function(i, elemento){
		if(elemento.val!="123456"){
			codigo2 = elemento.inm_inmueble_sec;
			ciudad = elemento.ciudad;
			zona = elemento.zona;
			descripcion = elemento.inm_inmueble_desc;
			precio = formatoNro(elemento.inm_inmueble_precio);
			//canon = elemento.inm_inmueble_canon_bsf;
			metros = formatoNro(elemento.inm_inmueble_mtrsconstruccion);
			habitaciones = elemento.inm_inmueble_nro_hab;
			banos = elemento.inm_inmueble_nro_banos;
			operacion = elemento.inm_inmueble_operacion;
			operacion2 = "\'"+operacion+"\'"
			operacion3 = "";
			tipoInm = elemento.inm_tipoinmueble_sec;
			if(operacion == "V"){
				operacion3 = "Venta";
			}
			else if(operacion == "A"){
				operacion3 = "Alquiler";
			}
			elTipo = tipoInmueble(tipoInm);
			
			acumulado += "<li><a onclick=\"detalle("+codigo2+","+operacion2+");\" href='#page3'><img id='pic"+codigo2+"' src='" + dir_img + "/Casita.jpg' height='100' width='100'></img><h3>"+elTipo+" en "+operacion3+"</h3><p>COD #"+codigo2+"</p><p>"+ciudad+" / "+zona+"</p><p>"+descripcion+"</p><p>BsF. "+precio+"</p><p>"+metros+" mts<sup>2</sup></p><p>Habs: "+habitaciones+" / Baños: "+banos+"</p></a></li>";
			if (elemento.foto != "null"){
				fotosLista[indiceLista] = dir_img + "/" + elemento.foto;
				imagenesLista[indiceLista] = "pic"+codigo2;
				indiceLista++;
			}
		}
		})
		$("#resultadosLista").append(acumulado);
		$("#resultadosLista").listview('refresh');
		var i;
		for(i = 0; i < indiceLista; i++){
			document.images[imagenesLista[i]].src = fotosLista[i];
		}
	})
}

function tipoInmueble(tipoInm){
	if(tipoInm == "1"){
		elTipo = "Apartamento";
	}
	else if(tipoInm == "2"){
		elTipo = "Casa";
	}
	else if(tipoInm == "3"){
		elTipo = "Oficina";
	}
	else if(tipoInm == "4"){
		elTipo = "Galpón";
	}
	else if(tipoInm == "5"){
		elTipo = "Local";
	}
	else if(tipoInm == "6"){
		elTipo = "Terreno";
	}
	return elTipo;
}

function detalle(codigo, operacion){
	localStorage.cod = codigo;
	localStorage.op = operacion;
	jQuery.get("http://"+dirIP+":"+puerto+"/t_inm_inmueble_0002_consulta_busqueda_inmueble",{"TK":"123456","tipo_operacion":localStorage.op,"inm_inmueble_sec":localStorage.cod},function(resultado){
		miRes10 = jQuery.parseJSON(resultado);
		acumulado = "</br>";
		iniS = "<h3></h3><spam style=\"font-weight: normal;\">"
		finS = "</spam>"
		$.each(miRes10,function(i, elemento){	
			acumulado += "<li data-role='list-divider' role='heading'>"
			elTipo = tipoInmueble(elemento.inm_tipoinmueble_sec);
			acumulado += "<p><h3>"+elTipo+" en "+operacion3+"</h3></p>"
					
			if(operacion=="V"){
				precio = formatoNro(elemento.inm_inmueble_precio);
				acumulado += "<p><h3>Precio: <spam style=\"font-weight: normal;\">"+precio+" BsF</spam></h3></p>"
			}else{
				precio = formatoNro(elemento.inm_inmueble_canon_bsf);
				acumulado += "<p><h3>Canon: <spam style=\"font-weight: normal;\">"+precio+"</spam></h3></p>"
			}
			if(elTipo == "Casa"){
				correo_contenido = "Por medio del presente doy a conocer mi interés por la "+elTipo+" en "+operacion3+" que se ubica en la ciudad de "+elemento.ciudad+" en "+elemento.zona+" cuyo valor es de "+precio+" BsF. Por favor, envíenme más información sobre este u otros listados similares en esta zona.";
			}else{	
				correo_contenido = "Por medio del presente doy a conocer mi interés por la "+elTipo+" en "+operacion3+" que se ubica en la ciudad de "+elemento.ciudad+" en "+elemento.zona+" cuyo valor es de "+precio+" BsF. Por favor, envíenme más información sobre este u otros listados similares en esta zona.";
			}
			correo_asunto = "Solicitud de información de "+elTipo+" en "+operacion3;
			acumulado += "</br><p>"+iniS+"<center>"+elemento.inm_inmueble_desc+"</center>"+finS+"</p>"
			
			acumulado += "</br><p><h3>Ubicación</h3></p>"
			acumulado += "<p>"+iniS+"Ciudad: "+elemento.ciudad+""+finS+"</p>"
			acumulado += "<p>"+iniS+"Zona: "+elemento.zona+""+finS+"</p>"
			
			acumulado += "</br><p><h3>Características</h3></p>"
			acumulado += "<p>"+iniS+"Habitaciones: "+elemento.inm_inmueble_nro_hab+""+finS+"</p>"
			acumulado += "<p>"+iniS+"Baños: "+elemento.inm_inmueble_nro_banos+""+finS+"</p>"
			acumulado += "<p>"+iniS+"Estacionamientos: "+elemento.inm_inmueble_nro_estac+""+finS+"</p>"
			acumulado += "<p>"+iniS+"Metros Cuadrados:"+formatoNro(elemento.inm_inmueble_mtrsconstruccion)+""+finS+"</p>"
			
			acumulado += "</br><p><h3>Especificaciones</h3><spam style=\"font-weight: normal;\">"+elemento.inm_inmueble_especificaciones+"</spam></p>"
			
			jQuery.get("http://"+dirIP+":"+puerto+"/t_inm_corredor_0001_consulta_corredor",{"TK":"123456","login":elemento.inm_corredor},function(resultado){
			miRes12 = jQuery.parseJSON(resultado);
			$.each(miRes12,function(i, elemento){
				acumulado += "</br><p><h3>Corredor</h3></p>"
				acumulado += "<table><tr><td><img id='pic"+elemento.nombre+"' max-height src='" + dir_img + "/corredores/"+elemento.inm_corredor_foto+" ' height='64' width='64'/></td>"
				acumulado += "<td><p>"+iniS+elemento.nombre+""+finS+"</p>"
				acumulado += "<p>"+iniS+"Correo: <a href=\"mailto:"+elemento.email+"?subject="+correo_asunto+"&body="+correo_contenido+"\">"+elemento.email+finS+"</a>"
				//acumulado += "<input type=image src='http://cdn1.iconfinder.com/data/icons//MobilePhoto-png/59/Mobile-Sms.png' height='15' width='20' onclick=\"location.href='mailto:"+elemento.email+"?subject="+correo_asunto+"&body="+correo_contenido+"'\" data-inline='true'></p>"
				if(elemento.inm_corredor_telf1!="N/A" && elemento.inm_corredor_telf2!="N/A"){
					//acumulado += " <a href='tel:"+04261145110+"' data-role='button' data-icon='delete' data-inline='true'>llamar</a>"
					//acumulado += " <a href='sms://"+04261145110+"' data-role='button' data-icon='delete' data-inline='true'>sms</a>"
					acumulado += "<p>"+iniS+"Teléfono 1: "+elemento.inm_corredor_telf1+finS+"   "
					acumulado += " <input type=image src='http://iconos/Phone.png' height='30' width='30' onclick=\"location.href='tel:"+elemento.inm_corredor_telf1+"'\" data-inline='true'>" 
					acumulado += " <input type=image src='http://cdn1.iconfinder.com/data/icons/ciceronian/Icons/Text.png' height='30' width='30' onclick=\"location.href='sms://"+elemento.inm_corredor_telf1+"'\" data-inline='true'> </p>"
					acumulado += "<p>"+iniS+"Teléfono 2: "+elemento.inm_corredor_telf2+finS+"   "
					acumulado += " <input type=image src='http://cdn1.iconfinder.com/data/icons/ciceronian/Icons/Phone.png' height='30' width='30' onclick=\"location.href='tel:"+elemento.inm_corredor_telf2+"'\" data-inline='true'>" 
					acumulado += " <input type=image src='http://cdn1.iconfinder.com/data/icons/ciceronian/Icons/Text.png' height='30' width='30' onclick=\"location.href='sms://"+elemento.inm_corredor_telf2+"'\" data-inline='true'> </p>"
				}else if(elemento.inm_corredor_telf1=="N/A" && elemento.inm_corredor_telf2!="N/A"){
					acumulado += "<p>"+iniS+"Teléfono: "+elemento.inm_corredor_telf2+finS+"   "
					acumulado += " <input type=image src='http://cdn1.iconfinder.com/data/icons/ciceronian/Icons/Phone.png' height='30' width='30' onclick=\"location.href='tel:"+elemento.inm_corredor_telf2+"'\" data-inline='true'>" 
					acumulado += " <input type=image src='http://cdn1.iconfinder.com/data/icons/ciceronian/Icons/Text.png' height='30' width='30' onclick=\"location.href='sms://"+elemento.inm_corredor_telf2+"'\" data-inline='true'> </p>"
				}else if(elemento.inm_corredor_telf1!="N/A" && elemento.inm_corredor_telf2=="N/A"){					
					acumulado += "<p>"+iniS+"Teléfono: "+elemento.inm_corredor_telf1+finS+"   "
					acumulado += " <input type=image src='http://cdn1.iconfinder.com/data/icons/ciceronian/Icons/Phone.png' height='30' width='30' onclick=\"location.href='tel:"+elemento.inm_corredor_telf1+"'\" data-inline='true'>" 
					acumulado += " <input type=image src='http://cdn1.iconfinder.com/data/icons/ciceronian/Icons/Text.png' height='30' width='30' onclick=\"location.href='sms://"+elemento.inm_corredor_telf1+"'\" data-inline='true'> </p>"					
				}				
				acumulado += "</td></tr></table></li>"
				
				})

				jQuery.get("http://"+dirIP+":"+puerto+"/t_inm_inmueble_fotos_0001_consulta_fotos",{"TK":"123456","inm_inmueble_sec":localStorage.cod},function(resultado){
					miRes11 = jQuery.parseJSON(resultado);
					fotos = null;
					fotos = new Array();
					indiceFotos = 0;
					$.each(miRes11,function(i, elemento){
						fotos[i] = elemento.inm_inmueblefoto_ruta_nombre;
					})
					if(fotos.length>0){
						laImagen = new Image();
						laImagen.src = dir_img + "/" + fotos[0];
						document.images["fotoInmueble"].src = laImagen.src;
						document.images["fotoInmueble"].width = (200 * laImagen.width) / laImagen.height;
						document.images["fotoInmueble"].height = 200;
						$("#count_foto").html("1/"+fotos.length);
					}
					else{
						document.images["fotoInmueble"].src = dir_img + "/Casita.jpg";
						document.images["fotoInmueble"].width = 200;
						document.images["fotoInmueble"].height = 200;
						$("#count_foto").html("0/0");
					}
					$("#espera2").html("");
					$("#resultadosLista2").html(acumulado);
					$("#resultadosLista2:visible").listview('refresh',true);
					//document.getElementById('datosDetalle').innerHTML = acumulado;
					document.getElementById('losBotones').style.visibility = 'visible';
				})
			})
		})
	})
}

function anteriorFoto(){
	if(fotos.length > 0){
		if (indiceFotos > 0){
			indiceFotos--;
		}
		else{
			indiceFotos = (fotos.length - 1);
		}
		laImagen = new Image();
		laImagen.src = dir_img + "/" + fotos[indiceFotos];
		document.images["fotoInmueble"].src = laImagen.src;
		document.images["fotoInmueble"].width = (200 * laImagen.width) / laImagen.height;
		document.images["fotoInmueble"].height = 200;
		$("#count_foto").html(indiceFotos+1+"/"+fotos.length);
	}
}

function siguienteFoto(){
	if(fotos.length > 0){
		if (indiceFotos < fotos.length - 1){
			indiceFotos++;
		}
		else{
			indiceFotos = 0;
		}
		laImagen = new Image();
		laImagen.src = dir_img + "/" + fotos[indiceFotos];
		document.images["fotoInmueble"].src = laImagen.src;
		document.images["fotoInmueble"].width = (200 * laImagen.width) / laImagen.height;
		document.images["fotoInmueble"].height = 200;		
		$("#count_foto").html(indiceFotos+1+"/"+fotos.length);
	}
}

function redireccionar(url) {
	localStorage.regresar = url;
	window.open(url,"_self");
}

function nameFoto(){
	document.getElementById('name').setAttribute("value",localStorage.usr);
}

function consultaZona(){
	acumulado = "";
	jQuery.get("http://"+dirIP+":"+puerto+"/t_inm_especializacion_0002_consulta_zona_especializacion",{"TK":"123456","login":localStorage.usr},function(resultado){
		miRes = jQuery.parseJSON(resultado);
		$.each(miRes,function(i, elemento){				
			acumulado += "<li data-icon='delete' id='zona"+elemento.codigo+"'><a onclick='eliminaZona("+elemento.codigo+");'><p>"+elemento.pais+" - "+elemento.estado+" - "+elemento.ciudad+" - "+elemento.zona+"</p></a></li>";
			indiceLista++;
		})
		
		$("#listaZonas").html(acumulado);
		$("#listaZonas").listview('refresh');
	})
}

function insertaZona(){
	var  estado = document.getElementById('losEstados').value;
	var  ciudad = document.getElementById('lasCiudades').value;
	var  zona = document.getElementById('lasZonas').value;
	var  pais = "Venezuela";
	
	if(zona!="ALL"){
		
		jQuery.get("http://"+dirIP+":"+puerto+"/t_inm_especializacion_0001_inserta_zona_especializacion",{"TK":"123456","login":localStorage.usr,"z2":"1","z1":estado,"z3":ciudad,"z4":zona},function(resultado){
			jQuery.get("http://"+dirIP+":"+puerto+"/t_secuencia_0001_consulta_valor",{"TK":"123456","secuencia":"inm_especializacion_sec"},function(resultado_sec){
				if(resultado == "exito"){
					//document.getElementById('lasZonas').value='ALL';
					var  estado = document.getElementById('losEstados').options[document.getElementById('losEstados').selectedIndex].id
					var  ciudad = document.getElementById('lasCiudades').options[document.getElementById('lasCiudades').selectedIndex].id
					var  zona = document.getElementById('lasZonas').options[document.getElementById('lasZonas').selectedIndex].id
					
					listarZonas(1)
					//consultaZona()
					acumulado = "<li data-icon='delete' id='zona"+resultado_sec+"'><a onclick='eliminaZona("+resultado_sec+");'><p>"+pais+" - "+estado+" - "+ciudad+" - "+zona+"</p></a></li>";	
					$("#listaZonas").append(acumulado);
					$("#listaZonas").listview('refresh');
				}else if (resultado == "fracaso"){
					alert("No se ha podido Agregar la zona a su lista. \nVuelva a Intentar!");
				}
			})
		})
	}
}

function eliminaZona(codigo){
	jQuery.get("http://"+dirIP+":"+puerto+"/t_inm_especializacion_0003_elimina_zona_especializacion",{"TK":"123456","codigo":codigo},function(resultado){
		if(resultado == "exito"){
			elemento = "#zona"+codigo
			$(elemento).remove()
			//consultaZona()
		}else if (resultado == "fracaso"){
			alert("No se ha podido eliminar la zona de su lista. \nVuelva a Intentar!");
		}
	})
}

function formatoNro(nro){
	var number = nro.toString();
	var result = '';

	while( number.length > 3 ){
		result = '.' + number.substr(number.length - 3) + result;
		number = number.substring(0, number.length - 3);
	}
	result = number + result;
	return result;
};



