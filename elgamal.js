/**
 * Hàm lấy các gí trị từ ô input bao gồm
 */
function getPublicKey() {
  let pA = document.getElementById("txtPrime").value;
  if (!isPrimeNumber(pA)) {
    alert("Vui lòng chỉ nhập một số nguyên tố.");
    return;
  }
  let alpha = document.getElementById("txtAlphaNumber").value;
  let dA = document.getElementById("txtPrivateKey").value;
  let beta = t(alpha, dA, pA);

  document.getElementById(
    "displayData"
  ).innerHTML = `pA=${pA},Alpha=${alpha},Beta=${beta}`;
}
/**
 *
 * @param {*} n : Giá trị đầu vào
 * @returns Hàm chỉ cho phép nhập số nguyên tố
 */
function isPrimeNumber(n) {
  if (n <= 1) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}
/**
 *
 * @param {*}
 * @returns hàm random số nguyên tố p
 */
function getRandomPrimeNumber() {
  let randomNumber = Math.floor(Math.random() * (10000 - 2)) + 2;

  while (!isPrimeNumber(randomNumber)) {
    randomNumber = Math.floor(Math.random() * (10000 - 2)) + 2;
  }

  document.getElementById("txtPrime").value = randomNumber;
}

/**
 *
 * @param {*} p Hàm sinh ra một số nguyên g sao cho g là phần tử nguyên thủy modulo p
 * @returns
 */
function findPrimitiveRoot() {
  let primeNumber = document.getElementById("txtPrime").value;
  if (!isPrimeNumber(primeNumber)) {
    alert("Vui lòng chỉ nhập một số nguyên tố.");
    return null;
  }

  const q = primeNumber - 1;
  const factors = [];

  let phi = q;
  let n = phi;

  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      factors.push(i);
      while (n % i === 0) {
        n /= i;
      }
    }
  }

  if (n > 1) {
    factors.push(n);
  }

  if (factors.length !== 0) {
    const randomIndex = Math.floor(Math.random() * factors.length);
    const randomValue = factors[randomIndex];
    document.getElementById("txtAlphaNumber").value = randomValue;
  }
}

function decryption() {
  let pA = document.getElementById("txtPrime").value;
  let alpha = document.getElementById("txtAlphaNumber").value;
  let dA = document.getElementById("txtPrivateKey").value;
  let beta = t(alpha, dA, pA);
  let k = document.getElementById("txtEncryptPrivate").value;
  let m = document.getElementById("txtMessage").value;
  console.log(`Khoá công khai (pA,alpha,beta) là (${pA},${alpha},${beta})`);

  let y1 = t(alpha, k, pA);
  let p = m % pA;
  let q = t(beta, k, pA);
  let y2 = (p * q) % pA;

  let z = y2 % pA;
  let x = t(y1, pA - 1 - dA, pA);
  let kq = (z * x) % pA;
  console.log(`Kết quả sau khi giải mã là ${kq}`);
  document.getElementById("extrainfo").innerHTML = `Bob message is ${kq}`;
}

function encryption() {
  let pA = document.getElementById("txtPrime").value;
  let alpha = document.getElementById("txtAlphaNumber").value;
  let dA = document.getElementById("txtPrivateKey").value;
  let beta = t(alpha, dA, pA);
  let k = document.getElementById("txtEncryptPrivate").value;
  let m = document.getElementById("txtMessage").value;
  //    let y1 = Math.pow(alpha, k) % pA;
  let y1 = t(alpha, k, pA);
  let p = m % pA;
  let q = t(beta, k, pA);
  let y2 = (p * q) % pA;
  document.getElementById("displayData2").innerHTML = `(y1,y2)=(${y1},${y2})`;
  document.getElementById(
    "messageDisplay"
  ).innerHTML = `<div>You received a message from Bob. <button class="btn btn-primary btn-sm" onclick="decryption()" type="button">Decrypt</button></div>
    <div class="data" style="font-weight: bold;margin-top:10px;"></div>`;
  console.log(`Bản mã sau khi đc mã hoá là (y1,y2)=(${y1},${y2})`);
}

let t = function timDu(a, x, n) {
  for (let i = 0; i < x; i++) {
    let d = 1;
    while (x != 0) {
      if (x % 2 != 0) {
        d = (d * (a % n)) % n;
      }
      x = parseInt(x / 2);
      a = (a * a) % n;
    }
    return d;
  }
};
console.log(t(15, 35, 79));
console.log(t(2, 3, 3));
console.log(t(435, 1813, 2579));
console.log(t(949, 853, 2579));
