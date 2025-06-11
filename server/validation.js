import Ajv from "ajv";
const ajv = new Ajv();

// AUTHORS:

export function validateAddAuthor(data) {
    const schemaAddUser = {
    type: "object",
    required: ["firstName", "lastName", "dateRegistered", "email", "password"],
    properties: {
        firstName: {type: "string", minLength: 1},
        lastName: {type: "string", minLength: 1},
        dateRegistered: {type: "string"},
        email: {type: "string", minLength: 1},
        password: {type: "string", minLength: 1},
      }
    }

  const isValid = ajv.validate(schemaAddUser, data);
  if(!isValid){
    return {object: null, error: ajv.errors[0].message} 
  } 

  data.firstName = data.firstName.trim()
  data.lastName = data.lastName.trim()
  data.email = data.email.trim().toLowerCase()

  return {object: data, error: null}
}

export function validateEditAuthor(data) {
  
  if(!(Object.keys(data).length > 0)){
    return {object: null, error: "empty string"} 
  }

  const schemaEditUser = {
    type: "object",
    properties: {
        firstName: {type: "string", minLength: 1},
        lastName: {type: "string", minLength: 1},
        dateRegistered: {type: "string"},
        email: {type: "string", minLength: 1},
        password: {type: "string", minLength: 1},
      },
      additionalProperties: false
    }

  const isValid = ajv.validate(schemaEditUser, data);
  
  if(!isValid){
    return {object: null, error: ajv.errors[0].message} 
    
  } 
  
  data.firstName ? data.firstName = data.firstName.trim() : null
  data.lastName ? data.lastName = data.lastName.trim() : null
  data.email ? data.email = data.email.trim().toLowerCase() : null

  return {object: data, error: null}

  
}

// ARTICLES:

export function validateAddArticle(data) {
    const schemaAddAuthor = {
    type: "object",
    required: ["title", "description", "content", "date_created", "type", "author_id", "views", "reading_time"],
    properties: {
        title: {type: "string"},
        description: {type: "string"},
        content: {type: "string"},
        date_created: {type: "string"},
        type: {type: "string"},
        author_id: {type: "string"},
        views: {type: "number"},
        reading_time: {type: "number"}
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