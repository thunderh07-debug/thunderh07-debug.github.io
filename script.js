const board = document.getElementById("board");
const rollBtn = document.getElementById("rollBtn");
const diceResult = document.getElementById("diceResult");
const questionBox = document.getElementById("questionBox");
const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");

let positions = [1,1]; 
let turn = 0;

const questions = [
    {
        q: "ما هي عاصمة مملكة البحرين؟",
        opts: ["المنامة","المحرق","الرفاع"],
        ans: 0
    }
];

function buildBoard(){
    for(let i=100;i>=1;i--){
        let c=document.createElement("div");
        c.className="cell";
        c.textContent=i;
        board.appendChild(c);
    }
}
buildBoard();

function askQuestion(){
    let q = questions[Math.floor(Math.random()*questions.length)];
    questionText.textContent = q.q;
    optionsDiv.innerHTML="";
    q.opts.forEach((o,i)=>{
        let b=document.createElement("button");
        b.textContent=o;
        b.onclick=()=>{ 
            if(i===q.ans) finishTurn(); 
            questionBox.classList.add("hidden");
        };
        optionsDiv.appendChild(b);
    });
    questionBox.classList.remove("hidden");
}

function finishTurn(){
    let cells=document.querySelectorAll(".cell");
    cells.forEach(c=>{ c.querySelectorAll(".player").forEach(p=>p.remove()); });

    positions.forEach((pos, idx)=>{
        let p=document.createElement("div");
        p.className="player p"+(idx+1);
        cells[100-pos].appendChild(p);
    });
}

rollBtn.onclick = ()=>{
    let dice = Math.floor(Math.random()*6)+1;
    diceResult.textContent = "🎲 النتيجة: " + dice;

    positions[turn] += dice;
    if(positions[turn] > 100) positions[turn] = 100;

    askQuestion();
    turn = (turn+1)%2;
    finishTurn();
};
