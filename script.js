const feedUrl = "https://www.madaniduniya.com/feeds/posts/default?alt=json";

let posts = [];

fetch(feedUrl)
  .then(response => response.json())
  .then(data => {
    const entries = data.feed.entry || [];
    posts = entries.map(entry => {
      const title = entry.title?.$t || "";
      const summary = entry.summary?.$t || "";
      const link = entry.link?.find(l => l.rel === "alternate")?.href || "#";
      const label = (entry.category && entry.category[0]?.term) || "بغیر لیبل";
      return { title, summary, link, label };
    });
    displayPosts(posts);
  });

function displayPosts(postsToDisplay) {
  const container = document.getElementById("results");
  container.innerHTML = "";
  postsToDisplay.forEach(post => {
    container.innerHTML += `
      <div class="post">
        <a href="${post.link}" target="_blank">${post.title}</a>
        <div class="summary">${post.summary}</div>
        <div class="label">لیبل: ${post.label}</div>
      </div>
    `;
  });
}

function searchPosts() {
  const query = document.getElementById("searchBox").value.trim().toLowerCase();
  const filtered = posts.filter(post =>
    post.title.toLowerCase().includes(query) ||
    post.summary.toLowerCase().includes(query) ||
    post.label.toLowerCase().includes(query)
  );
  displayPosts(filtered);
}
