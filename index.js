const express = require('express')
const {v1:uuidv1}= require('uuid');
const pg = require('pg');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const getCheckSum = (uuid) =>{
    let uuidNoSep = uuid.replace("-","");
    
}

const getBKIUUID = ()=>{
    let uuid = uuidv1();
    let checkSum = getCheckSum(uuid);
    callback(BKIUUID);
}

app.get('/getUUID',(req,res)=>{
    // if (!req.body.application_nubmer && !req.body.credit_number){
    //     res.send({Error:"Applicantion number or Credit Number requied"});
    // }
     res.send({application_number:req.body.application_nubmer,
        Credit_number:req.body.credit_number,
        uuid:uuidv1()});
})

app.get('*',(req,res)=>{
    res.send ("UUID Generator. Usage /getUUID");
})

const launch = (port) => {
    app.listen(port, ()=>{

    console.log("Express fired on port "+port);
    })
}
launch(PORT);