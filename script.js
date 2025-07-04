
document.addEventListener("DOMContentLoaded", function () {
  const searchBox = document.getElementById("searchBox");
  const resultsList = document.getElementById("results");

  fetch("https://www.madaniduniya.com/feeds/posts/default?alt=json")
    .then(res => res.json())
    .then(data => {
      const entries = data.feed.entry || [];

      const posts = entries.map(entry => {
        const title = entry.title.$t;
        const link = entry.link.find(l => l.rel === "alternate").href;
        const summary = entry.summary ? entry.summary.$t : "";
        const labels = entry.category ? entry.category.map(c => c.term).join(", ") : "";
        return { title, link, summary, labels };
      });

      searchBox.addEventListener("input", function () {
        const query = this.value.toLowerCase();
        resultsList.innerHTML = "";

        const filtered = posts.filter(post =>
          post.title.toLowerCase().includes(query) ||
          post.summary.toLowerCase().includes(query) ||
          post.labels.toLowerCase().includes(query)
        );

        filtered.forEach(post => {
          const li = document.createElement("li");
          li.innerHTML = `<a href="${post.link}" target="_blank">${post.title}</a>
                          <p>${post.summary}</p>`;
          resultsList.appendChild(li);
        });
      });
    });
});
