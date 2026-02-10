#!/usr/bin/env node

/**
 * Validates that all user story and use case markdown files
 * contain regulatory traceability (FSA, GDPR, or IDD references).
 *
 * Exit 0 = all files pass
 * Exit 1 = one or more violations found
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, basename } from "node:path";

const SKIP_FILENAMES = new Set(["index.md", "_category_.json"]);
const SKIP_PREFIXES = ["LESSON-", "ADR-"];

const REGULATORY_HEADING_RE = /^#{2,3}\s+regulatory/im;
const REGULATORY_ID_RE = /(?:FSA|GDPR|IDD)-\d{3}/;

/**
 * Recursively find markdown files in user-stories/ and use-cases/ directories.
 */
function findTargetFiles(root) {
  const results = [];

  function walk(dir) {
    let entries;
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      let stat;
      try {
        stat = statSync(fullPath);
      } catch {
        continue;
      }
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (stat.isFile() && entry.endsWith(".md")) {
        const dirName = basename(dir);
        if (dirName === "user-stories" || dirName === "use-cases") {
          if (shouldCheck(entry)) {
            results.push(fullPath);
          }
        }
      }
    }
  }

  walk(root);
  return results;
}

function shouldCheck(filename) {
  if (SKIP_FILENAMES.has(filename)) return false;
  for (const prefix of SKIP_PREFIXES) {
    if (filename.startsWith(prefix)) return false;
  }
  return true;
}

function validate(filePath) {
  const content = readFileSync(filePath, "utf8");
  const errors = [];

  if (!REGULATORY_HEADING_RE.test(content)) {
    errors.push("missing '## Regulatory' section");
  }

  if (!REGULATORY_ID_RE.test(content)) {
    errors.push(
      "no regulatory IDs found (expected FSA-nnn, GDPR-nnn, or IDD-nnn)",
    );
  }

  return errors;
}

// --- main ---

const roots = ["docs", "versioned_docs"];
const allFiles = roots.flatMap((root) => findTargetFiles(root));

let violations = 0;

for (const file of allFiles) {
  const errors = validate(file);
  if (errors.length > 0) {
    for (const err of errors) {
      console.error(`ERROR: ${file} — ${err}`);
    }
    violations++;
  }
}

if (violations > 0) {
  console.error(
    `\n✗ ${violations} file(s) with regulatory traceability violations`,
  );
  process.exit(1);
} else {
  console.log(
    `✓ ${allFiles.length} files checked, all have regulatory traceability`,
  );
}
