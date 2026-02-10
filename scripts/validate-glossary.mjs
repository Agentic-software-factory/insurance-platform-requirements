#!/usr/bin/env node

/**
 * Glossary Coverage Check
 * Checks that Swedish insurance terms used in documentation are defined in the glossary.
 * Warning only (exit code 0) — new terms should be reviewed, not auto-blocked.
 */

import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join, resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const GLOSSARY_PATHS = [
  join(ROOT, "versioned_docs/version-phase-1/glossary.md"),
  join(ROOT, "docs/glossary.md"),
];
const SCAN_DIRS = [
  "docs/phase-1-motor/user-stories",
  "docs/phase-1-motor/use-cases",
  "docs/phase-2-home-property/user-stories",
  "docs/phase-2-home-property/use-cases",
  "versioned_docs/version-phase-1/phase-1-motor/user-stories",
  "versioned_docs/version-phase-1/phase-1-motor/use-cases",
];

// Pattern to extract bold terms from glossary table rows: | **Term** |
const GLOSSARY_TERM_PATTERN = /\|\s*\*\*([^*]+)\*\*/g;

// Patterns to find Swedish terms in documentation files (single-line only)
const BOLD_TERM_PATTERN = /\*\*([A-ZÅÄÖ][a-zåäöéA-ZÅÄÖ /-]+)\*\*/g;
const PAREN_TERM_PATTERN = /\(([a-zåäöé][a-zåäöéA-ZÅÄÖ /-]+)\)/g;

function parseGlossaryTerms() {
  const terms = new Set();

  for (const glossaryPath of GLOSSARY_PATHS) {
    if (!existsSync(glossaryPath)) continue;
    const content = readFileSync(glossaryPath, "utf-8");
    let match;

    GLOSSARY_TERM_PATTERN.lastIndex = 0;
    while ((match = GLOSSARY_TERM_PATTERN.exec(content)) !== null) {
      // Glossary may have "Term1 / Term2" format — split and add both
      const raw = match[1];
      for (const part of raw.split("/")) {
        terms.add(part.trim().toLowerCase());
      }
    }
  }

  return terms;
}

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
      } else if (entry.endsWith(".md") && entry !== "index.md") {
        files.push(full);
      }
    }
  }

  walk(absDir);
  return files;
}

/**
 * Checks if a term looks like a Swedish insurance term.
 * Filters out common English words and generic phrases.
 */
function isSwedishInsuranceTerm(term) {
  // Skip very long phrases (likely sentences, not terms)
  if (term.split(/\s+/).length > 4) return false;

  // Must contain Swedish characters OR be a known Swedish term pattern
  const hasSwedishChars = /[åäöÅÄÖ]/.test(term);
  const looksSwedish =
    /försäkring|skade|bonus|premie|självrisk|ånger|klass|förfallo/i.test(term);
  return hasSwedishChars || looksSwedish;
}

// Main
console.log("Checking glossary coverage...\n");

const glossaryTerms = parseGlossaryTerms();
console.log(`Found ${glossaryTerms.size} terms defined in glossary.\n`);

const allFiles = SCAN_DIRS.flatMap(collectMarkdownFiles);
let warningCount = 0;
const missingTerms = new Map(); // term -> [files]

for (const file of allFiles) {
  const content = readFileSync(file, "utf-8");
  const relPath = file.replace(ROOT + "/", "");

  // Check bold terms
  let match;
  BOLD_TERM_PATTERN.lastIndex = 0;
  while ((match = BOLD_TERM_PATTERN.exec(content)) !== null) {
    const term = match[1].trim();
    if (!isSwedishInsuranceTerm(term)) continue;
    if (!glossaryTerms.has(term.toLowerCase())) {
      const arr = missingTerms.get(term.toLowerCase()) || [];
      arr.push(relPath);
      missingTerms.set(term.toLowerCase(), arr);
    }
  }

  // Check parenthesized terms (Swedish equivalents)
  PAREN_TERM_PATTERN.lastIndex = 0;
  while ((match = PAREN_TERM_PATTERN.exec(content)) !== null) {
    const term = match[1].trim();
    if (!isSwedishInsuranceTerm(term)) continue;
    if (!glossaryTerms.has(term.toLowerCase())) {
      const arr = missingTerms.get(term.toLowerCase()) || [];
      arr.push(relPath);
      missingTerms.set(term.toLowerCase(), arr);
    }
  }
}

for (const [term, files] of missingTerms) {
  const uniqueFiles = [...new Set(files)];
  for (const f of uniqueFiles) {
    console.warn(
      `\u26a0 Term "${term}" used in ${f} but not found in glossary`,
    );
    warningCount++;
  }
}

console.log(`\nScanned ${allFiles.length} files.`);
if (warningCount > 0) {
  console.warn(
    `\n${warningCount} warning(s): terms used but not defined in glossary.`,
  );
  console.warn("Consider adding missing terms to glossary.md.");
} else {
  console.log("All Swedish insurance terms are defined in the glossary.");
}

// Always exit 0 — warnings only, never block the build
process.exit(0);
