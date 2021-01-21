//Window with game
const cvs = document.getElementById('canvas')
const ctx = cvs.getContext('2d')

// Main objects
const bird = new Image()
const background = new Image()
const foreground = new Image()
const pipeUp = new Image()
const pipeBottom = new Image()
const fly = new Audio()
const scoreSound = new Audio()

// Files
bird.src = 'img/flappy_bird_bird.png'
background.src = 'img/flappy_bird_bg.png'
foreground.src = 'img/flappy_bird_fg.png'
pipeUp.src = 'img/flappy_bird_pipeUp.png'
pipeBottom.src = 'img/flappy_bird_pipeBottom.png'

// Sounds
fly.src = 'sounds/fly.mp3'
scoreSound.src = 'sounds/score.mp3'

// Bird position
let xPosition = 10
let yPosition = 150
let score = 0

// Constants
const gap = 90
const gravitation = 1.5

// Mouse click event
document.addEventListener('click', () => {
    yPosition -= 25
    fly.play()
})

// Pipes array
let pipes = []
pipes[0] = {
    x: cvs.width,
    y: 0
}

// Main function
const draw = () => {

    ctx.drawImage(background, 0, 0)

    for(const pipe of pipes){
        ctx.drawImage(pipeUp, pipe.x, pipe.y) // Top pipe drawing
        ctx.drawImage(pipeBottom, pipe.x, pipe.y  + pipeUp.height + gap) // Bottom pipe drawing
        pipe.x--

        // Spawn pipes
        if(pipe.x === 120) {
            pipes.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            })
        }

        // End game condition
        if(xPosition + bird.width >= pipe.x
            && xPosition <= pipe.x  + pipeUp.width
            && (yPosition <= pipe.y + pipeUp.height
                || yPosition + bird.height >= pipe.y + pipeUp.height + gap)
            || yPosition + bird.height >= cvs.height - foreground.height) {
            location.reload()
        }
        // Score condition
        if(pipe.x === 5){
            score++
            scoreSound.play()
        }
    }
    ctx.drawImage(foreground, 0, cvs.height - foreground.height) // Foreground drawing
    ctx.drawImage(bird, xPosition, yPosition) // Bird drawing

    yPosition += gravitation

    // Score text
    ctx.fillStyle = 'black'
    ctx.font = '20px Verdana'
    ctx.fillText('Счёт: ' + score, 10, cvs.height - 20)

    // Animation
    requestAnimationFrame(draw)
}
// Call main func
pipeBottom.onload = draw()


