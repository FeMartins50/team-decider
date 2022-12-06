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
        players.splice(i-1,1);
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

const alpha = [];
const bravo = [];

function split () {
    cleanTable("tableInput");
    cleanTable("tableAlpha");
    cleanTable("tableBravo");
    alpha.splice(0);
    bravo.splice(0);
    // Distribuir jogadores do array 'players' e aleatorizar os times
    let decider = true, player;
    while (players.length > 0) {
        [ player ] = players.splice(Math.floor(Math.random() * players.length), 1);
        if (decider) {
            alpha.push(player);
            decider = false;
        } else {
            bravo.push(player);
            decider = true;
        }
    }

    // Efetivamente colocar os jogadores dos arrays 'alpha' e 'bravo' nas 'table's do 'document'
    for (let [name, strength] of alpha) { // Alpha
        addRowToTable("tableAlpha", name, strength);
    }
    for (let [name, strength] of bravo) { // Bravo
        addRowToTable("tableBravo", name, strength);
    }
}