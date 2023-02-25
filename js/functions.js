//Функция для проверки длины строки

const checkStringLength = (string, length) => string.length <= length;
checkStringLength('проверяемая строка', 10);

//Функция для проверки, является ли строка палиндромом

const checkIfPalindrome = (string) => {
  string = string.toLowerCase();
  let reverseString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reverseString += string[i];
  }
  return reverseString === string;
};
checkIfPalindrome('Кекс');

//Функция, для извлечения целых положительных цифр из строки

const getNumbers = (string) => {
  let numbers = '';
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(parseInt(string[i], 10))) {
      numbers += string[i];
    }
  }
  return parseInt(numbers, 10);
};
getNumbers('а я томат');

//Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины.

const addSymbols = (string, minLength, symbols) => {
  while (string.length < minLength) {
    string = symbols.slice(0, minLength - string.length) + string;
  }
  return string;
};
addSymbols('qwerty', 4, '0');
