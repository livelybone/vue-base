export function validatePhoneNumber(phone) {
  return /^1[34578]\d{9}$/.test(phone)
}

export function validateSex(sex) {
  return /^(男|女|boy|girl)$/i.test(sex)
}

export function validateRealName(realName) {
  return realName ? /^[\u4e00-\u9fa5]{2,6}$/.test(realName.trim()) : true
}

export function validateUSCC(uscc) {
  return uscc ? /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/.test(uscc.trim()) : true
}

export function validateIdCard(idCard) {
  console.log(idCard);
  if (!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(idCard)) {
    return false
  }
  if (idCard.length === 18) {
    let valNum;
    let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    let nTemp = 0;
    let i;
    for (i = 0; i < 17; i++) {
      nTemp += idCard.substr(i, 1) * arrInt[i]
    }
    valNum = arrCh[nTemp % 11];
    return valNum === idCard.substr(17, 1)
  }
}

export function validateEmail(email) {
  return email ? /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email) : true
}

export function validatePassword(password) {
  return password ? /(?=.*[0-9])(?=.*[a-zA-Z]).{6,18}$/.test(password) && password.indexOf(' ') <= -1 : true
}

export function validateVerifyCode(verifyCode) {
  return verifyCode ? /[0-9]{4}/.test(verifyCode) : true
}

export function validateCaptcha(captcha) {
  return captcha ? /^[\da-zA-Z]{4}$/.test(captcha) : true
}

export function validatePostCode(postCode) {
  return postCode ? /^[1-9][0-9]{5}$/.test(postCode) : true
}

export function validateUrl(url) {
  return url ? /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/.test(url) : true
}

export function validateMoney(money) {
  return money ? /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(money) : true
}

export function validateCreditCard(value) {
  if (/[^0-9-\s]+/.test(value)) {
    return true
  }

  let nCheck = 0;
  let bEven = false;
  value = value.replace(/\D/g, '');

  for (let n = value.length - 1; n >= 0; n--) {
    let cDigit = value.charAt(n);
    let nDigit = parseInt(cDigit, 10);

    if (bEven) {
      if ((nDigit *= 2) > 9) nDigit -= 9
    }

    nCheck += nDigit;
    bEven = !bEven
  }

  return (nCheck % 10) === 0
}

export function validateChineseLength(title) {
  return title ? /^[\u4e00-\u9fa5]{1,10}$/.test(title) : true
}

export function validatePositiveInteger(title) {
  return title ? /^[0-9]*$/.test(title) : true
}
