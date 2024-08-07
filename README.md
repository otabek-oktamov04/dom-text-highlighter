# dom-text-highlighter

The `dom-text-highlighter` library provides an easy and customizable way to highlight text within a webpage. This library supports custom highlight styles, annotation, persistence, and more, making it a versatile tool for text highlighting needs.

## Features

- **Custom Highlight Styles**: Define multiple styles for different types of highlights.
- **Highlight Removal**: Remove highlights from selected text.
- **Persistence**: Save and restore highlights, enabling highlights to persist across page reloads or sessions.
- **Callbacks**: Add callbacks for when text is highlighted or unhighlighted.
- **Text Annotation**: Add annotations or comments to highlighted text.
- **Highlight Navigation**: Navigate between highlights.
- **Accessibility**: Ensure highlights are accessible (e.g., ARIA roles, screen reader support).
- **Highlight Management**: Get all highlights, clear all highlights, and export highlights.

## Installation

To install the `dom-text-highlighter` library, use npm:

```sh
npm install dom-text-highlighter
```

Then import it into your project:

```typescript
import Highlighter from "dom-text-highlighter";
```

## Usage

### Initialization

You can initialize the Highlighter library with custom options for highlight styling. If no options are provided, default styles will be applied.

```typescript
const customOptions = {
  backgroundColor: "lightblue",
  textColor: "black",
  fontWeight: "bold",
  customClass: "custom-highlight",
};

const highlighter = Highlighter.getInstance(customOptions);
```

### Adding Highlight Listener

To enable highlighting functionality, you need to add a highlight listener to the desired element.

```typescript
highlighter.addHighlightListener("content");
```

### Removing Highlight Listener

To remove the highlight listener from an element:

```typescript
highlighter.removeHighlightListener("content");
```

### Highlighting Text

Text highlighting is automatically handled when the user selects text within the element that has the highlight listener.

### Removing Highlights

To remove all highlights:

```typescript
highlighter.removeHighlights();
```

### Adding Annotations

To add an annotation to a specific highlight:

```typescript
const highlightId = "highlight-id"; // Replace with the actual highlight ID
const annotation = "This is an annotation";
highlighter.addAnnotationToHighlight(highlightId, annotation);
```

### Managing Highlights

#### Get All Highlights

To retrieve all highlights:

```typescript
const highlights = highlighter.getHighlights();
console.log(highlights);
```

#### Save Highlights

To save highlights to local storage:

```typescript
highlighter.saveHighlights();
```

#### Load Highlights

To load highlights from local storage:

```typescript
highlighter.loadHighlights();
```

## Options

The `HighlightOptions` interface allows you to customize the appearance of the highlights. The options include:

- `backgroundColor`: The background color of the highlight (default: "yellow").
- `textColor`: The text color of the highlight (default: "inherit").
- `fontWeight`: The font weight of the highlighted text (default: "inherit").
- `fontStyle`: The font style of the highlighted text (default: "inherit").
- `customClass`: Custom CSS class for additional styling (default: "").

## Example

Here's a complete example demonstrating how to use the Highlighter library:

```typescript
import Highlighter from "dom-text-highlighter";

// Example usage with custom options
const customOptions = {
  backgroundColor: "lightblue",
  textColor: "black",
  fontWeight: "bold",
  customClass: "custom-highlight",
};

const highlighter = Highlighter.getInstance(customOptions);

// Add listener to highlight text in an element with id "content"
highlighter.addHighlightListener("content");

// Save highlights to local storage
highlighter.saveHighlights();

// Load highlights from local storage
highlighter.loadHighlights();

// Remove all highlights
highlighter.removeHighlights();

// Add annotation to a specific highlight
const highlightId = "highlight-id"; // Replace with the actual highlight ID
const annotation = "This is an annotation";
highlighter.addAnnotationToHighlight(highlightId, annotation);
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bug fixes or enhancements.

## Acknowledgements

Special thanks to all the contributors and the open-source community for their continuous support and contributions.

## Contact

If you have any questions or feedback, feel free to reach out to the maintainers at [your-email@example.com].
