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

function isMeetingWithinWorkHours(workStart, workEnd, meetingStart, meetingDuration) {
  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map((part) => parseInt(part, 10));
    return hours * 60 + minutes;
  };
  return parseTime(meetingStart) >= parseTime(workStart) && (parseTime(meetingStart) + meetingDuration) <= parseTime(workEnd);
}

checkingStringLength('123412354', 20);
checkStringPalindrome('Лёша на полке клопа нашёл ');
extractAllNumbers('sdfsdfsdf');

isMeetingWithinWorkHours('08:00', '17:30', '14:00', 90);
isMeetingWithinWorkHours('8:0', '10:0', '8:0', 120);
isMeetingWithinWorkHours('08:00', '14:30', '14:00', 90);
isMeetingWithinWorkHours('14:00', '17:30', '08:0', 90);
isMeetingWithinWorkHours('8:00', '17:30', '08:00', 900);
