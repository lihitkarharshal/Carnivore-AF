const fs = require('fs');
const path = require('path');

const chapters = [
    "Table_of_Contents.md",
    "Introduction.md",
    "Chapter_1_Evolution.md",
    "Chapter_2_Comparisons.md",
    "Chapter_3_AntiNutrients.md",
    "Chapter_4_Bellevue.md",
    "Chapter_5_Satiety.md",
    "Chapter_6_Macros.md",
    "Chapter_7_Micros.md",
    "Chapter_8_Cholesterol.md",
    "Chapter_9_Gut_Health.md",
    "Chapter_10_Mental_Health.md",
    "Chapter_11_Athletics.md",
    "Chapter_12_Myths.md",
    "Chapter_13_Transition.md",
    "Chapter_14_Cooking.md",
    "Chapter_15_Social.md",
    "Chapter_16_Sustainability.md"
];

function slugify(text) {
    return text.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

let htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        @page {
            size: A4;
            margin: 25mm;
            @bottom-center {
                content: counter(page);
                font-family: sans-serif;
                font-size: 10pt;
            }
        }

        body {
            font-family: "Georgia", serif;
            line-height: 1.6;
            font-size: 12pt;
            text-align: justify;
        }

        h1, h2, h3 {
            font-family: sans-serif;
            page-break-after: avoid;
        }

        h1 {
            font-size: 28pt;
            margin-top: 0;
            page-break-before: always;
        }

        .toc-page h1 {
            page-break-before: avoid;
        }

        .chapter-content {
            page-break-after: always;
        }

        /* TOC Styling */
        .toc ul {
            list-style: none;
            padding: 0;
        }

        .toc li {
            margin-bottom: 12px;
            display: flex;
            align-items: baseline;
        }

        .toc a {
            text-decoration: none;
            color: black;
            flex-grow: 1;
        }

        .toc a::after {
            content: target-counter(attr(href), page);
            float: right;
        }

        .toc li::after {
            content: "";
            flex-grow: 1;
            border-bottom: 1px dotted #ccc;
            margin: 0 10px;
        }
    </style>
</head>
<body>
`;

chapters.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    const isTOC = file === "Table_of_Contents.md";

    if (isTOC) {
        htmlContent += '<div class="toc-page toc">';
        // Convert TOC links to internal anchors
        content = content.replace(/\*\*\[(.*?)\]\((.*?)\.md\)\*\*/g, (match, title, filename) => {
            const anchor = slugify(title);
            return `<li><a href="#${anchor}">${title}</a></li>`;
        });
        // Remove markdown headers and bullets for cleaner HTML TOC
        content = content.replace(/^# .*/g, '<h1>Table of Contents</h1><ul>')
                         .replace(/^\* .*/gm, '') 
                         .replace(/\n\n/g, '\n');
        htmlContent += content + '</ul></div>';
    } else {
        htmlContent += '<div class="chapter-content">';
        // Convert header to ID-fied header
        content = content.replace(/^# (.*)/, (match, title) => {
            const anchor = slugify(title);
            return `<h1 id="${anchor}">${title}</h1>`;
        });

        // Basic Markdown to HTML conversion
        content = content
            .replace(/^### (.*)/gm, '<h3>$1</h3>')
            .replace(/^## (.*)/gm, '<h2>$1</h2>')
            .replace(/^\* (.*)/gm, '<li>$1</li>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Wrap lists
        content = content.replace(/(<li>.*<\/li>)+/g, '<ul>$&</ul>');
        
        htmlContent += '<p>' + content + '</p>';
        htmlContent += '</div>';
    }
});

htmlContent += `
</body>
</html>
`;

fs.writeFileSync('book_paged.html', htmlContent);
console.log('Generated book_paged.html');
