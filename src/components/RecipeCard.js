import {Container, Row, Col, Card, ListGroup, Button} from 'react-bootstrap'

const RecipeCard = ({recipe,clickAction, btnTxt}) => {
    // const recipeData = recipe.recipe

    const handleClick = (e) => {
        // console.log(recipeData)
        clickAction(recipe)
    }
    // debugger

    return (
        <Col style ={{padding: '10px'}}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={recipe.image} alt={recipe.label} />
                <Card.Body>
                    <Card.Title>{recipe.label}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Total Time: {recipe.totalTime} min</ListGroup.Item>
                        <ListGroup.Item>Feeds: {recipe.yield}</ListGroup.Item>
                        <ListGroup.Item>Calories: {recipe.calories}</ListGroup.Item>
                    </ListGroup>
                    <Card.Link href={recipe.url} target="_blank">Recipe from {recipe.source}</Card.Link>
                </Card.Body>
                <Button onClick = {handleClick}> {btnTxt}</Button>
            </Card>
        </Col>
    )
}
export default RecipeCard



// {uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_1b6dfeaf0988f96b187c7c9bb69a14fa", label: "Pizza Dough", image: "https://www.edamam.com/web-img/284/2849b3eb3b46aa0e682572d48f86d487.jpg", source: "Lottie + Doof", url: "http://www.lottieanddoof.com/2010/01/pizza-pulp-fiction-jim-lahey/", …}
// calories: 2620.983838835843
// cautions: ["FODMAP"]
// cuisineType: ["italian","mexican"]
// dietLabels: []
// digest: (26) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// dishType: ["main course"]
// healthLabels: (17) ["Vegetarian", "Pescatarian", "Egg-Free", "Peanut-Free", "Tree-Nut-Free", "Soy-Free", "Fish-Free", "Shellfish-Free", "Pork-Free", "Red-Meat-Free", "Celery-Free", "Mustard-Free", "Sesame-Free", "Lupine-Free", "Mollusk-Free", "Alcohol-Free", "Kosher"]
// image: "https://www.edamam.com/web-img/284/2849b3eb3b46aa0e682572d48f86d487.jpg"
// ingredientLines: (16) ["500 g bread flour(3 3/4 cups)", "2 1/2 tsp Dry Yeast instant or active (10 grams)", "3/4 tsp Table Salt(5 grams)", "3/4 tsp Sugar, plus a pinch (about 3 grams)", "1 1/2 cup water at room temperature", "extra-virgin olive oil for pans", "2 x yellow onions(medium), finely chopped (pizza cipolla)", "1/3 cup Heavy Cream(pizza cipolla)", "1 tsp Kosher Salt(pizza cipolla)", "2 tsp fresh thyme, coarsely chopped(pizza cipolla)", "7 oz diced tomatoes, drained(pizza pomodoro)", "3/4 cup Canned Tomatoes (reserved juice) (pizza pomodoro)", "2 tsp Extra Virgin Olive Oil(pizza pomodoro)", "1/2 tsp Kosher Salt(pizza pomodoro)", "1 pinch Red Pepper Flakes(pizza pomodoro)", "8 x fresh basil (large leaves), chopped(pizza pomodoro)"]
// ingredients: (17) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// label: "Pizza Dough"
// mealType: ["lunch/dinner"]
// shareAs: "http://www.edamam.com/recipe/pizza-dough-1b6dfeaf0988f96b187c7c9bb69a14fa/pizza"
// source: "Lottie + Doof"
// totalDaily: {ENERC_KCAL: {…}, FAT: {…}, FASAT: {…}, CHOCDF: {…}, FIBTG: {…}, …}
// totalNutrients: {ENERC_KCAL: {…}, FAT: {…}, FASAT: {…}, FAMS: {…}, FAPU: {…}, …}
// totalTime: 0
// totalWeight: 1634.8942798085639
// uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_1b6dfeaf0988f96b187c7c9bb69a14fa"
// url: "http://www.lottieanddoof.com/2010/01/pizza-pulp-fiction-jim-lahey/"
// yield: 4
// __proto__: Object


  