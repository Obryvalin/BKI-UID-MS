const pgsql = require("./pgsql");

pgsql.init(()=>{
    process.exit(1);
})