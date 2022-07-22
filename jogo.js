console.log ('[DevMatheus] Flappy Bird');

let frames = 0;
//-------------------------------------------------------------------------------------------------------------------------------------
const somDe_urso = new Audio ();                            // audio
somDe_urso.src = 'PDF/acaralho.mp3'

const somDe_delicia = new Audio();
somDe_delicia.src ='PDF/ai.mp3'
//-------------------------------------------------------------------------------------------------------------------------------------
const sprites = new Image();
sprites.src = 'sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

                                                                                
 
 //-----------------------------------------------------------------------------------------------------------------------------------
const planoDefundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 274,
    altura: 204,
    x: 0,                                                                   ////Plano de fundo
    y: canvas.height - 204,
    desenha() {
        contexto.fillStyle = '#70c5ce'      // cor do fundo
        contexto.fillRect (0,0, canvas.width, canvas.height) // a ocupação da cor do fundo

        contexto.drawImage(
        sprites,
        planoDefundo.spriteX, planoDefundo.spriteY,
        planoDefundo.largura, planoDefundo.altura,
        planoDefundo.x, planoDefundo.y,
        planoDefundo.largura, planoDefundo.altura,
        );

        contexto.drawImage(
            sprites,
            planoDefundo.spriteX, planoDefundo.spriteY,
            planoDefundo.largura, planoDefundo.altura,
            (planoDefundo.x + planoDefundo.largura), planoDefundo.y,
            planoDefundo.largura, planoDefundo.altura,
            );
    },
};
//-----------------------------------------------------------------------------------------------------------------------------------

function criarChao (){
    const chao = {
        spriteX: 0,
        spriteY: 610,                       // coordenadas da imagem que estamos estraindo
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza(){
                const movimentoDoChao = 1;
                const repeteEm = chao.largura /2;
                const movimentacao = chao.x -=  movimentoDoChao;

                chao.x = movimentacao % repeteEm;
                

        },
        desenha() {
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,                                                     //chao
                chao.largura, chao.altura,
                chao.x , chao.y,
                chao.largura, chao.altura,
            );
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                (chao.x + chao.largura)  , chao.y,
                chao.largura, chao.altura,
            );
        },
    };

    return chao;
}



//-------------------------------------------------------------------------------------------------------------------------------------
function fazcolisao(FlappyBird, chao){
    const FlappyBirdY = FlappyBird.y + FlappyBird.altura;
    const chaoY = chao.y;

    if(FlappyBirdY >= chaoY){                                       //colisao e reinicialização do FlappyBird
        return true;
    }
        return false;
}
//------------------------------------------------------------------------------------------------------------------------------------ 

//-------------------------------------------------------------------------------------------------------------------------------------
function criarFlappyBird (){
    
const FlappyBird = {

spriteX: 0,
spriteY: 0,                                                                     //é o corpo do flappybird
largura: 33,
altura: 24,
x: 30,  // a posição que o flappybird vai ficar X
y: 100,     // posição Y
pulo:3.5,
pula(){
    console.log('devo pular');
    FlappyBird.velocidade = - FlappyBird.pulo;

},
//-----------------------------------------------------------------------------------------------------------------------------------
gravidade: 0.15,      
velocidade: 0,
atualiza(){
    if(fazcolisao(FlappyBird, globais.chao)){
        console.log('fez colisao')                                          //gravidade
        somDe_urso.play();

        setTimeout (() => {

        }, 500);


        mudaParaTela(Telas.INICIO)
        return;
    } 
    //---------------------------------------------------------------------------------------------------------------------------------
    

    FlappyBird.y = FlappyBird.y + FlappyBird.velocidade ;
    FlappyBird.velocidade = FlappyBird.velocidade + FlappyBird.gravidade;                           // colisao

},
movimentos:[
    {spriteX: 0, spriteY: 0,}, //asa pra cima
    {spriteX: 0, spriteY: 26,},//asa no meio
    {spriteX: 0, spriteY: 52,},//asa pra baixo
    {spriteX: 0, spriteY: 26,},//asa no meio
],
frameAtual: 0,
atualizaOFrameAtual(){
        
    const intervaloDeFrames = 10;
    const passouOItervalo = frames % intervaloDeFrames === 0;
    console.log()
    
    if (passouOItervalo){
        const baseDoIncremento = 1;
    const incremento = baseDoIncremento + FlappyBird.frameAtual;
    const baseRepeticao = FlappyBird.movimentos.length;
    FlappyBird.frameAtual = incremento % baseRepeticao
    console.log (incremento);
    }

    
},
//-------------------------------------------------------------------------------------------------------------------------------------
desenha(){
    FlappyBird.atualizaOFrameAtual();
    const {spriteX, spriteY} = FlappyBird.movimentos [FlappyBird.frameAtual]
    contexto.drawImage(
        sprites,
        spriteX, spriteY, //sprite x e sprite y
        FlappyBird.largura, FlappyBird.altura, // tamanho do recorte na sprite
        FlappyBird.x, FlappyBird.y,
        FlappyBird.largura, FlappyBird.altura,
        );
}
}
return FlappyBird;
}
 //----------------------------------------------------------------------------------------------------------------------------------                                                                               

