import fetch from "node-fetch";
import { parseString } from "xml2js";
import * as fs from "fs";

const baseSitemapPath = process.argv[2];
const searchUrl = process.argv[3] ?? null;

if (!baseSitemapPath) {
  console.error("Please provide a path to the sitemap");
  process.exit(1);
}

const init = async () => {
  const pages = await getUrlsFromSitemap(baseSitemapPath);
  fs.writeFileSync("./pages.json", JSON.stringify(pages, null, 2));
  console.log('Done! Check "pages.json" for the list of pages');
};

async function xmlToArr(xmlPath) {
  console.log("Searching through", xmlPath);
  return new Promise(async (resolve) => {
    const request = await fetch(xmlPath);
    const sitemap = await request.text();
    parseString(sitemap, function (err, results) {
      let data;
      if (results?.sitemapindex?.sitemap) {
        data = results.sitemapindex.sitemap;
      } else if (results?.urlset.url) {
        data = results.urlset.url;
      }
      const urls = data.map((url) => {
        return url.loc[0];
      });
      resolve(urls);
    });
  });
}

async function getUrlsFromSitemap(xmlPath) {
  const urls = await xmlToArr(xmlPath);
  let pages = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    if (url == searchUrl) {
      console.log("Found the URL", url);
      process.exit(0);
    }
    if (url.includes(".xml")) {
      const subUrls = await getUrlsFromSitemap(url);
      pages = pages.concat(subUrls);
    } else {
      pages.push(url);
    }
  }
  return pages;
}

init();
