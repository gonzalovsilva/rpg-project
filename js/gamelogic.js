// Apple related stuff
document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});

const getStartP1 = document.getElementById('choose-p1');
const getStartP2 = document.getElementById('choose-p2');
const getStartCpuP1 = document.getElementById('choose-cpu-p1');
const getStartCpuP2 = document.getElementById('choose-cpu-p2');

let turnStat = 0;
let restartP1 = 0;
let restartP2 = 0;
let numRounds = 0;
let totalRounds = 0;
let isCpuP1 = false;
let isCpuP2 = false;

const getInputRaceP1 = document.getElementById('drop-p1-race');
const getInputRaceP2 = document.getElementById('drop-p2-race');
const getInputItemP1 = document.getElementById('drop-p1-item');
const getInputItemP2 = document.getElementById('drop-p2-item');
const btnHitP1 = document.getElementById('hit-p1');
const btnHitP2 = document.getElementById('hit-p2');
const btnHealP1 = document.getElementById('heal-p1');
const btnHealP2 = document.getElementById('heal-p2');
const btnYieldP1 = document.getElementById('yield-p1');
const btnYieldP2 = document.getElementById('yield-p2');

function inputCharacter(p, isEnable) {
    const isInputEnable = isEnable;
    const getInputId = document.getElementById(`input-p${p}`);
    const getInputName = document.getElementById(`input-p${p}-name`);
    const getInputRace = document.getElementById(`drop-p${p}-race`);
    const getInputItem = document.getElementById(`drop-p${p}-item`);
    const getBtns = document.getElementById(`btns-p${p}`);
    const getContinueId = document.getElementById(`continue-p${p}`);
    const getClass = `stats-p${p}`;

    if (isInputEnable) {
        if (getInputName.value == "") {
            message(p, 'You need to give a name to your character', 'info');
            return false;
        } else {
            document.getElementById(`name-p${p}`).innerHTML = `${getInputName.value}`;
        }
        if (getInputRace.value == 'none') {
            message(p, 'You need to give a race to your character', 'info');
            return false;
        } else {
            document.getElementById(`race-p${p}`).innerHTML = `${getInputRace.value}`;
        }
        if (getInputItem.value == 'none') {
            message(p, 'You need to give an item to your character', 'info');
            return false;
        }

        getInputId.classList.contains('disable') ?
            getInputId.classList.remove('disable') :
            getInputId.classList.add('disable');
        getInputName.classList.contains('disable') ?
            getInputName.classList.remove('disable') :
            getInputName.classList.add('disable');
        getInputRace.classList.contains('disable') ?
            getInputRace.classList.remove('disable') :
            getInputRace.classList.add('disable');
        getInputItem.classList.contains('disable') ?
            getInputItem.classList.remove('disable') :
            getInputItem.classList.add('disable');
        getContinueId.classList.contains('disable') ?
            getContinueId.classList.remove('disable') :
            getContinueId.classList.add('disable');

        getBtns.classList.contains('disable') ?
            getBtns.classList.remove('disable') :
            getBtns.classList.add('disable');

        const els = document.getElementsByClassName(getClass);
        for (let i = 0; i < els.length; i++) {
            els[i].classList.contains('disable') ?
                els[i].classList.remove('disable') :
                els[i].classList.add('disable');
        }
        return true;

    } else {
        document.getElementById(`p${p}-final`).classList.add('disable');

        getInputId.classList.contains('disable') ?
            getInputId.classList.remove('disable') :
            getInputId.classList.add('disable');
        getInputName.classList.contains('disable') ?
            getInputName.classList.remove('disable') :
            getInputName.classList.add('disable');
        getInputRace.classList.contains('disable') ?
            getInputRace.classList.remove('disable') :
            getInputRace.classList.add('disable');
        getInputItem.classList.contains('disable') ?
            getInputItem.classList.remove('disable') :
            getInputItem.classList.add('disable');

        return true;
    }
}