const  mensagemgetready ={

    sX: 134,
    sY: 0,
    w:174,
    h: 152,                                                                                             //TelaInicio
    X: (canvas.width /2) - 174 /2,
    y: 50,
    desenha(){
        contexto.drawImage(
            sprites,
            mensagemgetready.sX, mensagemgetready.sY,
            mensagemgetready.w, mensagemgetready.h,
            mensagemgetready.X, mensagemgetready.y,
            mensagemgetready.w, mensagemgetready.h,
        );
    },
};

//-----------------------------------------------------------------------------------------------------------------------------------// [telas]
function criaCanos(){
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX:52,
            spriteY: 169,
        },
        espaco:80,
        desenha ()
        { 
            canos.pares.forEach(function(par){
                const yRandom = par.y;
                const espacamentoEntreCanos = 100;
    
                const canoCeuX = par.x;
                const canoCeuY = yRandom;

                // [cano do céu]
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
                // [cano do chao]
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )
                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }
            })
        },
        temColisaoComOFlappyBird(par){
            const cabecaDoFlappy = globais.FlappyBird.y;
            const peDoFlappy = globais.FlappyBird.y + globais.FlappyBird.altura;

            if(globais.FlappyBird.x >= par.x){
                console.log('fez colisao')                                          //gravidade

                
            
            if(cabecaDoFlappy <= par.canoCeu.y) {
                somDe_delicia.play();
        
                setTimeout (() => {
        
                }, 500);
    
                return true;
              }
            if(peDoFlappy >= par.canoChao.y) {
                somDe_delicia.play();
        
                setTimeout (() => {
        
                }, 500);
                
                return true;
            }
        }
            return false;
        },

        pares:[],
        atualiza(){
            const passou100Frames = frames % 100 === 0 ;
            if (passou100Frames){
                console.log('passou 100 frames')
                canos.pares.push({
                    
                        x: canvas.width,
                        y: -150 * (Math.random() + 1),
                });
            }

            canos.pares.forEach(function(par){
                par.x = par.x -2

                if (canos.temColisaoComOFlappyBird(par)){
                    console.log('você perdeu')
                    mudaParaTela(Telas.INICIO);
                }

                if(par.x + canos.largura <=0){
                    canos.pares.shift();
                }

            })


        },
    }
    return canos;
}




//---------------------------------------------------------------------------------------------------------------
const globais = {};
let TelaAtiva = {};
function mudaParaTela(novaTela){
    TelaAtiva = novaTela;                                                   //      telas 

    if(TelaAtiva.inicializa){
        TelaAtiva.inicializa();
    }
}

const Telas = {
    INICIO: {
        inicializa() {
            globais.FlappyBird = criarFlappyBird();  
            globais.chao = criarChao();
            globais.canos = criaCanos ();
        },
        desenha() {
            planoDefundo.desenha ();  
            globais.chao.desenha ();
            globais.canos.desenha();
            
            globais.FlappyBird.desenha();
            mensagemgetready.desenha();            
        },
        click(){
            mudaParaTela(Telas.JOGO);
        },
        atualiza() {
            globais.chao.atualiza();
            
            
            

        }
    },
};
 //---------------------------------------------------------------------------------------------------------------------------------                                                                                   
Telas.JOGO = {
    desenha() {
        planoDefundo.desenha ();   
        globais.FlappyBird.desenha();
        globais.canos.desenha();
        globais.chao.desenha();

    },
    click(){                                                                                                //telas jogo
        globais.FlappyBird.pula();

    },
    atualiza() {
        globais.FlappyBird.atualiza();
        globais.canos.atualiza();
        globais.chao.atualiza();
        
    }
};

//----------------------------------------------------------------------------------------------------------------------

function loop(){

    TelaAtiva.desenha();
    TelaAtiva.atualiza();
    
    frames = frames + 1;                                                                                                //loop
requestAnimationFrame(loop);
}

window.addEventListener('click', function(){
    if (TelaAtiva.click);{
        TelaAtiva.click();
    }
})

mudaParaTela(Telas.INICIO);
loop();


//---------------------------------------------------------------------------------------------------------------------------------