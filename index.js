import { CaesarCipher } from './labs/lab01.js';
import { PolybiusSquare } from './labs/lab02.js';
import { VigenereCipher } from './labs/lab03.js';
import { PlayfairCipher } from './labs/lab04.js';
import { generateRSAKeys, rsaEncrypt, rsaDecrypt } from './labs/lab05.js';

let type = 'caesar'

const cipherSelect = document.getElementById('cipher-select');
const textInputWrapper1 = document.getElementById('text-input-wrapper-1');
const textInputWrapper2 = document.getElementById('text-input-wrapper-2');
const textInputWrapper3 = document.getElementById('text-input-wrapper-3');
const textInput1 = document.getElementById('text-input-1');
const textInput2 = document.getElementById('text-input-2');
const textInput3 = document.getElementById('text-input-3');
const textLabel1 = document.getElementById('text-input-label-1');
const textLabel2 = document.getElementById('text-input-label-2');
const textLabel3 = document.getElementById('text-input-label-3');
const resultText = document.getElementById('resultText');
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');

const InitInputs = (value) => {
    hideInputs()

    if (value === 'caesar') {
        textInputWrapper1?.classList?.remove('hidden')
        textInputWrapper2?.classList?.remove('hidden')
        textLabel1.innerText = 'Text:'
        textLabel2.innerText = 'Key (number):'
        textInput1.type = 'text'
        textInput2.type = 'number'
        type = value
    }

    if (value === 'polybius') {
        textInputWrapper1?.classList?.remove('hidden')
        textInputWrapper2?.classList?.remove('hidden')
        textInputWrapper3?.classList?.remove('hidden')
        textLabel1.innerText = 'Text:'
        textLabel2.innerText = 'Key param a (number):'
        textLabel3.innerText = 'Key param b (number):'
        textInput1.type = 'text'
        textInput2.type = 'number'
        textInput3.type = 'number'
        type = value
    }

    if (value === 'vigenere') {
        textInputWrapper1?.classList?.remove('hidden')
        textInputWrapper2?.classList?.remove('hidden')
        textLabel1.innerText = 'Text:'
        textLabel2.innerText = 'Key (word):'
        textInput1.type = 'text'
        textInput2.type = 'text'
        type = value
    }

    if (value === 'playfair') {
        textInputWrapper1?.classList?.remove('hidden')
        textInputWrapper2?.classList?.remove('hidden')
        textLabel1.innerText = 'Text:'
        textLabel2.innerText = 'Key (word):'
        textInput1.type = 'text'
        textInput2.type = 'text'
        type = value;
    }

    if (value === 'rsa') {
        textInputWrapper1?.classList?.remove('hidden');
        textInputWrapper2?.classList?.remove('hidden');
        textInputWrapper3?.classList?.remove('hidden');
        textLabel1.innerText = 'Text:';
        textLabel2.innerText = 'Encrypt (p - first!) or Decrypt (d):';
        textLabel3.innerText = 'Encrypt (q - first!) or Decrypt (n):';
        textInput1.type = 'text';
        textInput2.type = 'number';
        textInput3.type = 'number';
        type = value;
    }
};

cipherSelect.addEventListener('change', (value) => InitInputs(value.target.value))

encryptBtn.addEventListener('click', () => {
    const value1 = textInput1?.value;
    const value2 = textInput2?.value;
    const value3 = textInput3?.value;
    let result;

    if (type === 'caesar') result = CaesarCipher(value1, parseInt(value2))
    if (type === 'polybius') result = PolybiusSquare(value1, parseInt(value2), parseInt(value3))
    if (type === 'vigenere') result = VigenereCipher(value1, value2, 'encrypt')
    if (type === 'playfair') result = PlayfairCipher(value1, value2, 'encrypt')
    if (type === 'rsa') {
        const { publicKey, privateKey} = generateRSAKeys(value2, value3)
        const encrypt = rsaEncrypt(value1, publicKey)
        result = `Public: (e:${publicKey.e}, n:${publicKey.n}), Private: (d:${privateKey.d}, n:${privateKey.n}), Encrypt: ${encrypt}`
    }

    resultText.textContent = result;
});

decryptBtn.addEventListener('click', () => {
    const value1 = textInput1?.value;
    const value2 = textInput2?.value;
    const value3 = textInput3?.value;
    let result;

    if (type === 'caesar') result = CaesarCipher(value1, -parseInt(value2))
    if (type === 'polybius') result = PolybiusSquare(value1, parseInt(value2), parseInt(value3))
    if (type === 'vigenere') result = VigenereCipher(value1, value2, 'decrypt')
    if (type === 'playfair') result = PlayfairCipher(value1, value2, 'decrypt')
    if (type === 'rsa') result = rsaDecrypt(value1, { d: value2, n: value3 })
    resultText.textContent = result;
});

const hideInputs = () => {
    if (textInput1) textInput1.value = ''
    if (textInput2) textInput2.value = ''
    if (textInput3) textInput3.value = ''
    resultText.textContent = ''
    textInputWrapper1?.classList?.add('hidden')
    textInputWrapper2?.classList?.add('hidden')
    textInputWrapper3?.classList?.add('hidden')
}

InitInputs('caesar')