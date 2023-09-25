const uniqid = require('uniqid'); 

exports.generateRandomPassword = async ()=>{

    var id_2 = Math.floor(1000 + Math.random() * 9000); /**generate 4 digit random number  */
    var id_3 = Math.floor(1000 + Math.random() * 9000); /**generate 4 digit random number  */
    console.log("id_2",id_2);
    console.log("id_3",id_3);

    var final = id_2.toString() + id_3.toString(); /**concatenate 4 digit random number  */

    return final;
}

