


document.addEventListener("DOMContentLoaded", function(){



    // !VARIABLES 




    const main = document.getElementById("main")    
    const BASE_URL = "http://localhost:3000"
    const AUTO_URL = `${BASE_URL}/auto_login`
    const USERS_URL = `${BASE_URL}/users`
    const FRIENDS_URL = `${BASE_URL}/friends`
    const PENDING_URL = `${BASE_URL}/pending_friends`
    const PENDING_DELETE_URL = `${BASE_URL}/delete_pending`
    const LOGIN_URL = `${BASE_URL}/login`
    const RESTAURANTS_URL = `${BASE_URL}/restaurants`
    const RELATIONSHIPS_URL = `${BASE_URL}/relationships`
    const restaurantContainer = document.getElementById('restaurantContainer')
    const userContainer = document.getElementById('userContainer')
    const headerContainer = document.getElementById('header')
    const rightSearchContainer = document.getElementById('right-search')
    const loginCard = document.getElementById("login-card")
    const center = document.getElementById("center")

    const intro = "Messenger bag direct trade plaid, sartorial ugh etsy bicycle rights YOLO DIY prism cred tattooed blue bottle you probably haven't heard of them lyft. Polaroid poke kombucha readymade hot chicken banjo. Hot chicken literally enamel pin vinyl, fashion axe edison bulb kogi. Irony air plant venmo, waistcoat activated charcoal kitsch put a bird on it listicle franzen kale chips shaman."
    const howTo = "Quinoa prism church-key la croix ramps. Celiac tofu yr chicharrones, helvetica man bun drinking vinegar brooklyn. Marfa vegan vaporware pabst brunch. Kale chips snackwave banjo authentic. Tousled disrupt iPhone chicharrones health goth before they sold out narwhal brooklyn butcher DIY street art. Single-origin coffee +1 keytar, neutra four loko pinterest selvage actually pour-over offal hoodie."



    // !START



    run()
    

    function run(){
        if (localStorage.length > 0){
            center.innerHTML =""            
            fetchRestaurants()
            fetchFriends() 
            fetchPending()
            getCurrentUser()
             
        }else{
            logIn() 
        }
    }



    // !NAVIGATION



    function setNavigation(user) {

        

        headerContainer.innerHTML = `<input type="button" id=logout-btn name="logout-btn" class=logout-btn value="Log Out">
                                    <img class=nav-img src=${user.profile_img}>
                                    <input type="button" id=user-tag name="user-tag" class=username-btn value="${user.username}">
                                    <input type="button" id=find-btn name="find-btn" class=find-btn value="find friends">
                                    <input type="button" id=recents-btn name="recents-btn" class=recents-btn value="recent katchups">`
                
        const logOutButton = document.getElementById("logout-btn")
        const findFriendsButton = document.getElementById("find-btn")

        logOutButton.addEventListener("click",function(){
            localStorage.clear()
            location.reload()
            
        })

        findFriendsButton.addEventListener("click",function(){
            headerContainer.innerHTML = `<input type="button" id=logout-btn name="logout-btn" class=logout-btn value="Log Out">
                                    <img class=nav-img src=${user.profile_img}>
                                    <input type="button" id=user-tag name="user-tag" class=username-btn value="${user.username}">
                                    <form id=nav-search><input type="text" name=nav-search class=nav-search-box placeholder="FIND FRIENDS"></form>
                                    <input type="button" id=recents-btn name="recents-btn" class=recents-btn value="recent katchups">`
            const navSearch = document.getElementById("nav-search") 
           
            navSearch.addEventListener("submit", function(event){ 
                event.preventDefault()      
                const formData = new FormData(navSearch)
                const plainFormData = formData.get("nav-search")
                center.innerHTML = `
                    <div class=card id=card>
                    </div>`
                const card = document.getElementById("card")
                fetch(`${USERS_URL}?search=${plainFormData}`,{
                    method: "Get",
                    headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    }
                })
            
                .then(resp => resp.json())
                .then(data => returnUsers(data))
            })
                
            function returnUsers(users){
                users.forEach(user => setUsers(user))
               
            }    
        
            function setUsers(user){
                const lineItem = document.createElement('li')
                lineItem.innerHTML = `
                <div class=friend-in-list name=confirmed>
                    <img class=circletag src=${user.profile_img}>
                    <h2>${user.name}</h2>
                </div`
            card.appendChild(lineItem)
            const userImg = lineItem.querySelector("img")
            //userImg.style.cursor = "pointer"
            //selectuser(userImg,user)
            }

                //center.innerHTML = `
                    //<div class=card>
                    //</div>`
             

            center.addEventListener("click", function(){
                setNavigation(user)
                
            })

        })

    }



    // !CURRENT USER



    function getCurrentUser(){
        fetch(AUTO_URL,{
            method: "Get",
            headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(resp => resp.json())
        .then(data => setCurrentUser(data))
    }

    function setCurrentUser(user){
        globalThis.currentUser = user
        setNavigation(user)

    }



    // !RESTAURANTS



    function fetchRestaurants() {
        restaurantContainer.textContent = ""
        fetch(RESTAURANTS_URL,{
            method: "Get",
            headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(resp => resp.json())
        .then(data => returnRestaurants(data))
    }

    function returnRestaurants(restaurants){        
        restaurants.businesses.forEach(restaurant => setRestaurant(restaurant))
    }    
    
    function setRestaurant(restaurant){
    const lineItem = document.createElement('li')
    lineItem.innerHTML =`
    <div class=friend-in-list>
        <img class=circletag src=${restaurant.image_url}>
        <h2>${restaurant.name}</h2>
        <b>${restaurant.location.display_address.join(', ')}</b><br><br>
        ${restaurant.categories.map(category => category.title).join(', ')} <br>
        ${restaurant.rating} - stars<br>
        ${restaurant.price}<br>       
    </div`
    restaurantContainer.appendChild(lineItem)   
    }



    //!FRIENDS



    // var searchTerm = "Wil";
    // var results = persons.filter(function(person) {
    //     return person.Name.indexOf(searchTerm) > -1;
    // });
    // console.log(results);



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
        .then(data => returnFriends(data))
    }

    function returnFriends(users){
        users.forEach(user => setFriends(user))
    }    

    function setFriends(user){
        const lineItem = document.createElement('li')
        lineItem.innerHTML = `
        <div class=friend-in-list name=confirmed>
            <img class=circletag src=${user.profile_img}>
            <h2>${user.name}</h2>
        </div`
    userContainer.appendChild(lineItem)
    const friendImg = lineItem.querySelector("img")
    friendImg.style.cursor = "pointer"
    selectFriend(friendImg,user)
    }

    function selectFriend(friendImg,user){
        
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

            <div class=card-bottomright>
                <input type="button" id=card-katchup-btn name="katchup-btn" class=card-katchup-button value="katchup">
            </div>
            `
            const card = document.getElementById("card")
                card.addEventListener("click", function(){
                center.innerHTML=""
            })
            
        })
        

    }



    // !PENDING FRIENDS



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
        .then(data => returnPending(data))
    }

    function returnPending(users){
        users.forEach(user => setPending(user))
    }    

    function setPending(user){
        let lineItem = document.createElement('li')
        lineItem.innerHTML = `
        <div class=friend-in-list name=pending>
            <img class=circletag src=${user.profile_img}>
            <h2>${user.name}</h2>
            <input type="button" id=approve-btn name="approve-btn" class="approve-btn" value="Accept">
            <input type="button" id=reject-btn name="reject-btn" class="reject-btn" value="Delete">
        </div`
        userContainer.prepend(lineItem)
        const pendingID = user.id
        const approveButton = document.getElementById("approve-btn")
        const rejectButton = document.getElementById("reject-btn")
        
        addFriend(pendingID,approveButton,lineItem,user)
        rejectRequest(pendingID,rejectButton,lineItem)        
    }

    function addFriend(pendingID,approveButton,lineItem,user){
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
            
        })
    }

    function rejectRequest(pendingID,rejectButton,lineItem){
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



    // !SEARCH FRIENDS LIST



    function setSearchList(){
        // listen for keystroke, modify friends list
        // to show friends with names that include
        // text in the search box

    }



    // !LOG IN



    function logIn(){
        restaurantContainer.textContent = ""
        userContainer.textContent = ""

        const introItem = document.createElement('li')
        introItem.innerHTML = `
        <h2>Welcome to katchups</h2>
            ${intro}`   
        userContainer.appendChild(introItem)

        const howToItem = document.createElement('li')
        howToItem.innerHTML = `
        <h2>How to use katchups</h2>
            ${howTo}`   
        restaurantContainer.appendChild(howToItem)
        

        loginCard.innerHTML = `
        <div class=form fade-in-element>
            <form id=login-form action="${LOGIN_URL}" method="post">
                <input type="username" name="username" class="input-box" placeholder="Username">
                <input type="password" name="password" class="input-box" placeholder="Password">
                <input type="submit" name="login-btn" class="btn" value="Sign In">
                <input type="button" id=signup-btn name="signup-btn" class="btn" value="Don't have an account?">
            </form>
        </div>
        `

        const logInForm = document.getElementById("login-form")
        logInForm.addEventListener("submit", handleFormSubmit)
        async function handleFormSubmit(event) {            
            event.preventDefault()           
            const form = event.currentTarget           
            const url = LOGIN_URL
            try {
                const formData = new FormData(logInForm)
                const responseData = await formDataAsJson({ url, formData })
                const token = responseData.token
                localStorage.setItem('token', token)                
                location.reload()
	        } catch (error) {
		        console.error(error)
	        }   
        }
        
        async function formDataAsJson({ url, formData }) {
            const plainFormData = Object.fromEntries(formData.entries())
            const formDataJsonString = JSON.stringify(plainFormData)
            const fetchOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: formDataJsonString,
            }
            
            const response = await fetch(url, fetchOptions)

	        if (!response.ok) {
		        const errorMessage = await response.text()
		        throw new Error(errorMessage)
	        }

	        return response.json()
        }

        const signUpButton = document.getElementById("signup-btn")

        signUpButton.addEventListener("click", function(){
            signUp()
        })
    }



    // !SIGN UP



    function signUp(){
        restaurantContainer.textContent = ""
        userContainer.textContent = ""

        const introItem = document.createElement('li')
        introItem.innerHTML = `
        <h2>Welcome to katchups</h2>
            ${intro}`   
        userContainer.appendChild(introItem)

        const howToItem = document.createElement('li')
        howToItem.innerHTML = `
        <h2>How to use katchups</h2>
            ${howTo}`   
        restaurantContainer.appendChild(howToItem)
        

        loginCard.innerHTML = `
        <div class=form fade-in-element>
            <form id=signup-form action="${FRIENDS_URL}" method="post">
                <input type="text" name="name" class="input-box" placeholder="Full Name">
                <input type="email" name="email" class="input-box" placeholder="Email">
                <input type="username" name="username" class="input-box" placeholder="Username">
                <input type="password" name="password" class="input-box" placeholder="Password">
                <input type="password" name="password_confirmation" class="input-box" placeholder="Confirm Password">
                <input type="submit" id=signup-btn name="signup-btn" class="btn" value="Sign Up">
                <input type="button" id=signin-btn name="signup-btn" class="btn" value="Already have an account?">
            </form>
        </div>
        `

        const signUpForm = document.getElementById("signup-form")
        signUpForm.addEventListener("submit", handleFormSubmit);
        async function handleFormSubmit(event) {            
            event.preventDefault()           
            const form = event.currentTarget           
            const url = FRIENDS_URL
            try {
                const formData = new FormData(signUpForm)
                const responseData = await formDataAsJson({ url, formData })
                const token = responseData.token
                localStorage.setItem('token', token)
                location.reload()
	        } catch (error) {
		        console.error(error)
	        }   
        }
        
        async function formDataAsJson({ url, formData }) {
            const plainFormData = Object.fromEntries(formData.entries())
            const formDataJsonString = JSON.stringify(plainFormData)
            
            const fetchOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: formDataJsonString,
            }
            
            const response = await fetch(url, fetchOptions)

	        if (!response.ok) {
		        const errorMessage = await response.text()
		        throw new Error(errorMessage)
	        }

	        return response.json()
        }

        const signInButton = document.getElementById("signin-btn")

        signInButton.addEventListener("click", function(){
            logIn()
        })
    }



});


