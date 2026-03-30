
function loadVideos() {

  if (!localStorage.getItem("videos")) {

    const videos = [

      
      {
        video_id: 1,
        title: "Learn HTML in 1 Hour",
        channel: "Code Academy",
        thumbnail_url: "https://blog.jetbrains.com/wp-content/uploads/2021/12/DSGN-12224_HourOfCode_HTML_Blog_Social_share_image_1280x720-copy-5.png",
        duration: "12:45",
        views: "1.2M views",
        category: "home",
        published_at: randomDate(),
        likes_count: randomLikes()
      },

      
      {
        video_id: 2,
        title: "Top Programming Languages 2026",
        channel: "Tech World",
        thumbnail_url: "https://i.ytimg.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
        duration: "4:15",
        views: "5M views",
        category: "trending",
        published_at: randomDate(),
        likes_count: randomLikes()
      },
      {
        video_id: 3,
        title: "Best AI Tools for Developers",
        channel: "Dev Talks",
        thumbnail_url: "https://contenu.nyc3.cdn.digitaloceanspaces.com/journalist/8774cbd7-571c-46bf-b15a-a0560e586cae/thumbnail.jpeg",
        duration: "3:50",
        views: "3.8M views",
        category: "trending",
        published_at: randomDate(),
        likes_count: randomLikes()
      },

      // HISTORY 
      {
        video_id: 4,
        title: "JavaScript Basics",
        channel: "Programming with Mosh",
        thumbnail_url: "https://i.ytimg.com/vi/W6NZfCO5SIk/maxresdefault.jpg",
        duration: "10:30",
        views: "Watched yesterday",
        category: "history",
        published_at: randomDate(),
        likes_count: randomLikes()
      },
      {
        video_id: 5,
        title: "Git & GitHub Tutorial",
        channel: "Code Basics",
        thumbnail_url: "https://i.ytimg.com/vi/pQN-pnXPaVg/maxresdefault.jpg",
        duration: "14:10",
        views: "Watched 2 days ago",
        category: "history",
        published_at: randomDate(),
        likes_count: randomLikes()
      },

      // LIKED 
      {
        video_id: 6,
        title: "HTML Complete Guide",
        channel: "Web Development Pro",
        thumbnail_url: "https://i.ytimg.com/vi/qz0aGYrrlhU/maxresdefault.jpg",
        duration: "11:45",
        views: "Liked • 1 week ago",
        category: "liked",
        published_at: randomDate(),
        likes_count: randomLikes()
      },

      // SUBSCRIPTIONS 
      {
        video_id: 7,
        title: "Bootstrap Full Tutorial",
        channel: "Web Dev Simplified",
        thumbnail_url: "https://i.ytimg.com/vi/UB1O30fR-EE/maxresdefault.jpg",
        duration: "18:20",
        views: "900K views • 2 days ago",
        category: "subscriptions",
        published_at: randomDate(),
        likes_count: randomLikes()
      },
      {
        video_id: 8,
        title: "React Components Explained",
        channel: "Frontend Master",
        thumbnail_url: "https://i.ytimg.com/vi/ZxKM3DCV2kE/maxresdefault.jpg",
        duration: "15:10",
        views: "620K views • 1 week ago",
        category: "subscriptions",
        published_at: randomDate(),
        likes_count: randomLikes()
      }

    ];

    localStorage.setItem("videos", JSON.stringify(videos));
  }
}

function randomDate() {
  const start = new Date(2022, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

function randomLikes() {
  return Math.floor(Math.random() * 100000);
}

function renderVideos(videoList) {

  const container = document.getElementById("videoContainer");
  container.innerHTML = "";
  const isInPagesFolder = window.location.pathname.includes('/pages/');

  videoList.forEach(video => {
    const watchHref = isInPagesFolder
      ? `./watch.html?id=${video.video_id}`
      : `./pages/watch.html?id=${video.video_id}`;

    container.innerHTML += `
      <div class="col-lg-3 col-md-4 col-sm-6">

        <div class="video-card">

          <div class="thumbnail">
            <a href="${watchHref}?id=${video.video_id}">
              <img src="${video.thumbnail_url}">
            </a>
            <span class="video-time">${video.duration}</span>
          </div>

          <div class="video-info">

            <img class="channel-icon" src="https://randomuser.me/api/portraits/men/${Math.floor(Math.random()*10)+1}.jpg">

            <div>
              <h6>${video.title}</h6>
              <p>${video.channel}</p>
              <span>${video.views}</span>
            </div>

          </div>

        </div>

      </div>
    `;
  });
}

function renderVideosByCategory(category) {

  // get all videos from localStorage
  const allVideos = JSON.parse(localStorage.getItem("videos")) || [];

  // filter videos based on category
  const filteredVideos = allVideos.filter(video => video.category === category);

  // render filtered videos
  renderVideos(filteredVideos);
}

function applySearch(category){

  const query = document.getElementById("searchInput").value.toLowerCase().trim();

  const allVideos = JSON.parse(localStorage.getItem("videos")) || [];

  // If empty → reset page
  if(query.length === 0){
    const categoryVideos = allVideos.filter(v => v.category === category);
    renderVideos(categoryVideos);
    return;
  }

  //Normal search
  const filtered = allVideos.filter(v =>
    v.category === category &&
    v.title.toLowerCase().includes(query)
  );

  renderVideos(filtered);
}



window.onload = function () {
  loadVideos();
};


function addToHistory(video){

  let history = JSON.parse(localStorage.getItem("history")) || [];

  // avoid duplicates
  if(!history.find(v => v.video_id === video.video_id)){
    history.unshift(video);
  }

  localStorage.setItem("history", JSON.stringify(history));
}

function toggleMenu() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("not-active");
}