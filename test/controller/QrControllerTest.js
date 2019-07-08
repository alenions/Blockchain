var expect = require('chai');
var chaiHttp = require('chai-http');
var QrController = require('../../src/controller/QrController'); 

var log4js = require('log4js');
var log = log4js.getLogger();
log.level = 'info';
log.level = 'error';

expect.use(chaiHttp);
expect.should();

const token = 'Basic YXBpLXFyLXJzYTphcGlxcnJzYXNmMTEwNDIwMTk=';

async function iniTest(){
    try{
        var desc = await describe('1. QrControllerTest',function(){
            it('1.1. should get a string with rsa format', function(done){
                expect.request(QrController)
                .post('/qr')
                .send({
                    "proposal":"1234567890",
                    "validate":"1234567890"
                })
                .set({ ContentType : "application/json", Authorization : token })
                .end(function(error,response){
                    response.should.have.status(200);
                    done();
                });
            }); 
        });
    }
    catch(error){
        log.error(error);
    }
}

iniTest();