
# CodeToImg

CodeToImg is a web application that generates high-quality images from code snippets. The images can be customized with various themes, fonts, and other styling options.

## Features

- Supports multiple programming languages with syntax highlighting.
- Customizable themes, fonts, and background colors.
- Ability to add headings, descriptions, and watermarks.
- Generates images suitable for sharing on social media or embedding in documentation.

## Project Structure

```
server/
├── css/
├── icons/
├── routes/
│   └── generateImage.js
├── templates/
│   └── htmlTemplate.js
├── utils/
│   └── utilities.js
└── index.js
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/HimashaHerath/CodeToImg.git
cd CodeToImg
```

2. Install dependencies:

```bash
npm install
```

## Usage

1. Start the server:

```bash
node server/index.js
```

2. Send a POST request to `http://localhost:3000/generate-image` with the following JSON payload:

```json
{
    "code": "console.log('Hello, World!');",
    "language": "javascript",
    "theme": "monokai",
    "background": "#2e2e2e",
    "padding": "1rem",
    "filename": "example.js",
    "fontSize": "16px",
    "fontFamily": "Fira Code, monospace",
    "watermark": "CodeToImg",
    "heading": "Example Code",
    "description": "This is a sample code snippet.",
    "headingColor": "#fff",
    "descriptionColor": "#bbb",
    "headingFontSize": "24px",
    "descriptionFontSize": "14px",
    "headingPadding": "10px 0",
    "descriptionPadding": "0 0 20px"
}
```

## API Endpoints

### `POST /generate-image`

Generates an image from the provided code snippet and customization options.

#### Request Body

- `code` (string): The code snippet to be highlighted and rendered.
- `language` (string): The programming language of the code snippet.
- `theme` (string): The theme for syntax highlighting (e.g., `monokai`).
- `background` (string): The background color of the image.
- `padding` (string): Padding around the code snippet.
- `filename` (string): The name of the file displayed in the header.
- `fontSize` (string): Font size for the code snippet.
- `fontFamily` (string): Font family for the code snippet.
- `watermark` (string): Watermark text displayed on the image.
- `heading` (string): Heading text displayed above the code snippet.
- `description` (string): Description text displayed below the heading.
- `headingColor` (string): Color of the heading text.
- `descriptionColor` (string): Color of the description text.
- `headingFontSize` (string): Font size of the heading text.
- `descriptionFontSize` (string): Font size of the description text.
- `headingPadding` (string): Padding around the heading text.
- `descriptionPadding` (string): Padding around the description text.

## Example

Here is an example of a request and the resulting image:

### Request

```json
{
    "code": "console.log('Hello, World!');",
    "language": "javascript",
    "theme": "monokai",
    "background": "#2e2e2e",
    "padding": "1rem",
    "filename": "example.js",
    "fontSize": "16px",
    "fontFamily": "Fira Code, monospace",
    "watermark": "CodeToImg",
    "heading": "Example Code",
    "description": "This is a sample code snippet.",
    "headingColor": "#fff",
    "descriptionColor": "#bbb",
    "headingFontSize": "24px",
    "descriptionFontSize": "14px",
    "headingPadding": "10px 0",
    "descriptionPadding": "0 0 20px"
}
```

### Response



## License


