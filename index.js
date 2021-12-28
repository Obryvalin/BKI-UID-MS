const express = require('express');
const bkiUID = require("./src/bkiUID.js");
const log = require ("./src/log");


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;



app.post('/getBKIUID',(req,res)=>{
    if (!req.body.applicationNumber && !req.body.creditNumber){
        res.send({Error:"Applicantion number or Credit Number requied"});
    }
    // log.timestamp ("Request:");
    // console.log(req.body);
    bkiUID.cacheUUID(req.body.applicationNumber,req.body.creditNumber,(bkiUUID)=>{
        let resJSON = {request:req.body,
            uuid:bkiUUID}
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
            bkiUID.cacheUUID(request.applicationNumber,request.creditNumber,(bkiUUID)=>{
                resp = {applicationNumber:request.applicationNumber,creditNumber:request.creditNumber,bkiUUID};
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