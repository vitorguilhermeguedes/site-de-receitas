const form = document.querySelector('.search-form');
const recipeList = document.querySelector('.recipe-list');
const recipeDetails = document.querySelector('.recipe-details');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const inputValue = event.target[0].value;

    searchRecipes(inputValue);
});
async function searchRecipes(ingredient) {
    recipeList.innerHTML = `<p>Carregando receitas...</p>`

    try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
            const data = await response.json()
    
            showRecipes(data.meals);
        
    } catch(err) {
            recipeList.innerHTML = `<p>Nenhuma receita encontrada</p>`
    }
};


function showRecipes(recipes) {
    recipeList.innerHTML = recipes.map(item => `
    <div class="recipe-card" onclick="getRecipesDetails (${item.idMeal})">
        <img src="${item.strMealThumb}" alt="receita-foto">
        <h3>${item.strMeal}</h3>
    </div>  
         `

    ).join('')
}

async function getRecipesDetails(id) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const data = await response.json()
    const recipe = data.meals[0]

    console.log(recipe)

    let ingredients = ''

    for(let i = 1; i<= 20; i++){
        if(recipe[`strIngredient${i}`]) {
            ingredients += `<li>${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}</li>`

        } else {
            break;
        }
    }

    recipeDetails.innerHTML = `
    <h2>${recipe.strMeal}</h2>
    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
    <h3>Categoria: ${recipe.strCategory}</h3>
    <h3>Origem: ${recipe.strArea}</h3>
    <h3>ingredientes:</h3>
    <ul>${ingredients}</ul>
    <h3>Instruções:</h3>
    <h3>${recipe.strInstructions}</h3>
    <p>Tags: ${recipe.strTags}</p>
    <p>Video: <a href="${recipe.strYoutube}" target="_blank">Tutorial no YouTube</a></p>
    
    
    
    `
}

