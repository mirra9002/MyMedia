import mysql from 'mysql2';
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'media',
  password: 'mysqlmirrapassword'
}).promise();

// AUTHORS:

export async function getAllAuthorsFromDataBase() {
    const [result] = await connection.query('SELECT * FROM authors');
    return result
}

export async function getAuthorByIdFromDataBase(authorId) {
    const [result] = await connection.query(`
        SELECT * FROM authors
        WHERE id=?`, [authorId]);
    return result
}


export async function addAuthorToDataBase(author) {
    const result = await connection.query(`
        INSERT INTO authors (id, first_name, last_name, date_registered, email, password)
        VALUES (?, ?, ?, ?, ?, ?);`, 
        [author.id, author.firstName, author.lastName, author.dateRegistered, author.email, author.password])
    return result
}

export async function editAuthorById(authorId, author) {
    const editingKeys = Object.keys(author);
    const editingValues = Object.values(author)
    const clause = editingKeys.map(key =>  `${key} = ?`).join(', ')
    const sql = `
        UPDATE authors
        SET ${clause}
        WHERE id = ?`
    const result = await connection.query( `${sql}`,[...editingValues, authorId])
    return result
}

export async function deleteAuthorById(authorId) {
    const [result] = await connection.query(`DELETE FROM authors WHERE id=?;`, [authorId])
    console.log('result deleting', result);
    return result
}

// ARTICLES:

export async function getAllArticlesFromDataBase() {
    const [result] = await connection.query(`
        SELECT 
            articles.id AS article_id,
            articles.title,
            articles.description,
            articles.content,
            articles.date_created,
            articles.views,
            authors.id AS author_id,
            authors.first_name,
            authors.last_name,
            authors.email,
            authors.date_registered
        FROM articles
        JOIN authors ON articles.author_id = authors.id
        ORDER BY articles.date_created DESC;
    `);

    return result;
}


export async function getArticleByIdFromDataBase(articleId) {
    const [result] = await connection.query(`
        SELECT 
            articles.id AS article_id,
            articles.title,
            articles.content,
            articles.date_created,
            articles.views,
            authors.id AS author_id,
            authors.first_name,
            authors.last_name,
            authors.email,
            authors.date_registered
        FROM articles
        JOIN authors ON articles.author_id = authors.id
        WHERE articles.id = ?;
    `, [articleId]);

    return result;
}


export async function addArticleToDataBase(article) {
    const result = await connection.query(`
        INSERT INTO articles (id, title, description, content, date_created, type, author_id, views, reading_time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`, 
        [article.id, article.title, article.description, article.content, article.date_created, article.type, article.author_id, article.views, article.reading_time])
    return result
}

export async function editArticleById(articleId, article) {
    const editingKeys = Object.keys(article);
    const editingValues = Object.values(article)
    const clause = editingKeys.map(key =>  `${key} = ?`).join(', ')
    const sql = `
        UPDATE articles
        SET ${clause}
        WHERE id = ?`
    const result = await connection.query( `${sql}`,[...editingValues, articleId])
    return result
}

export async function deleteArticleById(articleId) {
    const [result] = await connection.query(`DELETE FROM articles WHERE id=?;`, [articleId])
    console.log('result deleting', result);
    return result
}