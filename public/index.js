const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const cors = require("cors");

const databasePath = path.join(__dirname, 'database.db')

const app = express()

app.use(express.json())
app.use(cors())
const initializeDbAndServer = async () => {
    try {
      database = await open({
        filename: databasePath,
        driver: sqlite3.Database,
      })
  
      app.listen(3000, () =>
        console.log('Server Running at http://localhost:3000/'),
      )
    } catch (error) {
      console.log(`DB Error: ${error.message}`)
      process.exit(1)
    }
  }
  
  initializeDbAndServer();
  app.get('/recipes/:recipeId/', async (request, response) => {
    const {recipeId} = request.params
  
    const getRecipeQuery = `
      SELECT
        *
      FROM
        recipes
      WHERE
        id = ${recipeId};`
    const recipe = await database.get(getRecipeQuery)
    response.send(recipe)
  })

  app.post('/recipes/', async (request, response) => {
    const {id,name,description,category} = request.body
    const postRecipeQuery = `
    INSERT INTO
      recipes (id, name, description, category)
    VALUES
      (${id}, '${name}', '${description}', '${category}');`
    await database.run(postRecipeQuery)
    response.send('Recipe Successfully Added')
  })
  
app.put('/recipes/:recipeId/', async (request, response) => {
    const {recipeId} = request.params
    let updateColumn = ''
    const requestBody = request.body
    switch (true) {
      case requestBody.status !== undefined:
        updateColumn = 'Status'
        break
      case requestBody.priority !== undefined:
        updateColumn = 'Priority'
        break
      case requestBody.todo !== undefined:
        updateColumn = 'Recipe'
        break
    }
    const previousRecipeQuery = `
    SELECT
      *
    FROM
      recipes
    WHERE 
      id = ${recipeId};`
  const previousRecipe = await database.get(previousRecipeQuery)

  const {
    recipe = previousRecipe.recipe,
    priority = previousRecipe.priority,
    status = previousRecipe.status,
  } = request.body

  const updateRecipeQuery = `
    UPDATE
      recipes
    SET
      todo='${recipe}',
      priority='${priority}',
      status='${status}'
    WHERE
      id = ${recipeId};`

  await database.run(updateRecipeQuery)
  response.send(`${updateColumn} Updated`)
})

app.delete('/recipes/:recipeId/', async (request, response) => {
  const {recipeId} = request.params
  const deleteRecipeQuery = `
  DELETE FROM
    recipes
  WHERE
    id = ${recipeId};`

  await database.run(deleteRecipeQuery)
  response.send('Recipe Deleted')
})

module.exports = app





