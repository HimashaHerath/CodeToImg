const express = require('express');
const puppeteer = require('puppeteer');
const hljs = require('highlight.js');
const { languages, getBase64Icon } = require('../utils/utilities');
const themes = require('../css/themes');
const generateHtmlTemplate = require('../templates/htmlTemplate');

const router = express.Router();

router.post('/generate-image', async (req, res) => {
    const {
        code,
        language,
        theme,
        background,
        padding,
        filename,
        fontSize,
        fontFamily,
        watermark,
        heading,
        description,
        headingColor,
        descriptionColor,
        headingFontSize,
        descriptionFontSize,
        headingPadding,
        descriptionPadding
    } = req.body;

    if (!code || !language) {
        return res.status(400).send('Code and language are required');
    }

    // Find the logo URL based on the language
    const languageConfig = languages.find(lang => lang.name.toLowerCase() === language.toLowerCase());
    const logoUrl = languageConfig ? getBase64Icon(languageConfig.icon) : '';

    console.log('Logo URL:', logoUrl);  // Debugging: Print logo URL

    // Set default values if not provided
    const selectedBackground = background || '#2e2e2e';
    const headerBackground = '#333';
    const selectedPadding = padding || '1rem';
    const selectedFilename = filename || 'file.ts';
    const selectedFontSize = fontSize || '16px';
    const selectedFontFamily = fontFamily || 'Fira Code, monospace';
    const selectedTheme = themes[theme] || themes.monokai;  // Default to monokai if theme is not found
    const selectedWatermark = watermark || '';
    const selectedHeading = heading || 'Code Snippet';
    const selectedDescription = description || 'Description of the code snippet.';
    const selectedHeadingColor = headingColor || '#fff';
    const selectedDescriptionColor = descriptionColor || '#bbb';
    const selectedHeadingFontSize = headingFontSize || '24px';
    const selectedDescriptionFontSize = descriptionFontSize || '14px';
    const selectedHeadingPadding = headingPadding || '10px 0';
    const selectedDescriptionPadding = descriptionPadding || '0 0 20px';

    try {
        const highlightedCode = hljs.highlight(code, { language }).value;
        const htmlContent = generateHtmlTemplate(
            highlightedCode,
            selectedBackground,
            headerBackground,
            selectedPadding,
            selectedFilename,
            selectedTheme,
            selectedFontSize,
            selectedFontFamily,
            selectedWatermark,
            selectedHeading,
            selectedDescription,
            selectedHeadingColor,
            selectedDescriptionColor,
            selectedHeadingFontSize,
            selectedDescriptionFontSize,
            selectedHeadingPadding,
            selectedDescriptionPadding,
            logoUrl
        );

        console.log('Generated HTML:', htmlContent);  // Debugging: Print generated HTML

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Set viewport size and scale factor for high quality on phone screen size
        await page.setViewport({
            width: 375,  // Typical phone screen width
            height: 812, // Typical phone screen height (iPhone X/11/12/13)
            deviceScaleFactor: 3, // High device scale factor for better resolution
        });

        await page.setContent(htmlContent);
        const imageBuffer = await page.screenshot({
            fullPage: true,
            type: 'png',
            omitBackground: true,
        });

        await browser.close();

        res.set('Content-Type', 'image/png');
        res.send(imageBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

module.exports = router;
