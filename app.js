const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#FF0000', '#FF1493', '#FF8C00', '#FFFF00', '#FF00FF','#4B0082', '#00FFFF', '#00FA9A', '#00008B' ]
let time = 0;
let score = 0
let circle;

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})
timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('date-time'))
        screens[1].classList.add('up')
     
        startGame()
    }
})

board.addEventListener('click', (event) =>{
    if(event.target.classList.contains('circle')) {
      score++
      event.target.remove()
      createRandomCircle()
    }
})

board.addEventListener('click', () => setColor(circle))
function startGame() {
    setInterval(decreaseTime, 1000)
    setTime(time)
    createRandomCircle()

}
function decreaseTime() {
if (time === 0) {
 finishGame()
} else {
    let currentTime = --time
    if (currentTime<10) {
        currentTime = `0${currentTime}`
    }
    setTime(currentTime)
}
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.remove()
board.innerHTML = `<h1>Счет:<span>${score}</span></h1>`
}

function createRandomCircle() {
 circle = document.createElement('div')
const size = getRandomNumber(10, 60)
const {width, height} = board.getBoundingClientRect()
const x = getRandomNumber(0, width - size )
const y = getRandomNumber(0, height - size )

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${x}px`
    circle.style.left = `${y}px`
    
    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function setColor(element) {
    const color = getRandomColor()
element.style.background = color;
element.style.boxShadow = `0 0 2px ${color}, 0 0 ${color}`
}


function getRandomColor() {
const index = Math.floor(Math.random() * colors.length)
return colors[index]
}


