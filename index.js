// const http = require('http');

// const server = http.createServer((request, response) => {
//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.end("Hello World! - testing");
// });

// const port = process.env.PORT || 1337;
// server.listen(port);

// console.log("Server running at http://localhost:%d", port);

// const Joi = require('joi');
// const express = require('express');
// const app = express();

// app.use(express.json());
// const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('Listening on port...')
})

app.post('/hello', (req, res) => {
    res.send('hello world');
})

app.post('/sendData', (req, res) => {

    const schema = {
        storeId: Joi.string().required(),
        upc: Joi.string().required(),
        epc: Joi.string().required(),
        ts: Joi.string().required(),
        tid: Joi.string().required(),
        userId: Joi.string().required(),
        printerId: Joi.string().required(),
        api_secret: Joi.string().required()
    };

    const result = Joi.validate(req.body, schema);
    
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const api_secret = req.body.api_secret

    if(validSecret(api_secret)){

        const param = { 
            storeId : req.body.storeId, 
            upc : req.body.upc,
            epc : req.body.epc, 
            ts : req.body.ts, 
            tid : req.body.tid,
            userId : req.body.userId, 
            printerId : req.body.printerId 
        }
    
        console.log(param);
        res.status(200).send();

    }
    else{
        res.status(400).send('Error : API Secret Invalid');
    }
    

})

function validSecret(api_secret){

    if(api_secret != '123654896523sdf5sd6g561sg'){

        return false

    }

    return true

}
