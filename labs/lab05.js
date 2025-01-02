const gcd = (a, b) => {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
};

const modInverse = (a, m) => {
    let m0 = m;
    let x0 = 0, x1 = 1;
    if (m === 1) return 0;
    while (a > 1) {
        let q = Math.floor(a / m);
        let t = m;
        m = a % m;
        a = t;
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }
    if (x1 < 0) x1 += m0;
    return x1;
};

export const generateRSAKeys = (p, q) => {
    let n = p * q;
    let phi = (p - 1) * (q - 1);
    let e = 3;
    while (gcd(e, phi) !== 1) {
        e += 2;
    }
    let d = modInverse(e, phi);

    return {
        publicKey: { e, n },
        privateKey: { d, n }
    };
};

export const rsaEncrypt = (text, publicKey) => {
    let { e, n } = publicKey;
    return text.split('').map(char => {
        let m = char.charCodeAt(0);
        return BigInt(m) ** BigInt(e) % BigInt(n);
    });
};

export const rsaDecrypt = (cipherText, privateKey) => {
    let { d, n } = privateKey;
    return cipherText.split(',').map(c => {
        let m = BigInt(c) ** BigInt(d) % BigInt(n);
        return String.fromCharCode(Number(m));
    }).join('');
};
