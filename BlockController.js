const SHA256 = require('crypto-js/sha256');
const Blockchain = require('./Blockchain.js');
const Block = require('./Block.js');

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

  /**
   * Constructor to create a new BlockController, you need to initialize here all your endpoints
   * @param {*} app 
   */
  constructor(app) {
    this.app = app;
    this.blocks = [];
    this.blockchain = new Blockchain.Blockchain();
    this.initializeMockData();
    this.getHomepage();
    this.getBlockByIndex();
    this.postNewBlock();
  }

  /**
   * Implement a GET endpoint for the homepage, url: "/"
   */
  getHomepage() {
    this.app.get("/", (req, res) => {
      res.send('Welcome to the simple blockchain app!');
    });
  }

  /**
   * Implement a GET endpoint to retrieve a block by index, url: "/block/:index"
   */
  getBlockByIndex() {
    this.app.get("/block/:index", async (req, res) => {
      let index = req.params.index;
      try {
        console.log(`Trying to get block with index ${index}`);
        let result = await this.blockchain.getBlock(index);
        res.set({
          'Content-Type'   : 'application/json; charset=utf-8',
          'Cache-Control'  : 'no-cache',
          'Content-Length' : '179',
          'Accept-Ranges'  : 'bytes'
        });
        res.status(200).json(result);
        res.end();
      }
      catch(err) {
        console.log(`Bad request: ${err}`);
        res.status(400).send(`Bad request: ${err}`);
      }
    });
  }

  /**
   * Implement a POST endpoint to add a new block, url: "/block"
   */
  postNewBlock() {
    this.app.post("/block", async (req, res) => {
      let body = req.body.body;
      try {
        if (body) {
          let result = await this.blockchain.addBlock(new Block.Block(body));
          res.set({
            'Content-Type'   : 'application/json; charset=utf-8',
            'Cache-Control'  : 'no-cache',
            'Content-Length' : '179',
            'Accept-Ranges'  : 'bytes'
          });
          res.status(200).json(result);
          res.end();
        }
        else {
          console.log("Bad request: Empty body");
          res.status(400).send("Bad request: Empty body");
          res.end();
        }
      }
      catch(err) {
        console.log(`Bad request: ${err}`);
        res.status(400).send(`Bad request: ${err}`);
      }
    });
  }

  /**
   * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
   */
  initializeMockData() {
    if(this.blocks.length === 0){
      for (let index = 0; index < 10; index++) {
        let blockAux = new Block.Block(`Test Data #${index}`);
        blockAux.height = index;
        blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
        this.blocks.push(blockAux);
      }
    }
  }

}

/**
 * Exporting the BlockController class
 * @param {*} app 
 */
module.exports = (app) => { return new BlockController(app);}