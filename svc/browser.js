"use strict"
const puppeteer = require("puppeteer-core");
const trace = require('./trace');


async function createInstance() {
  trace.log("browser.createInstance()");
  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: '/usr/bin/google-chrome',
      args: [
  			//for docker
  			'--no-sandbox',
  			//'--disable-setuid-sandbox',
  			//'--ignore-certificate-errors',
  			//'--disable-dev-shm-usage',
  			//'--disable-accelerated-2d-canvas',
  			//'--no-first-run',
  			//'--no-zygote',
  			//'--single-process', // <- this one doesn't works in Windows
  			//'--disable-gpu'
  		],
    });
    //trace.log("Prohlížeč byl úspěšné vytvořen!");
  } catch (e) {
    trace.error("err:" + e.message);
  }
  return browser;
}



async function close(browser) {
  trace.log("browser.close()");
  try {
    if (browser) {
      await browser.close();
      trace.log("Prohlízeč se zavřel!")
    }
  } catch (e) {
    trace.error("Chyba při zavírání prohlížeče:" + e.message);
  }
}



//důležité ukončit kvůli uvolneni paměti
process.on("SIGINT", async () => {
  trace.log("Zavírá se server a instance prohlížeče!");
  await utils.close(browser);
  process.exit();
})



module.exports = {
  createInstance,
  close
}
