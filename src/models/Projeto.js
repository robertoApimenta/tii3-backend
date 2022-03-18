const mongoose = require('mongoose');

const ProjetoSchema = new mongoose.Schema({
    projeto: {type: String},
    programador: {type: String},
    supervisor: {type: String},
    cargo: {type: String},
    valorHora: {type: String},
    qtdeHora: {type: String},
});

const Projeto = mongoose.model('Projeto', ProjetoSchema);
module.exports = Projeto;