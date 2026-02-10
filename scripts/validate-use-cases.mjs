#!/usr/bin/env node

/**
 * Use Case Structure Validator
 *
 * Checks all files in use-cases directories (excluding index.md) for:
 * - Summary: ## Summary heading or a summary table (| Use Case ID |)
 * - Main scenario: ## Main Success Scenario, ## Main Scenario, ## Main Flow, or numbered step list
 * - Alternative flows: ## Alternative Flows, ## Alternative, ## Extensions
 * - Regulatory: ## Regulatory heading or regulatory reference pattern
 *
 * Skips: index.md files
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, basename, extname, sep } from "node:path";

const SEARCH_DIRS = ["docs", "versioned_docs"];

function collectUseCaseFiles(dir) {
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
      files.push(...collectUseCaseFiles(fullPath));
    } else if (
      extname(entry) === ".md" &&
      basename(entry) !== "index.md" &&
      fullPath.includes(`${sep}use-cases${sep}`)
    ) {
      files.push(fullPath);
    }
  }
  return files;
}

function checkSummary(content) {
  // Check for ## Summary or ## Overview heading, or summary table with | Use Case ID |
  if (/^#{2,3}\s+.*summary/im.test(content)) return true;
  if (/^#{2,3}\s+overview/im.test(content)) return true;
  if (/\|\s*\*?\*?Use Case ID\*?\*?\s*\|/i.test(content)) return true;
  // Aggregated multi-use-case files: introductory section before UC headings counts
  // (e.g., "## Renewal Timeline" followed by "## UC-RN-001: ...")
  const ucHeadings = content.match(/^##\s+UC-\w+-\d+/gm);
  if (ucHeadings && ucHeadings.length >= 2) return true;
  return false;
}

function checkMainScenario(content) {
  // Check for main scenario headings or numbered step list
  if (/^##\s+main\s+(success\s+)?scenario/im.test(content)) return true;
  if (/^##\s+main\s+flow/im.test(content)) return true;
  // Check for numbered step list (at least 3 numbered steps as a proxy for a scenario)
  const numberedSteps = content.match(/^\d+\.\s+/gm);
  if (numberedSteps && numberedSteps.length >= 3) return true;
  return false;
}

function checkAlternativeFlows(content) {
  // Grouped heading: ## Alternative Flows / ### Alternative Flows
  if (/^#{2,3}\s+alternative\s*(flows|scenarios)?/im.test(content)) return true;
  // Inline heading: ## Alternative Flow A: ... / ## Alternative Flow: ...
  if (/^#{2,3}\s+alternative\s+flow\b/im.test(content)) return true;
  // Exception flows count as alternative paths
  if (/^#{2,3}\s+exception\s+flow/im.test(content)) return true;
  if (/^#{2,3}\s+extensions/im.test(content)) return true;
  return false;
}

function checkRegulatory(content) {
  if (/^##\s+regulatory/im.test(content)) return true;
  // Check for inline regulatory references like FSA-xxx, GDPR-xxx, IDD-xxx
  if (/\b(FSA|GDPR|IDD)-\d{3}\b/.test(content)) return true;
  return false;
}

const violations = [];
let fileCount = 0;

for (const dir of SEARCH_DIRS) {
  const files = collectUseCaseFiles(dir);
  for (const file of files) {
    fileCount++;
    const content = readFileSync(file, "utf-8");
    const issues = [];

    if (!checkSummary(content)) {
      issues.push(
        'missing Summary section (## Summary or "| Use Case ID |" table)',
      );
    }
    if (!checkMainScenario(content)) {
      issues.push(
        "missing Main Scenario section (## Main Success Scenario / ## Main Flow / numbered steps)",
      );
    }
    if (!checkAlternativeFlows(content)) {
      issues.push(
        "missing Alternative Flows section (## Alternative Flows / ## Extensions)",
      );
    }
    if (!checkRegulatory(content)) {
      issues.push(
        "missing Regulatory section (## Regulatory or FSA/GDPR/IDD references)",
      );
    }

    if (issues.length > 0) {
      violations.push({ file, issues });
    }
  }
}

if (violations.length > 0) {
  console.error("Use case structure validation failed:\n");
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
