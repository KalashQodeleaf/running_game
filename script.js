const obstacle = document.getElementById('obstacle');
const obstacle2 = document.getElementById('obstacle2');
const runner = document.getElementById('runner');
const scoreBoard = document.getElementById('score');

let animationDuration = 3000;
let score = 0;
let secondObject = false;
let firstObject = false;
let onJump = false;

const getRandomSec = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(0);
}
const animateObject = (element) => {
    element.animate([
        {
            transform: 'translateX(-1500px)'
        }
    ],
        {
            duration: animationDuration
        })
}
const doAnimation = (element, distence) => {
    animateObject(element)
    element.style.right = -distence + "px";
}
const gameInterval = setInterval(() => {
    if (firstObject) {
        doAnimation(obstacle, 500)
        firstObject = false;
    }
    if (secondObject) {
        doAnimation(obstacle2, 100)

        secondObject = false;
    }
}, animationDuration)



let distanceBetweenElement = (element1, element2) => {
    const ob = element1.getBoundingClientRect();
    const run = element2.getBoundingClientRect();
    const xDistance = run.x - ob.x;
    const yDistance = run.y - ob.y;
    let dis = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

    return dis;
}
const checkGameOver = () => {
    scoreBoard.innerHTML = score;
    score++;
    if(score %100 === 0)
    {
        animationDuration -= 100;
    }
    
    if (distanceBetweenElement(obstacle, runner) < 70 || distanceBetweenElement(obstacle2, runner) < 70) {
        document.getElementById("gameover").classList.remove('hidden')
        obstacle.style.animationPlayState = 'paused'
        clearInterval(gameInterval);
        clearInterval(checkGameInterval);
        clearInterval(objectCome)

    }

}

const jump = () => {
    
    runner.style.transform = "translateY(-150px)";
    setTimeout(() => {
        runner.style.transform = "translateY(0px)";
        
    }, 300);
    setTimeout(() => {
        onJump = false;
    }, 600);
}

document.addEventListener('keydown', (e) => {
    if(onJump)return;
    if (e.key === " " || e.key === "w" || e.key === "W") {
        
        onJump =true;
        jump();
    }
})

const restart = () => {
    window.location.reload();
}
const objectCome = setInterval(() => {
    if (!secondObject && getRandomSec(0, 100) < 40) {

        secondObject = true;
    }
    if (!firstObject && getRandomSec(0, 100) >= 40) {

        firstObject = true;
    }
}, animationDuration);
const checkGameInterval = setInterval(checkGameOver, 50);
() => gameInterval;
() => objectCome;