const {v1:uuidv1}= require('uuid');
const pgsql = require("./pgsql");
const log = require ("./log");

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

const getBKIUID = (callback)=>{
    let uuid = uuidv1();
    let checkSum = getCheckSum(uuid);
    callback(uuid+"-"+checkSum);
}

const checkBKIUID = (BKIUID) =>{
    // log.timestamp ("checkBKIUID\t"+BKIUID);
    if (BKIUID.length != 38) return {error:"Length"};
    if (BKIUID[14] != '1') return {error:"Symbol 15"};
    if (!['8','9','a','b','c','d','e','f'].includes(BKIUID[19])) return {error:"Symbol 20"};
    
    if (getCheckSum(BKIUID.substr(0,36)) != BKIUID[37]) return {error:"checkSum"}

    return {result:true};
    
}

const cacheBKIUID = (applicationNumber,creditNumber,callback) =>{
    pgsql.query("select * from BKIUIDS where applicationNumber = '"+applicationNumber+"' and creditNumber = '"+creditNumber+"'",(err,res)=>{
        if (applicationNumber && creditNumber && res && res.rows.length > 0){
            callback(res.rows[0].uuid);   
        }
        else{
            pgsql.query("select * from BKIUIDS where applicationNumber = '"+applicationNumber+"'",(err,res)=>{
                if (applicationNumber && res && res.rows.length > 0){
                // log.timestamp("-- Found by applicationNumber");
                if (creditNumber && !res.rows[0].creditNumber){
                    pgsql.query("UPDATE BKIUIDS set creditNumber = '"+creditNumber+"' where applicationNumber='"+applicationNumber+"'")
                }
                callback(res.rows[0].uuid);
                }
                else{
                    // log.timestamp("-- No applicatoinNumber in database...");
                    pgsql.query("select * from BKIUIDS where creditNumber = '"+creditNumber+"'",(err,res)=>{
                        if (creditNumber && res && res.rows.length > 0){
                            // log.timestamp("Found by creditNumber");
                            if (applicationNumber && !res.rows[0].applicationNumber){
                                pgsql.query("UPDATE BKIUIDS set applicationNumber = '"+applicationNumber+"' where creditNumber='"+creditNumber+"'")
                            }
                            callback (res.rows[0].uuid);
                        }
                        else{
                            // log.timestamp("-- No creditNumber in database...");
                            getBKIUID((bkiUUID)=>{
                                pgsql.query("Insert into BKIUIDS(applicationNumber,creditNumber,UUID) values('"+applicationNumber+"','"+creditNumber+"','"+bkiUUID+"')");
                                callback (bkiUUID);
                            })
                        }
                        
                        
                    })
                }
                
        
            })
        }
    })
    
}

module.exports = {
    getBKIUID,
    getCheckSum,
    checkBKIUID,
    cacheBKIUID
}