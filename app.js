const searchbox =document.querySelector(".searchbox");
const searchbtn =document.querySelector(".searchbtn");
const recipe_container =document.querySelector(".recipe-container");
const recipe_details_content =document.querySelector(".recipe-details-content");
const recipe_close_btn =document.querySelector(".recipe-close-btn");
const fetchRecipes=async(query)=>{
    recipe_container.innerHTML="<h2>Fetching Recipes...</h2>"
    try{
const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
const response= await data.json()
recipe_container.innerHTML=""
response.meals.forEach(meal =>{
const recipediv=document.createElement("div")
recipediv.classList.add('recipe');
recipediv.innerHTML=`
<img src="${meal.strMealThumb}">
<h3>${meal.strMeal}</h3>
<p><span>${meal.strArea}</span> Dish</p>
<p>Belongs to <span>${meal.strCategory}</span> category</p>
`
const button=document.createElement("button");
button.textContent="view Recipe"
recipediv.appendChild(button)


// Adding event listener to recipediv button 
button.addEventListener("click",()=>{
    openRecipePopUp(meal)
})

recipe_container.appendChild(recipediv)

})

}
catch(er){
    recipe_container.innerHTML="<h2>No Recipe Found...</h2>"
}
}

let  fetchIngredents=(meal)=>{
let ingredientList="";
for(let i=1;i<=20;i++){
let ingredent=meal[`strIngredient${i}`]
if(ingredent){
 const measure=meal[`strMeasure${i}`];
 ingredientList+=`<li>${measure} ${ingredent}</li>`
}else{
    break;
}
}
return ingredientList;
}
const openRecipePopUp=(meal)=>{
    recipe_details_content.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="IngredientList">${fetchIngredents(meal)}</ul>
    <div class="recipeInstructions">
    <h3>Instructions: </h3>
        <p >${meal.strInstructions}</p>
</div>
    `
    recipe_details_content.parentElement.style.display="block";
}


recipe_close_btn.addEventListener("click",()=>{
    recipe_details_content.parentElement.style.display="none"
})
searchbtn.addEventListener("click",(e)=>{
    e.preventDefault()
    const searchinput=searchbox.value.trim()
    if(!searchinput){
      recipe_container.innerHTML=`
      <h2>Type The Meal In The SearchBox.</h2>
      `
      return;
    }
    fetchRecipes(searchinput)
})