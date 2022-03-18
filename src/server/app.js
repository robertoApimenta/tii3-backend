const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); //////////////////////////////

const Projeto = require('../models/Projeto');

const PORT = 8080;

app.use(express.json());
app.use(cors());  //////////////////////////////////////////

mongoose.connect('mongodb://localhost:27017/projeto')
    .then(() => {
        console.log('Banco UP');
    })
    .catch((err) => {
        console.log('Banco DOWN', err);
    })

app.get('/', (req, res) => {
    return res.send('Minha primeira rota');
});

app.post('/novo-projeto', async (req, res) => {
    const dados = req.body;
    await Projeto.create(dados).then((projeto) => {
        return res.json({
            msg: 'Projeto cadastrado com sucesso.',
            projeto,
        });
    }).catch((err) => {
        return res.json({
            msg: 'Erro ao cadastrar projeto',
            err,
        });
    });
});

app.get('/listar-projetos', async (req, res) => {
    const dados = await Projeto.find();
    return res.json({
        dados,
    });
});

app.delete('/deletarProjeto/:id', async (req, res) => {
    const { id } = req.params;
    const _id = id;
    await Projeto.findByIdAndDelete(_id).then((deletado) => {
        return res.json({
            deletado,
        });
    }).catch((err) => {
        return res.json({
            err,
        });
    });
});

app.listen(PORT, () => {
    console.log('Servidor rodando na porta ' + PORT);
});