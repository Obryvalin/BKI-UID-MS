const {Pool} = require("pg");
const fs = require("fs");
const log = require('./log')

const {PGHOST,PGPORT,PGUSER,PGPASSWORD,PGDATABASE} = process.env;
const pgoptions = JSON.parse(fs.readFileSync("conf/pg.json").toString());

pool = new Pool(pgoptions);

const query = (sql,callback)=>{
   // log.timestamp ("QUERY: "+sql);
    pool.query(sql,(err,res)=>{
        if (err){
            log.timestamp("PG error: "+ sql);
            log.timestamp(err);
            if (callback){callback(err,undefined)}

        }
        if (!err)
        {
            if(callback){callback(undefined,res)}

        }
    });

};

const init = (callback)=>{
    query("DROP TABLE IF EXISTS BKIUIDS",()=>{
        query("CREATE TABLE BKIUIDS (applicationNumber character varying(50),creditNumber character varying (50),UUID character varying(38))",()=>{
            log.timestamp("Init complete");
            callback();
        })
    })
}


module.exports = {
    query,
    init
    
}