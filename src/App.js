
const search = document.getElementById("search"),
submit = document.getElementById("submit"),
random = document.getElementById("random"),
mealsEl = document.getElementById("meals"),
resultHeading = document.getElementById("result-heading"),
single_mealEl = document.getElementById("single-meal")

//search meal and fetch from api
function searchMeal(e){
 e.preventDefault();

 // clear single meal
 single_mealEl.innterHTML = "";

 //get search term
 const term = search.value;

 if(term.trim()) {
   fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=${term}`, {
    	"method": "GET",
    	"headers": {
    		"x-rapidapi-key": "70aa9d5184msh24f489409866b23p1ff84cjsn5832992d4f80",
    		"x-rapidapi-host": "tasty.p.rapidapi.com"
    	}
    })
   .then( res => res.json())
   .then(data => {
     console.log(data.results);
       resultHeading.innerHTML = `<h2> Search results for ${term} </h2>`;

    if(data.results === null) {
      resultHeading.innerHTML = `<p> there are no search resutlts </p>`
    } else {
      mealsEl.innerHTML = data.results.map(meal => `
        <div id="meals">
        <div class="meal">
      <img src=${meal.thumbnail_url} />
      <div class="meal-info" data-mealid="${meal.id}">
        <h3> ${meal.name} </h3>
      </div>
      </div>
      </div>
      `)
      .join("")

    }
  });
  //clear search text
  search.value = ""
}
     else {
   alert("please enter a serch term")
 }

 console.log(term);
}

//fetch meal by id
function getMealById(mealID){
  fetch(`https://tasty.p.rapidapi.com/recipes/detail?id=${mealID}`, {
  	"method": "GET",
  	"headers": {
  		"x-rapidapi-key": "70aa9d5184msh24f489409866b23p1ff84cjsn5832992d4f80",
  		"x-rapidapi-host": "tasty.p.rapidapi.com"
  	}
  })
  .then( res => res.json())
  .then (data => {
    const meal = data

    addMealToDOM(meal)
  })
}

//add meal to dom
function addMealToDOM(meal){
const instructions = []
// meal.map ( x =>  <li> {x.display_text} </li>)
meal.instructions.map( x =>  instructions.push(`${x.display_text}`))
console.log(instructions);


single_mealEl.innerHTML = `
  <div class="single-meal">
    <h1> ${meal.name} </h1>
    <li> ${instructions} </li>
  </div>
`
}

function getRandomMeal(){
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = ""

  fetch("https://tasty.p.rapidapi.com/feeds/list?from=0&vegetarian=false&timezone=%2B0700&size=20", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "70aa9d5184msh24f489409866b23p1ff84cjsn5832992d4f80",
		"x-rapidapi-host": "tasty.p.rapidapi.com"
    	}
    })
    .then(response => {
      const meal = response
    	console.log(response);
    })
    .catch(err => {
    	console.error(err);
    });
}

//event listeners

submit.addEventListener("submit", searchMeal)
mealsEl.addEventListener("click", e => {
  const mealInfo = e.path.find(item => {
    if(item.classList) {
      return item.classList.contains("meal-info")
    } else {
      return false;
    }
  })

  if(mealInfo) {
    const mealID= mealInfo.getAttribute("data-mealid")
    getMealById(mealID)

  }
})

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
