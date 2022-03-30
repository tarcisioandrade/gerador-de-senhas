const buttonEL = document.querySelector(`[data-js="button"]`);
const downValueEL = document.querySelector(`[data-js="downValue"]`);
const valueEL = document.querySelector(`[data-js="value"]`);
const upValueEL = document.querySelector(`[data-js="upValue"]`);
const passwordEL = document.querySelectorAll(`[data-js="password"]`);
const circlesEL = document.querySelectorAll(`[data-js="circles"]`);
const indicatorEL = document.querySelector(`[data-js="indicator"]`);
const copyEL = document.querySelectorAll(`[data-js="copy"]`);
const copiedEL = document.querySelectorAll(`[data-js="copied"]`);

// Valor Padrão
let defaultValue = 8;
valueEL.innerText = defaultValue;

// Muda as cores e texto de acordo com o valor;
const changeCircles = () => {
  if (defaultValue > 9 && defaultValue <= 14) {
    circlesEL[0].style.backgroundColor = "yellow";
    circlesEL[1].style.backgroundColor = "yellow";
    circlesEL[2].style.backgroundColor = "#fff";
    indicatorEL.innerText = "Quase lá";
    indicatorEL.style.color = "yellow";
  } else if (defaultValue > 14) {
    circlesEL[0].style.backgroundColor = "#00e745";
    circlesEL[1].style.backgroundColor = "#00e745";
    circlesEL[2].style.backgroundColor = "#00e745";
    indicatorEL.innerText = "Forte";
    indicatorEL.style.color = "#00e745";
  } else {
    circlesEL[0].style.backgroundColor = "#fd2727";
    circlesEL[1].style.backgroundColor = "#fff";
    circlesEL[2].style.backgroundColor = "#fff";
    indicatorEL.innerText = "Fraca";
    indicatorEL.style.color = "#fd2727";
  }
};
changeCircles();

// Função que diminui o valor
const downValueMethod = () => {
  if (defaultValue > 8) {
    defaultValue--;
    valueEL.innerText = defaultValue;
    changeCircles();
  }
};

// Função que aumenta o valor
const upValueMethod = () => {
  if (defaultValue < 18) {
    defaultValue++;
    valueEL.innerText = defaultValue;
    changeCircles();
  }
};

// Carácteres que vao ser usados para gerar a senha
const hash = Array.from(
  "~!@#$%^&*_+<>1234567890QWERTYUIOPASDFGHJKLZCVBNMqwertyuiopasdfghjklzxcvbnm"
);

// Função que mistura os caracteres de acordo com o valor
const generatePassword = () => {
  let password = "";
  for (let i = 0; i < defaultValue; i++) {
    let randomNumber = Math.floor(Math.random() * hash.length);
    password += hash[randomNumber];
  }
  return password;
};

// Função que inseri a senha no elemento e que manipula o elemento que copia
const setPasswords = () => {
  passwordEL.forEach((item) => {
    item.parentNode.style.backgroundImage = "none";
    item.textContent = generatePassword();
  });
  copyEL.forEach((copy, index) => {
    copy.classList.add("active");
    copy.addEventListener("click", ({ target }) => {
      const passwordToCopy = target.nextElementSibling.innerText;
      navigator.clipboard.writeText(passwordToCopy);
      handleCopied(index);
    });
  });
};

// Função que faz aparecer a notificação de "Copiado!" e some depois de 2 segundos
const handleCopied = (index) => {
  copiedEL[index].classList.add("active");
  setTimeout(() => copiedEL[index].classList.remove("active"), 2000);
};

// Eventos de click
buttonEL.addEventListener("click", setPasswords);
downValueEL.addEventListener("click", downValueMethod);
upValueEL.addEventListener("click", upValueMethod);
