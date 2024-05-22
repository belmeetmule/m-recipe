const baseUrl = 'https://dummyjson.com';
const recipes = '/recipes';
const getRecipe = async (id) => {
    const response = await fetch(`${baseUrl}${recipes}/${id}`);
    const data = await response.json();
    console.log('getRecipe data', data);
    return data;
  };

 // Function to retrieve the recipe details from the API and display them on the details.html page
 function getRecipeDetails() {
    // Get the recipe ID from the query parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    console.log('Recipe ID:', urlParams)
  
    // Make an API call to retrieve the recipe details
    getRecipe(recipeId)
      .then(data => {
        console.log('Recipe details:', data);
        // Update the HTML elements with the recipe details
        document.getElementById('recipeImage').src = data.image;
        document.getElementById('recipeTitle').textContent = data.name;

        const recipeContainer = document.querySelector('#top-left-panel');
      
      const recipeCard = document.createElement('div');
     
      recipeCard.innerHTML = `
      
      
      <div class="d-flex mt-3">
          
          <div class="d-flex gap-1 mb-auto flex-column"> 
            <div class="d-flex ">
              <p class="mb-1 mx-2 fw-semibold text-secondary-emphasis"> Serving: &nbsp;</serving>
              <p class="mb-1"> ${data.servings} </p>
            </div>
            <div class="d-flex mx-2">
              <p class="mb-1 fw-semibold text-secondary-emphasis"> Prep time: &nbsp; </serving>
              <p class="mb-1"> ${data.prepTimeMinutes} Minutes </p>
            </div>
            <div class="d-flex mx-2">
              <p class="mb-1 fw-semibold text-secondary-emphasis"> Cook time: &nbsp; </serving>
              <p class="mb-1"> ${data.cookTimeMinutes} Minutes</p>
            </div>
            <div class="d-flex mx-2">
              <p class="mb-1 fw-semibold text-secondary-emphasis"> Difficulty: &nbsp; </serving>
              <p class="mb-1"> ${data.difficulty}</p>
            </div>
            <div class="d-flex mx-2">
              <p class="mb-1 fw-semibold text-secondary-emphasis"> Cuisine: &nbsp; </serving>
              <p class="mb-1"> ${data.cuisine}</p>
            </div>

            <div class="d-flex mx-2 mt-2">
              <p class="mb-1 fw-semibold text-secondary-emphasis"> Rating: &nbsp; </serving>
              <p class="mb-1"> ${data.rating}</p>
            </div>
          </div>
          
          
          
      </div>
      
      `;
      recipeContainer.appendChild(recipeCard);
    

      // grab ingrdients element
      const ingTable = document.getElementById('ingredients');
      
    
      data.ingredients.map(ingredient =>{
        const tblRow = document.createElement('tr');
        tblRow.classList.add('border-bottom');
        tblRow.classList.add('p-3');
        tblRow.innerHTML = ingredient;
        ingTable.appendChild(tblRow);
      })

      // grab instructions
      const instructions = document.getElementById('instructions')
      data.instructions.map(instruction =>{
        const listItem = document.createElement('li');
        listItem.innerHTML = instruction;
        instructions.appendChild(listItem);
      })

      })

      .catch(error => {
        console.error('Error:', error);
      });
  }

document.addEventListener('DOMContentLoaded', getRecipeDetails);