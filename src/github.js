const API_BASE = "https://api.github.com";

/**
 * Sample data used when the GitHub API is unreachable (e.g. offline dev,
 * restricted egress) or when a request is rate-limited. This keeps the app
 * demonstrable end-to-end without network access.
 */
export const SAMPLE_PROFILE = {
  user: {
    login: "octocat",
    name: "The Octocat",
    avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
    html_url: "https://github.com/octocat",
    bio: "A friendly demo profile shown when live GitHub data is unavailable.",
    company: "@github",
    location: "San Francisco",
    blog: "https://github.blog",
    followers: 9999,
    following: 9,
    public_repos: 8,
  },
  repos: [
    {
      id: 1,
      name: "Hello-World",
      html_url: "https://github.com/octocat/Hello-World",
      description: "My first repository on GitHub!",
      language: "C",
      stargazers_count: 2500,
      forks_count: 1300,
    },
    {
      id: 2,
      name: "Spoon-Knife",
      html_url: "https://github.com/octocat/Spoon-Knife",
      description: "This repo is for demonstration purposes only.",
      language: "HTML",
      stargazers_count: 12000,
      forks_count: 140000,
    },
    {
      id: 3,
      name: "octocat.github.io",
      html_url: "https://github.com/octocat/octocat.github.io",
      description: "Personal site.",
      language: "CSS",
      stargazers_count: 640,
      forks_count: 220,
    },
  ],
  isSample: true,
};

async function getJson(url) {
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) {
    const err = new Error(`GitHub API error: ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

/**
 * Fetch a user's profile and their most-starred public repositories.
 * Falls back to SAMPLE_PROFILE when the network/API is unavailable so the
 * environment can always be demonstrated end-to-end.
 */
export async function fetchProfile(username) {
  const login = String(username || "").trim();
  if (!login) {
    throw new Error("A username is required.");
  }

  try {
    const [user, repos] = await Promise.all([
      getJson(`${API_BASE}/users/${encodeURIComponent(login)}`),
      getJson(`${API_BASE}/users/${encodeURIComponent(login)}/repos?per_page=100&sort=updated`),
    ]);

    const topRepos = [...repos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);

    return { user, repos: topRepos, isSample: false };
  } catch (error) {
    if (error.status === 404) {
      throw error;
    }
    // Network failure / rate limit: degrade gracefully to sample data.
    return { ...SAMPLE_PROFILE, isSample: true, reason: error.message };
  }
}
