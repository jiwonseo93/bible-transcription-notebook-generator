// Browser type - use any to work with both puppeteer and puppeteer-core
type Browser = any;
import { Template } from "./types";
import { Verse } from "./types";

/**
 * Paginate verses into pages using real measurement from Puppeteer.
 * Uses binary search to find how many verses fit on each page.
 */
export async function paginateVerses({
  browser,
  template,
  verses,
  language,
  isDebug = false,
}: {
  browser: Browser;
  template: Template;
  verses: Verse[];
  language: "en" | "ko";
  isDebug?: boolean;
}): Promise<Array<Array<Verse>>> {
  if (verses.length === 0) {
    return [];
  }

  const page = await browser.newPage();
  
  try {
    // Create measurement HTML with exact same CSS as scripture page
    const fontFamily = language === "ko" ? "var(--font-noto-serif-kr)" : "var(--font-noto-serif)";
    const measurementHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    :root {
      --font-noto-serif: serif;
      --font-noto-serif-kr: serif;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: ${fontFamily};
      font-size: 12pt;
      line-height: 1.6;
      color: #000;
    }
    
    body {
      width: 7.75in;
      height: 10.75in;
      position: relative;
      margin: 0;
      padding: 0;
    }
    
    #measureBox {
      position: absolute;
      left: 0.5in;
      right: 0.5in;
      top: 0.45in;
      bottom: 0.55in;
      background: #fff;
      border-radius: 0.5in;
      padding: 0.35in 0.4in 0.4in 0.4in;
      overflow: hidden;
      box-sizing: border-box;
    }
    
    .scripture-content {
      width: 100%;
      height: 100%;
      overflow: hidden;
      font-family: ${fontFamily};
    }
    
    .verse-row {
      display: grid;
      grid-template-columns: 0.35in 1fr;
      column-gap: 0.18in;
      margin-bottom: 0.4em;
    }
    
    .verse-num {
      text-align: right;
      font-size: 12pt;
      font-weight: normal;
      padding-top: 0.1em;
    }
    
    .verse-text {
      text-align: left;
      font-size: 12pt;
      line-height: 1.6;
      overflow-wrap: break-word;
      word-break: normal;
    }
  </style>
</head>
<body>
  <div id="measureBox">
    <div class="scripture-content" id="content"></div>
  </div>
</body>
</html>`;

    await page.setContent(measurementHtml, { waitUntil: "networkidle0" });
    
    const pages: Array<Array<Verse>> = [];
    let remainingVerses = [...verses];
    
    // Helper to escape HTML
    const escapeHtml = (text: string): string => {
      const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };
      return text.replace(/[&<>"']/g, (m) => map[m]);
    };
    
    // Helper to render verses HTML
    const renderVersesHtml = (verseList: Verse[]): string => {
      return verseList
        .map((v) => {
          const isContinuation = v.text.startsWith("(cont.)");
          const displayNum = isContinuation ? "" : v.verse.toString();
          const displayText = isContinuation ? v.text.replace(/^\(cont\.\)\s*/, "") : v.text;
          
          return `
        <div class="verse-row">
          <div class="verse-num">${escapeHtml(displayNum)}</div>
          <div class="verse-text">${escapeHtml(displayText)}</div>
        </div>`;
        })
        .join("\n      ");
    };
    
    // Helper to check if verses fit
    const versesFit = async (verseList: Verse[]): Promise<boolean> => {
      const contentHtml = renderVersesHtml(verseList);
      
      await page.evaluate((html: string) => {
        const content = document.getElementById("content");
        if (content) {
          content.innerHTML = html;
        }
      }, contentHtml);
      
      // Wait for layout
      await page.waitForTimeout(50);
      
      const fits = await page.evaluate(() => {
        const box = document.getElementById("measureBox");
        const content = document.getElementById("content");
        if (!box || !content) return false;
        
        // Check if content scrollHeight fits within the container's available height
        // We need to account for the content div being inside the measureBox with padding
        const boxHeight = box.clientHeight;
        const contentHeight = content.scrollHeight;
        
        return contentHeight <= boxHeight;
      });
      
      return fits;
    };
    
    // Binary search to find max verses that fit
    const findMaxVerses = async (startIndex: number, maxCount: number): Promise<number> => {
      let left = 1;
      let right = Math.min(maxCount, remainingVerses.length - startIndex);
      let best = 0;
      
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const testVerses = remainingVerses.slice(startIndex, startIndex + mid);
        
        if (await versesFit(testVerses)) {
          best = mid;
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      
      return best;
    };
    
    // Paginate verses
    let currentIndex = 0;
    while (currentIndex < remainingVerses.length) {
      const maxFit = await findMaxVerses(currentIndex, remainingVerses.length - currentIndex);
      
      if (maxFit === 0) {
        // Even 1 verse doesn't fit - need to split it
        const longVerse = remainingVerses[currentIndex];
        
        // Split verse text by words
        const words = longVerse.text.split(/\s+/);
        const midPoint = Math.floor(words.length / 2);
        
        const firstHalf: Verse = {
          chapter: longVerse.chapter,
          verse: longVerse.verse,
          text: words.slice(0, midPoint).join(" "),
        };
        
        const secondHalf: Verse = {
          chapter: longVerse.chapter,
          verse: longVerse.verse,
          text: "(cont.) " + words.slice(midPoint).join(" "),
        };
        
        // Try fitting first half
        if (await versesFit([firstHalf])) {
          pages.push([firstHalf]);
          remainingVerses.splice(currentIndex, 1, secondHalf);
          // Continue with second half on next page
        } else {
          // Even half doesn't fit - put whole verse anyway (edge case)
          if (isDebug) {
            console.warn(`Warning: Verse ${longVerse.chapter}:${longVerse.verse} is too long, forcing to page`);
          }
          pages.push([longVerse]);
          currentIndex++;
        }
      } else {
        // Found verses that fit
        const pageVerses = remainingVerses.slice(currentIndex, currentIndex + maxFit);
        pages.push(pageVerses);
        currentIndex += maxFit;
        
        if (isDebug) {
          const lastVerse = pageVerses[pageVerses.length - 1];
          console.log(
            `Page ${pages.length}: ${pageVerses.length} verses, last: ${lastVerse.chapter}:${lastVerse.verse}`
          );
        }
      }
    }
    
    return pages;
  } finally {
    await page.close();
  }
}
