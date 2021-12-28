const { getCheckSum, getBKIUUID } = require("./index");


test('TEST: getCheckSum',()=>{
    expect(getCheckSum('2d61683e-d470-15fd-9734-e71179e2eeff').toBe('8'));
})

//2d61683e-d470-15fd-9734-e71179e2eeff-8

// a92a99e6-f935-1cf5-95f7-8f4947d46811-5

// afc56f11-ed95-1665-9783-46b2c31c1eb6-8

// 2f4348f4-b3d4-1526-9949-4476a93b3af0-1

// e51857ec-21c4-10ea-9f4d-25e7514ba5a0-d

// 8fd8691f-aff8-1877-9c4f-dac6369b51b6-d

// 15ece815-23ea-177b-9cdb-fa1495f4c577-f

// 5414ff0c-1d17-1488-ba43-372e2f924109-b

// 3f888bb1-f7ea-13f4-93d8-1f972a2f943a-7

// 60ff9dba-25b0-160b-91c4-8333900ef384-3