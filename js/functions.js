function checkMaxLength(string, maxLength){
    return string.length <= maxLength
}
// Cтрока короче 20 символов
checkMaxLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkMaxLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkMaxLength('проверяемая строка', 10); // false

function isPalindrom (string) {
    const normalisedString = string.toLowerCase();
    return normalisedString === normalisedString.split('').reverse().join('')
}
// Строка является палиндромом
isPalindrom('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrom('ДовОд'); // true
// Это не палиндром
isPalindrom('Кекс');  // false
