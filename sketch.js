//Variáveis
let lixos = [];
let lixeiras = [];
let pontuacao = 0;
let lixoSelecionado = null;

let imgBanana, imgGarrafa, imgJornal;
let imgLixeiraOrganico, imgLixeiraPlastico, imgLixeiraPapel;
let imgCenario;

function preload() {
  imgBanana = loadImage('banana.png');
  imgGarrafa = loadImage('garrafa.png');
  imgJornal = loadImage('jornal.png');

  imgLixeiraOrganico = loadImage('lixeira_organica.png');
  imgLixeiraPlastico = loadImage('lixeira_plastico.png');
  imgLixeiraPapel = loadImage('lixeira_papel.png');

  imgCenario = loadImage('cenario.png'); // Carrega o fundo
}

function setup() {
  createCanvas(800, 600);
  textSize(18);

  lixeiras.push(new Lixeira(100, 500, "Orgânico", imgLixeiraOrganico));
  lixeiras.push(new Lixeira(350, 500, "Plástico", imgLixeiraPlastico));
  lixeiras.push(new Lixeira(600, 500, "Papel", imgLixeiraPapel));

  lixos.push(new Lixo("Banana", "Orgânico", 150, 150, imgBanana));
  lixos.push(new Lixo("Garrafa", "Plástico", 350, 150, imgGarrafa));
  lixos.push(new Lixo("Jornal", "Papel", 550, 150, imgJornal));
}

function draw() {
  background(240);

  // Exibe o cenário como plano de fundo
  image(imgCenario, 0, 0, width, height);

  fill(0);
  text("Pontuação: " + pontuacao, 10, 20);

  for (let lixeira of lixeiras) {
    lixeira.mostrar();
  }

  for (let lixo of lixos) {
    lixo.mostrar();
  }

  if (lixos.every(l => l.coletado)) {
    textSize(32);
    fill(0, 150, 0);
    textAlign(CENTER);
    text("Parabéns! Você reciclou tudo!", width / 2, height / 2);
  }
}

// As demais funções e classes permanecem iguais...
function mousePressed() {
  for (let lixo of lixos) {
    if (lixo.verificaClique(mouseX, mouseY)) {
      lixoSelecionado = lixo;
      break;
    }
  }
}

function mouseDragged() {
  if (lixoSelecionado) {
    lixoSelecionado.x = mouseX - lixoSelecionado.tamanho / 2;
    lixoSelecionado.y = mouseY - lixoSelecionado.tamanho / 2;
  }
}

function mouseReleased() {
  if (lixoSelecionado) {
    for (let lixeira of lixeiras) {
      if (lixeira.verificaDentro(lixoSelecionado)) {
        if (lixoSelecionado.tipo === lixeira.tipo) {
          pontuacao += 10;
          lixoSelecionado.coletado = true;
        } else {
          pontuacao -= 5;
        }
        break;
      }
    }
    lixoSelecionado = null;
  }
}

class Lixo {
  constructor(nome, tipo, x, y, img) {
    this.nome = nome;
    this.tipo = tipo;
    this.x = x;
    this.y = y;
    this.tamanho = 50;
    this.coletado = false;
    this.img = img;
  }

  mostrar() {
    if (!this.coletado) {
      image(this.img, this.x, this.y, this.tamanho, this.tamanho);
    }
  }

  verificaClique(px, py) {
    return !this.coletado &&
           px > this.x && px < this.x + this.tamanho &&
           py > this.y && py < this.y + this.tamanho;
  }
}

class Lixeira {
  constructor(x, y, tipo, img) {
    this.x = x;
    this.y = y;
    this.tipo = tipo;
    this.largura = 100;
    this.altura = 80;
    this.img = img;
  }

  mostrar() {
    image(this.img, this.x, this.y, this.largura, this.altura);
    fill(0);
    textAlign(CENTER, CENTER);
    text(this.tipo, this.x + this.largura / 2, this.y + this.altura + 20);
  }

  verificaDentro(lixo) {
    return lixo.x + lixo.tamanho / 2 > this.x &&
           lixo.x + lixo.tamanho / 2 < this.x + this.largura &&
           lixo.y + lixo.tamanho / 2 > this.y &&
           lixo.y + lixo.tamanho / 2 < this.y + this.altura;
  }
}
