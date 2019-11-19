/*
    Made by Hyunsik Lee
    2019-05-01
*/

let db_path = require('path').join(__dirname, "../lib/db.js");
let mysql = require('mysql');
let db_info = require(db_path);
const { exec } = require('child_process');

function max(a, b){
    if(a > b) return a;
    else return b;
}

class Dobby{
    constructor() {
        this.question = new Array();
        this.answers = new Array();
    }

    ask(morphs) {
        return new Promise((resolve)=>{
            // Get data from database
            const connection = mysql.createConnection(db_info);
            const SQLQuery = "SELECT * FROM dobby";
            connection.connect((err)=>{if (err) throw err;});
            connection.query(SQLQuery, function(err, rows, fields) {
                if (err) throw err;
                resolve(rows);
            });
            connection.end();
        })
        .then((rows)=>{
            for(let i=0;i<rows.length;i++){
                this.question.push(rows[i].prep_question);
                this.answers.push(rows[i].answer);
            }

            // Similarity
            let max_similarity = 0
            let index = -1;
            const words_length = morphs.length;
            for(let i=0;i<this.question.length;i++){
                const doc = this.question[i];
                let count = 0
                for(let j=0;j<words_length;j++){
                    if(doc.includes(morphs[j])){
                        count ++;
                    }
                }
                const similarity = count / max(doc.split(" ").length, words_length);
                if(similarity > max_similarity){
                    max_similarity = similarity;
                    index = i;
                }
            }

            let answer = this.answers[index];
            if(index == -1)
                answer = "다시 말씀해주세요.";

            return [answer, max_similarity]
        });
    }
}

module.exports = Dobby;
