

// GET VIDEO 
const params = new URLSearchParams(window.location.search);
const videoId = parseInt(params.get("id"));

let videos = JSON.parse(localStorage.getItem("videos")) || [];
let video = videos.find(v => v.video_id === videoId);

// LOAD UI 
document.getElementById("videoThumbnail").src = video.thumbnail_url;
document.getElementById("videoTitle").innerText = video.title;
document.getElementById("videoViews").innerText = video.views;
document.getElementById("channelName").innerText = video.channel;

//  INIT 
updateUI();
addToHistory(video);



// LIKE SYSTEM (TOGGLE)


function isLiked() {
    const liked = JSON.parse(localStorage.getItem("liked")) || [];
    return liked.some(v => v.video_id === video.video_id);
}

function isDisliked() {
    return localStorage.getItem("disliked_" + video.video_id) === "true";
}

function toggleLike() {
    animateLike();

    let liked = JSON.parse(localStorage.getItem("liked")) || [];
    let videos = JSON.parse(localStorage.getItem("videos")) || [];

    const likeIndex = liked.findIndex(v => v.video_id === video.video_id);

    // remove dislike if exists
    localStorage.removeItem("disliked_" + video.video_id);

    if (likeIndex === -1) {
        // LIKE
        video.likes_count++;
        liked.push(video);
    } else {
        // UNLIKE
        video.likes_count = Math.max(0, video.likes_count - 1);
        liked.splice(likeIndex, 1);
    }

    updateStorage(liked, videos);
    updateUI();
}


function toggleDislike() {

    let liked = JSON.parse(localStorage.getItem("liked")) || [];
    let videos = JSON.parse(localStorage.getItem("videos")) || [];

    const likeIndex = liked.findIndex(v => v.video_id === video.video_id);

    const key = "disliked_" + video.video_id;

    if (localStorage.getItem(key)) {
        // remove dislike
        localStorage.removeItem(key);
    } else {

        // if liked → remove like
        if (likeIndex !== -1) {
            video.likes_count = Math.max(0, video.likes_count - 1);
            liked.splice(likeIndex, 1);
        }

        localStorage.setItem(key, "true");
    }

    updateStorage(liked, videos);
    updateUI();
}


function updateStorage(liked, videos) {

    videos = videos.map(v => v.video_id === video.video_id ? video : v);

    localStorage.setItem("videos", JSON.stringify(videos));
    localStorage.setItem("liked", JSON.stringify(liked));
}


function animateLike() {

    const btn = document.getElementById("likeBtn");

    btn.classList.add("like-animate");

    setTimeout(() => {
        btn.classList.remove("like-animate");
    }, 300);
}

// UPDATE UI

function updateUI() {

    const likeBtn = document.getElementById("likeBtn");
    const dislikeBtn = document.getElementById("dislikeBtn");

    document.getElementById("likeCount").innerText = video.likes_count;

    // LIKE
    if (isLiked()) {
        likeBtn.classList.add("active-like");
    } else {
        likeBtn.classList.remove("active-like");
    }

    // DISLIKE
    if (isDisliked()) {
        dislikeBtn.classList.add("active-dislike");
    } else {
        dislikeBtn.classList.remove("active-dislike");
    }
}



//  HISTORY


function addToHistory(video) {

    let history = JSON.parse(localStorage.getItem("history")) || [];

    // remove if already exists
    history = history.filter(v => v.video_id !== video.video_id);

    // add to top
    history.unshift(video);

    localStorage.setItem("history", JSON.stringify(history));
}



// SUBSCRIBE

function toggleSubscribe() {

    const btn = document.getElementById("subscribeBtn");
    const notif = document.getElementById("notifWrapper");

    if (btn.innerText === "Subscribe") {
        btn.innerText = "Subscribed";
        btn.classList.add("subscribed");
        notif.style.display = "block";
    } else {
        btn.innerText = "Subscribe";
        btn.classList.remove("subscribed");
        notif.style.display = "none";
    }
}

function loadComments() {

    const comments = JSON.parse(localStorage.getItem("comments_" + video.video_id)) || [];

    const container = document.getElementById("commentList");
    container.innerHTML = "";

    comments.forEach(c => {
        container.innerHTML += `
      <div class="comment">
        <img src="https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10) + 1}.jpg">
        <p>${c}</p>
      </div>
    `;
    });
}

function addComment() {

    const text = document.getElementById("commentText").value;

    if (!text) return;

    let comments = JSON.parse(localStorage.getItem("comments_" + video.video_id)) || [];

    comments.push(text);

    localStorage.setItem("comments_" + video.video_id, JSON.stringify(comments));

    document.getElementById("commentText").value = "";

    loadComments();
}

loadComments();
