var BlockDto = require('../dto/BlockDto');
var SaveController = require('./SaveController');
let saveController = new SaveController();
module.exports = class BlockchainController {
    constructor() {
        this.chain = [this.crearGenesis()];
    }
    crearGenesis() {
        var blockDto = new BlockDto(0, new Date(), "Bloque Inicial", "0");
        saveController.putBlock(blockDto);
        return blockDto
    }
    latestBlock() {
        return this.chain[this.chain.length - 1]
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.latestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    checkValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}
