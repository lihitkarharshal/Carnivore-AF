const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function mergePdfs() {
    const coverBuffer = fs.readFileSync('Cover_A4.pdf');
    const contentBuffer = fs.readFileSync('content.pdf');

    const coverDoc = await PDFDocument.load(coverBuffer);
    const contentDoc = await PDFDocument.load(contentBuffer);

    const mergedDoc = await PDFDocument.create();

    // Copy cover pages
    const coverPages = await mergedDoc.copyPages(coverDoc, coverDoc.getPageIndices());
    coverPages.forEach((page) => mergedDoc.addPage(page));

    // Copy content pages
    const contentPages = await mergedDoc.copyPages(contentDoc, contentDoc.getPageIndices());
    contentPages.forEach((page) => mergedDoc.addPage(page));

    const mergedPdfBytes = await mergedDoc.save();
    fs.writeFileSync('Carnivore_AF.pdf', mergedPdfBytes);
    console.log('Merged PDF saved as Carnivore_AF.pdf');
}

mergePdfs().catch(console.error);
