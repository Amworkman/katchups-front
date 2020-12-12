class KatchupRestaurant{  
    constructor(id, name, image_url, location, categories, rating, price){
        this.id = id
        this.name = name 
        this.image_url = image_url
        this.location = location 
        this.categories = categories
        this.rating = rating
        this.price = price
        allKatchupRestaurants.push(this)

    }

    static returnKatchupRestaurants(user, friend, restaurants){ 
        allKatchupRestaurants = []       
        restaurants.businesses.forEach(restaurant => {
            const id = restaurant.id
            const name = restaurant.name
            const image_url = restaurant.image_url
            const location = restaurant.location.display_address.join(' ')
            const categories = restaurant.categories.map(category => category.title).join(', ')
            const rating = restaurant.rating
            const price = restaurant.price
            new KatchupRestaurant(id, name, image_url, location, categories, rating, price)
        })
        setCenterCard(user, friend)
    }    
}

function setCenterCard(user, friend){
    const centerCard = document.getElementById("card-bottommid")
    const noButton = document.getElementById("no-button")
    const yesButton = document.getElementById("yes-button")

    let i = 0    

        centerCard.innerHTML =`
        <div class=friend-in-list>
            <img class=circletag src=${allKatchupRestaurants[i].image_url}>
            <h2>${allKatchupRestaurants[i].name}</h2>
            <b>${allKatchupRestaurants[i].location}</b><br><br>
            ${allKatchupRestaurants[i].categories} <br>
            ${allKatchupRestaurants[i].rating} - stars<br>
            ${allKatchupRestaurants[i].price}<br>       
        </div` 

        yesButton.addEventListener("click", function(){            
            if (user == currentUser.id){
                addToUserArray(allKatchupRestaurants[i].id, friend, user)
            } else if (friend == currentUser.id){
                addToFriendArray(allKatchupRestaurants[i].id, friend, user)
                const katchupID = allKatchups.find(katchup => katchup.friend_id == friend && katchup.user_id == user).id
                fetchMatch(katchupID)
            }
            i ++
            centerCard.innerHTML =`
                <div class=friend-in-list>
                    <img class=circletag src=${allKatchupRestaurants[i].image_url}>
                    <h2>${allKatchupRestaurants[i].name}</h2>
                    <b>${allKatchupRestaurants[i].location}</b><br><br>
                    ${allKatchupRestaurants[i].categories} <br>
                    ${allKatchupRestaurants[i].rating} - stars<br>
                    ${allKatchupRestaurants[i].price}<br>       
                </div`
               
        })

        noButton.addEventListener("click", function(){
            i ++
            centerCard.innerHTML =`
                <div class=friend-in-list>
                    <img class=circletag src=${allKatchupRestaurants[i].image_url}>
                    <h2>${allKatchupRestaurants[i].name}</h2>
                    <b>${allKatchupRestaurants[i].location}</b><br><br>
                    ${allKatchupRestaurants[i].categories} <br>
                    ${allKatchupRestaurants[i].rating} - stars<br>
                    ${allKatchupRestaurants[i].price}<br>       
                </div`
        })
}