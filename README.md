# README #

### Que es este repositorio? ###
* Api para generar codigos QR encryptado en base64 con RSA a la cual se le entrega cualquier JSON. 
* Estos QR son ilegibles al sacar una foto, solo pueden ser leidos con quien pueda decriptar con RSA y la clave publica guardada en Vault.

### Como se Configura? ###

* Instalar alguna version de Node 10, se configura con el puerto 8080 por defecto url: localhost:8080/qr como metodo post. Revisar controller, es un codigo sencillo. Este metodo usa un usuario y contraseña guardado en vault como autenticacion basica.

### Con quien respondo las Dudas? ###

* Las dudas es posible consultar a Equipo Chile.