function message(p, text, type) {
    const msgBox = document.getElementById(`msg-p${p}`);
    msgBox.innerHTML = text;
    switch (type) {
        case 'info':
            msgBox.style.color = "#555";
            msgBox.style.backgroundColor = "#fada5e";
            break;
        case 'good':
            msgBox.style.color = "whitesmoke";
            msgBox.style.textAlign = 'center';
            msgBox.style.backgroundColor = "green";
            break;
        case 'bad':
            msgBox.style.color = "whitesmoke";
            msgBox.style.textAlign = 'center';
            msgBox.style.backgroundColor = "red";
            break;
        case 'vampire':
            msgBox.style.color = "whitesmoke";
            msgBox.style.textAlign = 'right';
            msgBox.style.backgroundColor = "#00000000";
            break;
    }
    msgBox.classList.remove('disable');
    msgBox.style.opacity = "1.0";
    setTimeout(function () {
        msgBox.style.opacity = "0.0";
    }, 4000);
    setTimeout(function () {
        msgBox.classList.add('disable');
    }, 5000);
}

function changeBgRace(p) {
    const imgP = document.getElementById(`p${p}-image`);
    const getInputRace = document.getElementById(`drop-p${p}-race`);
    switch (getInputRace.value) {
        case 'human':
            imgP.style.backgroundImage = "url('images/human.jpg')";
            break;
        case 'orc':
            imgP.style.backgroundImage = "url('images/orc.jpg')";
            break;
        case 'elf':
            imgP.style.backgroundImage = "url('images/elf.jpg')";
            break;
        case 'vampire':
            imgP.style.backgroundImage = "url('images/vampire.jpg')";
            break;
        default:
            break;
    }
}

let player1, player2;
let numPlayers = 0;

function createCharacter(p) {
    const getInputName = document.getElementById(`input-p${p}-name`).value;
    const getInputRace = document.getElementById(`drop-p${p}-race`).value;
    const getInputItem = document.getElementById(`drop-p${p}-item`).value;
    if (p == 1) {
        player1 = new Person(getInputName, getInputRace, getInputItem);
    } else {
        player2 = new Person(getInputName, getInputRace, getInputItem);
    }
}

let curLifeP1 = document.getElementById('p1-life');
let curLifeTextP1 = document.getElementById('life-text-p1');
let curLifeP2 = document.getElementById('p2-life');
let curLifeTextP2 = document.getElementById('life-text-p2');

function updateLifeBar() {
    if (curLifeP1.value != player1.currenthealth) {
        let idP1 = setInterval(() => {
            if (curLifeP1.value == player1.currenthealth) {
                // console.log(`%c life bar value now is correct`, `background: #42f551; color: #191c19`);
                clearInterval(idP1);
                return true;
            } else if (curLifeP1.value > player1.currenthealth) {
                curLifeP1.value--;
                curLifeTextP1.innerHTML = `${curLifeP1.value} / ${player1.maxHealth}`;
            } else if (curLifeP1.value < player1.currenthealth) {
                curLifeP1.value++;
                curLifeTextP1.innerHTML = `${curLifeP1.value} / ${player1.maxHealth}`;
            };
        }, 60);
    }
    if (curLifeP2.value != player2.currenthealth) {
        let idP2 = setInterval(() => {
            if (curLifeP2.value == player2.currenthealth) {
                // console.log(`%c life bar value now is correct`, `background: #42f551; color: #191c19`);
                clearInterval(idP2);
                return true;
            } else if (curLifeP2.value > player2.currenthealth) {
                curLifeP2.value--;
                curLifeTextP2.innerHTML = `${curLifeP2.value} / ${player2.maxHealth}`;
            } else if (curLifeP2.value < player2.currenthealth) {
                curLifeP2.value++;
                curLifeTextP2.innerHTML = `${curLifeP2.value} / ${player2.maxHealth}`;
            };
        }, 60);
    }
}

function checkMinHealth() {
    if (player1.currenthealth == 0) goYield(1, true);
    if (player2.currenthealth == 0) goYield(2, true);
}

function checkIfmaxHeal(p) {
    switch (p) {
        case 1:
            return player1.currenthealth == player1.maxHealth ? true : false;
        case 2:
            return player2.currenthealth == player2.maxHealth ? true : false;
    }
}

