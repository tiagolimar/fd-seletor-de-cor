let colors = [
    {
        name: "Default",
        colorBorder: "#dedede",
        colorBackground: "#fff"
    }
];

function adicionarDB(color){
    colors.push(color);
    renderTable();
}

function removerDB(colorId){
    colors = colors.filter((color,index) => index !== parseInt(colorId));
    renderTable();
}

function renderTable(){
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    colors.forEach((color,index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td data-id="${index}">${color.name}</td>
            <td class="clickable" data-bs-toggle="modal" data-bs-target="#variantColor" data-id="${index}" style="background-color: ${color.colorBorder}">${color.colorBorder}</td>
            <td class="clickable" data-bs-toggle="modal" data-bs-target="#variantColor" data-id="${index}" style="background-color: ${color.colorBackground}">${color.colorBackground}</td>

            <td data-id="${index}">
                <div class="mx-auto" style="
                    width: 150px; 
                    height: 25px; 
                    border: 5px solid ${color.colorBorder}; 
                    background-color: ${color.colorBackground};
                    border-radius: 5px;
                ">
                </div>
            </td>

            <td data-id="${index}">
                <button class="btn btn-danger w-100" onclick="removerDB('${index}')">X</button>
            </td>
        `;
        tr.setAttribute('data-id',index);
        tbody.appendChild(tr);
    });
}

renderTable();
