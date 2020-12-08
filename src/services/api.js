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

