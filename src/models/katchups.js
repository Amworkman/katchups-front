class Katchup{  
    constructor(id, location, relationship_id, restaurant_id, starts_at, user_array, friend_array, user_id, friend_id, user_confirmation, friend_confirmation, confirmed){
        this.id = id
        this.location = location 
        this.relationship_id = relationship_id
        this.restaurant_id = restaurant_id 
        this.starts_at = starts_at
        this.user_array = user_array
        this.friend_array = friend_array
        this.user_id = user_id
        this.friend_id = friend_id 
        this.user_confirmation = user_confirmation
        this.friend_confirmation = friend_confirmation
        this.confirmed = confirmed
        allKatchups.push(this)

    }

    static returnKatchups(katchups){ 
        allKatchups = []       
        katchups.forEach(katchup => {
        const id = katchup.id
        const location = katchup.location 
        const relationship_id = katchup.relationship_id
        const restaurant_id = katchup.restaurant_id
        const starts_at = katchup.starts_at
        const user_array = katchup.user_array
        const friend_array = katchup.friend_array
        const user_id = katchup.user_id
        const friend_id = katchup.friend_id
        const user_confirmation = katchup.user_confirmation
        const friend_confirmation = katchup.friend_confirmation
        const confirmed = katchup.confirmed
            new Katchup(id, location, relationship_id, restaurant_id, starts_at, user_array, friend_array, user_id, friend_id, user_confirmation, friend_confirmation, confirmed)
        })
    setKatchupsList()
    }    
}

function setKatchupsList(){
    const katchupCard = document.getElementById("katchupCard")
    allKatchups.forEach(katchup =>{        
        if (katchup.user_id != currentUser.id && katchup.friend_confirmation == false){
            let katchupFriend = allFriends.find(friend => friend.id == katchup.user_id)
            let localDate = new Date(katchup.starts_at)
            katchupCard.innerHTML +=  `
            <div class=friend-in-search>
                <img class=circlesearch src=${katchupFriend.profile_img}>
                <h3>${katchupFriend.name} Wants to katchup</h3>
            </div>`
            const userImg = katchupCard.querySelector("img")
            userImg.style.cursor = "pointer"
            userImg.addEventListener("click", function(){
                katchupCard.innerHTML = `
                    <div class=card-topright>                            
                            
                            <div>
                            <h2>Wants to katchup on...</h2><br><br>
                            <h3>${localDate.toLocaleString()}</h3>
                            <h4>in</h4>
                                <h3>${katchup.location}</h3>
                                confirm   deny
                            </div>
                        </div> 
                        <div class=card-topleft>
                            <div class=friend-in-card>
                            <img class=circlecard src=${katchupFriend.profile_img}>
                                <h2>${katchupFriend.name}</h2>
                            </div>
                        </div>
                        <div id=card-bottomleft class=card-bottomleft>                           
                        </div>
                        <div id= card-bottomright class=card-bottomright>                               
                        </div>
                        <div id=card-bottommid class=card-bottommid>
                            <button id=ready-button class="button button4">READY</button>
                        </div>
                `

                const readyButton = document.getElementById("ready-button")
                const cardBottomright = document.getElementById("card-bottomright")
                const cardBottomleft = document.getElementById("card-bottomleft")
                readyButton.addEventListener("click", async function(){
                    readyButton.remove()
                    cardBottomleft.innerHTML = `<button id=no-button class="button button3"> <i class="fa fa-thumbs-down"></i></button>`
                    cardBottomright.innerHTML = `<button id=yes-button class="button button2"> <i class="fa fa-thumbs-up"></i></button>`
                    const result = await fetchKatchupsRestaurants(katchup.user_id, currentUser.id, katchup.stats_at, katchup.location)                 
                })
            })

            

        }else if (katchup.user_id == currentUser.id && katchup.friend_confirmation == false){
            let katchupFriend = allFriends.find(friend => friend.id == katchup.friend_id)
            katchupCard.innerHTML +=  `
            <div class=friend-in-search>
                <img class=circlesearch src=${katchupFriend.profile_img}>
                <h3>Waiting on ${katchupFriend.name}</h3>
            </div>`
        }else if (katchup.user_id != currentUser.id && katchup.user_confirmation == true && katchup.friend_confirmation == true){
            let katchupFriend = allFriends.find(friend => friend.id == katchup.user_id)
            let katchupRestaurant = allRestaurants.find(restaurant => restaurant.id == katchup.restaurant_id )
            katchupCard.innerHTML +=  `
            <div class=friend-in-search>
                <img class=circlesearch src=${katchupFriend.profile_img}><img class=circlesearch src=${katchupRestaurant}>
                <h3>${katchupFriend.name} Upcoming katchup</h3>
                <h4>${katchup.start_time}</h4>
            </div>`
        }else if (katchup.user_id == currentUser.id && katchup.user_confirmation == true && katchup.friend_confirmation == true){
            let katchupFriend = allFriends.find(friend => friend.id == katchup.friend_id)
            let katchupRestaurant = allRestaurants.find(restaurant => restaurant.id == katchup.restaurant_id )
            katchupCard.innerHTML +=  `
            <div class=friend-in-search>
                <img class=circlesearch src=${katchupFriend.profile_img}><img class=circlesearch src=${katchupRestaurant}>
                <h3>${katchupFriend.name} Upcoming katchup</h3>
                <h4>${katchup.start_time}</h4>
              </div>`
        }       
    })
}

function checkForMatch(katchup){
    const match = katchup.user_array.filter(restaurantId => katchup.friend_array.includes(restaurantId))
    
    if (match.length > 0){
        center.innerHTML = ""
        const backgroundText = document.getElementById("background-text")
        const katchupRestaurantId = match[0] 
        debugger
        const restaurantMatch = allKatchupRestaurants.find(restaurant => restaurant.id = katchupRestaurantId)
        backgroundText.innerHTML = `<h1>MATCH</h1>`
        center.innerHTML = `
        <img class=circlecard src=${restaurantMatch.image_url}>
        <h2>${restaurantMatch.name}</h2>
        <button>Confirm katchup</button>
        <button>Reject katchup</button>`
    }
}