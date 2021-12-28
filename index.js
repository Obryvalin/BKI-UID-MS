const express = require('express');
const BKIUID = require("./src/BKIUID.js");
const log = require ("./src/log");


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;


// GET

app.get('/checkBKIUID/:UID',(req,res)=>{
    
    UID = req.params.UID || req.body.UID;

    if (!UID){
        res.send({error:"No UID"})
    }
    
    res.send({BKIUID:UID,result:BKIUID.checkBKIUID(UID)})
    
    
})


// POST

app.post('/getBKIUID',(req,res)=>{
    if (!req.body.applicationNumber && !req.body.creditNumber){
        res.send({error:"Applicantion number or Credit Number requied"});
    }
    // log.timestamp ("Request:");
    // console.log(req.body);
    BKIUID.cacheBKIUID(req.body.applicationNumber,req.body.creditNumber,(BKIUID)=>{
        let resJSON = {request:req.body,
            BKIUID:BKIUID}
        // console.log(resJSON);
        res.send(resJSON);
    })
     
})


app.post('/getBKIUIDMany',(req,res)=>{
    if (!req.body.requests){
        res.send({Error:"Applicantion number or Credit Number requied"});
    }
    log.timestamp ("Request:");
    // console.log(req.body);
    let requests = req.body.requests;
    let len = requests.length;
    cnt = 0;
    resJSON = [];
    requests.forEach((request)=>{
        
        if (request.applicationNumber || request.creditNumber){
            BKIUID.cacheBKIUID(request.applicationNumber,request.creditNumber,(BKIUID)=>{
                resp = {applicationNumber:request.applicationNumber,creditNumber:request.creditNumber,BKIUID};
                resJSON.push(resp);
                cnt++;
            })
        }
    })
    manyInterval = setInterval(()=>{
        log.timestamp(cnt + " / "+ len);
        // console.log(resJSON);
        if (cnt == len){
            clearInterval(manyInterval);
            // console.log(resJSON);
            res.send(resJSON);
        }
       
    },500);    
        
    
     
})


app.get('*',(req,res)=>{
    res.send ("<h2>Генератор УИД БКИ</h2>\nВ соответствии с 758-П п.2\nUsage:\n - POST to /getBKIUID with {applicationNumber,creditNumber} JSON");
})

app.post('*',(req,res)=>{
    res.send ("<h2>Генератор УИД БКИ</h2>\nВ соответствии с 758-П п.2\nUsage:\n - POST to /getBKIUID with {applicationNumber,creditNumber} JSON");
})

const launch = (port) => {
    app.listen(port, ()=>{

    log.timestamp("Express fired on port "+port);
    })
}
log.cls();
launch(PORT);