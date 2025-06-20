import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'my_blog',
  password: 'mysqlmirrapassword'
}).promise();

// USERS

export async function getAllUsers() {
  const [result] = await connection.query('SELECT * FROM users');
  return result;
}

export async function getUserById(userId) {
  const [result] = await connection.query(
    'SELECT * FROM users WHERE id = ?',
    [userId]
  );
  return result[0];
}

export async function getUserByEmail(email) {
  const [result] = await connection.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return result[0];
}

export async function addUser(user) {
  const result = await connection.query(
    `INSERT INTO users (id, username, email, password, date_registered, profile_image, read_articles, role)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user.id,
      user.username,
      user.email,
      user.password,
      user.date_registered,
      user.profile_image || null,
      user.read_articles || '[]',
      user.role || 'user'
    ]
  );
  return result;
}

export async function editUserById(userId, user) {
  const keys = Object.keys(user);
  const values = Object.values(user);
  const clause = keys.map(key => `${key} = ?`).join(', ');
  const sql = `UPDATE users SET ${clause} WHERE id = ?`;

  const result = await connection.query(sql, [...values, userId]);
  return result;
}

export async function deleteUserById(userId) {
  const [result] = await connection.query('DELETE FROM users WHERE id = ?', [
    userId
  ]);
  return result;
}

// ARTICLES

export async function getAllArticles() {
  const [result] = await connection.query(`
        SELECT 
      articles.id AS article_id,
      articles.title,
      articles.description,
<<<<<<< HEAD
      articles.thumbnail_image,
=======
>>>>>>> 473127c3a78019e145dab0f265a3963f330b07eb
      articles.content,
      articles.date_created,
      articles.type,
      articles.views,
      articles.reading_time,
      users.username,
      users.profile_image
    FROM articles
    LEFT JOIN users ON articles.user_id = users.id
    ORDER BY articles.date_created DESC;
  `);

  return result;
}

export async function getArticleById(articleId) {
  const [result] = await connection.query(`
    SELECT 
      articles.id AS article_id,
      articles.title,
      articles.content,
      articles.description,
      articles.type,
      articles.date_created,
      articles.views,
      articles.reading_time,
      users.username,
      users.profile_image
    FROM articles
    LEFT JOIN users ON articles.user_id = users.id
    WHERE articles.id = ?;
  `, [articleId]);

  return result[0];
}

export async function addArticle(article) {
  const result = await connection.query(
    `INSERT INTO articles (id, title, description, content, date_created, type, views, reading_time, thumbnail_image, user_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      article.id,
      article.title,
      article.description,
      article.content,
      article.date_created,
      article.type,
      article.views,
      article.reading_time,
      article.thumbnail_image,
      article.user_id
    ]
  );
  return result;
}

export async function editArticleById(articleId, article) {
  const keys = Object.keys(article);
  const values = Object.values(article);
  const clause = keys.map(key => `${key} = ?`).join(', ');
  const sql = `UPDATE articles SET ${clause} WHERE id = ?`;

  const result = await connection.query(sql, [...values, articleId]);
  return result;
}

export async function deleteArticleById(articleId) {
  const [result] = await connection.query(
    'DELETE FROM articles WHERE id = ?',
    [articleId]
  );
  return result;
}


// export async function getLatestArticle() {
//   const [result] = await connection.query(
//     `SELECT * FROM articles
//       ORDER BY date_created DESC
//       LIMIT 1;`
//   )
//   return result
// }