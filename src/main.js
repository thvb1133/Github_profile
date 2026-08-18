import "./style.css";
import { fetchProfile } from "./github.js";
import { renderProfile, renderMessage, renderLoading } from "./render.js";

const DEFAULT_USERNAME = "octocat";

const content = document.getElementById("content");
const form = document.getElementById("search-form");
const input = document.getElementById("username-input");
const themeToggle = document.getElementById("theme-toggle");

async function loadProfile(username) {
  const login = String(username || "").trim();
  if (!login) return;

  content.innerHTML = renderLoading(login);
  updateUrl(login);

  try {
    const profile = await fetchProfile(login);
    content.innerHTML = renderProfile(profile);
  } catch (error) {
    if (error.status === 404) {
      content.innerHTML = renderMessage({
        title: "User not found",
        message: `We couldn't find a GitHub user named "${login}".`,
        kind: "error",
      });
    } else {
      content.innerHTML = renderMessage({
        title: "Something went wrong",
        message: error.message || "Unable to load the profile.",
        kind: "error",
      });
    }
  }
}

function updateUrl(username) {
  const url = new URL(window.location.href);
  url.searchParams.set("u", username);
  window.history.replaceState({}, "", url);
}

function getInitialUsername() {
  const params = new URLSearchParams(window.location.search);
  return params.get("u") || DEFAULT_USERNAME;
}

function initTheme() {
  const saved = localStorage.getItem("theme");
  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  document.documentElement.dataset.theme = theme;
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  const icon = themeToggle?.querySelector(".theme-toggle-icon");
  if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
  updateThemeIcon(next);
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  loadProfile(input.value);
});

themeToggle?.addEventListener("click", toggleTheme);

initTheme();

const initial = getInitialUsername();
if (input) input.value = initial;
loadProfile(initial);
