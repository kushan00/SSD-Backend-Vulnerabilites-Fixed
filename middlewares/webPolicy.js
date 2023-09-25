const apiResponse = require("../helpers/apiResponse");
const globalHelper = require("../helpers/globalHelper");

const isEmpty = (value) => {
    if (value === null) {
        return true;
    }
    if (value === "") {
        return true;
    }
    if (value === undefined) {
        return true
    }
};

exports.getOtpValidation = (req, res, next) => {
    const { mobileno } = req.body;

    if (isEmpty(mobileno)) {
        apiResponse.BadRequest(res, "mobile number required", []);
        return;
    }
    if (!globalHelper.checkValidMobileNo(mobileno)) {
        apiResponse.BadRequest(res, "please add valid mobile number", []);
        return;
    }
    
    next();
}

exports.loginValidation = (req, res, next) => {
    const { mobileno, mobileOtp } = req.body;

  
    if (!globalHelper.checkValidMobileNo(mobileno)) {
        apiResponse.BadRequest(res, "please add valid mobile number", []);
        return;
    }
    if (isEmpty(mobileOtp)) {
        apiResponse.BadRequest(res, "mobile OTP number required", []);
        return;
    }
    next();
}

exports.firebaseTokenValidation = (req, res, next) => {
    const { cm_firebase_token } = req.body;
    if (isEmpty(cm_firebase_token)) {
        apiResponse.BadRequest(res, "cm_firebase_token required", []);
        return;
    }
    next();
};





