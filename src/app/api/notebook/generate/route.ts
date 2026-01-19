import { NextRequest, NextResponse } from "next/server";
import { NotebookRequest } from "@/lib/notebook/types";
import { renderNotebookHtml } from "@/lib/notebook/renderHtml";

// Use puppeteer-core for serverless, puppeteer for local dev
let puppeteer: any;
let chromium: any;

if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
  // Serverless environment
  puppeteer = require("puppeteer-core");
  chromium = require("@sparticuz/chromium");
} else {
  // Local development - use regular puppeteer
  try {
    puppeteer = require("puppeteer");
  } catch {
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
        { error: "Failed to render HTML", details: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined },
        { status: 500 }
      );
    }

    // Generate PDF using Puppeteer
    let browser;
    try {
      const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
      
      if (isServerless && chromium) {
        // Serverless environment - use @sparticuz/chromium
        chromium.setGraphicsMode(false);
        const executablePath = await chromium.executablePath();
        
        browser = await puppeteer.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: executablePath,
          headless: chromium.headless,
        });
      } else {
        // Local development - use regular Puppeteer
        browser = await puppeteer.launch({
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
      }
    } catch (error) {
      console.error("Error launching browser:", error);
      return NextResponse.json(
        { error: "Failed to launch browser", details: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }

    try {
      const page = await browser.newPage();

      // Set content
      await page.setContent(html, {
        waitUntil: "networkidle0",
      });

      // Generate PDF
      const pdfBuffer = await page.pdf({
        printBackground: true,
        preferCSSPageSize: true,
        margin: {
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
        },
      });

      await browser.close();

      // Return PDF
      return new NextResponse(pdfBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="notebook-sample.pdf"',
        },
      });
    } catch (error) {
      await browser?.close();
      console.error("Error generating PDF:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF", details: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined },
      { status: 500 }
    );
  }
}
