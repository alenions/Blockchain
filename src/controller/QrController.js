const express = require('express');
const basicAuth = require('express-basic-auth')
const qrcode = require('qrcode');
var RSA = require('rsa-compat').RSA;
var qrService = require('../service/QrService');
var BlockchainController = require('./BlockChainController');
var BlockDto = require('../dto/BlockDto');
var options = { bitlen: 1024, exp: 65537, public: true, pem: true, internal: true };
const qrController = express();

qrController.set('port', process.env.PORT || 8080);
qrController.use(basicAuth({ authorizer: myAuthorizer }))

function myAuthorizer(username, password) {
  //return username.startsWith(process.env.QR_USER) && password.startsWith(process.env.QR_PASSWORD)
  return username.startsWith("blockchain") && password.startsWith("blockchain");
}

let blockchainController = new BlockchainController();

qrController.use(express.json());

//Metodo post para enviar datos a QR en formato JSON. 
qrController.post('/qr', async function (request, response) {
  console.log('go post /qr');
  //1. Convierto el contenido de la peticion a string.
  var requestJsonText = JSON.stringify(request.body);
  //2. Valido que el contenido no tenga mas de 4296 caracteres.
  if (requestJsonText.length > 4296 || !contentValidate(requestJsonText)) {
    response.status(400);
    response.send('');
  } else {
    //3. Muestro el contenido json de la peticion.
    console.log(requestJsonText);
    //4. Encripto el JSON en RSA.
    var encrypted = qrService.encryptValue(requestJsonText);
    //4. Muestro el RSA.
    console.log(encrypted);
    //5. Desencripto el RSA para revisar el JSON ingresado.
    var decrypt = qrService.decryptValue(encrypted);
    console.log(decrypt);
    //6. Convierto el encriptado a QR
    qrcode.toDataURL(encrypted)
      .then(qr => {
        //6.Creo un objeto de BlockchainController para guardar contenido RSA en JSON. 
        blockchainController.addBlock(new BlockDto(1, new Date(), { contenido: qr }));
        blockchainController.addBlock(new BlockDto(2, new Date(), { contenido: qr }));
        console.log(JSON.stringify(blockchainController, null, 4));
        console.log("El blockchain es valido: " + blockchainController.checkValid());
        response.status(201);
        response.send(qr);
      })
      .catch(err => {
        console.log(err);
      })
  }
});

qrController.post('/keys', function (request, response) {
  RSA.generateKeypair(options, function (err, keypair) {
    var privateKey = RSA.exportPrivatePem(keypair);
    var publicKey = RSA.exportPublicPem(keypair);
    response.send(privateKey + publicKey);
  });
});

function contentValidate(content) {
  var compare = content.replace(/[-\/\\^$*+<>?()|[\]]/g, "");
  return compare.length == content.length;
}

module.exports = qrController;