let logP1 = document.getElementById(`p1-log`);
let logP2 = document.getElementById(`p2-log`);

function goHit(p) {

    if (numPlayers == 2) {
        if (turnStat == p) {
            let log;
            // document.getElementById(`player-area-p1`).style.animationName = 'none';
            // document.getElementById(`player-area-p2`).style.animationName = 'none';
            if (p == 1) {
                log = player2.damage(player1);
                if (log[2] == 1) {
                    document.getElementById(`player-area-p2`).style.animationName = 'headShake';
                }
                if (log[2] == 2) {
                    document.getElementById(`player-area-p1`).style.animationName = 'headShake';
                }
                logP2.innerHTML = log[0];
                logP1.innerHTML = log[1];
            } else {
                log = player1.damage(player2);
                if (log[2] == 1) {
                    document.getElementById(`player-area-p1`).style.animationName = 'headShake';
                }
                if (log[2] == 2) {
                    document.getElementById(`player-area-p2`).style.animationName = 'headShake';
                }
                logP1.innerHTML = log[0];
                logP2.innerHTML = log[1];
            }
            getTurn();
        }

    }
}

function goHeal(p) {
    if (numPlayers == 2) {
        if (checkIfmaxHeal(p) == false) {
            if (turnStat == p) {
                let log;
                if (p == 1) {
                    log = player1.heal();
                    logP1.innerHTML = log;
                    logP2.innerHTML = '';
                } else {
                    log = player2.heal();
                    logP2.innerHTML = log;
                    logP1.innerHTML = '';
                }
                getTurn();
            }
        }
    }
}

function goYield(p, pLost) {
    document.getElementById("p1-image").style.filter = "unset";
    document.getElementById("p2-image").style.filter = "unset";
    document.getElementById(`player-area-p1`).style.borderColor = 'initial';
    document.getElementById(`player-area-p2`).style.borderColor = 'initial';
    if (pLost) {
        if (turnStat == p) {
            if (numPlayers == 2) {
                document.getElementById(`p${p}-final`).style.filter = 'none';
                document.getElementById(`p${p}-final`).style.height = `0%`;
                document.getElementById(`p${p}-final`).classList.remove(`disable`);
                setTimeout(function () {
                    document.getElementById(`p${p}-final`).style.height = `100%`;
                }, 3200);
                document.getElementById(`continue-p${p}`).classList.remove(`disable`);
                document.getElementById(`p${p}-log`).classList.add(`disable`);
                document.getElementById(`btns-p${p}`).classList.add(`disable`);
                document.getElementById(`input-p${p}`).classList.add(`disable`);
                document.getElementById(`btns-p${p}`).classList.add(`disable`);
                document.getElementById(`stats-bar-p${p}`).classList.add(`disable`);
                document.getElementById(`stats-p${p}-bottom`).classList.add(`disable`);
                message(p, `You loose`, `bad`);
                document.getElementById(`player-area-p${p}`).style.animationName = 'vibrate';
                setTimeout(function () {
                    p == 1 ? goYield(2, false) : goYield(1, false);
                }, 1000);
                numPlayers = 0;
            }
        }
    } else {
        document.getElementById(`p${p}-final`).style.filter = 'hue-rotate(-195deg)';
        document.getElementById(`p${p}-final`).style.height = `0%`;
        document.getElementById(`p${p}-final`).classList.remove(`disable`);
        setTimeout(function () {
            document.getElementById(`p${p}-final`).style.height = `100%`;
        }, 3200);
        document.getElementById(`continue-p${p}`).classList.remove(`disable`);
        document.getElementById(`p${p}-log`).classList.add(`disable`);
        document.getElementById(`btns-p${p}`).classList.add(`disable`);
        document.getElementById(`input-p${p}`).classList.add(`disable`);
        document.getElementById(`btns-p${p}`).classList.add(`disable`);
        document.getElementById(`stats-bar-p${p}`).classList.add(`disable`);
        document.getElementById(`stats-p${p}-bottom`).classList.add(`disable`);
        message(p, `You Win`, `good`);
        document.getElementById(`player-area-p${p}`).style.animationName = 'wiggle';
    }
    totalRounds = numRounds;
    numRounds = 0;
}

