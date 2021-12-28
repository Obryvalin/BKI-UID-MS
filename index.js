const express = require('express')
const {v1:uuidv1}= require('uuid');
const pgsql = require("./src/pgsql");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const getCheckSum = (uuid) =>{
    let uuidNoSep = uuid.replace("-","");
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
    return checkSum;
}

const getBKIUUID = (callback)=>{
    let uuid = uuidv1();
    let checkSum = getCheckSum(uuid);
    console.log("getBKIUUID:\nUUID:\t"+uuid+"\ncheckSum:\t"+checkSum);
    callback(uuid+"-"+checkSum);
}

const cacheUUID = (applicationNumber,creditNumber,callback) =>{
    pgsql.query("select * from UUIDS where ApplicationNumber = '"+applicationNumber+"'",(res)=>{
        if (res.rows){
        console.log("Found by applicationNumber");
        callback(res.rows[0].UUID);
        }
        pgsql.query("select * from UUIDS where creditNumber = '"+creditNumber+"'",(res)=>{
            if (res.rows){
                console.log("Found by creditNumber");
                callback (res.rows[0].UUID);
            }
            getBKIUUID((bkiUUID)=>{
                pgsql.query("Insert into UUIDS(applicationNumber,creditNumber,UUID) values('"+applicationNumber+"','"+creditNumber+"','"+bkiUUID+"')");
                callback (bkiUUID);
            })
            
        })

    })
}

app.post('/getBKIUID',(req,res)=>{
    // if (!req.body.applicationNumber && !req.body.creditNumber){
    //     res.send({Error:"Applicantion number or Credit Number requied"});
    // }
    cacheUUID(req.body.applicationNumber,req.body.creditNumber,(bkiUUID)=>{
        res.send({applicationNumber:req.body.applicationNumber,
            creditNumber:req.body.creditNumber,
            uuid:bkiUUID});
    })
     
})

app.get('/checkBKIUID',(req,res)=>{
    let result;
    res.send(result);
})

app.get('*',(req,res)=>{
    res.send ("<h2>Генератор УИД БКИ</h2>\nВ соответствии с 758-П п.2\nUsage:\n - POST to /getUUID with {applicationNumber,creditNumber} JSON");
})

const launch = (port) => {
    app.listen(port, ()=>{

    console.log("Express fired on port "+port);
    })
}
launch(PORT);