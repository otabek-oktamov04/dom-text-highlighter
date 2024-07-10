// Highlighter.ts

interface HighlightOptions {
    backgroundColor?: string;
    textColor?: string;
    fontWeight?: string;
    fontStyle?: string;
    customClass?: string;
  }
  
  interface Highlight {
    id: string;
    text: string;
    range: Range;
    annotation?: string;
  }
  
  class Highlighter {
    private static instance: Highlighter | null = null;
    private options: HighlightOptions;
    private highlights: Map<string, Highlight>;
  
    private constructor(options: HighlightOptions = {}) {
      this.options = {
        backgroundColor: options.backgroundColor || "yellow",
        textColor: options.textColor || "inherit",
        fontWeight: options.fontWeight || "inherit",
        fontStyle: options.fontStyle || "inherit",
        customClass: options.customClass || "",
      };
      this.highlights = new Map();
    }
  
    static getInstance(options?: HighlightOptions): Highlighter {
      if (!Highlighter.instance) {
        Highlighter.instance = new Highlighter(options);
      }
      return Highlighter.instance;
    }
  
    highlightSelectedText() {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
  
      const range = selection.getRangeAt(0);
      const startLine = range.startContainer.parentElement;
      const endLine = range.endContainer.parentElement;
      if (startLine !== endLine) {
        console.log(
          "Cannot highlight across multiple lines. Highlighting aborted."
        );
        return;
      }
  
      const selectedText = range.toString().trim();
      if (!selectedText) return;
  
      const containsInteractiveElements = Array.from(
        range.commonAncestorContainer.childNodes
      ).some((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
  
          return ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(
            element.tagName
          );
        }
        return false;
      });
  
      const highlightSpan = document.createElement("span");
      highlightSpan.style.backgroundColor = this.options.backgroundColor!;
      highlightSpan.style.color = this.options.textColor!;
      highlightSpan.style.fontWeight = this.options.fontWeight!;
      highlightSpan.style.fontStyle = this.options.fontStyle!;
      highlightSpan.className = this.options.customClass!;
  
      if (containsInteractiveElements) {
        const clonedRange = range.cloneContents();
        const fragment = document.createDocumentFragment();
        fragment.appendChild(clonedRange);
  
        highlightSpan.appendChild(fragment);
      } else {
        highlightSpan.textContent = selectedText;
      }
  
      range.deleteContents();
      range.insertNode(highlightSpan);
  
      // Add the highlight to the map
      const highlightId = `highlight-${Date.now()}`;
      this.highlights.set(highlightId, {
        id: highlightId,
        text: selectedText,
        range: range.cloneRange(),
      });
  
      selection.removeAllRanges();
    }
  
    removeHighlights() {
      this.highlights.forEach((highlight) => {
        const range = highlight.range;
        const span = range.startContainer.parentElement as HTMLElement;
        if (span) {
          span.replaceWith(span.innerText);
        }
      });
      this.highlights.clear();
    }
  
    addAnnotationToHighlight(highlightId: string, annotation: string) {
      const highlight = this.highlights.get(highlightId);
      if (highlight) {
        highlight.annotation = annotation;
        // Additional logic to display the annotation can be added here
      }
    }
  
    addHighlightListener(elementId: string) {
      const element = document.getElementById(elementId);
      if (element) {
        element.addEventListener(
          "mouseup",
          this.highlightSelectedText.bind(this)
        );
      }
    }
  
    removeHighlightListener(elementId: string) {
      const element = document.getElementById(elementId);
      if (element) {
        element.removeEventListener(
          "mouseup",
          this.highlightSelectedText.bind(this)
        );
      }
    }
  
    getHighlights(): Highlight[] {
      return Array.from(this.highlights.values());
    }
  
    saveHighlights() {
      // Implement logic to save highlights to local storage or a backend service
      const highlightsArray = Array.from(this.highlights.values());
      localStorage.setItem("highlights", JSON.stringify(highlightsArray));
    }
  
    loadHighlights() {
      // Implement logic to load highlights from local storage or a backend service
      const highlightsArray = JSON.parse(
        localStorage.getItem("highlights") || "[]"
      );
      highlightsArray.forEach((highlightData: Highlight) => {
        this.highlights.set(highlightData.id, highlightData);
        // Implement logic to restore the highlight in the document
        const range = document.createRange();
        range.setStart(
          highlightData.range.startContainer,
          highlightData.range.startOffset
        );
        range.setEnd(
          highlightData.range.endContainer,
          highlightData.range.endOffset
        );
  
        const highlightSpan = document.createElement("span");
        highlightSpan.style.backgroundColor = this.options.backgroundColor!;
        highlightSpan.style.color = this.options.textColor!;
        highlightSpan.style.fontWeight = this.options.fontWeight!;
        highlightSpan.style.fontStyle = this.options.fontStyle!;
        highlightSpan.className = this.options.customClass!;
        highlightSpan.textContent = highlightData.text;
  
        range.deleteContents();
        range.insertNode(highlightSpan);
      });
    }
  }
  
  export default Highlighter;
  