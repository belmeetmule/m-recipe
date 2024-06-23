// base url https://dummyjson.com
// endpoint endpoint=/recipes
const baseUrl = 'https://dummyjson.com';
const recipes = '/recipes';

// 
let globalData;
const getRecipes = async () => {
  const response = await fetch(`${baseUrl}${recipes}`)
  const data = await response.json()
  console.log(data.recipes)
  return data
}

// 
globalData = getRecipes();




const viewDetails = (recipeId) => {
    // Redirect to the details.html page with the recipe ID as a query parameter
    console.log('viewDetails', recipeId);
    window.location.href = `detail.html?id=${recipeId}`;
  }

 
     

    function filterRecipes(e) {
        e.preventDefault();
        let searchKey = document.querySelector('input[type="search"]').value;
        console.log('Search Key:', searchKey);
        
        if (!searchKey) {
            displayAllRecipes();
            return;
        }
        
        globalData.then(data => {
            let recipes = data.recipes;
            let filteredRecipes = recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(searchKey.toLowerCase())
            );
               
            // Clear the existing recipes on the page
            document.querySelector('.row').innerHTML = '';
            document.querySelector('input[type="search"]').focus();

            document.getElementById('recipe-count').textContent = `Found: (${filteredRecipes.length})`;
            document.getElementById('recipe-count').style.marginTop='55px';

            filteredRecipes.forEach(recipe => {
                displayRecipes(recipe); // Function to display the recipes
            });
    });
    }

    const filterByTag = (e) => {
        let tag = e.target.id;
        console.log('tag', tag);
        if (tag === 'all') {
            displayAllRecipes();
            return;
        }
        globalData.then(data => {
            let recipes = data.recipes;
            let filteredRecipes = recipes.filter(recipe =>
            recipe.mealType.includes(tag)
            );
               
            // Clear the existing recipes on the page
            document.querySelector('.row').innerHTML = '';
            document.querySelector('input[type="search"]').focus();

            document.getElementById('recipe-count').textContent = `Found: (${filteredRecipes.length})`;
            document.getElementById('recipe-count').style.marginTop='55px';

            filteredRecipes.forEach(recipe => {
                displayRecipes(recipe); // Function to display the recipes
            });
    }
    )}

      

        // Function to display the list of recipes on the index.html page
function displayRecipes(recipe) {
      const recipeContainer = document.querySelector('.row');
      
      const block = document.createElement('div');
      block.classList.add('col-sm-4');
      
      const recipeCard = document.createElement('div');
      recipeCard.classList.add('card');
      recipeCard.classList.add('h-100');
      recipeCard.innerHTML = `
      
      <img src=${recipe.image} class="card-img-top" alt="${recipe.title}" onclick="viewDetails(${recipe.id}) ">
      <div class="card-body  d-flex flex-column">
          <div class="d-flex justify-content-between"> 
            <h5 class="card-title">${recipe.name}</h5>
            <p class="card-text" title="rating"><i class="bi bi-stars text-warning"></i> ${recipe.rating}</p>
          </div
          <div class="d-flex flex-row g-2 mb-auto"> 
            <div class="d-flex flex-col">
              <p class="mb-1 fw-semibold text-secondary-emphasis"> <i class="bi bi-people"></i> Serving: &nbsp; </serving>
              <p class="mb-1"> ${recipe.servings} </p>
            </div>
            <div class="d-flex flex-col">
              <p class="mb-1 fw-semibold text-secondary-emphasis"> <i class="bi bi-alarm"></i> Prep time: &nbsp; </serving>
              <p class="mb-1"> ${recipe.prepTimeMinutes} Minutes </p>
            </div>
            <div class="d-flex flex-col">
              <p class="fw-semibold text-secondary-emphasis"> <i class="bi bi-alarm"></i> Cook time: &nbsp;</serving>
              <p> ${recipe.cookTimeMinutes} Minutes</p>
            </div>
          </div>
          
          
          <button onclick="viewDetails(${recipe.id}) " class="btn btn-primary go-detail">See more</button>
      </div>
      
      `;
      recipeContainer.appendChild(block);
      block.appendChild(recipeCard);
}

const displayAllRecipes = () => {
    document.getElementById('recipe-count').innerHTML = '';
    const data = globalData.then(data => {;
        const recipes = data.recipes;
        
        recipes.forEach(recipe => {
           displayRecipes(recipe);
        });
    })
}
  
  document.addEventListener('DOMContentLoaded', () => {
    // Call the function to get the recipe details

    // Attach event listner to all filter buttons
    const filterButtons = document.querySelector('#filter-tgs').querySelectorAll('button');
    console.log('filterButtons', filterButtons);
    filterButtons.forEach(button => {
        console.log('button', button.id);
        button.addEventListener('click', filterByTag);
    });

  document.querySelector('#searchForm').addEventListener('submit', filterRecipes);

   displayAllRecipes();
   console.log('global data', globalData);
   document.querySelector('input[type="search"]').addEventListener('input', filterRecipes);   
        
})


