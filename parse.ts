import { readFileSync } from "fs";
import { load } from "cheerio";
import { writeFileSync } from "fs";

async function main() {
  let title = "qz";
  // const htmlTitle = await page.innerHTML("h3");

  const html = readFileSync("html.html");
  const $ = load(html);
  title = $("h3").text();
  const count = $(".SetPageTerms-term").length;
  console.log({ count });
  // SetPageTerm-side SetPageTerm-smallSide
  // SetPageTerm-side SetPageTerm-largeSide
  const pairs: string[][] = [];
  $(".SetPageTerm-content").map(function () {
    const $termContent = $(this);
    const ret = $termContent
      .children()
      .map(function () {
        return $(this).text().trim();
      })
      .toArray();
    pairs.push(ret);
    return ret;
  });

  console.log(pairs.length, pairs);
  const content = pairs.map(([s1, s2]) => `${s1}\t\t${s2}`).join("\n");
  console.log(content);
  writeFileSync(`${__dirname}/out/${title}.txt`, content);
}

main();
