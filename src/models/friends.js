class Friend{
    constructor(id, name, location, email, username, profile_img){
        this.id = id
        this.name = name 
        this.location = location 
        this. email = email 
        this. username = username 
        this.profile_img = profile_img
        this.setFriends()
    }

    static returnFriends(users){
        allFriends = []
        users.forEach(user => {
            const id = user.id
            const name = user.name 
            const email = user.email
            const location = user.location 
            const username = user.username
            const profile_img = user.profile_img 
            new Friend(id, name, location, email, username, profile_img)  
        })
        
    }    

    setFriends(){
        allFriends.push(this)
        const lineItem = document.createElement('li')
        lineItem.innerHTML = `
        <div class=friend-in-list name=confirmed>
            <img class=circletag src=${this.profile_img}>
            <h2>${this.name}</h2>
        </div`
    userContainer.appendChild(lineItem)
    const friendImg = lineItem.querySelector("img")
    friendImg.style.cursor = "pointer"
    selectUser(friendImg, this)
    }
}

function setSearchList(){
    const friendsSearch = document.getElementById("friend-search")
    friendsSearch.addEventListener("input", function(event){
        const searchParams = this.value
        event.stopPropagation()
        userContainer.innerHTML = ""       
        allFriends.filter(searchFriendList)

        function searchFriendList(friend){
            if (friend.name.toLowerCase().includes(searchParams.toLowerCase())){
                const lineItem = document.createElement('li')
                lineItem.innerHTML = `
                    <div class=friend-in-list name=confirmed>
                        <img class=circletag src=${friend.profile_img}>
                        <h2>${friend.name}</h2>
                    </div`
                userContainer.appendChild(lineItem)
                const friendImg = lineItem.querySelector("img")
                friendImg.style.cursor = "pointer"
                selectUser(friendImg, friend)
            }
        }        
    })
}