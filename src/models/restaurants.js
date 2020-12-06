class Restaurant{  
constructor(name, image_url, location, categories, rating, price){
    this.name = name 
    this.image_url = image_url
    this.location = location 
    this.categories = categories
    this.rating = rating
    this.price = price
    this.setRestaurant()
}

    static returnRestaurants(restaurants){        
        restaurants.businesses.forEach(restaurant => {
            const name = restaurant.name
            const image_url = restaurant.image_url
            const location = restaurant.location.display_address.join(', ')
            const categories = restaurant.categories.map(category => category.title).join(', ')
            const rating = restaurant.rating
            const price = restaurant.price
            new Restaurant(name, image_url, location, categories, rating, price)
        })
        
    }    

    setRestaurant(){
        const lineItem = document.createElement('li')
        lineItem.innerHTML =`
        <div class=friend-in-list>
            <img class=circletag src=${this.image_url}>
            <h2>${this.name}</h2>
            <b>${this.location}</b><br><br>
            ${this.categories} <br>
            ${this.rating} - stars<br>
            ${this.price}<br>       
        </div`
        restaurantContainer.appendChild(lineItem)   
    }
}