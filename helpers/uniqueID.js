const uniqid = require('uniqid'); 

exports.generateID = async ()=>{

    //var id_1 = await uniqid.process();    /**create a 12 digit id with current time and some strings */
    var id_2 = Math.floor(1000 + Math.random() * 9000); /**generate 4 digit random number  */
    var id_3 = Math.floor(100 + Math.random() * 900);/**generate 3 digit random number  */

    var final = "GYM" + id_2 + id_3;

    return final;
}

exports.generateInstructorID = async ()=>{

    //var id_1 = await uniqid.process();    /**create a 12 digit id with current time and some strings */
    var id_2 = Math.floor(1000 + Math.random() * 9000); /**generate 4 digit random number  */
    var id_3 = Math.floor(100 + Math.random() * 900);/**generate 3 digit random number  */

    var final = "INS" + id_2 + id_3;

    return final;
}
