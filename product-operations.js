// Products CRUD operation

import makeNetworkCall from "./api-client.js";
import Product from "../models/product.js";

const productOperations = {
    products: [],
    
    search(pizzaId) {
        const product = this.products.find(currentProduct => currentProduct.id === pizzaId);

        if (product) {
            console.log('Product Found', product);
            product.isAddedInCart = true;
            console.log('Array', this.products);
        } else {
            console.log('Product not found with id:', pizzaId);
        }
    },
    getProductsInCart(){
        const productInBasket = this.products.filter(product=>product.isAddedInCart);
        return productInBasket;           
    },
    async LoadProducts() {
        const pizzas = await makeNetworkCall(); // made a network call to api-client
        const pizzaArray = pizzas['Vegetarian'];
        const productsArray = pizzaArray.map(pizza => {
            const currentPizza = new Product(
                pizza.id,
                pizza.name,
                pizza.menu_description,
                pizza.price,
                pizza.assets.product_details_page[0].url
            );
            return currentPizza;
        });

        console.log('Product Array', productsArray);
        this.products = productsArray;
        return productsArray;
    },
    
    sortProducts() {
        // Implement sorting logic based on requirements
    },
    
    searchProducts() {
        // Implement search logic based on requirements
    }
};

export default productOperations;
