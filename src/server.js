const express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
const fileName = {
    name: 'pub',
    val: 0,
    filename: null,
    definirFileName(extension){
        this.val++
        this.filename = this.name + this.val + '.' + extension
        return this.filename
    }
}

app.use(express.static(__dirname))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))


const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, __dirname + '/userfiles')
    },
    filename: function (req, file, callback){
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.') + 1).toLowerCase()
        callback(null, `${fileName.definirFileName(extension)}`)
    }
})
const upload = multer({storage})

app.post('/publicar', upload.single('imagem'), (req, res) =>{
    const dados = {}
    dados.nomeImagem = fileName.filename
    dados.local = req.body.local ? req.body.local : null
    dados.descricao = req.body.descricao ? req.body.descricao : null
    dados.data = new Date().toLocaleDateString().substring(0,10)
    fs.readFile(__dirname + `/userfiles/dados.json`, 'utf-8', (err, data) =>{
        if(err){
            const averiguar = fileName.filename.substring(0, 4) == 'pub1' ? true : false
            if(averiguar){
                const jsondata = []
                jsondata.push(dados)
                fs.writeFile(__dirname + '/userfiles/dados.json', JSON.stringify(jsondata), err =>{
                    console.log(err || 'Arquivo Salvo')
                })
            }
            else{
                console.log(err)
            }
        }
        else{
            const dadosArquivo = JSON.parse(data)
            dadosArquivo.push(dados)
            fs.writeFile(__dirname + '/userfiles/dados.json', JSON.stringify(dadosArquivo), err =>{
                console.log(err || 'Arquivo Salvo')
            })
        }
    })
    res.send()
})

app.get('/feed', (req, res) =>{
    fs.readFile(__dirname + '/userfiles/dados.json', 'utf-8', (err, data)=>{
        if(err)
        res.send()
        res.send(data)
    })
})

app.listen(8080, () => console.log('Executando...'))

