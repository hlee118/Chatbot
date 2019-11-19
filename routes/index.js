let express = require('express');
let router = express.Router();
let request = require('request');

router.post('/dobby', (req, res) => {
    let query = req.body.query;
    const options = {
        uri:'http://127.0.0.1:5000/dobby',
        method: 'POST',
        form: {query:query}
    }

    request(options, function (error, response, body) {
        const answer = response.body;
        console.log({question:query, answer:answer, accuracy:0});
        res.send({answer:answer});
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
