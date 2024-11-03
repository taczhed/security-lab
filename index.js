import { CaesarCipher } from './labs/lab01.js';

let type = 'caesar'

const cipherSelect = document.getElementById('cipher-select');
const textInput1 = document.getElementById('text-input-1');
const textInput2 = document.getElementById('text-input-2');
const textInput3 = document.getElementById('text-input-3');
const textLabel1 = document.getElementById('text-input-label-1');
const textLabel2 = document.getElementById('text-input-label-2');
const textLabel3 = document.getElementById('text-input-label-3');
const resultText = document.getElementById('resultText');
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');

cipherSelect.addEventListener('change', (value) => {
    hideInputs()

    if (value.target.value === 'caesar') {
        textInput1.classList.remove('hidden')
        textInput2.classList.remove('hidden')
        textLabel1.innerText = 'Value:'
        textLabel2.innerText = 'Key:'
        type = value.target.value
    }

})

encryptBtn.addEventListener('click', () => {
    const value1 = textInput1?.value;
    const value2 = textInput2?.value;
    const value3 = textInput3?.value;
    let result;

    if (type === 'caesar') result = CaesarCipher(value1, parseInt(value2))

    resultText.textContent = result;
});

decryptBtn.addEventListener('click', () => {
    const value1 = textInput1?.value;
    const value2 = textInput2?.value;
    const value3 = textInput3?.value;
    let result;

    if (type === 'caesar') result = CaesarCipher(value1, -parseInt(value2))

    resultText.textContent = result;
});

const hideInputs = () => {
    textInput1.classList.add('hidden')
    textInput2.classList.add('hidden')
    textInput3.classList.add('hidden')
}