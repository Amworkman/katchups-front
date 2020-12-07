class Friend{
    constructor(name, location, email, username, profile_img){
        this.name = name 
        this.location = location 
        this. email = email 
        this. username = username 
        this.profile_img = profile_img
        this.setFriends()
    }
     //!FRIENDS

    // var searchTerm = "Wil";
    // var results = persons.filter(function(person) {
    //     return person.Name.indexOf(searchTerm) > -1;
    // });
    // console.log(results);



    static returnFriends(users){
        allFriends = []
        users.forEach(user => {
          const name = user.name 
          const email = user.email
          const location = user.location 
          const username = user.username
          const profile_img = user.profile_img 
          new Friend(name, location, email, username, profile_img)  
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
        center.addEventListener("click", function(){
            document.getElementById("friend-search").value = ""
            fetchFriends()         
        }, { once: true })       
    })
}