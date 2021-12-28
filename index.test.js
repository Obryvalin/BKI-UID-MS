const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const launch = (port,callback) => {
    app.listen(port, ()=>{
        callback("success");
    })
}
test ("Starting Server" , done =>{
    launch(PORT,res =>{
        expect(res).toBe("success")
        done();
    })
   
})
