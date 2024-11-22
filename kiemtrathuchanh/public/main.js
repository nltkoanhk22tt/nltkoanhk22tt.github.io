const apiUrl = "http://localhost:5000/api";

async function register() {
    const user = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    
    const response = await fetch(`${apiUrl}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    
    const data = await response.json();
    if (response.ok) {
        alert(data.message);
        
        showLogin(); 
    } else {
        alert(data.message);
    }
}

async function login() {
    const user = {
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
    };
    
    const response = await fetch(`${apiUrl}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    
    const data = await response.json();
    if (response.ok) {
        alert(data.message);
        localStorage.setItem('token', data.token); 
        showPosts(); 
    } else {
        alert(data.message);
    }
}

function logout() {
    localStorage.removeItem('token');
    alert('Logged out!');
    showLogin(); 
}

function showRegister() {
    document.getElementById('register').style.display = 'block';
    document.getElementById('login').style.display = 'none';
    document.getElementById('post').style.display = 'none';
}

function showLogin() {
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'block';
    document.getElementById('post').style.display = 'none';
}

function showPosts() {
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('post').style.display = 'block';
    loadPosts(); 
}

function loadPosts() {
    const postList = document.getElementById('postList');
    postList.innerHTML = ''; 

   
    const posts = [
        { id: 1, content: "Bài viết đầu tiên" },
        { id: 2, content: "Bài viết thứ hai" }
    ];

    posts.forEach(post => {
        const li = document.createElement('li');
        li.textContent = post.content;
        postList.appendChild(li);
    });
}
