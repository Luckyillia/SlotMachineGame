const SYMBOL = ['🍉', '🍋', '🍒', '🔔', '🍇', '7️⃣', '💰', '🍀'];
const SLOT_LENGHT = 32;
const ARR_80 = [SYMBOL[1], SYMBOL[2], SYMBOL[3], SYMBOL[4]];
const ARR_160 = [SYMBOL[0], SYMBOL[5], SYMBOL[6], SYMBOL[7]];
let money = 0;
let bet = 1;
let slot1;
let slot2;
let slot3;

let result;

function generateSymbols() {
    let symbols = [];
    for (let i = 0; i < SLOT_LENGHT; i++) {
        let symbol = SYMBOL[Math.floor(Math.random() * SYMBOL.length)];
        symbols.push(symbol);
    }
    return symbols;
}

function generateResult() {
    let result = [
        [],
        [],
        []
    ];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            result[i][j] = SYMBOL[Math.floor(Math.random() * SYMBOL.length)];
        }
    }
    return result;
}
slot1 = generateSymbols();
slot2 = generateSymbols();
slot3 = generateSymbols();

function loadSymbols() {
    $(".slot1").empty();
    $(".slot2").empty();
    $(".slot3").empty();
    for (let i = 0; i < SLOT_LENGHT; i++) {
        $(".slot1").append(`<div class="slot-item">${slot1[i]}</div>`);
        $(".slot2").append(`<div class="slot-item">${slot2[i]}</div>`);
        $(".slot3").append(`<div class="slot-item">${slot3[i]}</div>`);
    }
}
function setResult(result) {
    for (let i = 0; i < 3; i++) {
        $(".slot1").append(`<div class="slot-item">${result[i][0]}</div>`);
        $(".slot2").append(`<div class="slot-item">${result[i][1]}</div>`);
        $(".slot3").append(`<div class="slot-item">${result[i][2]}</div>`);
    }
    for (let i = 2; i >= 0; i--) {
        $(".slot1").prepend(`<div class="slot-item">${result[i][0]}</div>`);
        $(".slot2").prepend(`<div class="slot-item">${result[i][1]}</div>`);
        $(".slot3").prepend(`<div class="slot-item">${result[i][2]}</div>`);
    }
}
function checkResult(result) {
    let win = 0;
    for (let i = 0; i < 3; i++) {
        if (result[i][0] == result[i][1] && result[i][1] == result[i][2]) {
            console.log(result[i][0] + " " + result[i][1] + " " + result[i][2]);
            if (ARR_80.includes(result[i][0])) {
                win += bet * 80;
            }
            if (ARR_160.includes(result[i][0])) {
                win += bet * 160;
            }
        }else if (result[i][0] == result[i][1] || result[i][1] == result[i][2]) {
            console.log(result[i][0] + " " + result[i][1] + " " + result[i][2]);
            if (ARR_80.includes(result[i][0])) {
                win += bet * 40;
            }
            if (ARR_160.includes(result[i][0])) {
                win += bet * 80;
            }
        }
    }
    console.log("Wygrana: " + win);
    return win;
}
function initGame() {
    loadSymbols();
    result = generateResult();
    console.log(result);
    setResult(result);
}
function startGame() {
    if (money >= 10) {
        money -= bet*10;
        $("#money").text(money);

        $(".slot1, .slot2, .slot3").removeClass('spinning');
        $("#btn").attr("disabled", true);
        
        loadSymbols();
        result = generateResult();
        console.log(result);
        setResult(result);  

        setTimeout(() => {
            $(".slot1").addClass('spinning');
            $(".slot2").addClass('spinning');
            $(".slot3").addClass('spinning');
        }, 10); 
        
        setTimeout(() => {
            let win = checkResult(result);
            if(win > 0){
                money += win;
                alert("Wygrana: " + win);
                $("#money").text(money);
            }
            $("#btn").removeAttr("disabled");
        }, 4010);
        
    } else {
        alert("Brak srodkow!");
        $("#modal").show();
        $("#slotMachine").hide();
        return;
    }
}
$(document).ready(function() {
    initGame();
    $("#startBtn").click(function() {
        if($("#moneyModal").val() <10){
            alert("Nalezy wprowadzic co najmniej 10 monet!");
            return;
        }
        $("#modal").hide();
        $("#slotMachine").show();
        money = $("#moneyModal").val();
        $("#money").text(money);
        $("#bet").val(bet);
    });
    $("#bet").change(function() {
        bet = $("#bet").val();
    });
    $(".btn").click(function() {
        startGame();
    });
});