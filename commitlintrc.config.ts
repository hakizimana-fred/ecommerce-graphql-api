import { Configuration } from "@commitlint/types";

const config: Configuration = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
      ],
    ],
    "subject-case": [2, "always", "sentence-case"],
    "subject-empty": [2, "never"],
    "scope-empty": [2, "never"],
    "scope-case": [2, "always", "kebab-case"],
    "header-max-length": [2, "always", 72],
  },
};

export default config;
