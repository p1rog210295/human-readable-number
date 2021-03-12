module.exports = function toReadable(number) {
    if (number < 0 || number > 99999) return 'unsupported number';
    if (number === 0) return 'zero';

    let units = new Map([
        [1, "one"],
        [2, "two"],
        [3, "three"],
        [4, "four"],
        [5, "five"],
        [6, "six"],
        [7, "seven"],
        [8, "eight"],
        [9, "nine"],
        [10, "ten"],
        [11, "eleven"],
        [12, "twelve"],
        [13, "thirteen"],
        [14, "fourteen"],
        [15, "fifteen"],
        [16, "sixteen"],
        [17, "seventeen"],
        [18, "eighteen"],
        [19, "nineteen"],
    ]);

    let dozens = new Map([
        [2, "twenty"],
        [3, "thirty"],
        [4, "forty"],
        [5, "fifty"],
        [6, "sixty"],
        [7, "seventy"],
        [8, "eighty"],
        [9, "ninety"],
    ]);

    let positions = new Map([
        [4, units],
        [3, units],
        [2, dozens],
        [1, units],
    ])


    let strRepresentation = '';
    number = number.toString().split('').reverse().join('');
    let lessThenTwenty = false;

    for (position = number.length; position > 0; position--) {
        digitNames = positions.get(position);
        addition = getAddition(position);
        digit = getDigit(number, position - 1, lessThenTwenty);
        digitStringResult = getDigitString(digit, digitNames);
        digitString = digitStringResult[0];
        lessThenTwenty = digitStringResult[1];
        strRepresentation += ` ${digitString} ${addition}`;
        strRepresentation = strRepresentation.trim();
    }


    return (strRepresentation);
}

function getAddition(position) {
    let additions = new Map([
        [3, "hundred"],
        [4, "thousand"],
    ])
    addition = additions.get(position)
    if (addition === undefined) return '';
    return addition;
}

function getDigitString(digit, strings) {
    digitString = strings.get(parseInt(digit, 10));
    if (digit === '0') return ['', false];
    if (digitString === undefined) return ['', true];
    return [digitString, false];
}

function getDigit(number, position, addTen) {
    digit = number[position];
    if (addTen) return `1${digit}`;
    return digit;
}

