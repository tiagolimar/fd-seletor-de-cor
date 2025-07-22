let getColorBorder = false;
let getColorBackground = false;
let lastInputActive = document.querySelector("#corBorda");

function criarTabelaDeCores() {
    const colors = [
        "255,128,128 ; 255,255,128 ; 128,255,128 ; 0,255,128 ; 128,255,255 ; 0,128,255 ; 255,128,192 ; 255,128,255",
        "255,0,0 ; 255,255,0 ; 128,255,0 ; 0,255,64 ; 0,255,255 ; 0,128,192 ; 128,128,192 ; 255,0,255",
        "128,64,64 ; 255,128,64 ; 0,255,0 ; 0,128,128 ; 0,64,128 ; 128,128,255 ; 128,0,64 ; 255,0,128",
        "128,0,0 ; 255,128,0 ; 0,128,0 ; 0,128,64 ; 0,0,255 ; 0,0,160 ; 128,0,128 ; 128,0,255",
        "64,0,0 ; 128,64,0 ; 0,64,0 ; 0,64,64 ; 0,0,128 ; 0,0,64 ; 64,0,64 ; 64,0,128",
        "0,0,0 ; 128,128,0 ; 128,128,64 ; 128,128,128 ; 64,128,128 ; 192,192,192 ; 64,0,64 ; 255,255,255",
    ];

    colors.forEach((color, indexArray) => {
        const colorLine = document.createElement("div");
        const classList = ["color-line"];
        colorLine.classList.add(...classList);
        const colorsArray = color.split(";");

        colorsArray.forEach((color, indexColor) => {
            const codeColumn = String.fromCharCode(65 + indexColor);
            const codeColor = `${codeColumn}${indexArray+1}`;
            const div = document.createElement("div");

            div.classList.add("color", "rounded", "shadow-sm", "fw-bold", "d-flex", "align-items-center", "justify-content-center");
            div.style.backgroundColor = `rgb(${color})`;
            div.style.textShadow = "1px 1px 0 #fff";
            div.setAttribute("data-id", codeColor);
            div.innerText = codeColor;
            div.addEventListener("click", setColorInLastInputActive);
            colorLine.appendChild(div);
        });
        document.querySelector("#container-colors").appendChild(colorLine);
    });
}

criarTabelaDeCores();

function obterCor(e){
    e.preventDefault();
    lastInputActive = e.target;
    const codeColor = e.target.value.toUpperCase();

    if (codeColor.length == 2){
        const colorDiv = document.querySelector(`[data-id="${codeColor}"]`);
        const color = colorDiv.style.backgroundColor;
        e.target.style.backgroundColor = color;
    }
}

function setInputActive(e){
    lastInputActive = e.target;
}

function setColorInLastInputActive(e){
    const inputBorder = document.querySelector("#corBorda");
    const inputBackground = document.querySelector("#corFundo");

    lastInputActive.style.backgroundColor = e.target.style.backgroundColor;
    lastInputActive.value = e.target.innerText;

    lastInputActive = inputBorder == lastInputActive ? inputBackground : inputBorder
}

function setColorInInputActive(e, id){
    const input = document.querySelector(`#${id}`);

    input.style.backgroundColor = e.target.style.backgroundColor;
    input.value = e.target.innerText;
}

function adicionarCor(e){
    e.preventDefault();
    const nome = document.querySelector("#nome").value;
    const corBorda = document.querySelector("#corBorda").style.backgroundColor;
    const corFundo = document.querySelector("#corFundo").style.backgroundColor;

    const color = {
        name: nome,
        colorBorder: corBorda,
        colorBackground: corFundo
    };

    adicionarDB(color);
    e.target.reset();
    document.querySelector("#corBorda").style.backgroundColor = "#fff";
    document.querySelector("#corFundo").style.backgroundColor = "#fff";
}

document.querySelector("#variantColor").addEventListener("show.bs.modal", function (event) {
    const baseColor = event.relatedTarget.style.backgroundColor;
    if (!baseColor) {
        event.preventDefault();
        return;
    }
    const hsl = rgbToHsl(...parserHTMLtoRgb(baseColor));
    const variantsL = [40, 60, 80, 100, 120, 140, 160, 180, 190]
    const colorLine = variantColor.querySelector(".modal-body .color-line");
    colorLine.innerHTML = `
        ${variantsL.map((variant) => {
            const hslVariant = [...hsl];
            hslVariant[2] = variant/255;
            const htmlColorVariant = parserHslToHtml(hslVariant);
            return (
                `<div class="color fw-bold d-flex align-items-center justify-content-center rounded"
                    style="background-color: ${htmlColorVariant}; text-shadow: 1px 1px 0 #fff"
                    onclick="setColorInInputActive(event, '${event.relatedTarget.id}')">
                    ${(+htmlColorVariant.split(',')[2].replace('%)','')*255/100).toFixed()}
                </div>`
            );
        }).join('\n')}`;
});

function importColors() {
    const input = document.querySelector("#content");
    colors = JSON.parse(input.value);
    renderTable();
}