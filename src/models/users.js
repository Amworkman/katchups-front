class User{
}

function selectUser(friendImg, user){
    friendImg.addEventListener("click", function(){
        center.innerHTML = `
        <div id=card class=card>
            <div class=card-topleft>
                <div class=friend-in-card>
                    <img class=circlecard src=${user.profile_img}>
                </div>
            </div>

            <div class=card-topright>
                <div class=friend-in-card>
                    <h2>${user.name}</h2>
                    <h2>${user.location}</h2>
                </div>
            </div>

            <div class=card-bottomleft>
                <h2>Recent katchups</h2>
            </div>

            
        </div>           
        `
        if (allFriends.some(friend => friend.email === user.email)){
           center.innerHTML +=`
            <div class=card-bottomright>
                <input type="button" id=card-katchup-btn name="katchup-btn" class=card-katchup-button value="katchup">
            </div>`

            const katchupButton = document.getElementById("card-katchup-btn")
            katchupButton.addEventListener("click", function(){
                center.innerHTML = `
                    <div id=card class=card>
                        <div class=card-topright>                            
                            <div id=date-picker>                            
                            </div>
                            <div>
                                <form id=nav-search-location><input type="text" id=nav-search-input name=nav-search-location class=location-box placeholder="${user.location}"></form>
                            </div>
                        </div> 
                        <div class=card-topleft>
                            <div class=friend-in-card>
                            <img class=circlecard src=${user.profile_img}>
                                <h2>${user.name}</h2>
                            </div>
                        </div>
                        <div class=card-bottomleft>                            
                            <div>
                            <button class="button button3"> <i class="fa fa-thumbs-down"></i></button>
                            </div>
                            
                        </div>
                        <div class=card-bottomright>
                            <div>
                                <button class="button button2"> <i class="fa fa-thumbs-up"></i></button>
                            </div>
                        </div>
                        
                        
                    </div>` 

                let datepickerDefault = new MtrDatepicker({
                    target: "date-picker",
                });

                datepickerDefault  
            })
        }else{
            center.innerHTML +=`
            <div class=card-bottomright>
                <input type="button" id=card-add-btn name="add-btn" class=card-add-button value="  +  ">
            </div>`
            
            const addButton = document.getElementById("card-add-btn")
            addButton.addEventListener("click", function(){
                if (confirm(`Do you want to send ${user.name} a friend request?`)){
                    const friendship = JSON.stringify({user_id: currentUser.id, friend_id: user.id})
                    fetch(RELATIONSHIPS_URL,{ 
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            Authorization: "Bearer " + localStorage.getItem("token")
                        },
                        body: friendship
                    })
                }

            })
        }

        const card = document.getElementById("card")
            card.addEventListener("click", function(){
            center.innerHTML=""
        }, { once:true } )
        
    })
    

}
