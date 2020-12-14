function setCurrentUser(user){
    globalThis.currentUser = user
    setNavigation(user)

}

function fetchFriends() {
    userContainer.textContent = ""
    fetch(FRIENDS_URL,{
        method: "Get",
        headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
    .then(resp => resp.json())
    .then(data => Friend.returnFriends(data))
}

function fetchPending() {
    userContainer.textContent = ""
    fetch(PENDING_URL,{
        method: "Get",
        headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
    .then(resp => resp.json())
    .then(data => Pending.returnPending(data))
}

function fetchKatchupsRestaurants(katchup, user, friend, date, location) {
    fetch(`${RESTAURANTS_URL}?date=${date}&location=${location}`,{
        method: "Get",
        headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
    .then(resp => resp.json())
    .then(data => KatchupRestaurant.returnKatchupRestaurants(katchup, user, friend, data))
}

function createKatchup(friend, date, location){
    fetch(KATCHUPS_URL,{
        method: "POST",
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({user_id: currentUser.id, friend_id: friend, starts_at: date, location: location}),
    })
    .then(resp => resp.json())
    .then(data => tempKatchups(data, friend, date, location))    
}

function addToUserArray(restaurant, friend, user){
    fetch(`${KATCHUPS_URL}/1`,{
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({user_id: user, friend_id: friend, user_restaurant: restaurant}),
    })
    .then(resp => resp.json())    
}

function addToFriendArray(restaurant, friend, user){
    fetch(`${KATCHUPS_URL}/1`,{
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({user_id: user, friend_id: friend, friend_restaurant: restaurant}),
    })
    .then(resp => resp.json())    
}

function fetchKatchups(){
    fetch(KATCHUPS_URL,{
        method:"GET",
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token") 
        }
    })
    .then(resp => resp.json())
    .then(data => Katchup.returnKatchups(data))    
}

function fetchMatch(id, user){
    fetch(`${KATCHUPS_URL}/${id}`,{
        method:"GET",
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token") 
        }
    })
    .then(resp => resp.json())
    .then(data => checkForMatch(data, user))
}

function deleteKatchup(id){
    fetch(`${KATCHUPS_URL}/${id}`,{
        method:"DELETE",
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token") 
        }
    })
}

function updateKatchup(katchup){
    fetch(`${KATCHUPS_URL}/${katchup.id}`,{
        method:"PATCH",
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token") 
        },
        body: JSON.stringify({
            friend_confirmation: katchup.friend_confirmation,
            user_confirmation: katchup.user_confirmation,
            restaurant_id: katchup.restaurant_id,
            user_array: katchup.user_array,
            friend_array: katchup.friend_array,
            user_id: katchup.user_id,
            friend_id: katchup.friend_id }),
    })
}

