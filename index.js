const express = require('express')
const {v1:uuidv1}= require('uuid');
const pgsql = require("./src/pgsql");
const log = require ("./src/log");
const { timestamp } = require('./src/log');
const e = require('express');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const getCheckSum = (uuid) =>{
    let uuidNoSep = uuid.replace(/[\-]/gi,"");
    let posMod,digit;
    let checkSum = 0;
    if (uuidNoSep.length != 32) return undefined;
    for (i=0;i<32;i++){
        posMod = (i+1)%10;
        if (posMod==0) posMod = 10;
        digit = uuidNoSep[i];
        if (digit == 'a') digit = 10;
        if (digit == 'b') digit = 11;
        if (digit == 'c') digit = 12;
        if (digit == 'd') digit = 13;
        if (digit == 'e') digit = 14;
        if (digit == 'f') digit = 15;
        checkSum +=  digit * posMod;
    }
    let checkSum2 = checkSum % 16;
    if (checkSum2 == 10) checkSum2 = 'a';
    if (checkSum2 == 11) checkSum2 = 'b';
    if (checkSum2 == 12) checkSum2 = 'c';
    if (checkSum2 == 13) checkSum2 = 'd';
    if (checkSum2 == 14) checkSum2 = 'e';
    if (checkSum2 == 15) checkSum2 = 'f';
    return checkSum2;
}

const getBKIUUID = (callback)=>{
    let uuid = uuidv1();
    let checkSum = getCheckSum(uuid);
    callback(uuid+"-"+checkSum);
}

const cacheUUID = (applicationNumber,creditNumber,callback) =>{

    pgsql.query("select * from UUIDS where applicationNumber = '"+applicationNumber+"'",(err,res)=>{
        if (applicationNumber && res && res.rows.length > 0){
        log.timestamp("-- Found by applicationNumber");
        callback(res.rows[0].uuid);
        }
        else{
            log.timestamp("-- No applicatoinNumber in database...");
            pgsql.query("select * from UUIDS where creditNumber = '"+creditNumber+"'",(err,res)=>{
                if (creditNumber && res && res.rows.length > 0){
                    log.timestamp("Found by creditNumber");
                    callback (res.rows[0].uuid);
                }
                else{
                    log.timestamp("-- No creditNumber in database...");
                    getBKIUUID((bkiUUID)=>{
                        pgsql.query("Insert into UUIDS(applicationNumber,creditNumber,UUID) values('"+applicationNumber+"','"+creditNumber+"','"+bkiUUID+"')");
                        callback (bkiUUID);
                    })
                }
                
                
            })
        }
        

    })
}

app.post('/getBKIUID',(req,res)=>{
    if (!req.body.applicationNumber && !req.body.creditNumber){
        res.send({Error:"Applicantion number or Credit Number requied"});
    }
    log.timestamp ("Request:");
    console.log(req.body);
    cacheUUID(req.body.applicationNumber,req.body.creditNumber,(bkiUUID)=>{
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