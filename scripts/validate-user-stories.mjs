#!/usr/bin/env node

/**
 * User Story Format Validator
 *
 * Checks all files in user-stories directories (excluding index.md and cross-reference docs) for:
 * - User story statement: "As a" ... "I want" ... "so that" pattern (case-insensitive)
 * - Acceptance criteria section: ## Acceptance Criteria heading
 * - Actors section: ## Actors, **Primary Actor**, or **Actors**
 *
 * Aggregated files (containing multiple stories) need at least one "As a" statement.
 * Skips: index.md, *cross-reference* files
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, basename, extname, sep } from "node:path";

const SEARCH_DIRS = ["docs", "versioned_docs"];
const SKIP_PATTERNS = [/^index\.md$/, /cross-reference/i];

function shouldSkip(filename) {
  return SKIP_PATTERNS.some((p) => p.test(filename));
}

function collectUserStoryFiles(dir) {
  const files = [];
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return files;
  }
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath, { throwIfNoEntry: false });
    if (!stat) continue;
    if (stat.isDirectory()) {
      if (entry === "node_modules") continue;
      files.push(...collectUserStoryFiles(fullPath));
    } else if (
      extname(entry) === ".md" &&
      !shouldSkip(basename(entry)) &&
      fullPath.includes(`${sep}user-stories${sep}`)
    ) {
      files.push(fullPath);
    }
  }
  return files;
}

function checkUserStoryStatement(content) {
  // Strip bold markers for matching (content uses **As a** / **I want to** / **so that**)
  const plain = content.replace(/\*\*/g, "");
  if (
    /as (a|an|the)\s/i.test(plain) &&
    /i want/i.test(plain) &&
    /so that/i.test(plain)
  ) {
    return true;
  }
  return false;
}

function checkAcceptanceCriteria(content) {
  // ## Acceptance Criteria or ### Acceptance Criteria
  if (/^#{2,3}\s+acceptance\s+criteria/im.test(content)) return true;
  return false;
}

function checkActors(content) {
  if (/^#{2,3}\s+actors/im.test(content)) return true;
  if (/\*\*primary\s+actor\*\*/i.test(content)) return true;
  if (/\*\*actors\*\*/i.test(content)) return true;
  // Summary table with Primary Actor
  if (/\|\s*\*?\*?Primary Actor\*?\*?\s*\|/i.test(content)) return true;
  // Overview table with Actor column (aggregated files)
  if (/\|\s*Actor\s*\|/i.test(content)) return true;
  // Primary: actor reference (inline in ## Actors section)
  if (/\*\*Primary:\*\*/i.test(content)) return true;
  // Aggregated files: actors embedded in "As a [role]" statements are acceptable
  // Detect aggregated format: multiple story headings (## US- or ## ID-NNN)
  const storyHeadings = content.match(/^##\s+(US-|\w+-\d+)/gm);
  if (storyHeadings && storyHeadings.length >= 2) return true;
  return false;
}

const violations = [];
let fileCount = 0;

for (const dir of SEARCH_DIRS) {
  const files = collectUserStoryFiles(dir);
  for (const file of files) {
    fileCount++;
    const content = readFileSync(file, "utf-8");
    const issues = [];

    if (!checkUserStoryStatement(content)) {
      issues.push(
        'missing user story statement ("As a ... I want ... so that ...")',
      );
    }
    if (!checkAcceptanceCriteria(content)) {
      issues.push(
        "missing Acceptance Criteria section (## Acceptance Criteria)",
      );
    }
    if (!checkActors(content)) {
      issues.push(
        "missing Actors section (## Actors / **Primary Actor** / **Actors**)",
      );
    }

    if (issues.length > 0) {
      violations.push({ file, issues });
    }
  }
}

if (violations.length > 0) {
  console.error("User story format validation failed:\n");
  for (const { file, issues } of violations) {
    for (const issue of issues) {
      console.error(`  ${file}: ${issue}`);
    }
  }
  console.error(
    `\n${violations.length} file(s) with issues out of ${fileCount} checked.`,
  );
  process.exit(1);
} else {
  console.log(`\u2713 ${fileCount} files checked, all valid`);
}
