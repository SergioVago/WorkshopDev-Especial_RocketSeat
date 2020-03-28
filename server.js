// Usei o express para criar e configurar meu servidor
const express = require("express");
const server = express();

const db = require('./db')

// const ideas = [
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
//     title: "Karaoke",
//     categody: "Diversão em Família",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quisquam voluptatibus recusandae",
//     url: "https://rocketseat.com.br"
//   },
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
//     title: "Pintura",
//     categody: "Criatividade",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quisquam voluptatibus recusandae",
//     url: "https://rocketseat.com.br"
//   },
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729048.svg",
//     title: "Recortes",
//     categody: "Criatividaded",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quisquam voluptatibus recusandae",
//     url: "https://rocketseat.com.br"
//   },
// ]

// Configurar arquivos estáticos
server.use(express.static("public"))

// habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

// Configuracao do nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('views', {
  express: server,
  noCache: true,
})

// Criei uma rota /
// e capturo ao pedido do cliente para responser
server.get('/', (req, res) => {
  // Consultar dados na tabela
  db.all(`
    SELECT
      *
    FROM
      ideas
  `, function (err, rows) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }

    const reversedIdeas = [...rows].reverse()
    // console.log(reversedIdeas)

    const lastIdeas = []
    for (let idea of reversedIdeas) {
      if (lastIdeas.length < 2) {
        lastIdeas.push(idea)
      }
    }

    return res.render('index.html', { ideas: lastIdeas })
  })
})

server.get('/ideas', (req, res) => {
  db.all(`
  SELECT
    *
  FROM
    ideas
`, function (err, rows) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }

    const reversedIdeias = [...rows].reverse()

    return res.render('ideas.html', { ideas: reversedIdeias })
  })
})

server.post('/ideas', (req, res) => {
  // Inserir dados na tabela
  const query = `
    INSERT INTO ideas( 
      image,
      title,
      category,
      description,
      link
    ) VALUES (?,?,?,?,?);
    `

  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link,
  ]

  db.run(query, values, function (err) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }

    return res.redirect('/ideas')
  })
})


// Liguei meu servidor na porta 3000
server.listen(3000)