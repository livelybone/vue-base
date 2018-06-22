export default class Validator {
  static validatePhoneNumber(phone) {
    return /^1[34578]\d{9}$/.test(phone);
  }

  static validateSex(sex) {
    return /^(男|女|boy|girl)$/i.test(sex);
  }

  static validateRealName(realName) {
    return realName ? /^[\u4e00-\u9fa5]{2,6}$/.test(realName.trim()) : true;
  }

  static validateUSCC(uscc) {
    return uscc ? /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/.test(uscc.trim()) : true;
  }

  static validateIdCard(idCard) {
    if (!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(idCard)) {
      return false;
    }
    if (idCard.length === 18) {
      const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
      let nTemp = 0;
      let i;
      for (i = 0; i < 17; i += 1) {
        nTemp += idCard.substr(i, 1) * arrInt[i];
      }
      const valNum = arrCh[nTemp % 11];
      return valNum === idCard.substr(17, 1);
    }
    return false;
  }

  static validateEmail(email) {
    return email ? /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email) : true;
  }

  static validatePassword(password) {
    return password ? /(?=.*[0-9])(?=.*[a-zA-Z]).{6,18}$/.test(password) && password.indexOf(' ') <= -1 : true;
  }

  static validateVerifyCode(verifyCode) {
    return verifyCode ? /[0-9]{4}/.test(verifyCode) : true;
  }

  static validateCaptcha(captcha) {
    return captcha ? /^[\da-zA-Z]{4}$/.test(captcha) : true;
  }

  static validatePostCode(postCode) {
    return postCode ? /^[1-9][0-9]{5}$/.test(postCode) : true;
  }

  static validateUrl(url) {
    return url ? /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/.test(url) : true;
  }

  static validateMoney(money) {
    return money ? /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(money) : true;
  }

  static validateCreditCard(value) {
    if (/[^0-9-\s]+/.test(value)) {
      return true;
    }

    let nCheck = 0;
    let bEven = false;
    const val = value.replace(/\D/g, '');

    for (let n = val.length - 1; n >= 0; n -= 1) {
      const cDigit = val.charAt(n);
      let nDigit = parseInt(cDigit, 10);

      if (bEven) {
        nDigit *= 2;
        if (nDigit > 9) nDigit -= 9;
      }

      nCheck += nDigit;
      bEven = !bEven;
    }

    return (nCheck % 10) === 0;
  }

  static validateChineseLength(title) {
    return title ? /^[\u4e00-\u9fa5]{1,10}$/.test(title) : true;
  }

  static validatePositiveInteger(title) {
    return title ? /^[0-9]*$/.test(title) : true;
  }
}
