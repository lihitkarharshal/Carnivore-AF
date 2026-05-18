const fs = require('fs');
const path = require('path');

const files = [
    "Title_Page.md",
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

let combined = "";

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        combined += fs.readFileSync(filePath, 'utf8');
        combined += "\n\n<div style='page-break-after: always;'></div>\n\n";
    }
});

fs.writeFileSync(path.join(__dirname, 'Carnivore_AF_Full.md'), combined, 'utf8');
console.log('Successfully combined chapters into Carnivore_AF_Full.md');
