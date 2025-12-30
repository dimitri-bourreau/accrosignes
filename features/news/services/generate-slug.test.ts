import { generateSlug } from "./generate-slug.service";

describe("generateSlug", () => {
  it("converts to lowercase", () => {
    expect(generateSlug("Hello World")).toBe("hello-world");
  });

  it("removes accents", () => {
    expect(generateSlug("Café à Paris")).toBe("cafe-a-paris");
  });

  it("replaces spaces with hyphens", () => {
    expect(generateSlug("My Article Title")).toBe("my-article-title");
  });

  it("removes special characters", () => {
    expect(generateSlug("Hello!@#$%World")).toBe("hello-world");
  });

  it("trims leading and trailing hyphens", () => {
    expect(generateSlug("---hello---")).toBe("hello");
  });

  it("handles multiple consecutive spaces", () => {
    expect(generateSlug("hello    world")).toBe("hello-world");
  });

  it("handles empty string", () => {
    expect(generateSlug("")).toBe("");
  });

  it("handles complex accented characters", () => {
    expect(generateSlug("L'École Française")).toBe("l-ecole-francaise");
  });
});
