const {Pool} = require("pg");
const fs = require("fs");
const {query} = require ("./pgsql");
test('pgoptions exists',()=>{
    expect(fs.existsSync("conf/pg.json")).toBe(true);
})

const pgoptions = JSON.parse(fs.readFileSync("conf/pg.json").toString());

pool = new Pool(pgoptions);

test('DataBase test',done =>{
    query("select * from UUIDS",(err,res)=>{
        try{
        expect(err).toBe(undefined);
        done();
        } catch (e)
        {
            done(e);
        }
    })
})

