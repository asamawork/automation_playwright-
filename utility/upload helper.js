import path from 'path';
import { expect } from '@playwright/test';

// Reusable helper to upload front & back images for a specific product
async function uploadProductImages(page, productName, frontImg, backImg) {
  console.log(`Uploading images for ${productName}...`);

  // Locate the correct accordion section by product name
  const productSection = page.locator('.accordion').filter({ hasText: productName });

  // Expand it only if not already open
  const header = productSection.locator('.accordion-header');
  const isExpanded = await productSection.locator('.accordion-content').isVisible();
  if (!isExpanded) {
    await header.click();
  }

  // === Upload Front Image ===
  const frontInput = productSection.locator('label:has-text("Upload Front Image")')
    .locator('xpath=following-sibling::div//input[@type="file"]');
  await frontInput.setInputFiles(path.resolve(frontImg));

  // Wait for front image preview to appear
  await expect(productSection.locator('img[alt="Front Preview"]')).toBeVisible({ timeout: 10000 });
  console.log(`✅ Front image uploaded for ${productName}`);

  // === Upload Back Image ===
  const backInput = productSection.locator('label:has-text("Upload Back Image")')
    .locator('xpath=following-sibling::div//input[@type="file"]');
  await backInput.setInputFiles(path.resolve(backImg));

  // Wait for back image preview to appear
  await expect(productSection.locator('img[alt="Back Preview"]')).toBeVisible({ timeout: 10000 });
  console.log(`✅ Back image uploaded for ${productName}`);
}

export { uploadProductImages };
