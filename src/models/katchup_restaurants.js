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

    static returnKatchupRestaurants(katchup, user, friend, restaurants){ 
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
        setCenterCard(katchup, user, friend)
    }    
}

function tempKatchups(katchup, friend, date, location){
    tempKatchup = katchup
    const readyButton = document.getElementById("ready-button")
    const cardBottomright = document.getElementById("card-bottomright")
    const cardBottomleft = document.getElementById("card-bottomleft")
    readyButton.remove()
    cardBottomleft.innerHTML = `<button id=no-button class="button button3"> <i class="fa fa-thumbs-down"></i></button>`
    cardBottomright.innerHTML = `<button id=yes-button class="button button2"> <i class="fa fa-thumbs-up"></i></button>`
    fetchKatchupsRestaurants(tempKatchup, currentUser.id, friend, date, location)                  
}

function setCenterCard(katchup, user, friend){
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
                tempKatchup.user_id = user
                tempKatchup.friend_id = friend
                tempKatchup.user_array.push(allKatchupRestaurants[i].id)
                updateKatchup(tempKatchup)
            } else if (friend == currentUser.id){
                katchup.user_id = user
                katchup.friend_id = friend
                katchup.friend_array.push(allKatchupRestaurants[i].id)
                updateKatchup(katchup)
                fetchMatch(katchup.id, user)
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