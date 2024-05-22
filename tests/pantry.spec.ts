import { test, expect } from "@playwright/test"

// playwright runs test in "headless" browsers, aka browser without a visible UI => code interacts programmatically with the UI but "we" the developers don't see it
// page represents the current page in that headless browser
test("redirects actor to login if they are not logged in", async ({ page }) => {
	await page.goto("/app/pantry")
	await expect(page.getByRole("button", { name: /log in/i })).toBeVisible() //access via locator => object which states how to find the element on the page => many ways i.e. label, accessibility attributes, etc.
})
