function showLoginPage(){
    $("#logout-btn").hide()
    $("#login-page").show()
    $("#register-page").hide()
    $("#add-page").hide()
    $("#edit-page").hide()
    $("#list-todo").hide()
    $("#quote-page").hide()
}
function login(){
    const email = $("#email-input").val()
    const password = $("#password-input").val()
    //perlu masuk server ke routes login
    $.ajax({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data:{
            email,
            password
        }
    })
    .done(response=>{
        localStorage.setItem('access_token', response.access_token)
        showMainPage()
    })
    .fail(xhr=>{
        console.log(xhr)
    })
    .always(function(){
        $("#email-input").val("")
        $("#password-input").val("")
    })
}
function showRegisterPage(){
    $("#logout-btn").hide()
    $("#register-btn").hide()
    $("#login-page").hide()
    $("#register-page").show()
    $("#add-page").hide()
    $("#edit-page").hide()
    $("#list-todo").hide()
    $("#quote-page").hide()
}
function showMainPage(){
    $("#logout-btn").show()
    $("#register-btn").hide()
    $("#login-page").hide()
    $("#register-page").hide()
    $("#add-page").show()
    $("#edit-page").hide()
    $("#list-todo").show()
    $("#quote-page").show()
    fetchTodos()
}
function showEditPage(){
    $("#logout-btn").show()
    $("#register-btn").hide()
    $("#login-page").hide()
    $("#register-page").hide()
    $("#add-page").hide()
    $("#edit-page").show()
    $("#list-todo").hide()
    $("#edit-id").hide()
    $("#quote-page").hide()
}
function logout(){
    localStorage.clear()
    showLoginPage()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function fetchTodos(){
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response=>{
        $("#list-table").empty()
        console.log(response)
        response.forEach(todo=>{
            $("#list-table").append(`
            <table border="1" style="width: 80%; margin-left: auto; margin-right: auto; text-align: center;">
                <tr>
                <td style="width:20%;">${todo.title}</td>
                <td style="width:20%;">${todo.description}</td>
                <td style="width:20%;">${todo.status}</td>
                <td style="width:20%;">${todo.due_date}</td>
                <td style="width:20%;"><a class="btn btn-outline-primary" role="button" onclick="editTodo(${todo.id})">Edit</a>
                <a class="btn btn-outline-danger" role="button" onclick="deleteTodo(${todo.id})">Delete</a></td>
                </tr>
            </table>
            `)
        })
    })
    .fail(xhr=>{
        // console.log('theres error')
        console.log(xhr)
    })
}
function addTodos(){
    const title = $("#add-title").val()
    const description = $("#add-description").val()
    const status = $("#add-status").val()
    const due_date = $("#add-due_date").val()
    // console.log(title, description, status, due_date)
    $.ajax({
        method: 'POST',
        url: "http://localhost:3000/todos",
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            title,
            description,
            status,
            due_date
        }
    })
    .done(response => {
        console.log(response)
    })
    .fail(xhr=>{
        console.log(xhr)
    })
    .always(_ =>{
        $("#add-form").trigger("reset")
    })
}
function newRegister(){
    const first_name = $("#create-first_name").val()
    const last_name = $("#create-last_name").val()
    const email = $("#create-email").val()
    const password = $("#create-password").val()
    $.ajax({
        method: 'POST',
        url: "http://localhost:3000/register",
        data: {
            first_name,
            last_name,
            email,
            password
        }
    })
    .done(response=>{
        console.log(response)
        showLoginPage()
    })
    .fail(xhr=>{
        console.log('error')
    })
    .always(_ =>{
        $("#register-form").trigger("reset")
    })
}
function deleteTodo(data){
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/todos/${data}`,
        headers:{
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response=>{
        showMainPage()
    })
    .fail(xhr=>{
        console.log(xhr)
    })
}
function editTodo(data){
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${data}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response=>{
        console.log("ini dari edit todo", response)
        $("#edit-id").val(response.id)
        $("#edit-title").val(response.title)
        $("#edit-description").val(response.description)
        $("#edit-status").val(response.status)
        $("#edit-due_date").val(response.due_date)
        showEditPage()
    })
    .fail(xhr=>{
        console.log(xhr)
    })
}
function editData(){
    const title = $("#edit-title").val()
    const description = $("#edit-description").val()
    const status = $("#edit-status").val()
    const due_date = $("#edit-due_date").val()
    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/todos/${$("#edit-id").val()}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            title,
            description,
            status,
            due_date
        }
    })
    .done(response=>{
        // console.log(response)
        // editData(data)
        showMainPage()
    })
    .fail(xhr=>{
        console.log(xhr)
    })
    
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    // ajax ke server dan kirim google tokennya
    $.ajax({
        url: 'http://localhost:3000/googleLogin',
        method: 'POST',
        data: {
            id_token
        }
    })
    .done(response=>{
        console.log(response)
        localStorage.setItem('access_token', response.access_token)
        showMainPage()
    })
    .fail(xhr=>{
        console.log(xhr)
    })
}

function getQuote(){
    $.ajax({
        url: 'http://localhost:3000/quote',
        method: 'GET'
    })
    .done(response=>{
        // console.log(response.text)
        $("#quote-text").trigger("reset")
        $("#quote-text").val(response.text)
    })
    .fail(xhr=>{
        console.log(xhr)
    })
}

$(document).ready(function(){
    if(localStorage.getItem('access_token')){
        showMainPage()
    } else {
        showLoginPage()
    }
    $("#login-form").on("submit", function(e){
        e.preventDefault()
        login()
    })
    $("#logout-btn").on("click", function(){
        logout()
    })
    $("#add-form").on("submit", function(e){
        e.preventDefault()
        addTodos()
        showMainPage()
    })
    $("#register-form").on("submit", function(e){
        e.preventDefault()
        newRegister()
    })
    $("#edit-form").on("submit", function(e){
        e.preventDefault()
        editData()
    })
    $("#quote-btn").on("click", function(){
        getQuote()
    })
})