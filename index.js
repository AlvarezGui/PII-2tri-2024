const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

// modelo usuario 
const usuarioSchema = mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
usuarioSchema.plugin(uniqueValidator);
const Usuario = mongoose.model("Usuario", usuarioSchema);

// conectar no banco de dados
async function conectarAoMongo() {
    await mongoose.connect(`mongodb+srv://adm:adm@cluster0.zal5l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
}

// criar conta
app.post('/signup', async (req, res) => {
    try {
        const login = req.body.login;
        const password = req.body.password;
        const senhaCriptografada = await bcrypt.hash(password, 10);
        const usuario = new Usuario({ login: login, password: senhaCriptografada });
        const respMongo = await usuario.save();
        console.log(respMongo);
        res.status(200).end();
    }
    catch (err) {
        console.log(err);
        res.status(409).end();
    }
});

// login
app.post('/login', async (req, res) => {
    // pega os dados que o usuario digitou
    const login = req.body.login;
    const password = req.body.password;

    //verifica se o usuario existe no banco
    const usuarioExiste = await Usuario.findOne({ login: login });
    if (!usuarioExiste) {
        return res.status(401).json({ mensagem: "Login inválido" });
    }

    // se o usuario existe verificamos a senha
    const senhaValida = await bcrypt.compare(password, usuarioExiste.password);
    if (!senhaValida) {
        return res.status(401).json({ mensagem: "Senha inválida" });
    }

    // gerar o token
    const token = jwt.sign(
        { login: login },
        "chave-temporaria",
        { expiresIn: "1h" }
    );
    res.status(200).json({ token: token });
});

app.listen(3000, () => {
    try {
        conectarAoMongo();
        console.log("Server up and running!");
        console.log("Connection ok!");
    }
    catch (err) {
        console.log('Erro de conexão', err);
    }
});