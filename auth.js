// GET USERS 
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// SAVE USERS 
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// LOGIN
function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const error = document.getElementById("loginError");

    error.style.display = "none";

    if (!email || !password) {
        error.innerText = "All fields are required";
        error.style.display = "block";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        error.innerText = "Invalid email or password";
        error.style.display = "block";
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    //   window.location.href = "./pages/index.html";
    const currentPath = window.location.pathname;
    const redirectTo = currentPath.includes('/pages/') ? '../index.html' : 'index.html';

    // use replace to avoid leaving login in history
    window.location.replace(redirectTo);
}


// SIGNUP
function signup() {
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const error = document.getElementById("signupError");

    error.style.display = "none";

    if (!name || !email || !password) {
        error.innerText = "All fields are required";
        error.style.display = "block";
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        error.innerText = "Invalid email format";
        error.style.display = "block";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.email === email)) {
        error.innerText = "User already exists";
        error.style.display = "block";
        return;
    }

    const newUser = {
        user_id: users.length + 1,
        name,
        email,
        password,
        account_status: "active",
        created_date: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // DISPLAY MODAL
    document.getElementById("successModal").style.display = "flex";
}

// LOGOUT 
function logout() {
    localStorage.removeItem("currentUser");
    //   window.location.href = "pages/login.html";
    const currentPath = window.location.pathname;
    const loginHref = currentPath.includes('/pages/') ? './login.html' : 'pages/login.html';
    window.location.href = loginHref;
}

// PROTECT PAGE 
function checkAuth() {
    const user = localStorage.getItem("currentUser");

    //   if (!user) {
    //     window.location.href = "pages/login.html";
    //   }
    if (!user) {
        const currentPath = window.location.pathname;
        const loginHref = currentPath.includes('/pages/') ? './login.html' : 'pages/login.html';
        window.location.href = loginHref;
    }
}

function goToLogin() {
    document.getElementById("successModal").style.display = "none";
    //   window.location.href = "pages/login.html";
    const currentPath = window.location.pathname;
    const loginHref = currentPath.includes('/pages/') ? './login.html' : 'pages/login.html';
    window.location.href = loginHref;
}