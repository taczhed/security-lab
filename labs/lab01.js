export const CaesarCipher = (text, key) => {
    const dictionary = 'aąbcćdeęfghijklłmnńoópqrsśtuvwxyzżź';
    return text.split('').map((char) => {
        const index = dictionary.indexOf(char.toLowerCase());
        if (index === -1) return char.toLowerCase();
        const shiftedIndex = (index + (key % dictionary.length) + dictionary.length) % dictionary.length;
        return dictionary[shiftedIndex];
    }).join('');
};
