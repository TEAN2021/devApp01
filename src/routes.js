const { json } = require('express');
const express = require('express');
const router = express.Router();
const DB = require('./times');

//Lista todos os times
router.get('/times', (req, res) => {
	return res.json(DB.times);
});

//Busca time por nome
router.get('/times/:nome', (req, res) => {
	const nome = req.params.nome;
	const time = DB.times.find((c) => c.nome == nome);
	if (time != undefined) {
		res.status(200).json(time);
	} else {
		res.status(404).json({ msg: 'Time não existe.' });
	}
});

//Insere novo time
router.post('/inserirTime', (req, res) => {
	const { nome, cidade, estado, serie, titulos, folhaPagamento } = req.body;
	if (nome && cidade && estado && titulos && folhaPagamento != undefined) {
		const id = DB.times.length + 1;
		DB.times.push({
			id,
			nome,
			cidade,
			estado,
			serie,
			titulos,
			folhaPagamento,
		});
		return res.json({ msg: 'Time incluido com sucesso!' });
	} else {
		return res.status(400).json({ msg: 'Dados obrigatórios não informados.' });
	}
});

//Remove time por id
router.delete('/times/:id', (req, res) => {
	if (isNaN(req.params.id)) {
		return res.sendStatus(400);
	} else {
		const id = parseInt(req.params.id);
		const index = DB.times.findIndex((element) => element.id === id);
		if (index === -1) {
			return res.status(404).json({ msg: 'Time não encontrado!' });
		} else {
			DB.times.splice(index, 1);
			return res.json({ msg: 'Time excluido!' });
		}
	}
});

//Modifica time por id
router.put('/time/:id', (req, res) => {
	if (isNaN(req.params.id)) {
		res.sendStatus(400);
	} else {
		const id = parseInt(req.params.id);
		const time = DB.times.find((elemento) => elemento.id == id);
		if (time) {
			const { nome, cidade, estado, serie, titulos, folhaPagamento } = req.body;

			if (nome) time.nome = nome;
			if (cidade) time.cidade = cidade;
			if (estado) time.estado = estado;
			if (serie) time.serie = serie;
			if (titulos) time.titulos = titulos;
			if (folhaPagamento) time.folhaPagamento = folhaPagamento;
			res.status(200).json(time);
		} else {
			res.status(404).json({ msg: 'Time não existe.' });
		}
	}
});

module.exports = router;
