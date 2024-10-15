function checkString (string, maxLength) {
  return string.length <= maxLength;
}
console.log(checkString('проверяемая строка', 20)); //true
console.log(checkString('проверяемая строка', 18)); //true
console.log(checkString('проверяемая строка', 10)); //false

function isPalindrom (string) {
  const normalizedString = string.toLowerCase();
  return normalizedString === normalizedString.split('').reverse().join('');
}
console.log(isPalindrom('топот')); //true
console.log(isPalindrom('ДовОд')); //true
console.log(isPalindrom('Кекс')); //false
