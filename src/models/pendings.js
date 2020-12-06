class Pending{
    constructor(id, name, location, email, username, profile_img){
        this.id = id
        this.name = name 
        this.location = location 
        this. email = email 
        this. username = username 
        this.profile_img = profile_img
        this.setPending()
    }

static returnPending(users){
    users.forEach(user => {
        const id = user.id
        const name = user.name 
        const email = user.email
        const location = user.location 
        const username = user.username
        const profile_img = user.profile_img 
        new Pending(id, name, email, location, username, profile_img)  
    })

}    

setPending(){
    let lineItem = document.createElement('li')
    lineItem.innerHTML = `
    <div class=friend-in-list name=pending>
        <img class=circletag src=${this.profile_img}>
        <h2>${this.name}</h2>
        <input type="button" id=approve-btn name="approve-btn" class="approve-btn" value="Accept">
        <input type="button" id=reject-btn name="reject-btn" class="reject-btn" value="Delete">
    </div`
    userContainer.prepend(lineItem)
    const pendingID = this.id
    const approveButton = document.getElementById("approve-btn")
    const rejectButton = document.getElementById("reject-btn")
    
    this.addFriend(pendingID, approveButton, lineItem, this)
    this.rejectRequest(pendingID, rejectButton, lineItem)        
}

addFriend(pendingID,approveButton,lineItem,user){
    approveButton.addEventListener("click", function(){
        const relationshipData = (`{ "user_id":${currentUser.id}, "friend_id":${pendingID}, "confirmed":"true"}`)
        fetch(`${RELATIONSHIPS_URL}/${currentUser.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: relationshipData,                
        })
        
        lineItem.innerHTML = `
        <div class=friend-in-list name=confirmed>
            <img class=circletag src=${user.profile_img}>
            <h2>${user.name}</h2>
        </div`
        location.reload()
        
    })
}

rejectRequest(pendingID,rejectButton,lineItem){
    rejectButton.addEventListener("click", function(){
        const relationshipData = (`{ "user_id":${currentUser.id}, "friend_id":${pendingID}}`)
        fetch(`${PENDING_DELETE_URL}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: relationshipData,                
        })
        lineItem.remove()
    })
}
}
