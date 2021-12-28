const express = require('express');
const bkiUID = require("./src/bkiUID");
const log = require ("./src/log");


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;



app.post('/getBKIUID',(req,res)=>{
    if (!req.body.applicationNumber && !req.body.creditNumber){
        res.send({Error:"Applicantion number or Credit Number requied"});
    }
    log.timestamp ("Request:");
    console.log(req.body);
    bkiUID.cacheUUID(req.body.applicationNumber,req.body.creditNumber,(bkiUUID)=>{
        let resJSON = {applicationNumber:req.body.applicationNumber,
            creditNumber:req.body.creditNumber,
            uuid:bkiUUID}
        console.log(resJSON);
        res.send(resJSON);
    })
     
})

app.get('/checkBKIUID',(req,res)=>{
    let result;
    res.send(result);
})

app.get('*',(req,res)=>{
    res.send ("<h2>Генератор УИД БКИ</h2>\nВ соответствии с 758-П п.2\nUsage:\n - POST to /getUUID with {applicationNumber,creditNumber} JSON");
})

app.post('*',(req,res)=>{
    res.send ("<h2>Генератор УИД БКИ</h2>\nВ соответствии с 758-П п.2\nUsage:\n - POST to /getUUID with {applicationNumber,creditNumber} JSON");
})

const launch = (port) => {
    app.listen(port, ()=>{

    log.timestamp("Express fired on port "+port);
    })
}
log.cls();
launch(PORT);