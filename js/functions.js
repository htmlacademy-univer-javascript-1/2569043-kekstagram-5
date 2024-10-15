function checkString (string, maxLength) {
    return string.length <= maxLength;
}

// Cтрока короче 20 символов
console.log(checkString('проверяемая строка', 20)); // true
// Длина строки ровно 18 символов
console.log(checkString('проверяемая строка', 18)); // true
// Строка длиннее 10 символов
console.log(checkString('проверяемая строка', 10)); // false


function isPalindrom (string) {
    const normalizedString = string.toLowerCase();
    return normalizedString === normalizedString.split('').reverse().join('');
}

// Строка является палиндромом
console.log(isPalindrom('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(isPalindrom('ДовОд')); // true
// Это не палиндром
console.log(isPalindrom('Кекс'));  // false
