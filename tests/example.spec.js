// tests/create-order.spec.js
const { test, expect } = require('@playwright/test');
const path = require('node:path');

/**
 * Upload a file to a specific "Choose File" button inside a scoped block.
 *
 * @param {import('@playwright/test').Locator} block   - Locator that scopes the product section
 * @param {string} buttonText                          - Exact visible text of the button
 * @param {string} fileName                            - File name inside ./fixtures/
 */
async function uploadToButton(block, buttonText, fileName) {
  const filePath = path.join(__dirname, 'fixtures', fileName);

  const button = block.getByRole('button', { name: buttonText });
  await button.setInputFiles(filePath);

  // Wait for the toast that confirms the upload
  const toastRegex = new RegExp(
    `^${buttonText.includes('Front') ? 'Front' : buttonText.includes('Back') ? 'Back' : 'Assets'}.+uploaded`
  );
  await block.page.getByRole('heading', { name: toastRegex }).waitFor({ state: 'visible', timeout: 10_000 });
}

/**
 * Click "+ Add Product" and return the **newest** product block.
 *
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<import('@playwright/test').Locator>}
 */
async function addProduct(page) {
  await page.getByRole('button', { name: '+ Add Product' }).click();

  // All product blocks should have a stable attribute (data-testid is ideal)
  const blocks = page.locator('[data-testid="product-block"]');
  const count = await blocks.count();
  return blocks.nth(count - 1);               // the one we just added
}

// ---------------------------------------------------------------------
// Main test
// ---------------------------------------------------------------------
test('create order – upload images per product section (JS)', async ({ page }) => {
  // ---------- 1. Login ----------
  await page.goto('https://v2.custimoo.com/login');

  await page.getByRole('textbox', { name: 'Email' }).fill('super@custimoo.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Customwear4all2024!');
  await page.getByRole('button', { name: 'Login' }).click();

  // wait for redirect after login
  await expect(page).toHaveURL(/dashboard|orders/, { timeout: 15_000 });

  // ---------- 2. Start a new order ----------
  await page.getByRole('button', { name: 'Create Order' }).click();

  // ---------- 3. Common fields ----------
 await page.getByPlaceholder('Select Merchant').click();
  await page.getByRole('option', { name: 'Hummels' }).click();

  
  await page.getByPlaceholder('Select Customer').click();
await page.getByRole('option', { name: 'Yasir Rasool' }).first().click();

  // Address
    // Click the "Select Address" dropdown
await page.getByPlaceholder('Select Address').click();



// Then select the option by its visible name
await page.getByRole('option', { name: 'cantt' }).first().click()
 
  // / === PRODUCT 1 ===
  await page.getByPlaceholder('Select Product').click();
  await page.getByRole('option', { name: 'Custom Shortsleeve' }).click();

  // Upload files directly to hidden inputs (nth = order they appear in DOM)
  const fileInputs = page.locator('input[type="file"]');

  await fileInputs.nth(0).setInputFiles(path.join(__dirname, 'fixtures', 'logo1.jpg')); // Asset
  await fileInputs.nth(1).setInputFiles(path.join(__dirname, 'fixtures', 'logo1.jpg')); // Front
  await fileInputs.nth(2).setInputFiles(path.join(__dirname, 'logo2.jpg')); // Back

  // Wait for upload success toasts
  await expect(page.getByRole('heading', { name: 'Assets uploaded successfully' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Front image uploaded' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Back image uploaded' })).toBeVisible();
  // ---------- 5. Product 2 ----------
  const prod2 = await addProduct(page);

  await prod2.getByPlaceholder('Select Product').click();
  await page.getByRole('option', { name: 'Custom Shortsleeve' }).click();

  // Asset
  await uploadToButton(prod2, 'Choose File', 'logo1.jpg');

  // Front
  await uploadToButton(prod2, 'Choose File', 'logo2.jpg');

  // Back
  await uploadToButton(prod2, 'Choose File', 'logo1.jpg');

  // ---------- (Add more products the same way) ----------

  // ---------- 6. Submit ----------
  await page.getByRole('button', { name: /^Create Order$/ }).click();

  await expect(page.getByRole('heading', { name: 'Success' })).toBeVisible({ timeout: 10_000 });
  await page.getByRole('button', { name: 'OK' }).click();
});