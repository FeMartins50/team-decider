const players = [];

function addRowToTable (tableId, playerName, playerStrength) { // Parametros: tableId , playerName , playerStrength
    let tableInputBody = document.getElementById(tableId).children[0];
    let newRow = tableInputBody.insertRow(-1);
    // Insert a cell in the row at index 0
    let newCell0 = newRow.insertCell(0);
    // Append a text node to the cell
    newCell0.appendChild(document.createTextNode(playerName));
    // Insert a cell in the row at index 1
    let newCell1 = newRow.insertCell(1);
    // Append a text node to the cell
    newCell1.appendChild(document.createTextNode(playerStrength));
    // Remover cell do jogador ao clicar, e removê-lo do array players
    newRow.onclick = () => {
        let i = newRow.rowIndex;
        document.getElementById(tableId).deleteRow(i);
        if (tableId === "tableInput") {
            players.splice(i-1, 1);
        } else if (tableId === "tableAlpha") {
            alpha.splice(i-1, 1);
        } else if (tableId === "tableBravo") {
            bravo.splice(i-1, 1);
        }
        calcStrengthAndCounter();
    }
}

function addPlayer () {
    let player = document.getElementById("playerInput").value;
    let strength = document.getElementById("strengthInput").value;
    if (isNaN(strength) || !player || !strength) {
        return;
    }

    document.getElementById("playerInput").value = "";
    document.getElementById("strengthInput").value = "";
    players.push([player, strength]);
    addRowToTable("tableInput", player, strength);
}

function cleanTable (tableId) {
    let table = document.getElementById(tableId);
    for (let i = (table.rows.length - 1); i > 0; i--) {
        table.deleteRow(i);
    }
}

function calcStrengthAndCounter () {
    alphaStrength = 0;
    bravoStrength = 0;
    // Calcular força dos times
    for (let player of alpha) {
        alphaStrength += Number.parseInt(player[1]);
    }
    for (let player of bravo) {
        bravoStrength += Number.parseInt(player[1]);
    }

    // Atualizar o 'document'
    document.getElementById("counterAlpha").innerHTML = "Jogadores: " + alpha.length;
    document.getElementById("counterBravo").innerHTML = "Jogadores: " + bravo.length;
    document.getElementById("strengthAlpha").innerHTML = "Força Média: " + alphaStrength;
    document.getElementById("strengthBravo").innerHTML = "Força Média: " + bravoStrength;
}

const alpha = [];
const bravo = [];
let alphaStrength = 0;
let bravoStrength = 0;

function split () {
    cleanTable("tableInput");
    cleanTable("tableAlpha");
    cleanTable("tableBravo");
    players.push(...alpha, ...bravo);
    alpha.splice(0);
    bravo.splice(0);
    alphaStrength = 0;
    bravoStrength = 0;

    // Ordenar 'players' do mais forte ao mais fraco
    players.sort((playA, playB) => {
        return parseInt(playB[1]) - parseInt(playA[1]);
    });

    // Distribuir jogadores do array 'players' e aleatorizar os times
    let decider = true, player;
    while (players.length > 0) {
        decider = ( (alphaStrength - bravoStrength) <= 0 && (alpha.length - bravo.length) <= 0 );
        [ player ] = players.splice(0, 1);
        if (decider) {
            alpha.push(player);
            alphaStrength += Number.parseInt(player[1]);
        } else {
            bravo.push(player);
            bravoStrength += Number.parseInt(player[1]);
        }
    }
    
    alpha.sort((playA, playB) => {
        return parseInt(playB[1]) - parseInt(playA[1]);
    });
    bravo.sort((playA, playB) => {
        return parseInt(playB[1]) - parseInt(playA[1]);
    });
    calcStrengthAndCounter();
    // Efetivamente colocar os jogadores dos arrays 'alpha' e 'bravo' nas 'table's do 'document'
    for (let [name, strength] of alpha) { // Alpha
        addRowToTable("tableAlpha", name, strength);
    }
    for (let [name, strength] of bravo) { // Bravo
        addRowToTable("tableBravo", name, strength);
    }
}