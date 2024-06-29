const obstacle = document.getElementById('obstacle');
const runner = document.getElementById('runner');

let animationDuration = 3000;
const checkGameOver =() => {
    const ob = obstacle.getBoundingClientRect();
    const run = runner.getBoundingClientRect();
    const xDistance = run.x - ob.x;
    const yDistance = run.y - ob.y;
    const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    if (distance < 80) {
        document.getElementById("gameover").classList.remove('hidden')
        const animation = obstacle.getAnimations()[0];
        animation.pause()
        clearInterval(checkGameInterval);
        
    }
  
}

const jump = ()=>{
    runner.style.transform="translateY(-150px)";
    setTimeout(() => {
        runner.style.transform="translateY(0px)";
    }, 300);
}
document.addEventListener('keydown',(e)=>{
    if(e.key===" " || e.key==="w" || e.key==="W"){
        jump();
    }
})


// obstacle.addEventListener('animationiteration',()=>{
//     // const random = Math.random()*3;
//     animationDuration -=50;
//     obstacle.style.animationDuration =  animationDuration +"ms";
// })

setInterval(()=>{
    animationDuration -=1;
    obstacle.style.animationDuration= animationDuration+"ms";
}
,2000)
const restart =()=>{
    window.location.reload();
}
const checkGameInterval = setInterval(checkGameOver, 200);
