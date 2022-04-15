const express = require("express");
var app = express();
const path = require('path');
const port = 3000
const fs = require('fs');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/',(req, res) => { 
    res.render('index.ejs', { files: "" });
});

app.get('/liste',(req, res) => { 
    try {
        const files = fs.readdirSync('./', 'utf8')
        res.render('index.ejs', { files: files });
    } catch (err) {
        console.error(err)
        res.render('index.ejs', { files: err });
    }
});

app.get('/newFile',(req, res) => { 
    fs.open('nouveauFichier.txt', 'w', function (err, file) {
        if (err) throw err;
        console.log('Fichier créé !');
     })
    res.render('index.ejs', { files: "" });
});

app.get('/deleteFile',(req, res) => { 
    fs.unlink('./nouveauFichier.txt');
    res.render('index.ejs', { files: "" });
});

app.get('/newDir',(req, res) => { 
    if(fs.existsSync("nouveauDossier")){
        console.log('Dossier existant !');
    }else{
        fs.mkdir('nouveauDossier', err => {
            if (err){
                throw err;
            }else{ 
                console.log('Dossier créé !');
            }
        })
    }
    res.render('index.ejs', { files: "" });
});

app.get('/deleteDir',(req, res) => { 
    if(fs.existsSync("nouveauDossier")){
        fs.rmdir("./nouveauDossier", err => {
            if(err){
                throw err;
            }else{ 
                console.log('Dossier Supprimer !');
            }
        })
    }else{
        console.log('Dossier non existant !');
    }
    res.render('index.ejs', { files: "" });
});

app.get('/moveFile',(req, res) => { 
    if(fs.existsSync("nouveauDossier")){
        fs.rename("./nouveauFichier.txt", "./nouveauDossier/nouveauFichier.txt" , err => {
            if(err){
                throw err;
            }
        })
    }
    res.render('index.ejs', { files: "" });
});

app.get('/moveDir',(req, res) => { 
    if(fs.existsSync("nouveauDossier")){
        if(fs.existsSync("views/nouveauDossier")){
            console.log('Dossier deja existant !');
        }else{
            fs.rename("./nouveauDossier", "./views/nouveauDossier" , err => {
                if(err){
                    throw err;
                }
            })
        }
    }
    res.render('index.ejs', { files: "" });
});

app.get('/shell',(req, res) => { 
    
    res.render('index.ejs', { files: "" });
});

app.listen(port, () => console.log(`Application listening on port ${port}!`))