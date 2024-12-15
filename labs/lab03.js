export const VigenereCipher = (text, key, mode) => {
    const alphabet = 'aąbcćdeęfghijklłmnńoópqrsśtuvwxyzżź';
    let keyIndex = 0;
    key = key.toLowerCase();

    return text.toLowerCase().split('').map((char) => {
        const index = alphabet.indexOf(char);

        if (index !== -1) {
            const keyChar = key[keyIndex % key.length];
            const keyCharIndex = alphabet.indexOf(keyChar);
            let newIndex;

            if (mode === 'encrypt') {
                newIndex = (index + keyCharIndex) % alphabet.length;
            } else if (mode === 'decrypt') {
                newIndex = (index - keyCharIndex + alphabet.length) % alphabet.length;
            }

            keyIndex++;
            return alphabet[newIndex];
        } else {
            return char;
        }
    }).join('')
};
