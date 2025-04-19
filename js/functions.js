function checkingStringLength(stringToCheck, maxLength){
  if(stringToCheck.length <= maxLength) {
    return true;
  }
  return false;
}

function checkStringPalindrome(stringToCheck){
  const localStringToCheck = stringToCheck.replaceAll(' ','').toUpperCase();
  for (let i = 0; i <= Math.floor(localStringToCheck.length / 2); i++){
    if (localStringToCheck[i] !== localStringToCheck[localStringToCheck.length - 1 - i]){
      return false;
    }
  }
  return true;
}

function extractAllNumbers(stringToCheck){
  let localStringToCheck = '';
  for (let i = 0; i <= stringToCheck.length - 1; i++){
    if (stringToCheck.charCodeAt(i) >= 48 && stringToCheck.charCodeAt(i) <= 57){
      localStringToCheck = localStringToCheck + stringToCheck[i];
    }
  }
  if (localStringToCheck !== '') {
    return parseInt(localStringToCheck, 10);
  }
  return NaN;
}

checkingStringLength('123412354', 20);
checkStringPalindrome('Лёша на полке клопа нашёл ');
extractAllNumbers('sdfsdfsdf');
