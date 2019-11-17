let express = require('express');
let router = express.Router();
let request = require('request');
let dobby_path = require('path').join(__dirname, "../kr_dobby/index");
let wiki_path = require('path').join(__dirname, "../kr_wiki/index");
let Dobby = require(dobby_path);
let Wiki = require(wiki_path);

router.post('/dobby', (req, res) => {
    let query = req.body.query;
    const options = {
        uri:'http://127.0.0.1:5000/nouns',
        method: 'POST',
        form: {
            query:query,
        }
    }

    request(options, function (error, response, body) {
        let nouns = response.body;
        nouns = nouns.split(' ');

        let dobby = new Dobby();
        dobby.ask(nouns)
        .then((dobby_res)=>{
            const answer = dobby_res[0];
            const accuracy = dobby_res[1];
            console.log({question:query, answer:answer, accuracy:accuracy});
            res.send({answer:answer});
        });
    });
});

router.post('/wiki', (req, res) => {
    console.log({question:req.body.query});
    let query = req.body.query;
    const options = {
        uri:'http://127.0.0.1:5000/wiki',
        method: 'POST',
        form: {
            query:query,
        }
    }

    request(options, function (error, response, body) {
        const answer = response.body;
        console.log({question:query, answer:answer, accuracy:0});
        res.send({answer:answer});
    });
});

router.post('/seq2seq', (req, res) => {
    let query = req.body.query;
    const options = {
        uri:'http://127.0.0.1:5000/seq2seq',
        method: 'POST',
        form: {
            query:query,
        }
    }

    request(options, function (error, response, body) {
        const answer = response.body;
        console.log({question:query, answer:answer, accuracy:0});
        res.send({answer:answer});
    });
});

module.exports = router;
