# Repository Guidelines

## Project Structure & Module Organization

This repository is a book manuscript and PDF build workspace. Source content lives in root-level Markdown files: `Table_of_Contents.md`, `Introduction.md`, and `Chapter_1_*.md` through `Chapter_16_*.md`. Generated or publication artifacts include `Carnivore_AF_Full.md`, `book_paged.html`, `content.pdf`, `Cover_A4.pdf`, and `Carnivore_AF.pdf`.

Build helpers are root-level CommonJS scripts:

- `combine.js` concatenates the ordered Markdown manuscript into `Carnivore_AF_Full.md`.
- `generate_book_html.js` converts chapter Markdown into printable `book_paged.html`.
- `merge_pdfs.js` combines `Cover_A4.pdf` and `content.pdf` into `Carnivore_AF.pdf`.

## Build, Test, and Development Commands

Run commands from the repository root.

- `npm install` installs the Node dependency used for PDF merging.
- `node combine.js` rebuilds the combined manuscript Markdown.
- `node generate_book_html.js` rebuilds the paged HTML file for PDF export.
- `node merge_pdfs.js` creates the final PDF after `content.pdf` exists.

There is no working automated test command yet; `npm test` is the default placeholder and exits with an error.

## Coding Style & Naming Conventions

Use CommonJS for Node scripts (`require`, `module` patterns) and keep helper scripts small and procedural. Prefer 4-space indentation in JavaScript, matching the existing files. Keep manuscript files in Markdown with one top-level `#` heading per chapter or section.

Name new chapters with the existing pattern, for example `Chapter_17_Topic.md`. If adding a chapter, update the chapter arrays in both `combine.js` and `generate_book_html.js` so generated outputs stay in order.

## Testing Guidelines

Manual verification is required. After content or script changes, regenerate affected artifacts and inspect the output:

- Confirm `Carnivore_AF_Full.md` includes chapters in the intended order.
- Open `book_paged.html` or exported `content.pdf` to check headings, page breaks, and table-of-contents links.
- Run `node merge_pdfs.js` and verify the cover appears before the content in `Carnivore_AF.pdf`.

## Commit & Pull Request Guidelines

Recent commits use short, imperative summaries such as `Update PDF with page numbers and navigation, add gitignore` and `Fix PDF internal links and add bottom-center page numbering`. Follow that style: state the result, keep the subject concise, and mention generated artifacts when they change.

Pull requests should include a brief description, the files or chapters changed, the commands run, and notes on PDF/HTML visual checks. Include screenshots or page references when layout, page numbering, cover placement, or navigation changes.

## Content Guidance

Maintain the conversational, accessible tone established in the manuscript. Scientific or health-related claims should be grounded in cited material already used by the book or clearly marked for later citation review.
