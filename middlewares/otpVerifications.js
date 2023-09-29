const speakeasy = require("speakeasy");
var ShoutoutClient = require("shoutout-sdk");

var apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMTBiMTc2MC01ZTliLTExZWUtODkwMi0zZjA0M2QxZjAwNDEiLCJzdWIiOiJTSE9VVE9VVF9BUElfVVNFUiIsImlhdCI6MTY5NTk3MzMyNywiZXhwIjoyMDExNTkyNTI3LCJzY29wZXMiOnsiYWN0aXZpdGllcyI6WyJyZWFkIiwid3JpdGUiXSwibWVzc2FnZXMiOlsicmVhZCIsIndyaXRlIl0sImNvbnRhY3RzIjpbInJlYWQiLCJ3cml0ZSJdfSwic29fdXNlcl9pZCI6IjU3NDQ1NiIsInNvX3VzZXJfcm9sZSI6InVzZXIiLCJzb19wcm9maWxlIjoiYWxsIiwic29fdXNlcl9uYW1lIjoiIiwic29fYXBpa2V5Ijoibm9uZSJ9.T7xpeoZqZtF6R5zwHFr96rMb_FmsQ2eah-h6Dnzdv_A";

var debug = true;
var verifySSL = false;

exports.sendOTP = async (mobileno)=>{

    var result;

    // Generate a new secret for the user (store this securely on the server)
    const secret = speakeasy.generateSecret();

    // Generate the OTP code
    const otp = speakeasy.totp({
        secret: secret.base32,
        encoding: "base32",
    });

    // Send the OTP via SMS (using Twilio in this example)
    var client = new ShoutoutClient(apiKey, debug, verifySSL);

    var message = {
        content: {
        sms:
            "Hello! "+"\n"+
            " Your OTP code :-" +
            otp
        },
        destinations: [mobileno],
        source: "ShoutDEMO",
        transports: ["SMS"],
    };

    client.sendMessage(message, (error, result) => {
        console.log("asdasdasd",result);
        if (error) {
            result = {success:false, result:error};
        } else {
            result = {success:true, result:result};
        }
    });

    return result;
};


exports.verifyOTP = async (userProvidedOTP)=>{
    
    // Verify the OTP
    const verificationResult = speakeasy.totp.verify({
        secret: secret.base32,
        encoding: 'base32',
        token: userProvidedOTP,
        window: 1, // Optional: Allow a small time window (e.g., 1 step) for clock skew
    });
    
    if (verificationResult) {
        console.log('OTP is valid');
        return {otpSuccess:true, result:verificationResult};
        // Allow user access or perform other actions
    } else {
        console.log('OTP is invalid');
        return {otpSuccess:false, result:verificationResult};
        // Reject access or handle the invalid OTP
    }
}
