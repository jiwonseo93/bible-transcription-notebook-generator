import { NextRequest, NextResponse } from "next/server";
import { chromium } from "playwright";
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

    // Generate PDF using Playwright
    let browser;
    try {
      browser = await chromium.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
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
        waitUntil: "networkidle",
      });

      // Generate PDF
      const pdfBuffer = await page.pdf({
        format: undefined, // Use custom size from @page
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
      return new NextResponse(pdfBuffer as any, {
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
