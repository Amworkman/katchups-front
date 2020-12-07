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
        allRestaurants = []       
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
        allRestaurants.push(this)
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
        const restaurantImg = lineItem.querySelector("img")
        restaurantImg.style.cursor = "pointer"
        selectRestaurant(restaurantImg, this)   
    }
}

function selectRestaurant(restaurantImg, restaurant){
    restaurantImg.addEventListener("click", function(){
        center.innerHTML = `
        <div id=card class=card>
            <div class=card-topleft>
                <div class=friend-in-card>
                    <img class=circlecard src=${restaurant.image_url}>
                </div>
            </div>

            <div class=card-topright>
                <div class=friend-in-card>
                    <h2>${restaurant.name}</h2>
                    <h3>${restaurant.location}</h3>
                    ${restaurant.categories}<br>
                    ${restaurant.rating}<br>
                    ${restaurant.price}                   
                </div>
            </div>

            <div class=card-bottomleft>
                <h2>Yelp Reviews</h2>
            </div>

            
        </div> 
        
        <div class=card-bottomright>
            <input type="button" id=rest-katchup-btn name="katchup-btn" class=rest-katchup-button value="katchup here">
        </div>`

        const card = document.getElementById("card")
            card.addEventListener("click", function(){
            center.innerHTML=""
        }, { once:true } )
    })
}

function setSearchRestList(){
    const restSearch = document.getElementById("rest-search")
    restSearch.addEventListener("input", function(event){
        const searchParams = this.value
        restaurantContainer.innerHTML = ""       
        allRestaurants.filter(searchRestList)

        function searchRestList(restaurant){
            if (restaurant.name.toLowerCase().includes(searchParams.toLowerCase())){
                const lineItem = document.createElement('li')
                lineItem.innerHTML = `
                    <div class=friend-in-list>
                        <img class=circletag src=${restaurant.image_url}>
                        <h2>${restaurant.name}</h2>
                        <b>${restaurant.location}</b><br><br>
                        ${restaurant.categories} <br>
                        ${restaurant.rating} - stars<br>
                        ${restaurant.price}<br>       
                    </div`
                restaurantContainer.appendChild(lineItem)
                const restaurantImg = lineItem.querySelector("img")
                restaurantImg.style.cursor = "pointer"
                selectRestaurant(restaurantImg, restaurant)
            }
        } 
        center.addEventListener("click", function(){
            document.getElementById("rest-search").value = ""
            fetchRestaurants()         
        }, { once: true })       
    })
}