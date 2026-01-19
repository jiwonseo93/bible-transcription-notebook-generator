import { Template } from "./types";

export const templates: Record<string, Template> = {
  "church-standard": {
    id: "church-standard",
    pageSize: {
      widthPt: 558,
      heightPt: 774,
    },
    writingPage: {
      lineCount: 29,
      lineSpacing: 22.68,
      firstLineTopOffset: 71.28,
      lineStartX: 12.6,
      lineEndX: 543.2,
      lineStrokeWidth: 0.6,
      marginLineX: 49.68,
      marginLineStrokeWidth: 0.8,
    },
    scripturePage: {
      marginLeft: 36,
      marginRight: 60,
      marginTop: 78,
      marginBottom: 100,
    },
  },
};

export function getTemplate(templateId: string): Template {
  const template = templates[templateId];
  if (!template) {
    throw new Error(`Template "${templateId}" not found`);
  }
  return template;
}
