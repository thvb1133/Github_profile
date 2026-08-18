import { describe, it, expect } from "vitest";
import { escapeHtml, formatCount, renderProfile, renderMessage } from "./render.js";
import { SAMPLE_PROFILE } from "./github.js";

describe("escapeHtml", () => {
  it("escapes HTML-special characters", () => {
    expect(escapeHtml('<img src=x onerror="alert(1)">')).toBe(
      "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;",
    );
  });

  it("handles null/undefined", () => {
    expect(escapeHtml(null)).toBe("");
    expect(escapeHtml(undefined)).toBe("");
  });
});

describe("formatCount", () => {
  it("leaves small numbers untouched", () => {
    expect(formatCount(9)).toBe("9");
    expect(formatCount(999)).toBe("999");
  });

  it("abbreviates thousands", () => {
    expect(formatCount(1500)).toBe("1.5k");
    expect(formatCount(12000)).toBe("12k");
  });
});

describe("renderProfile", () => {
  it("renders the user name, login and repositories", () => {
    const html = renderProfile(SAMPLE_PROFILE);
    expect(html).toContain("The Octocat");
    expect(html).toContain("@octocat");
    expect(html).toContain("Hello-World");
    expect(html).toContain("Spoon-Knife");
  });

  it("shows the sample-data banner when isSample is true", () => {
    const html = renderProfile(SAMPLE_PROFILE);
    expect(html).toContain("Showing sample data");
  });
});

describe("renderMessage", () => {
  it("renders a titled message with the right kind class", () => {
    const html = renderMessage({ title: "User not found", message: "nope", kind: "error" });
    expect(html).toContain("state-error");
    expect(html).toContain("User not found");
  });
});
