import Ajv from "ajv";
const ajv = new Ajv();

// AUTHORS:

export function validateAddUser(data) {
  const schemaAddUser = {
    type: "object",
    required: ["username", "email", "password", "date_registered"],
    properties: {
      id: { type: "string" },
      date_registered: { type: "string" },
      username: { type: "string", minLength: 1 },
      email: { type: "string", minLength: 1 },
      password: { type: "string", minLength: 1 },
      profile_image: { type: "string" },
      read_articles: { type: "string" },
      role: { type: "string" }
    },
    additionalProperties: false
  };

  const isValid = ajv.validate(schemaAddUser, data);
  if (!isValid) {
    return { object: null, error: ajv.errors[0].message };
  }

  data.username = data.username.trim();
  data.email = data.email.trim().toLowerCase();
  return { object: data, error: null };
}


export function validateLoginUser(data) {
    const schemaAddUser = {
    type: "object",
    required: ["email", "password"],
    properties: {
        email: {type: "string", minLength: 1},
        password: {type: "string", minLength: 1},
      }
    }

  const isValid = ajv.validate(schemaAddUser, data);
  if(!isValid){
    return {object: null, error: ajv.errors[0].message} 
  } 

  data.email = data.email.trim().toLowerCase()

  return {object: data, error: null}
}

export function validateEditUser(data) {
  if (!(Object.keys(data).length > 0)) {
    return { object: null, error: "empty object" };
  }

  const schemaEditUser = {
    type: "object",
    properties: {
      username: { type: "string", minLength: 1 },
      email: { type: "string", minLength: 1 },
      password: { type: "string", minLength: 1 },
      profile_image: { type: "string" },
      read_articles: { type: "string" },
      role: { type: "string" }
    },
    additionalProperties: false
  };

  const isValid = ajv.validate(schemaEditUser, data);
  if (!isValid) {
    return { object: null, error: ajv.errors[0].message };
  }

  if (data.username) data.username = data.username.trim();
  if (data.email) data.email = data.email.trim().toLowerCase();

  return { object: data, error: null };
}


// ARTICLES:

export function validateAddArticle(data) {
    const schemaAddAuthor = {
    type: "object",
    required: ["title", "content", "date_created", "type"],
    properties: {
        title: {type: "string"},
        description: {type: "string"},
        thumbnail_image: {type: "string"},
        content: {type: "string"},
        date_created: {type: "string"},
        type: {type: "string"},
        views: {type: "number"},
        reading_time: {type: "number"},
        user_id: {type: "string"}
      },
      additionalProperties: false
    }

  const isValid = ajv.validate(schemaAddAuthor, data);
  if(!isValid){
    return {object: null, error: ajv.errors[0].message} 
  } 

//   data.firstName = data.firstName.trim()
//   data.lastName = data.lastName.trim()
//   data.email = data.email.trim().toLowerCase()

  return {object: data, error: null}
}


export function validateEditArticle(data) {
    if(!(Object.keys(data).length > 0)){
        return {object: null, error: "empty string"} 
    }
    const schemaEditArticle = {
    type: "object",
    properties: {
        title: {type: "string"},
        description: {type: "string"},
        content: {type: "string"},
        date_created: {type: "string"},
        type: {type: "string"},
        reading_time: {type: "number"},
        views: {type: "number"},
        author_id: {type: "string"},
      },
      additionalProperties: false
    }

    const isValid = ajv.validate(schemaEditArticle, data);
    
    if(!isValid){
        return {object: null, error: ajv.errors[0].message} 
    } 
    
    // data.firstName ? data.firstName = data.firstName.trim() : null
    // data.lastName ? data.lastName = data.lastName.trim() : null
    // data.email ? data.email = data.email.trim().toLowerCase() : null

    return {object: data, error: null}


  
}