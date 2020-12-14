document.addEventListener("DOMContentLoaded", function(){

    // !VARIABLES
   
    const BASE_URL = "https://katchupsapi.herokuapp.com"
    const AUTO_URL = `${BASE_URL}/auto_login`
    const USERS_URL = `${BASE_URL}/users`
    const FRIENDS_URL = `${BASE_URL}/friends`
    const LOGIN_URL = `${BASE_URL}/login`
    const restaurantContainer = document.getElementById('restaurantContainer')
    const userContainer = document.getElementById('userContainer')
    const headerContainer = document.getElementById('header')
    const loginCard = document.getElementById("login-card")
    const center = document.getElementById("center")

    const intro = "Messenger bag direct trade plaid, sartorial ugh etsy bicycle rights YOLO DIY prism cred tattooed blue bottle you probably haven't heard of them lyft. Polaroid poke kombucha readymade hot chicken banjo. Hot chicken literally enamel pin vinyl, fashion axe edison bulb kogi. Irony air plant venmo, waistcoat activated charcoal kitsch put a bird on it listicle franzen kale chips shaman."
    const howTo = "Quinoa prism church-key la croix ramps. Celiac tofu yr chicharrones, helvetica man bun drinking vinegar brooklyn. Marfa vegan vaporware pabst brunch. Kale chips snackwave banjo authentic. Tousled disrupt iPhone chicharrones health goth before they sold out narwhal brooklyn butcher DIY street art. Single-origin coffee +1 keytar, neutra four loko pinterest selvage actually pour-over offal hoodie."

    // !START

    run()    

    function run(){
        if (localStorage.token){
            center.innerHTML =""
            fetchPlacesKey()            
            fetchRestaurants()
            fetchFriends() 
            fetchPending()
            getCurrentUser()
            setSearchList()
            setSearchRestList()

             
        }else{
            logIn() 
            fetchPlacesKey()
        }
    }

    function fetchPlacesKey() {
        fetch(`${BASE_URL}/places_key`,{
            method: "Get",
            headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
            }
    })

    .then(resp => resp.json())
    .then(data => setPlacesKey(data))
    
    function setPlacesKey(data){
        const key = data
        localStorage.setItem('places', key)
    }
    
    }

    // !NAVIGATION

    function setNavigation(user) {       

        headerContainer.innerHTML = `<input type="button" id=logout-btn name="logout-btn" class=logout-btn value="Log Out">
                                    <img class=nav-img src=${user.profile_img}>
                                    <input type="button" id=user-tag name="user-tag" class=username-btn value="${user.name}">
                                    <input type="button" id=find-btn name="find-btn" class=find-btn value="find friends">
                                    <input type="button" id=katchups-btn name="katchups-btn" class=recents-btn value="katchups">
                                    <input type="button" id=location-btn name="location-btn" class=location-btn value="change location">`
                
        const logOutButton = document.getElementById("logout-btn")
        const findFriendsButton = document.getElementById("find-btn")
        const locationButton = document.getElementById("location-btn")
        const katchupsButton = document.getElementById("katchups-btn")

        logOutButton.addEventListener("click",function(){
            localStorage.clear()
            location.reload()
            
        })
        katchupsButton.addEventListener("click", async function(){
            let result = await fetchKatchups()
                center.innerHTML = `
                    <div id=katchupCard class=katchup-card>
                    </div>`           
        })

        locationButton.addEventListener("click", function(){
            headerContainer.innerHTML = `<input type="button" id=logout-btn name="logout-btn" class=logout-btn value="Log Out">
                                        <img class=nav-img src=${user.profile_img}>
                                        <input type="button" id=user-tag name="user-tag" class=username-btn value="${user.name}">
                                        <input type="button" id=find-btn name="find-btn" class=find-btn value="find friends">
                                        <input type="button" id=recents-btn name="recents-btn" class=recents-btn value="katchups">
                                        <form id=nav-search-location><input type="text" id=nav-search-input name=nav-search-location class=nav-location-box placeholder="ENTER CITY"></form>`            
            loadPlacesScript()           
            
            function loadPlacesScript() {
                const navSearchinput = document.getElementById("nav-search-input")
                navSearchinput.focus()
                const searchScript = document.createElement("script")
                searchScript.id = "search-script"
                searchScript.textContent = `
                                        function initMap(){
                                        let input = document.getElementById('nav-search-input')
                                        let autocomplete = new google.maps.places.Autocomplete(input)                 
            
                                        }`
                document.body.appendChild(searchScript);

                const placesScript = document.createElement("script")
                placesScript.id = "places-script"
                placesScript.src = `https://maps.googleapis.com/maps/api/js?key=${localStorage.places}&libraries=places&callback=initMap`
            
                document.body.appendChild(placesScript)
                navSearchinput.addEventListener("focusout", function(){
                    setNavigation(user)
                    let pacContainer = document.getElementsByClassName("pac-container")
                    document.getElementById("search-script").remove()
                    document.getElementById("places-script").remove()
                    while(pacContainer.length > 0) {
                        pacContainer[0].remove();
                     }
                }, { once: true } )
            }
        })

        findFriendsButton.addEventListener("click",function(){
            headerContainer.innerHTML = `<input type="button" id=logout-btn name="logout-btn" class=logout-btn value="Log Out">
                                    <img class=nav-img src=${user.profile_img}>
                                    <input type="button" id=user-tag name="user-tag" class=username-btn value="${user.name}">
                                    <form id=nav-search><input id=nav-input type="text" name=nav-search class=nav-search-box placeholder="FIND FRIENDS"></form>
                                    <input type="button" id=recents-btn name="recents-btn" class=recents-btn value="katchups">
                                    <input type="button" id=location-btn name="location-btn" class=location-btn value="change location">`
           
            const navSearch = document.getElementById("nav-input") 
            const navForm = document.getElementById("nav-search")
            navSearch.focus()
            navForm.addEventListener("submit", function(event){ 
                event.preventDefault()  
                const formData = new FormData(navForm)
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
                const userDIV = document.createElement(`div`)
                userDIV.classList.add(`friend-in-search`)
                userDIV.innerHTML =`
                                    <img class=circlesearch src=${user.profile_img}>
                                    <h2>${user.name}</h2>`
                card.appendChild(userDIV)
                const userImg = userDIV.querySelector("img")
                userImg.style.cursor = "pointer"
                selectUser(userImg, user)
            }            
                navSearch.addEventListener("blur", function(){
                    setNavigation(user)
                }, { once: true } )   

        })

        function clearNav(){
            center.addEventListener("click", function(){
            setNavigation(user)
            }, { once:true } )
            
        }

    }

    //# !CURRENT USER

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

    // !LOG IN

    function logIn(){
        document.getElementById("left-search").innerHTML = ""
        document.getElementById("right-search").innerHTML = ""
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
                <input type="email" name="email" class="input-box" placeholder="Email">
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
                <input type="location" id=user-location-input name="location" class="input-box" placeholder="Location (ex. Atlanta, GA)">
                <input type="email" name="email" class="input-box" placeholder="Email">
                <input type="password" name="password" class="input-box" placeholder="Password">
                <input type="password" name="password_confirmation" class="input-box" placeholder="Confirm Password">
                <input type="submit" id=signup-btn name="signup-btn" class="btn" value="Sign Up">
                <input type="button" id=signin-btn name="signup-btn" class="btn" value="Already have an account?">
            </form>
        </div>
        `
        const navUserInput = document.getElementById("user-location-input")
        navUserInput.addEventListener("focus", function(){            

            const searchScript = document.createElement("script")
            searchScript.id = "user-search-script"
            searchScript.textContent = `
                                    function initMap(){
                                    let input = document.getElementById('user-location-input')
                                    let autocomplete = new google.maps.places.Autocomplete(input)                 
            
                                    }`
            document.body.appendChild(searchScript);

            const placesScript = document.createElement("script")
            placesScript.id = "user-places-script"
            placesScript.src = `https://maps.googleapis.com/maps/api/js?key=${localStorage.places}&libraries=places&callback=initMap`
            
            document.body.appendChild(placesScript)
            navUserInput.addEventListener("focusout", function(){
                let pacContainer = document.getElementsByClassName("pac-container")
                document.getElementById("user-search-script").remove()
                document.getElementById("user-places-script").remove()
                while(pacContainer.length > 0) {
                pacContainer[0].remove();
                }
            }, { once: true } )            
        })

        const signUpForm = document.getElementById("signup-form")
        signUpForm.addEventListener("submit", handleFormSubmit);
        async function handleFormSubmit(event) {            
            event.preventDefault()           
            const form = event.currentTarget           
            const url = USERS_URL
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


