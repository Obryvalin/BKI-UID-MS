const { getCheckSum, getBKIUUID } = require("./bkiUID");

const testUIDS =[
    {UUID:'2d61683e-d470-15fd-9734-e71179e2eeff',checkSum:8},
    {UUID:'a92a99e6-f935-1cf5-95f7-8f4947d46811',checkSum:5},
    {UUID:'afc56f11-ed95-1665-9783-46b2c31c1eb6',checkSum:8},
    {UUID:'2f4348f4-b3d4-1526-9949-4476a93b3af0',checkSum:1},
    {UUID:'e51857ec-21c4-10ea-9f4d-25e7514ba5a0',checkSum:'d'},
    {UUID:'8fd8691f-aff8-1877-9c4f-dac6369b51b6',checkSum:'d'},
    {UUID:'15ece815-23ea-177b-9cdb-fa1495f4c577',checkSum:'f'},
    {UUID:'5414ff0c-1d17-1488-ba43-372e2f924109',checkSum:'b'},
    {UUID:'3f888bb1-f7ea-13f4-93d8-1f972a2f943a',checkSum:7},
    {UUID:'60ff9dba-25b0-160b-91c4-8333900ef384',checkSum:3}
]
describe.each(testUIDS)('$UUID - $checkSum',({UUID,checkSum})=>{
    test('TEST: getCheckSum '+UUID+' to have '+checkSum,()=>{
        expect(getCheckSum(UUID)).toBe(checkSum);
    })
     
})

test ('getBKIUUID',done =>{
    getBKIUUID((result)=>{
        expect(result).toBeDefined();
        done();
    }) 
})