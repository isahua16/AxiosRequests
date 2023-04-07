function press_enter(event)
{
    if(event[`key`] === `Enter`)
    {
        meal_search();
    }
}

function meal_search(event)
{
    
    recipe_container.innerHTML = ``;
    let param = search_box[`value`];
    axios.request(
        {
            url: `https://www.themealdb.com/api/json/v1/1/filter.php`,
            params: 
                {
                    c: param
                }
        }
    ).then(get_recipe_success).catch(get_recipe_failure);
}

function get_recipe_success(res)
{
    for(let i = 0; i < res[`data`][`meals`].length; i++)
    {
        recipe_container.insertAdjacentHTML(`beforeend`,
        `<article class="recipe_card">
            <h1>${res[`data`][`meals`][i][`strMeal`]}</h1>
            <img width="100px" src="${res[`data`][`meals`][i][`strMealThumb`]}" alt="Image of ${res[`data`][`meals`][i][`strMeal`]}">
        </article>`)
    }
}

function get_recipe_failure(err)
{
    recipe_container.insertAdjacentHTML(`beforeend`, `<p>Oops, an error occured!</p>`)
}


let recipe_container = document.querySelector(`#recipe_container`);
let search_button = document.querySelector(`#search_button`);
search_button.addEventListener(`click`, meal_search);
let search_box = document.querySelector(`#search_box`);
search_box.addEventListener(`keydown`, press_enter);

