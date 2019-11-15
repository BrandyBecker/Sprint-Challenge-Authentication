const db = require('../database/dbConfig.js')

module.exports = {
    register,
    find,
    findBy,
    findById
}

async function register(user){
    const [id] = await db('users').insert(user)
    return findById(id)
}

function find() {
    return db('users').select('id','username') //password itsn't being returned for safety reasons
}

function findBy(filter){
    return db('users').where(filter)
}


function findById(id){
    return db('users')
    .where({id})
    .first()
}