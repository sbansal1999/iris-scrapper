const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("dotenv").config();
const { analyze } = require("./data.js");

const username = process.env.IRIS_USERNAME;
const password = process.env.IRIS_PASSWORD;
const GYAN_REVIEW_PAGE_HOLD = 2;

async function sleep(timeInS) {
  await new Promise((resolve) => setTimeout(resolve, timeInS * 1000));
}

async function setup() {
  driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://iris.nitk.ac.in/hrms/placement/placed_students");
  await driver.findElement(By.id("user_login")).sendKeys(username);
  await driver
    .findElement(By.id("user_password"))
    .sendKeys(password, Key.RETURN);
  // Filter data manually during this time
  await sleep(30);

  const table = await driver.findElement(By.id("icList"));
  const rows = await table.findElements(By.css("tr"));
  const finalData = [];
  for (const row of rows) {
    const cells = await row.findElements(By.css("td"));
    let data = [];
    for (const cell of cells) {
      try {
        const linkElement = await cell.findElement(By.css("a"));
        const link = await linkElement.getAttribute("href");
        data.push(link);
      } catch (err) {
        const text = await cell.getText();
        data.push(text);
      }
    }
    finalData.push(data);
  }

  const gyan_review_links = [];
  const company_data = [];
  finalData.forEach((val) => {
    if (val.includes("M C A"))
      if (!val.includes("Gyan not filled yet!")) {
        gyan_review_links.push(val[6]);
      } else {
        company_data.push({ company: val[3], role: "", location: "" });
      }
  });

  for (const val of gyan_review_links) {
    console.log(val);
    await driver.navigate().to(val);
    // await sleep(GYAN_REVIEW_PAGE_HOLD);
    const company = await driver
      .findElement(
        By.css(
          "body > div.app-container.app-theme-gray.app-fluid-container > div.app-main > div > div.app-main__inner > div.app-inner-layout.app-inner-layout-page.app-layout-menu-default > div.app-inner-layout__wrapper > div.container.fiori-container > div.col-md-12.col-sm-12.col-xs-12 > div > div.card-body > div.grid-menu.grid-menu-3col > div > div:nth-child(4) > button"
        )
      )
      .getText();

    const role = await driver
      .findElement(
        By.css(
          "body > div.app-container.app-theme-gray.app-fluid-container > div.app-main > div > div.app-main__inner > div.app-inner-layout.app-inner-layout-page.app-layout-menu-default > div.app-inner-layout__wrapper > div.container.fiori-container > div.col-md-12.col-sm-12.col-xs-12 > div > div.card-body > div:nth-child(2) > div.card-body > p"
        )
      )
      .getText();
    const location = await driver
      .findElement(
        By.css(
          "body > div.app-container.app-theme-gray.app-fluid-container > div.app-main > div > div.app-main__inner > div.app-inner-layout.app-inner-layout-page.app-layout-menu-default > div.app-inner-layout__wrapper > div.container.fiori-container > div.col-md-12.col-sm-12.col-xs-12 > div > div.card-body > div:nth-child(3) > div.card-body > p"
        )
      )
      .getText();
    company_data.push({ company, role, location });
  }

  analyze(company_data);
  await driver.quit();
}

setup();
