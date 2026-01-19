export type Language = "en" | "ko";

export type TemplateId = "church-standard";

export type Verse = {
  chapter: number;
  verse: number;
  text: string;
};

// Legacy support for Stage 1
export type PageContent = {
  paragraphs: string[];
};

export type Section = {
  title: string;
  // Stage 1: pages array (pre-split)
  pages?: PageContent[];
  // Stage 2: verses array (auto-paginated)
  verses?: Verse[];
};

export type FrontMatterType = "blank" | "cover";
export type BackMatterType = "blank";

export type NotebookRequest = {
  language: Language;
  templateId: TemplateId;
  sections: Section[];
  frontMatter: FrontMatterType[];
  backMatter: BackMatterType[];
};

export type WritingPageGeometry = {
  lineCount: number;
  lineSpacing: number; // pt
  firstLineTopOffset: number; // pt from top
  lineStartX: number; // pt from left
  lineEndX: number; // pt from left
  lineStrokeWidth: number; // pt
  marginLineX: number; // pt from left
  marginLineStrokeWidth: number; // pt
};

export type ScripturePageGeometry = {
  marginLeft: number; // pt
  marginRight: number; // pt
  marginTop: number; // pt
  marginBottom: number; // pt
};

export type Template = {
  id: TemplateId;
  pageSize: {
    widthPt: number;
    heightPt: number;
  };
  writingPage: WritingPageGeometry;
  scripturePage: ScripturePageGeometry;
};
