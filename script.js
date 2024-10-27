const input = document.querySelector('#input');
const button = document.querySelector('.btn');

button.addEventListener('click', () => {
    const inputvalue = input.value;
    fetchdata(inputvalue); 
});

async function fetchdata(Arrabiata) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${Arrabiata}`);
    const data = await response.json();
    
    if(data.meals)
    {
        data.meals.forEach(meal => displayRecipe(meal));
    }
    else{
        console.log("No results.");
    }
}

const appendhere = document.querySelector('.appendhere')
const template = document.querySelector('.fillhere')
function displayRecipe(meal)
{
    const recepiclone =  template.cloneNode(true);
    recepiclone.style.display = 'block';

    const fig = recepiclone.querySelector('#fig')
    fig.src = meal.strMealThumb;
    fig.alt = meal.strMeal;
    fig.width = 495; 
    fig.height = 300;



    const title = recepiclone.querySelector('h1')
    title.textContent = meal.strMeal;

    const description = recepiclone.querySelector('p');

    let ingredients = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        
        if (ingredient && ingredient.trim()) {
            ingredients += `${measure ? measure : ''} ${ingredient}<br>`;
        }
    }
    description.innerHTML = ingredients;

    appendhere.appendChild(recepiclone);

}
