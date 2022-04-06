

//utility

function getRandomNumber(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

const BOMB_NUMBER = 16;
const bombs = [];
let max_attempt;
let attemps = 0;

//main

let selector = document.getElementById("difficulty");
let btn = document.getElementById("btn");


function stampareGriglia(numerocolonne, nomeClasse){
    let main = document.getElementById("app");
    main.innerHTML = '';
    let row = document.createElement("div");
    row.setAttribute("class", "row justify-content-center align-items-center align-content-center");
    for(let i = 1; i <= numerocolonne; i++){
        let cols = creaColonne(nomeClasse);
        cols.innerHTML = i;
        row.append(cols);
    }
    main.append(row);
}

function creaColonne(classMod){

   let cols = document.createElement("div");
   cols.setAttribute("class", "mycol pointer");
   cols.classList.add(classMod);
   cols.addEventListener('click', coloraCella);
   return cols;
}

function generateBombs(colNumber){


    bombs.length = 0;
    while(bombs.length < BOMB_NUMBER){
        let bombNumber = getRandomNumber(1, colNumber); 
        if(!bombs.includes(bombNumber)){
            bombs.push(bombNumber);
        }
    }
    console.log(bombs);
}

function coloraCella(){

    let num = parseInt(this.innerText);
    attemps++;
    max_attempt = 3;
    console.log(attemps);
    if(attemps <= max_attempt){
        if(bombs.includes(num)){
            gameover();
        }else{
            this.style.backgroundColor = '#6495ed';
        }
    }
    this.classList.remove("pointer");
    this.removeEventListener('click', coloraCella);

    if(attemps == max_attempt){
        gamewin();
        attemps = 0; 
    }

}

function gameover(){
    
    let caselle = document.getElementsByClassName("mycol");
    console.log('leggo caselle', caselle);
    for(let i = 0; i < caselle.length; i++){
        console.log(caselle[i].innerText);
        if(bombs.includes(parseInt(caselle[i].innerText))){
            caselle[i].style.backgroundColor = '#B70000';
            caselle[i].innerHTML = `<img src="img/bomb.png">`;
            caselle[i].removeEventListener('click', coloraCella);
            caselle[i].classList.remove("pointer");
        }
        if(!bombs.includes(parseInt(caselle[i].innerText))){
            caselle[i].removeEventListener('click', coloraCella);
            caselle[i].classList.remove("pointer");
        }
    }
    let main = document.getElementById("app");
    let gamestop = document.createElement("div");
    gamestop.setAttribute("class", "text-center");
    let lose = document.createElement("h1");
    lose.append("Hai Perso!!")
    gamestop.append(lose);
    main.append(gamestop);
}
function gamewin(){
    let main = document.getElementById("app");
    let result = document.createElement("div");
    result.setAttribute("class", "text-center");
    let win = document.createElement("h1");
    let points = document.createElement("h3");
    win.append("Hai Vinto!!")
    points.append(`Hai trovato le ${attemps} celle esatte!`)
    result.append(win, points);
    main.append(result);
    let caselle = document.getElementsByClassName("mycol");
    console.log('leggo caselle', caselle);
    for(let i = 0; i < caselle.length; i++){
        console.log(caselle[i].innerText);
        if(bombs.includes(parseInt(caselle[i].innerText))){
            caselle[i].style.backgroundColor = '#B70000';
            caselle[i].innerHTML = `<img src="img/bomb.png">`;
            caselle[i].removeEventListener('click', coloraCella);
            caselle[i].classList.remove("pointer");
        }
        if(!bombs.includes(parseInt(caselle[i].innerText))){
            caselle[i].removeEventListener('click', coloraCella);
            caselle[i].classList.remove("pointer");
        }
    }
}

btn.addEventListener('click', function(){
    
    let flag = selector.value;
    switch(flag){

        case "easy":
            const easycolNumber = 100;
            const easyclassMod = "easy-width";
            stampareGriglia(easycolNumber, easyclassMod);
            generateBombs(easycolNumber);
        break;

        case "hard":
            const hardcolNumber = 81;
            const hardclassMod = "hard-width";
            stampareGriglia(hardcolNumber, hardclassMod);
            generateBombs(hardcolNumber);
        break;
        
        case "crazy":
            const crazycolNumber = 49;
            const crazyclassMod = "crazy-width";
            stampareGriglia(crazycolNumber, crazyclassMod);
            generateBombs(crazycolNumber);
        break;

    }



})
