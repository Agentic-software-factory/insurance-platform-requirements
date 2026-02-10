#!/usr/bin/env node

/**
 * Frontmatter Validator
 *
 * Checks all .md files in docs/ and versioned_docs/ for:
 * - YAML frontmatter delimited by ---
 * - sidebar_position field with a numeric value
 *
 * Skips: LESSON-TEMPLATE.md, ADR-TEMPLATE.md, _category_.json, node_modules
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, basename, extname } from "node:path";

const SKIP_FILES = new Set(["LESSON-TEMPLATE.md", "ADR-TEMPLATE.md"]);
const SEARCH_DIRS = ["docs", "versioned_docs"];

function collectMarkdownFiles(dir) {
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
      files.push(...collectMarkdownFiles(fullPath));
    } else if (extname(entry) === ".md" && !SKIP_FILES.has(basename(entry))) {
      files.push(fullPath);
    }
  }
  return files;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  return match[1];
}

function hasSidebarPosition(frontmatterText) {
  const match = frontmatterText.match(/^sidebar_position:\s*(\S+)/m);
  if (!match) return false;
  const val = Number(match[1]);
  return !Number.isNaN(val);
}

const violations = [];
let fileCount = 0;

for (const dir of SEARCH_DIRS) {
  const files = collectMarkdownFiles(dir);
  for (const file of files) {
    fileCount++;
    const content = readFileSync(file, "utf-8");
    const issues = [];

    const fm = parseFrontmatter(content);
    if (fm === null) {
      issues.push("missing YAML frontmatter (--- delimiters)");
    } else if (!hasSidebarPosition(fm)) {
      issues.push("missing or non-numeric sidebar_position in frontmatter");
    }

    if (issues.length > 0) {
      violations.push({ file, issues });
    }
  }
}

if (violations.length > 0) {
  console.error("Frontmatter validation failed:\n");
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
