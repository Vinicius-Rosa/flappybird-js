/**
 * Nome: FlappyBird Clone
 * Autor: Vinícius Rosa
 * Data: 21/03/2020
 * 
 * Créditos: Mário Solto - https://www.youtube.com/channel/UCzR2u5RWXWjUh7CwLSvbitA
 * 
 * Continuação: https://youtu.be/0ArCFchlTq4?t=1992
 */

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// AUX VARS AND CONSTS
let frames = 0;

function existCollision(flappyBird, floor){
    if (flappyBird.y + flappyBird.altura >= floor.y) {
        return true
    }
}

// CLONEBIRD
const flappyBird = {
    // srcX: 0,
    // srcY: 0,
    animation: [
        { srcX: 0, srcY: 0 },
        { srcX: 0, srcY: 26 },
        { srcX: 0, srcY: 52 },
        { srcX: 0, srcY: 26 },
    ],
    largura: 33,
    altura: 24,
    x: 50,
    y: 150,
    gravidade: 0.25,
    velocidade: 0,
    frame: frames,
    pulo: 5.4,

    updateValue(){
        if (existCollision(flappyBird, floor)) {
            changeState(state.over)
            return false;
        }

        this.velocidade = this.velocidade + this.gravidade
        this.y = this.y + this.velocidade;
    },

    draw(){
        let bird = this.animation[this.frame]
        
        ctx.drawImage(
            sprites,
            bird.srcX, bird.srcY, //Ponto de inicialização da leitura do sprite
            this.largura, this.altura, //Tamanho do recorte a partir do ponto definido
            this.x, this.y, //Ponto de partida pro desenho dentro do canvas
            this.largura, this.altura, //Tamanho da imagem montada no canvas
        );
    },

    flap(){
        // flappyBird.y = 60; 
        console.log(this.velocidade)
        this.velocidade = - this.pulo;
        console.log(this.velocidade)

    }
}

// CHÃO
const floor = {
    srcX: 0,
    srcY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,

    draw(){
        ctx.drawImage(
            sprites,
            this.srcX, this.srcY,
            this.largura, this.altura,
            this.x, this.y,
            this.largura, this.altura,
        );
        ctx.drawImage(
            sprites,
            this.srcX, this.srcY,
            this.largura, this.altura,
            (this.x + this.largura), this.y,
            this.largura, this.altura,
        );
    }
}

// PLANO DE FUNDO
const background = {
    srcX: 390,
    srcY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,

    draw(){
        ctx.fillStyle = '#70c5ce';
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.drawImage(
            sprites,
            this.srcX, this.srcY,
            this.largura, this.altura,
            this.x, this.y,
            this.largura, this.altura,
        );
        ctx.drawImage(
            sprites,
            this.srcX, this.srcY,
            this.largura, this.altura,
            (this.x + this.largura), this.y,
            this.largura, this.altura,
        );
    }
}

// TELA INICIO
const getReady = {
    srcX: 134,
    srcY: 0,
    largura: 174,
    altura: 152,
    // x: (canvas.width/2) - 174/2,
    x: (canvas.width/2) - 174/2,
    y: (canvas.height/2) -152,

    draw(){
        ctx.drawImage(
            sprites,
            this.srcX, this.srcY,
            this.largura, this.altura,
            this.x, this.y,
            this.largura, this.altura,
        );
        
    }
}

const gameOver = {
    srcX: 134,
    srcY: 153,
    largura: 227,
    altura: 200,
    x: (canvas.width/2) - 227/2,
    y: (canvas.height/2) - 200/2,

    draw(){
        ctx.drawImage(
            sprites,
            this.srcX, this.srcY,
            this.largura, this.altura,
            this.x, this.y,
            this.largura, this.altura,
        );
        
    }
}

// TELAS
let currentScreen = {};
function changeState(newState){
    currentState = newState;
};

const state = {
    start: {
        draw(){
            background.draw();
            floor.draw();
            flappyBird.draw();
            getReady.draw();
        },

        click(){
            changeState(state.game);
        },

        updateValue(){

        }
    },

    game: {
        draw(){
            background.draw();
            floor.draw();
            flappyBird.draw();
        },
        
        click(){
            flappyBird.flap();
            
        },
        
        updateValue(){
            flappyBird.updateValue();
        }
    },
    
    over: {
        draw(){
            background.draw();
            floor.draw();
            flappyBird.draw();
            gameOver.draw();
        },
        
        click(){
            // changeState(state.start);
            window.location.reload();
        },

        updateValue(){

        }

    }
}

function loop(){
    currentState.updateValue();
    currentState.draw();
    frames++;
    
    requestAnimationFrame(loop); //Performance de animação
}

canvas.addEventListener('click', function(){
    if (currentState.click) {
        currentState.click();
    }
})

changeState(state.start);
loop();