btnHitP1.onclick = () => goHit(1);
btnHitP2.onclick = () => goHit(2);
btnHealP1.onclick = () => goHeal(1);
btnHealP2.onclick = () => goHeal(2);
btnYieldP1.onclick = () => goYield(1, true);
btnYieldP2.onclick = () => goYield(2, true);



function continuePlay(p) {
    if (p == 1) {
        if (!restartP1) {
            let approveCh = inputCharacter(1, true);
            if (approveCh) {
                createCharacter(1);
                numPlayers++;
                // console.log(`numPlayers = ${numPlayers}`);
                curLifeP1.value = player1.currenthealth;
                curLifeP1.max = player1.maxHealth;
                curLifeTextP1.innerHTML = `${player1.currenthealth} / ${player1.maxHealth}`;
                if (numPlayers == 2) {
                    getTurn();
                }
                restartP1 = 1;
            }
        } else {
            approveCh = inputCharacter(1, false);
            restartP1 = 0;
        }
    } else if (p == 2) {
        if (!restartP2) {
            let approveCh = inputCharacter(2, true);
            if (approveCh) {
                createCharacter(2);
                numPlayers++;
                // console.log(`numPlayers = ${numPlayers}`);
                curLifeP2.value = player2.currenthealth;
                curLifeP2.max = player2.maxHealth;
                curLifeTextP2.innerHTML = `${player2.currenthealth} / ${player2.maxHealth}`;
                if (numPlayers == 2) {
                    getTurn();
                }
                restartP2 = 1;
            }
        } else {
            approveCh = inputCharacter(2, false);
            restartP2 = 0;
        }
    }
};

document.getElementById("continue-p1").onclick = () => continuePlay(1);
document.getElementById("continue-p2").onclick = () => continuePlay(2);

getInputRaceP1.addEventListener("change", () => changeBgRace(1));
getInputRaceP2.addEventListener("change", () => changeBgRace(2));

function changeBgItem(p) {
    const imgP = document.getElementById(`item-p${p}`);
    const getInputItem = document.getElementById(`drop-p${p}-item`);
    switch (getInputItem.value) {
        case 'boots':
            imgP.style.backgroundImage = "url('../images/boots.png')";
            break;
        case 'staff':
            imgP.style.backgroundImage = "url('../images/staff.png')";
            break;
        case 'sword':
            imgP.style.backgroundImage = "url('../images/sword.png')";
            break;
        case 'bow':
            imgP.style.backgroundImage = "url('../images/bow.png')";
            break;
        default:
            break;
    }
}
getInputItemP1.addEventListener("change", () => changeBgItem(1));
getInputItemP2.addEventListener("change", () => changeBgItem(2));

function removeStartScreen(p, isCPU) {
    const cpu = isCPU;
    const startPlayer = document.getElementById(`start-p${p}`);
    const playerArea = document.getElementById(`player-area-p${p}`);
    startPlayer.classList.add('disable');
    playerArea.classList.remove('disable');
    if (cpu) {
        setTimeout(() => {
            //Add Name section
            const names = ["Youssef", "Mike", "Katinda", "Guillaume", "Jann", "Sagingali", "Adriana", "Simon", "Gonçalo", "Nicolas", "Alexandre", "Yuliya", "Nathalie", "Frances", "Mehmet", "Jorge", "Etienne", "Paulo", "François", "Marcelo", "Sylvain", "Gabriela", "Robbert", "Sara", "Marc", "Christian", "Pauline", "Thomas", "Gael"];
            let cpuName = names[Math.floor(Math.random() * names.length)];
            document.getElementById(`input-p${p}-name`).value = cpuName;
            //End Name section
        }, 1500);
        setTimeout(() => {
            //Add Race section
            const races = ["human", "orc", "elf", "vampire"];
            let raceName = races[Math.floor(Math.random() * races.length)];
            document.getElementById(`drop-p${p}-race`).value = raceName;
            changeBgRace(p);
            //End Race section
        }, 2000);
        setTimeout(() => {
            //Add Item section
            const items = ["boots", "staff", "sword", "bow"];
            let itemName = items[Math.floor(Math.random() * items.length)];
            document.getElementById(`drop-p${p}-item`).value = itemName;
            changeBgItem(p);
            //End Item section
        }, 2500);
        setTimeout(() => {
            p == 1 ? isCpuP1 = true : isCpuP2 = true;
            continuePlay(p);
        }, 3500);
    }
}

