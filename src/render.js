const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  C: "#555555",
  "C++": "#f34b7d",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  Shell: "#89e051",
  Ruby: "#701516",
};

export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function formatCount(count) {
  const n = Number(count) || 0;
  if (n >= 1000) {
    return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  }
  return String(n);
}

function repoCard(repo) {
  const color = LANGUAGE_COLORS[repo.language] || "#8b949e";
  const language = repo.language
    ? `<span class="repo-lang"><span class="repo-lang-dot" style="background:${color}"></span>${escapeHtml(
        repo.language,
      )}</span>`
    : "";
  return `
    <a class="repo-card" href="${escapeHtml(repo.html_url)}" target="_blank" rel="noopener">
      <h3 class="repo-name">${escapeHtml(repo.name)}</h3>
      <p class="repo-desc">${escapeHtml(repo.description || "No description provided.")}</p>
      <div class="repo-meta">
        ${language}
        <span class="repo-stat" title="Stars">★ ${formatCount(repo.stargazers_count)}</span>
        <span class="repo-stat" title="Forks">⑂ ${formatCount(repo.forks_count)}</span>
      </div>
    </a>`;
}

export function renderProfile(profile) {
  const { user, repos, isSample } = profile;
  const details = [
    user.company ? `🏢 ${escapeHtml(user.company)}` : "",
    user.location ? `📍 ${escapeHtml(user.location)}` : "",
    user.blog
      ? `🔗 <a href="${escapeHtml(user.blog.startsWith("http") ? user.blog : `https://${user.blog}`)}" target="_blank" rel="noopener">${escapeHtml(user.blog)}</a>`
      : "",
  ]
    .filter(Boolean)
    .map((item) => `<span class="detail-item">${item}</span>`)
    .join("");

  const sampleBanner = isSample
    ? `<div class="banner" role="status">Showing sample data — live GitHub data is currently unavailable.</div>`
    : "";

  const reposHtml =
    repos && repos.length
      ? repos.map(repoCard).join("")
      : `<p class="empty">No public repositories to show.</p>`;

  return `
    ${sampleBanner}
    <section class="profile">
      <aside class="profile-side">
        <img class="avatar" src="${escapeHtml(user.avatar_url)}" alt="${escapeHtml(user.name || user.login)}'s avatar" width="220" height="220" />
        <h1 class="profile-name">${escapeHtml(user.name || user.login)}</h1>
        <p class="profile-login">@${escapeHtml(user.login)}</p>
        ${user.bio ? `<p class="profile-bio">${escapeHtml(user.bio)}</p>` : ""}
        <a class="profile-link" href="${escapeHtml(user.html_url)}" target="_blank" rel="noopener">View on GitHub</a>
        <div class="profile-details">${details}</div>
      </aside>
      <div class="profile-main">
        <div class="stats">
          <div class="stat"><span class="stat-value">${formatCount(user.public_repos)}</span><span class="stat-label">Repositories</span></div>
          <div class="stat"><span class="stat-value">${formatCount(user.followers)}</span><span class="stat-label">Followers</span></div>
          <div class="stat"><span class="stat-value">${formatCount(user.following)}</span><span class="stat-label">Following</span></div>
        </div>
        <h2 class="section-title">Popular repositories</h2>
        <div class="repos">${reposHtml}</div>
      </div>
    </section>`;
}

export function renderMessage({ title, message, kind = "info" }) {
  return `
    <div class="state state-${kind}">
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(message)}</p>
    </div>`;
}

export function renderLoading(username) {
  return `
    <div class="state state-loading">
      <div class="spinner" aria-hidden="true"></div>
      <p>Loading profile for <strong>${escapeHtml(username)}</strong>…</p>
    </div>`;
}
