#!/usr/bin/env node

/**
 * Internal Link Validator
 * Checks all relative markdown links across docs/ and versioned_docs/.
 * Complements Docusaurus's built-in broken link detection with faster feedback.
 */

import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join, dirname, resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const DIRS = ["docs", "versioned_docs"];
const LINK_PATTERN = /\[([^\]]*)\]\(([^)]+\.md[^)]*)\)/g;

let brokenCount = 0;
let checkedCount = 0;

function collectMarkdownFiles(dir) {
  const files = [];
  const absDir = join(ROOT, dir);
  if (!existsSync(absDir)) return files;

  function walk(current) {
    for (const entry of readdirSync(current)) {
      const full = join(current, entry);
      const stat = statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else if (entry.endsWith(".md")) {
        files.push(full);
      }
    }
  }

  walk(absDir);
  return files;
}

function validateFile(filePath) {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let match;
    LINK_PATTERN.lastIndex = 0;

    while ((match = LINK_PATTERN.exec(line)) !== null) {
      const linkTarget = match[2];

      // Skip external links, anchors-only, and http(s) URLs
      if (
        linkTarget.startsWith("http://") ||
        linkTarget.startsWith("https://") ||
        linkTarget.startsWith("#")
      ) {
        continue;
      }

      // Strip anchor fragment from target
      const targetPath = linkTarget.split("#")[0];
      if (!targetPath) continue;

      checkedCount++;
      const resolvedPath = resolve(dirname(filePath), targetPath);

      if (!existsSync(resolvedPath)) {
        const relSource = filePath.replace(ROOT + "/", "");
        console.error(
          `BROKEN LINK: ${relSource}:${i + 1} -> ${linkTarget} (resolved: ${resolvedPath.replace(ROOT + "/", "")})`,
        );
        brokenCount++;
      }
    }
  }
}

// Main
console.log("Validating internal markdown links...\n");

const allFiles = DIRS.flatMap(collectMarkdownFiles);

for (const file of allFiles) {
  validateFile(file);
}

console.log(`\nChecked ${checkedCount} links across ${allFiles.length} files.`);

if (brokenCount > 0) {
  console.error(`\nFOUND ${brokenCount} broken link(s).`);
  process.exit(1);
} else {
  console.log("All internal links are valid.");
}
