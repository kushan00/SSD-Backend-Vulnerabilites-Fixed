exports.checkValidEmail = (email) => {
    const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (!regexEmail.test(email)) {
		return false
	} else {
        return true
    }
}

exports.checkValidMobileNo = (mobileno) => {
    const regexPhoneNumber = /^((\+)94)[1-9](\d{2}){4}$/;
    if (!mobileno.match(regexPhoneNumber)) {
		return false;
	} else {
        return true
    }
}

exports.addMinutesToDate = (date, minutes) => {
    return new Date(date.getTime() + minutes*60000);
}