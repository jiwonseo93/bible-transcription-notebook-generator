# Bible Transcription Notebook Generator

A Next.js web application that generates PDF notebooks for Bible transcription with scripture pages and writing lines.

## Stage 1 MVP

This is Stage 1 of the project, featuring:
- Hardcoded sample content (no Bible API yet)
- Configurable front matter pages (blank pages + cover placeholder)
- Multiple sections (e.g., MATTHEW, GALATIANS) with title pages
- Scripture pages (left) with sample text
- Writing pages (right) with ruled lines and vertical margin line
- Configurable back matter pages (blank pages)

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Playwright (for HTML to PDF conversion)
- Noto Serif fonts (English and Korean)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install chromium
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

5. Navigate to `/notebook` and click "Generate English Sample PDF"

## Project Structure

```
src/
  app/
    api/notebook/generate/route.ts  # API endpoint for PDF generation
    notebook/page.tsx                # UI page for notebook generation
    layout.tsx                       # Root layout
    page.tsx                         # Home page
    globals.css                      # Global styles
  lib/
    notebook/
      types.ts                       # TypeScript type definitions
      templates.ts                   # Template definitions
      renderHtml.ts                  # HTML renderer
      sampleData.ts                  # Hardcoded sample data
```

## Features

### Page Specifications

- **Page Size**: 558pt x 774pt (7.75in x 10.75in)
- **Writing Pages**: 
  - 29 ruled lines
  - Line spacing: 22.68pt
  - First line offset: 71.28pt from top
  - Vertical margin line at 49.68pt from left
- **Scripture Pages**: 
  - Generous margins (left: 36pt, right: 60pt, top: 78pt, bottom: 100pt)
  - Clean serif font rendering
  - Supports English and Korean text

### PDF Generation

The PDF is generated using Playwright's headless browser to ensure crisp typography and print fidelity. Fonts are embedded as base64 data URIs for reliable rendering.

## Next Steps (Future Stages)

- Add Bible API integration
- Implement automatic pagination by measurement
- Add more template options
- Support additional languages
- Custom cover page generation
