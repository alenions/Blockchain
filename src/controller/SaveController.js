const level = require('level');

const db = level('./db',{ valueEncoding: 'json'});

module.exports = class SaveController{

    putBlock(block){
        var chain = [];
        chain.push(block);
        db.put('chain', JSON.stringify({chain}, null, 4),(error)=>{ //guarda en la lista de chain formateada... falta obtener la que se encuentra guardada
        }); 
    }

    getBlock(block){
    }

    getBlockChain(){
        db.get('chain', (err, chain) =>{ //aqui se obtiene pero necesito retornarla
            console.log(chain);
        });
    }    

    putBlockChain(chain){
        db.put('chain', JSON.stringify(chain),(error) =>{
        });
    }
}


