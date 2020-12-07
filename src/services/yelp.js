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
let allFriends = []
let allRestaurants = []
const restaurantContainer = document.getElementById('restaurantContainer')
const userContainer = document.getElementById('userContainer')
const headerContainer = document.getElementById('header')
const rightSearchContainer = document.getElementById('right-search')
const loginCard = document.getElementById("login-card")
const center = document.getElementById("center")   


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
    .then(data => Restaurant.returnRestaurants(data))
}
