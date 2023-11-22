// controller folder main function is to connect between html and model,services
import makeNetworkCall from "../services/api-client.js";
import productOperations from "../services/product-operations.js";

const URL = 'https://raw.githubusercontent.com/Skill-risers/pizzajson/main/pizza.json';
async function LoadPizzas(){
    try {
        const pizzas = await makeNetworkCall(URL);
        console.log('Pizzas:', pizzas);
        const pizzaArray = pizzas['Vegetarian'];
      
        for (const pizza of pizzaArray) {
            preparePizzaCard(pizza);
        }
    } catch (error) {
        console.error('Error loading products:', error);
        throw error;
    }
}

LoadPizzas();

{/* <div class="col-4">
<div class="card" style="width: 18rem;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/800px-Pizza-3007395.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div> */}
  // above is the code for static creation of cards and below is the dynamic creation of cards using DOM
  function addToCart(pizza) {
    console.log('Add to Cart Called for Pizza ID:', pizza.id);
    productOperations.search(pizza.id);
    printBasket();
}

  
  function printBasket(){
    const cartProducts = productOperations.getProductsInCart();
    const basket = document.querySelector('#basket');
    basket.innerHTML = '';
    for(let product of cartProducts){
      const li = document.createElement('li');
      li.innerText = product.name + ' ' + product.price;
      basket.appendChild(li);
    }
  }
  
  function preparePizzaCard(pizza) {
    const outputDiv = document.querySelector('#output'); // from index
    const colDiv = document.createElement('div');
    colDiv.className = 'col-4 mb-4';
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.style = "width: 18rem";
    colDiv.appendChild(cardDiv);
    const img = document.createElement('img');

    // Array of different image links
    const imageLinks = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhwaU93sXfzYV3dbjgD-Z19s70M9vn5DkDt0qgWXdGjOWVMnoRhlWp3_Z4ycn-7q3_e7w&usqp=CAU',
        'https://media.istockphoto.com/id/979167732/photo/pepperoni-pizza-on-black-concrete-background.jpg?s=612x612&w=0&k=20&c=uk3Qujzr09SUhXfZQ3m2nfHIpZmLJ6MwpcBriDbvPVY=',
        'https://img.freepik.com/free-photo/top-view-pepperoni-pizza-with-mushroom-sausages-bell-pepper-olive-corn-black-wooden_141793-2158.jpg?w=2000',
        'https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/momo-mia-veg.5f34ea52c10db4a56881051692a618ca.1.jpg',
        'https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/schezwan-margherita.4371d9483546db47a97c5503ccad0c2f.1.jpg',
        'https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/mazedar-makhni-paneer.cb3150d2be9cb8dcd248be70921c5196.1.jpg',
        'https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/ultimate-tandoori-veggie.059dfd9b3f088818ed725872d98d20b6.1.jpg',
        'https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/mexican-fiesta.559a1961ca021b8fb90367c6918e50f1.1.jpg'
        // Add more links as needed
    ];

    // Set the image source dynamically based on the index
    img.src = imageLinks[Math.floor(Math.random() * imageLinks.length)];

    img.className = 'card-img-top';
    cardDiv.appendChild(img);
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardDiv.appendChild(cardBody);
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = pizza.name;
    const pTag = document.createElement('p');
    pTag.className = 'card-text';
    pTag.innerText = pizza.menu_description;
    const button = document.createElement('button');
   
    button.addEventListener('click', () => {console.log('Clicked on pizza with id', pizza.id);
    addToCart(pizza.id);
  });
    button.innerText = 'Add to Cart';
    button.className = 'btn btn-primary';
    cardBody.appendChild(h5);
    cardBody.appendChild(pTag);
    cardBody.appendChild(button);
    outputDiv.appendChild(colDiv);
}
