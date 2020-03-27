// Usei o express para criar e configurar meu servidor
const express = require("express");
const server = express();

const ideas = [
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    title: "Cursos de Programação",
    categody: "Estudo",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quisquam voluptatibus recusandae",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
    title: "Exercícios",
    categody: "Saúde",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quisquam voluptatibus recusandae",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
    title: "Meditação",
    categody: "Mentalidade",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quisquam voluptatibus recusandae",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
    title: "Karaoke",
    categody: "Diversão em Família",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quisquam voluptatibus recusandae",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
    title: "Pintura",
    categody: "Criatividade",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quisquam voluptatibus recusandae",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729048.svg",
    title: "Recortes",
    categody: "Criatividaded",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quisquam voluptatibus recusandae",
    url: "https://rocketseat.com.br"
  },
]

// Configurar arquivos estáticos
server.use(express.static("public"))


// Configuracao do nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('views', {
  express: server,
  noCache: true,
})

// Criei uma rota /
// e capturo ao pedido do cliente para responser
server.get('/', (req, res) => {

  const reversedIdeas = [...ideas].reverse()

  const lastIdeas = []
  for (let idea of reversedIdeas) {
    if (lastIdeas.length < 2) {
      lastIdeas.push(idea)
    }
  }

  return res.render('index.html', { ideas: lastIdeas })
})

server.get('/ideas', (req, res) => {
  const reversedIdeias = [...ideas].reverse()


  return res.render('ideas.html', { ideas: reversedIdeias })
})


// Liguei meu servidor na porta 3000
server.listen(3000)