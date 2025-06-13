import express from 'express'
import cors from 'cors'
import {addAuthorToDataBase, getAllAuthorsFromDataBase, getAuthorByIdFromDataBase, editAuthorById, deleteAuthorById,
    getAllArticlesFromDataBase, getArticleByIdFromDataBase, addArticleToDataBase, editArticleById, deleteArticleById,
    getAuthorByEmail
} from './database.js'
import { validateAddAuthor, validateEditAuthor, validateAddArticle, validateEditArticle } from './validation.js'
import { randomUUID } from 'crypto'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const app = express()
app.use(express.json())
app.use(cors())
const port = 3000


const SECRET_KEY = 'my_secret_key'
const REFRESH_TOKENS = [];

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// AUTHORS:

// get all authors
app.get('/authors', async (req, res) => {

    res.set('Content-type', 'application/json')
    // const obj = getAuthorsFromFile()
    // res.send(JSON.stringify(obj))
    const result = await getAllAuthorsFromDataBase();
    console.log(result);
    res.send(JSON.stringify(result))
})


// get author by ID
app.get('/author/:id', async (req, res) => {
    res.set('Content-type', 'application/json')
    const authorId = req.params.id
    const author = await getAuthorByIdFromDataBase(authorId)
    console.log(author);
    if(!author){
        res.status(404).send({message: "failed"}) 
        return
    }
    res.send(JSON.stringify(author))
})


// add new author
app.post('/author', async (req, res) => {
    const data = req.body
    console.log(data);
    const isValid = validateAddAuthor(data)
    if(isValid.error != null){
        res.status(422).send({message: isValid.error}) 
        return
    } else {
        console.log('author:', {...isValid.object, id: randomUUID()});
        const result = await addAuthorToDataBase({...isValid.object, id: randomUUID()})
        res.send({message: "success", result: result})
    }
   
})


// edit author by id
app.patch('/author/:id', async (req, res) => {
    const data = req.body;
    const authorId = req.params.id
    
    const isValid = validateEditAuthor(data)
    if(isValid.error != null){
        res.status(422).send({message: isValid.error}) 
        return
    }

    const result = await editAuthorById(authorId, isValid.object)   
    
    if(!result){
        res.status(404).send({message: "failed"}) 
        return
    } 
    res.send({message: "success", result: result})
})


// delete author by id
app.delete('/author/:id', async (req, res) => {
    const authorId = req.params.id
    const result = await deleteAuthorById(authorId)
    if(!result || result.affectedRows === 0){
        res.status(404).send({message: "failed"}) 
        return
    }
    res.send({message: 'success'})
})

// ARTICLES:


app.get('/articles', async (req, res) => {
    res.set('Content-type', 'application/json')
    const result = await getAllArticlesFromDataBase();
    res.send(JSON.stringify(result))
})

app.get('/article/:id', async (req, res) => {
    res.set('Content-type', 'application/json')
    const articleId = req.params.id
    const article = await getArticleByIdFromDataBase(articleId)
    
    if(!article){
        res.status(404).send({message: "failed"}) 
        return
    }
    res.send(JSON.stringify(article))
})

app.post('/article', async (req, res) => {
    const data = req.body
   
    const isValid = validateAddArticle(data)
    if(isValid.error != null){
        res.status(422).send({message: isValid.error}) 
        return
    } else {
        console.log('author:', {...isValid.object, id: randomUUID()});
        const result = await addArticleToDataBase({...isValid.object, id: randomUUID()})
        res.send({message: "success", result: result})
    }
   
})


app.patch('/article/:id', async (req, res) => {
    const data = req.body;
    const articleId = req.params.id
    
    const isValid = validateEditArticle(data)
    if(isValid.error != null){
        res.status(422).send({message: isValid.error}) 
        return
    }

    const result = await editArticleById(articleId, isValid.object)   
    
    if(!result){
        res.status(404).send({message: "failed"}) 
        return
    } 
    res.send({message: "success", result: result})
})

app.delete('/article/:id', async (req, res) => {
    const articleId = req.params.id
    const result = await deleteArticleById(articleId)
    if(!result || result.affectedRows === 0){
        res.status(404).send({message: "failed"}) 
        return
    }
    res.send({message: 'success'})
})




// AUTHENTICATION + AUTHORIZATION

app.post('/register', async (req, res) => {
    const data = req.body
    console.log(data);
    const isValid = validateAddAuthor(data)
    if(isValid.error != null){
        res.status(422).send({message: isValid.error}) 
        return
    } 
    const author = await getAuthorByEmail(data.email);
    if(author.length > 0) {
        res.status(422).send({message: "user already exists"}) 
        return
    }
    
    const password = data.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await addAuthorToDataBase({...isValid.object, password: hashedPassword, id: randomUUID()})
    res.send({message: "success", result: result})
})

app.post('/login', async (req, res) => {
    const data = req.body;
    console.log(data);
    const isValid = validateAddAuthor(data)
    if(isValid.error != null){
        res.status(422).send({message: isValid.error}) 
        return
    } 
    const author = await getAuthorByEmail(data.email);
    if(author.length === 0) {
        res.status(422).send({message: "User not found"}) 
        return
    }

    const passwordIsValid = bcrypt.compare(isValid.data.password, author.password);
    if(!passwordIsValid){
        res.status(401).send({message: "Incorrect password"}) 
    }

    const accessToken = jwt.sign({email: isValid.object.email}, SECRET_KEY, {expiresIn: '15m'});
    const refreshToken = jwt.sign({email: isValid.object.email}, SECRET_KEY, {expiresIn: '7d'});


    // add tokens to DB (???)

    res.send({
        accessToken: accessToken,
        refreshToken: refreshToken
    });


})

app.get('/me', authMiddlware, async (req, res) => {
    
    res.send(req.user.email)
})


function authMiddlware(req, res, next) {
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).send({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, SECRET_KEY)
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (e){
        return res.status(403).send({ message: 'Invalid or expired token' });
    }
}