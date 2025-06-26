import fs from 'fs';
import PDFDocument from 'pdfkit';

const doc = new PDFDocument();
const outputPath = 'test/data/05-versions-space.pdf';

fs.mkdirSync('test/data', { recursive: true });
doc.pipe(fs.createWriteStream(outputPath));

doc.fontSize(14).text('This is a test resume for an Android Developer role.', 100, 100);
doc.end();

console.log('✅ Dummy PDF created at', outputPath);
