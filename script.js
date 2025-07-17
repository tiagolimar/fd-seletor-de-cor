let getColorBorder = false;
let getColorBackground = false;

const colors = [
  "255,128,128 ; 255,255,128 ; 128,255,128 ; 0,255,128 ; 128,255,255 ; 0,128,255 ; 255,128,192 ; 255,128,255",
  "255,0,0 ; 255,255,0 ; 128,255,0 ; 0,255,64 ; 0,255,255 ; 0,128,192 ; 128,128,192 ; 255,0,255",
  "128,64,64 ; 255,128,64 ; 0,255,0 ; 0,128,128 ; 0,64,128 ; 128,128,255 ; 128,0,64 ; 255,0,128",
  "128,0,0 ; 255,128,0 ; 0,128,0 ; 0,128,64 ; 0,0,255 ; 0,0,160 ; 128,0,128 ; 128,0,255",
  "64,0,0 ; 128,64,0 ; 0,64,0 ; 0,64,64 ; 0,0,128 ; 0,0,64 ; 64,0,64 ; 64,0,128",
  "0,0,0 ; 128,128,0 ; 128,128,64 ; 128,128,128 ; 64,128,128 ; 192,192,192 ; 64,0,64 ; 255,255,255",
];

colors.forEach((color) => {
  const colorLine = document.createElement("div");
  colorLine.classList.add("color-line");
  const colorsArray = color.split(";");
  colorsArray.forEach((color) => {
    const div = document.createElement("div");
    div.classList.add("color");
    div.style.backgroundColor = `rgb(${color})`;
    colorLine.appendChild(div);
  });
  document.querySelector(".container").appendChild(colorLine);
});

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.querySelector("#nome").value;
  const corBorda = document.querySelector("[for='corBorda']").style.backgroundColor;
  const corFundo = document.querySelector("[for='corFundo']").style.backgroundColor;
  const tr = document.createElement("tr");
  tr.innerHTML = `
            <td>${nome}</td>
            <td style="background-color: ${corBorda}"></td>
            <td style="background-color: ${corFundo}"></td>
            <td><div class="amostra" style="border: 5px solid ${corBorda}; background-color: ${corFundo}"></div></td>
        `;
  document.querySelector("tbody").appendChild(tr);
  form.reset();
});

const labelColorBorder = document.querySelector("[for='corBorda']");
const labelColorBackground = document.querySelector("[for='corFundo']");

labelColorBorder.addEventListener("click", () => {
  getColorBorder = true;
});
labelColorBackground.addEventListener("click", () => {
  getColorBackground = true;
});

const colorsDiv = document.querySelectorAll(".color");
colorsDiv.forEach((color) => {
  color.addEventListener("click", () => {
    if (getColorBorder) {
      document.querySelector("[for='corBorda']").style.backgroundColor = color.style.backgroundColor;
      getColorBorder = false;
    } else if (getColorBackground) {
      document.querySelector("[for='corFundo']").style.backgroundColor = color.style.backgroundColor;
      getColorBackground = false;
    }
  });
});