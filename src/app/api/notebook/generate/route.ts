import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { NotebookRequest } from "@/lib/notebook/types";
import { renderNotebookHtml } from "@/lib/notebook/renderHtml";

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

    // Generate PDF using Puppeteer with serverless Chromium
    let browser;
    try {
      const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
      
      if (isServerless) {
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
        // Local development - try to use system Chrome/Chromium
        console.log("Using local Puppeteer");
        // Try to find Chrome in common locations
        const possiblePaths = [
          process.env.PUPPETEER_EXECUTABLE_PATH,
          "/usr/bin/google-chrome",
          "/usr/bin/chromium-browser",
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        ].filter(Boolean);
        
        browser = await puppeteer.launch({
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
          executablePath: possiblePaths[0],
        });
      }
    } catch (error) {
      console.error("Error launching browser:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      console.error("Error stack:", errorStack);
      return NextResponse.json(
        { 
          error: "Failed to launch browser", 
          details: errorMessage,
          stack: errorStack,
          isServerless: !!process.env.VERCEL,
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
