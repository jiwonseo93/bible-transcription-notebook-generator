import { NextRequest, NextResponse } from "next/server";
import { NotebookRequest } from "@/lib/notebook/types";
import { renderNotebookHtml } from "@/lib/notebook/renderHtml";

// Ensure Node.js runtime (not Edge)
export const runtime = "nodejs";

// Dynamic imports for different environments
let puppeteer: any;
let chromium: any;

// Load puppeteer based on environment
if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
  // Serverless: use puppeteer-core + @sparticuz/chromium
  puppeteer = require("puppeteer-core");
  chromium = require("@sparticuz/chromium");
} else {
  // Local dev: use full puppeteer (includes Chromium) for Windows compatibility
  try {
    puppeteer = require("puppeteer");
  } catch (error) {
    // Fallback to puppeteer-core if puppeteer not installed
    puppeteer = require("puppeteer-core");
    chromium = require("@sparticuz/chromium");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: NotebookRequest = await request.json();

    // Validate request
    if (!body.language || !body.templateId || !body.sections || !body.frontMatter || !body.backMatter) {
      return NextResponse.json(
        { error: "Invalid request: missing required fields" },
        { status: 400 }
      );
    }

    if (body.language !== "en" && body.language !== "ko") {
      return NextResponse.json(
        { error: "Invalid language. Must be 'en' or 'ko'" },
        { status: 400 }
      );
    }

    // Render HTML
    let html: string;
    try {
      html = renderNotebookHtml(body);
    } catch (error) {
      console.error("Error rendering HTML:", error);
      return NextResponse.json(
        { error: "Failed to render HTML", details: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }

    // Generate PDF using Puppeteer
    let browser;
    const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
    
    try {
      if (isServerless && chromium) {
        // Serverless environment (Vercel) - use @sparticuz/chromium
        console.log("Using serverless Chromium on Vercel");
        const executablePath = await chromium.executablePath();
        
        browser = await puppeteer.launch({
          args: chromium.args,
          defaultViewport: { width: 1920, height: 1080 },
          executablePath,
          headless: true,
        });
      } else {
        // Local development - use full puppeteer (includes Chromium)
        console.log("Using local Puppeteer with bundled Chromium");
        browser = await puppeteer.launch({
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
      }
    } catch (error) {
      console.error("Error launching browser:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      
      // Return diagnostics
      return NextResponse.json(
        { 
          error: "Failed to launch browser", 
          details: errorMessage,
          stack: errorStack,
          diagnostics: {
            nodeVersion: process.version,
            platform: process.platform,
            arch: process.arch,
            isServerless: !!isServerless,
            hasChromium: !!chromium,
            puppeteerType: chromium ? "puppeteer-core" : "puppeteer",
          }
        },
        { status: 500 }
      );
    }

    try {
      const page = await browser.newPage();

      // Set content
      await page.setContent(html, {
        waitUntil: "networkidle0",
      });

      // Generate PDF with explicit page size
      const pdfBuffer = await page.pdf({
        width: "7.75in",
        height: "10.75in",
        printBackground: true,
        preferCSSPageSize: false, // Use explicit width/height instead
        margin: {
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
        },
      });

      await browser.close();

      // Return PDF - convert Buffer to Uint8Array for NextResponse
      const pdfArray = new Uint8Array(pdfBuffer);
      return new NextResponse(pdfArray, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="notebook-sample.pdf"',
        },
      });
    } catch (error) {
      await browser?.close();
      console.error("Error generating PDF:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      
      return NextResponse.json(
        { 
          error: "Failed to generate PDF", 
          details: errorMessage,
          stack: errorStack,
          diagnostics: {
            nodeVersion: process.version,
            platform: process.platform,
            arch: process.arch,
          }
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in PDF generation route:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate PDF", 
        details: error instanceof Error ? error.message : String(error),
        diagnostics: {
          nodeVersion: process.version,
          platform: process.platform,
          arch: process.arch,
        }
      },
      { status: 500 }
    );
  }
}
