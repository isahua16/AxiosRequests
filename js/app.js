function submit_post(event)
{
    if(document.querySelectorAll(`.msg`))
    {
        for(let i = 0; i < document.querySelectorAll(`.msg`).length; i++)
        {
            document.querySelectorAll(`.msg`)[i].remove();
        }
    }
    
    let post_title = document.querySelector(`#post_title`)[`value`];
    let post_body = document.querySelector(`#post_body`)[`value`];
    let post_id = document.querySelector(`#user_id`)[`value`];

    axios.request(
        {
            url: `https://jsonplaceholder.typicode.com/posts`,
            method: `POST`,
            data:
            {
                title: post_title,
                body: post_body,
                userId: post_id
            }
        }
    ).then(post_success).catch(post_error);
}

function post_success(res)
{
    post_button.insertAdjacentHTML(`afterend`, `<h3 class="msg">Posted Succesfully!</h3>`);
    document.querySelector(`#post_title`)[`value`] = ``;
    document.querySelector(`#post_body`)[`value`] = ``;
    document.querySelector(`#user_id`)[`value`] = ``;
       
}

function post_error(err)
{
    post_button.insertAdjacentHTML(`afterend`, `<h3 class="msg">There was an error. Try again.</h3>`);
}

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
let post_button = document.querySelector(`#post_button`);
post_button.addEventListener(`click`, submit_post);
