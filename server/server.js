import express from 'express'
import cors from 'cors'
import {addUser, getAllUsers, getUserById, editUserById, deleteUserById,
    getAllArticles, getArticleById, addArticle, editArticleById, deleteArticleById,
    getUserByEmail
} from './database.js'
import { validateAddUser, validateEditUser, validateAddArticle, validateEditArticle, validateLoginUser } from './validation.js'
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

// USERS

// get all users
app.get('/users', async (req, res) => {
    res.set('Content-type', 'application/json')
    const result = await getAllUsers();
    console.log(result);
    res.send(JSON.stringify(result))
})


// get user by ID
app.get('/user/:id', async (req, res) => {
    res.set('Content-type', 'application/json')
    const userId = req.params.id
    const user = await getUserById(userId)
    console.log(user);
    if(!user){
        res.status(404).send({message: "failed"}) 
        return
    }
    res.send(JSON.stringify(user))
})


// add new user
app.post('/user', async (req, res) => {
    const data = req.body
    console.log(data);
    const isValid = validateAddUser(data)
    if(isValid.error != null){
        res.status(422).send({message: isValid.error}) 
        return
    } else {
        console.log('user:', {...isValid.object, id: randomUUID()});
        const result = await addUser({...isValid.object, id: randomUUID()})
        res.send({message: "success", result: result})
    }
   
})


// edit user by id
app.patch('/user/:id', async (req, res) => {
    const data = req.body;
    const userId = req.params.id
    
    const isValid = validateEditUser(data)
    if(isValid.error != null){
        res.status(422).send({message: isValid.error}) 
        return
    }

    const result = await editUserById(userId, isValid.object)   
    
    if(!result){
        res.status(404).send({message: "failed"}) 
        return
    } 
    res.send({message: "success", result: result})
})


// delete user by id
app.delete('/user/:id', async (req, res) => {
    const userId = req.params.id
    const result = await deleteUserById(userId)
    if(!result || result.affectedRows === 0){
        res.status(404).send({message: "failed"}) 
        return
    }
    res.send({message: 'success'})
})

// ARTICLES:


app.get('/articles', async (req, res) => {
    res.set('Content-type', 'application/json')
    const result = await getAllArticles();
    res.send(JSON.stringify(result))
})

app.get('/article/:id', async (req, res) => {
    res.set('Content-type', 'application/json')
    const articleId = req.params.id
    const article = await getArticleById(articleId)
    console.log('article', article);
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
        console.log('user:', {...isValid.object, id: randomUUID()});
        const result = await addArticle({...isValid.object, id: randomUUID()})
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
    const isValid = validateAddUser(data)
    if(isValid.error != null){
        res.status(422).send({message: isValid.error}) 
        return
    } 
    const user = await getUserByEmail(data.email);
    if(user) {
        res.status(422).send({message: "user already exists"}) 
        return
    }
    
    const password = data.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await addUser({...isValid.object, password: hashedPassword, id: randomUUID()})
    res.send({message: "success", result: result})
})


const DB_TOKENS = [

]

app.post('/login', async (req, res) => {
    const data = req.body;
    console.log(data);
    const isValid = validateLoginUser(data)
    if(isValid.error != null){
        res.status(422).send({message: isValid.error}) 
        return
    } 
    const user = await getUserByEmail(data.email);
    if(user.length === 0) {
        res.status(422).send({message: "User not found"}) 
        return
    }
    console.log('isValid:', isValid);    
    const passwordIsValid = await bcrypt.compare(isValid.object.password, user.password);
    if(!passwordIsValid){
        res.status(401).send({message: "Incorrect password"}) 
        return
    }
    console.log(isValid);
    const accessToken = jwt.sign({email: isValid.object.email}, SECRET_KEY, {expiresIn: '15m'});
    const refreshToken = jwt.sign({email: isValid.object.email}, SECRET_KEY, {expiresIn: '7d'});
    console.log('access:', accessToken, 'refresh:', refreshToken);
    // add tokens to DB (???)

    DB_TOKENS.push({user_id: user.id, token: refreshToken})
    res.send({
        message: 'success',
        accessToken,
        refreshToken,
        user: { id: user.id, email: user.email }
    });

})

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(401).send({ message: "No refresh token provided" });
    }

    try {
        const decoded = jwt.verify(refreshToken, SECRET_KEY);
        const newAccessToken = jwt.sign({ email: decoded.email }, SECRET_KEY, { expiresIn: '15m' });
        res.send({ accessToken: newAccessToken });
    } catch (e) {
        console.error('Refresh token error:', e);
        return res.status(403).send({ message: "Invalid or expired refresh token" });
    }
});

app.get('/myprofile', authMiddlware, async (req, res) => {
  const userEmail = req.user.email;
  console.log('user email:', userEmail);
  const user = await getUserByEmail(userEmail);
  console.log('user:', user);
  if (!user || user.length === 0) {
    return res.status(404).send({ message: "User not found" });
  }
  res.send(user);
});


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
        console.log('auth middlware:', req.user);
        next();
    } catch (e){
        return res.status(403).send({ message: 'Invalid or expired token' });
    }
}

// app.get('/latest-article', async (req, res) => {
//     const article = await getLatestArticle();
//     console.log(article);
//     if(!article){
//         return res.status(400).send({ message: 'Could not find latest article' });
//     }
    
//     res.status(200).send({message: "success", content: article})
// })