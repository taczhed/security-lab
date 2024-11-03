export const PolybiusSquare = (text, a, b) => {
    const dictionary = [
        ['l', 'o', 'w', 'ź', 'k', 'u', 'ę'],
        ['e', 'y', 'ą', 'b', 'v', 't', 'h'],
        ['q', 'p', 'ń', 'd', 'f', 'm', 'g'],
        ['ć', 's', 'c', 'ł', 'z', 'x', 'a'],
        ['ó', 'j', 'ż', 'i', 'n', 'r', 'ś'],
        [' ']
    ];

    if (text.split(' ').every((e) => !isNaN(Number(e)))) {
        const decrypt = (y) => Math.sqrt((y - b) / a);
        const firstStep = text.split(' ').map((number) => {
            const de = decrypt(number)
            const firstIndex = Math.round(de / 10);
            const secondIndex = de % 10;
            return dictionary[secondIndex][firstIndex]
        })
        return firstStep.join('')
    }

    const encrypt = (x) => a * Math.pow(x, 2) + b;
    const firstStep = text.split('').map((char) => {
        let res = -1
        dictionary.forEach((yArray, y) => {
            yArray.forEach((el, x) => {
                if (el.toLowerCase() === char.toLowerCase()) res = Number(`${x}${y}`)
            })
        })
        return res
    })
    const secondStep = firstStep.filter((n) => n !== -1).map((t) => encrypt(t))
    return secondStep.join(' ')
};