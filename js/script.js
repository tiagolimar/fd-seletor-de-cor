let getColorBorder = false;
let getColorBackground = false;

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
        const classList = ["color-line", "d-flex", "w-100", "justify-content-center", "gap-2"];
        colorLine.classList.add(...classList);
        const colorsArray = color.split(";");

        colorsArray.forEach((color, indexColor) => {
            const codeColumn = String.fromCharCode(65 + indexColor);
            const codeColor = `${codeColumn}${indexArray+1}`;
            const div = document.createElement("div");

            div.classList.add("color", "rounded", "shadow-sm", "fw-bold", "d-flex", "align-items-center", "justify-content-center");
            div.style.backgroundColor = `rgb(${color})`;
            div.setAttribute("data-id", codeColor);
            div.innerText = codeColor;
            colorLine.appendChild(div);
        });
        document.querySelector("#container-colors").appendChild(colorLine);
    });
}

criarTabelaDeCores();

function obterCor(e){
    e.preventDefault();
    const codeColor = e.target.value.toUpperCase();

    if (codeColor.length == 2){
        const colorDiv = document.querySelector(`[data-id="${codeColor}"]`);
        const color = colorDiv.style.backgroundColor;
        e.target.style.backgroundColor = color;
    }
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