getStartP1.onclick = () => removeStartScreen(1, false);
getStartP2.onclick = () => removeStartScreen(2, false);
getStartCpuP1.onclick = () => removeStartScreen(1, true);
getStartCpuP2.onclick = () => removeStartScreen(2, true);


function cpuStrategie(p) {
    let rand = Math.random();
    let player;
    p == 1 ? player = player1 : player = player2;
    if (player.currenthealth > 20) {
        if (rand > 0.1) {
            goHit(p);
        } else {
            if (player.currenthealth < player.maxHealth) {
                goHeal(p);
            } else {
                goHit(p);
            }
        }
    } else {
        if (rand > 0.7) {
            goHit(p);
        } else {
            goHeal(p);
        }
    }
}

function getTurn() {
    let log;
    if (turnStat == 0) {
        let rand = Math.floor(Math.random() * Math.floor(2)) + 1;
        turnStat = rand;
    }
    if (turnStat == 1) {
        btnHitP1.classList.add('greyed');
        btnHealP1.classList.add('greyed');
        btnYieldP1.classList.add('greyed');

        btnHitP2.classList.remove('greyed');
        if (checkIfmaxHeal(2)) {
            btnHealP2.classList.add('greyed');
        } else {
            btnHealP2.classList.remove('greyed');
        }
        btnYieldP2.classList.remove('greyed');
        turnStat = 2;
    } else {
        btnHitP1.classList.remove('greyed');
        if (checkIfmaxHeal(1)) {
            btnHealP1.classList.add('greyed');
        } else {
            btnHealP1.classList.remove('greyed');
        }
        btnYieldP1.classList.remove('greyed');

        btnHitP2.classList.add('greyed');
        btnHealP2.classList.add('greyed');
        btnYieldP2.classList.add('greyed');
        turnStat = 1;
    }
    updateLifeBar();
    checkMinHealth();
    if (player1.currenthealth > 0 && player2.currenthealth > 0) {

        if (turnStat == 1) {
            document.getElementById(`player-area-p1`).style.borderColor = '#c1cf84';
            document.getElementById(`player-area-p2`).style.borderColor = 'initial';
            document.getElementById("p1-image").style.filter = "unset";
            document.getElementById("p2-image").style.filter = "grayscale(100%) brightness(65%)";

            if (player1.race == 'vampire') {
                log = player2.lifeSteal(player1);
                message(1, log[1], 'vampire');
            }


        } else {
            document.getElementById(`player-area-p2`).style.borderColor = '#c1cf84';
            document.getElementById(`player-area-p1`).style.borderColor = 'initial';
            document.getElementById("p2-image").style.filter = "unset";
            document.getElementById("p1-image").style.filter = "grayscale(100%) brightness(65%)";

            if (player2.race == 'vampire') {
                log = player1.lifeSteal(player2);
                message(2, log[1], 'vampire');
            }
        }
        setTimeout(function () {
            document.getElementById(`player-area-p1`).style.animationName = 'none';
            document.getElementById(`player-area-p2`).style.animationName = 'none';

            numRounds++;
            updateLifeBar();
            checkMinHealth();
            // console.log(`\n %c Round n° ${numRounds} | side: ${turnStat}`, `background: #42f551; color: #191c19`);

            if (turnStat == 1 && isCpuP1 == true) setTimeout(() => {
                cpuStrategie(1)
            }, 2000);
            if (turnStat == 2 && isCpuP2 == true) setTimeout(() => {
                cpuStrategie(2)
            }, 2000);
        }, 2000);
    }

}