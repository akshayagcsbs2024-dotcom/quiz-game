const quiz = [
  {question:"What is my favorite place?",options:["Mall","Beach","Park","Home"],answer:1},
  {question:"Favorite food?",options:["Pizza","Burger","Biryani","Pasta"],answer:2},
  {question:"Favorite ice cream?",options:["Chocolate","Vanilla","Strawberry","Butterscotch"],answer:3},
  {question:"When am I happiest?",options:["Alone","Studying","With friends vibe","Sleeping"],answer:2},
  {question:"Favorite genre?",options:["Romance","Comedy","Horror & Thriller","Action"],answer:2},
  {question:"My full name?",options:["Akshaya.R","Akshi","Akshaya.G","Akshu"],answer:2},
  {question:"Favorite cricketer?",options:["Kohli","Dhoni","Rohit","Pandya"],answer:1},
  {question:"My group behavior?",options:["Talkative","Silent observer","Funny","Leader"],answer:1},
  {question:"Music type?",options:["Classical","Melody","Rap","Rock"],answer:1},
  {question:"Free time?",options:["Reading","Scrolling","Watching series","Sleeping"],answer:2}
];

let current=0, score=0;

function startQuiz(){
  document.getElementById("welcome-screen").style.display="none";
  document.getElementById("quiz-box").style.display="block";
  loadQuestion();
}

function loadQuestion(){
  document.getElementById("result").innerText="";
  document.getElementById("question").innerText=quiz[current].question;

  document.querySelectorAll("#answers button").forEach((btn,i)=>{
    btn.innerText=quiz[current].options[i];
  });
}

function checkAnswer(i){
  if(i===quiz[current].answer){
    score++;
    document.getElementById("result").innerText="Correct!";
    blast(80);
    playBoom();
  } else {
    document.getElementById("result").innerText="Wrong!";
  }

  current++;
  if(current<quiz.length){
    setTimeout(loadQuestion,700);
  } else {
    showResult();
  }
}

function showResult(){
  let msg="";

  if(score>=8){
    msg="Besties ❤️";
    blast(250);
    playBoom();
  } else if(score>=4){
    msg="Friends 🙂";
    flowerBlast();
    playBoom();
  } else {
    msg="Stranger 😐";
  }

  document.getElementById("question").innerText="Quiz Finished!";
  document.getElementById("answers").style.display="none";
  document.getElementById("result").innerText=msg;
  document.getElementById("score").innerText="Score: "+score+"/10";
  document.getElementById("shareBtn").style.display="block";
}

/* 🔊 SOUND */
function playBoom(){
  const sound=document.getElementById("boomSound");
  sound.currentTime=0;
  sound.play();
}

/* 📲 SHARE */
function shareScore(){
  const text=`I scored ${score}/10 in this quiz 😎🔥\nTry it here: ${window.location.href}`;

  if(navigator.share){
    navigator.share({
      title:"Friend Quiz",
      text:text,
      url:window.location.href
    });
  } else {
    navigator.clipboard.writeText(text);
    alert("Score copied! Share it 😎");
  }
}

/* 💥 PARTICLES */
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
canvas.width=innerWidth;
canvas.height=innerHeight;

let particles=[];

function blast(count){
  for(let i=0;i<count;i++){
    particles.push({
      x:canvas.width/2,
      y:canvas.height/2,
      size:Math.random()*6+2,
      speedX:(Math.random()-0.5)*12,
      speedY:(Math.random()-0.5)*12,
      color:`hsl(${Math.random()*360},100%,50%)`
    });
  }
}

function flowerBlast(){
  for(let i=0;i<150;i++){
    particles.push({
      x:canvas.width/2,
      y:canvas.height/2,
      size:Math.random()*5+2,
      speedX:(Math.random()-0.5)*8,
      speedY:(Math.random()-0.5)*8,
      color:"pink"
    });
  }
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach((p,index)=>{
    p.x+=p.speedX;
    p.y+=p.speedY;
    p.size*=0.96;

    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fillStyle=p.color;
    ctx.fill();

    if(p.size<0.5){
      particles.splice(index,1);
    }
  });

  requestAnimationFrame(animate);
}

animate();
