'use strict';
const url = require("url");
const browser = require("./browser")
const pdfA4Ctl = require("./controllers/pdfA4Ctl");

//const trace    = require('./trace');


module.exports = function (app) {
  pdfA4Ctl.setBrowser(browser.createInstance());

  var rootUrl = url.parse(process.env.ROOT_URL || '/').pathname

  app.route(rootUrl)
    .get(pdfA4Ctl.pdfGenerate);

  app.route(rootUrl + "pub/htm2pdfA4")
    .get(pdfA4Ctl.pdfGenerate);

  //spravna route s https
  app.route(rootUrl + "tls/nosso/nemo/objednavky/*")
    .get(pdfA4Ctl.pdfObjednavky);

  //legacy route
  app.route(rootUrl + "pub/nemo/objednavky/")
    .get(pdfA4Ctl.pdfObjednavky);

  app.route(rootUrl + "tls/nosso/nemo/objednavky/html/")
    .post(pdfA4Ctl.generatePdfFromHtml);
}
