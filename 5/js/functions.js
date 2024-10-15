function checkString (string, maxLength) {
  return string.length <= maxLength;
}
checkString('проверяемая строка', 20); //true
checkString('проверяемая строка', 18); //true
checkString('проверяемая строка', 10); //false

function isPalindrom (string) {
  const normalizedString = string.toLowerCase();
  return normalizedString === normalizedString.split('').reverse().join('');
}
isPalindrom('топот'); //true
isPalindrom('ДовОд'); //true
isPalindrom('Кекс'); //false
