/*
kontrole vykonavajici render url adresy jako pdfA4

2023 marek.tremel

update:
  2023-10-30, asida, page.goto waitUntil prevedeno na pole, testy ruznych hodnot, bez vysledku, vyreseno stazenim fontu z google do kz

*/

"use strict"

const trace = require('../trace');

let browser;


//todo:zlikvidovat a nahradit standardnim parserem url
function isValidUrl(url) {
  const urlPattern = new RegExp('^https?:\\/\\/[a-z0-9-._~:/?#[\\]@!$&\'()*+,;=]+$', 'i');
  return urlPattern.test(url);
}





//todo:osetrit, pokud neni init browser tak vyhodit vyjimku
async function generatePdfFromUrl(browser, url) {
  trace.log('pdfA4Ctl.generatePdfFromUrl()');
  trace.log(`url:${url}`);
  const maxRetries = 3;
  let retries = 0;
  while (retries < maxRetries) {
    try {
      const page = await browser.newPage();
      //trace.log("Vygeneroval jsem stránku.");
      await page.setDefaultNavigationTimeout(60000);

      /*
      waitUntil enum
        domcontentloaded
        load
        networkidle0
        networkidle2
      */
      //považovat navigaci za ukončenou, když je vyvolána událost DOMContentLoaded.
      await page.goto(url, { waitUntil: ["domcontentloaded"] });
      //trace.log("Přešel jsem na odkaz.", url);
      //await page.waitFor('*')

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: 'PDF',
        footerTemplate: 'PDF',
      });

      await page.close();
      //trace.log("Vygeneroval jsem pdf a uzavřel stránku")

      return pdfBuffer;
    } catch (e) {
      trace.error("Chyba při přecházení na odkaz, zkouším znova..");
      retries++;
      if (retries === maxRetries) {
        throw new Error("cant reach source html !");
      }
    }
  }
}



const pdfGenerate = async (req, res) => {
  trace.log('pdfA4Ctl.pdfGenerate()');
  const url = req.query.url;
  if (!isValidUrl(url)) {
    res.status(404).json({ "message": "bad url!" });
    return;
  }

  try {
    //const browser = await req.browserInstance;
    const pdfBuffer = await generatePdfFromUrl(browser, url);

    res.set("Content-Disposition", "inline; filename=page.pdf");
    res.set("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (e) {
    trace.error("err:" + e.message);
    res.status(500).json({ "message": "error when generating PDF." + e.message });
  }
}



const pdfObjednavky = async (req, res) => {
  trace.log('pdfA4Ctl.pdfObjednavky()');
  try {
    ////const browser = await req.browserInstance;
    //produkce
    let url = (req.hostname.search("test") >= 0) // server where to find orders
      ? "server:8001"
      : "server:8000";



    //trace.log(url)
    url += req.originalUrl.replace("f=pdf", "f=htm");

    const pdfBuffer = await generatePdfFromUrl(browser, url);

    res.set("Content-Disposition", "inline; filename=page.pdf");
    res.set("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (e) {
    res.status(500).json({ "message": "error when generating PDF." + e.message });
  }
}


const generatePdfFromHtml = async (req, res) => {

  console.log("generatePdfFromHtml()");

  try {
    // const htmlContent = req.body.htmlContent;
    const htmlContent = req.body;

    console.log(htmlContent);

    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

    // await page.goto('data:text/html;charset=UTF-8,' + htmlContent, { waitUntil: 'networkidle2' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: 'PDF',
      footerTemplate: 'PDF',
    });

    await page.close(); // nejdůležitější je zničit stránku ... jinak při dalším volaní dojde k timeoutu

    res.set("Content-Disposition", "inline; filename=page.pdf");
    res.set("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (e) {
    console.error("Error: " + e.message);
    res.status(500).json({ message: "Error when generating PDF from HTML: " + e.message });
  }
};


async function setBrowser(newBrowser) {
  browser = await newBrowser;
}



module.exports = {
  pdfGenerate,
  pdfObjednavky,
  setBrowser,
  generatePdfFromHtml
}
// module.exports.browser = browser
