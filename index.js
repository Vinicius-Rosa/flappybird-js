/**
 * Nome: FlappyBird Clone
 * Autor: Vinícius Rosa
 * Data: 21/03/2020
 * 
 * Créditos: Mário Solto - https://www.youtube.com/channel/UCzR2u5RWXWjUh7CwLSvbitA
 */

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// CLONEBIRD
const flappyBird = {
    srcX: 0,
    srcY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,

    updateValue(){
        this.velocidade = this.velocidade + this.gravidade
        this.y = this.y + this.velocidade;
    },

    draw(){
        ctx.drawImage(
            sprites,
            this.srcX, this.srcY, //Ponto de inicialização da leitura do sprite
            this.largura, this.altura, //Tamanho do recorte a partir do ponto definido
            this.x, this.y, //Ponto de partida pro desenho dentro do canvas
            this.largura, this.altura, //Tamanho da imagem montada no canvas
        );
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
    x: (canvas.width/2) - 174/2,
    y: (canvas.height/2) - 152/2,

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
function changeScreen(newScreen){
    currentScreen = newScreen;
};

const screens = {
    start: {
        draw(){
            background.draw();
            floor.draw();
            flappyBird.draw();
            getReady.draw();
        },

        click(){
            changeScreen(screens.play);
        },

        updateValue(){

        }
    },

    play: {
        draw(){
            background.draw();
            floor.draw();
            flappyBird.draw();
        },

        updateValue(){
            flappyBird.updateValue();
        }
    },
}

function loop(){
    currentScreen.updateValue();
    currentScreen.draw();
    
    requestAnimationFrame(loop); //Performance de animação
}

window.addEventListener('click', function(){
    if (currentScreen.click) {
        currentScreen.click();
    }
})

changeScreen(screens.start);
loop();