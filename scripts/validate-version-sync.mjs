#!/usr/bin/env node

/**
 * Version Sync Check
 * Verifies that versioned_docs structure matches expected Phase 1 baseline.
 * Catches scenarios where a PR accidentally deletes versioned content.
 */

import { existsSync, readdirSync, statSync } from "fs";
import { join, resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const VERSION_DIR = join(ROOT, "versioned_docs/version-phase-1");

const EXPECTED_STRUCTURE = {
  "actors/": { minFiles: 2, description: "actor definitions" },
  "personas/": { minFiles: 5, description: "persona definitions" },
  "phase-1-motor/user-stories/": {
    minFiles: 10,
    description: "motor user stories",
  },
  "phase-1-motor/use-cases/": { minFiles: 5, description: "motor use cases" },
  "regulatory/": { exactFiles: 3, description: "regulatory documents" },
};

const EXPECTED_FILES = ["glossary.md", "intro.md"];

let errorCount = 0;

function countMarkdownFiles(dir) {
  let count = 0;
  if (!existsSync(dir)) return 0;

  function walk(current) {
    for (const entry of readdirSync(current)) {
      const full = join(current, entry);
      const stat = statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else if (entry.endsWith(".md")) {
        count++;
      }
    }
  }

  walk(dir);
  return count;
}

// Main
console.log("Checking version-phase-1 structure...\n");

if (!existsSync(VERSION_DIR)) {
  console.error("MISSING: versioned_docs/version-phase-1/ directory not found");
  process.exit(1);
}

// Check required directories
for (const [dirPath, spec] of Object.entries(EXPECTED_STRUCTURE)) {
  const fullPath = join(VERSION_DIR, dirPath);

  if (!existsSync(fullPath)) {
    console.error(
      `MISSING: expected directory version-phase-1/${dirPath} (${spec.description})`,
    );
    errorCount++;
    continue;
  }

  const fileCount = countMarkdownFiles(fullPath);

  if (spec.exactFiles !== undefined && fileCount !== spec.exactFiles) {
    console.error(
      `MISMATCH: version-phase-1/${dirPath} has ${fileCount} markdown files, expected exactly ${spec.exactFiles} (${spec.description})`,
    );
    errorCount++;
  } else if (spec.minFiles !== undefined && fileCount < spec.minFiles) {
    console.error(
      `MISMATCH: version-phase-1/${dirPath} has ${fileCount} markdown files, expected at least ${spec.minFiles} (${spec.description})`,
    );
    errorCount++;
  } else {
    console.log(`  OK: version-phase-1/${dirPath} — ${fileCount} files`);
  }
}

// Check required individual files
for (const fileName of EXPECTED_FILES) {
  const fullPath = join(VERSION_DIR, fileName);

  if (!existsSync(fullPath)) {
    console.error(`Missing expected file in version-phase-1: ${fileName}`);
    errorCount++;
  } else {
    console.log(`  OK: version-phase-1/${fileName}`);
  }
}

console.log("");

if (errorCount > 0) {
  console.error(
    `FAILED: ${errorCount} structure issue(s) found in version-phase-1.`,
  );
  process.exit(1);
} else {
  console.log("Version-phase-1 structure is intact.");
}
