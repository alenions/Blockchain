var app = require('./src/controller/QrController');

var port = app.get('port');

app.listen(port, function () {
  console.log('Blockchain cargada en puerto: '+port+'...');
});

