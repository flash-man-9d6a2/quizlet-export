import { test, expect } from "@playwright/test";
import { load } from "cheerio";
import { writeFileSync } from "fs";

test("quizlet", async ({ page }) => {
  await page.goto(
    // "https://quizlet.com/kr/731326650/day-10-flash-cards",
    "https://quizlet.com/kr/731326650/day-10-flash-cards/?x=1jqU&i=48susm",
    {
      // waitUntil: "domcontentloaded",
      timeout: 3 * 1000,
      // waitUntil: "commit",
    }
  );
  let title = "qz";
  // const htmlTitle = await page.innerHTML("h3");
  // const title = load(htmlTitle).text();

  const html = await page.innerHTML(".SetPage-terms");
  const $ = load(html);
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
        return $(this).text();
      })
      .toArray();
    pairs.push(ret);
    return ret;
  });

  console.log(pairs.length, pairs);
  const content = pairs.map(([s1, s2]) => `${s1}\t\t${s2}`).join("\n");
  console.log(content);
  writeFileSync(`${__dirname}/${title}.txt`, content);

  // // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);

  // create a locator
  // const count = await page.locator(".SetPageTerms-term").count();
  // console.log({ count });
  // page.locator(".SetPageTerms-term").

  // // Expect an attribute "to be strictly equal" to the value.
  // await expect(getStarted).toHaveAttribute("href", "/docs/intro");

  // // Click the get started link.
  // await getStarted.click();

  // // Expects the URL to contain intro.
  // await expect(page).toHaveURL(/.*intro/);
});
