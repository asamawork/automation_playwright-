


import { test, expect } from '@playwright/test';

import path from 'path';



test('test', async ({ page }) => {
    // await page.goto('https://v2.custimoo.com/login');
  await page.goto('https://v2.custimoo.com/login', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await expect(page.getByRole('textbox', { name: /Email/i })).toBeVisible({ timeout: 700000 });

  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('super@custimoo.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Customwear4all2024!');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('heading', { name: 'Dashboard' }).click();
  await page.getByRole('heading', { name: 'Hey, SuperAdmin' }).click();
  await page.getByRole('button', { name: 'Create Order' }).click();
  await page.getByPlaceholder('Select Merchant').click();
  await page.waitForSelector('.vs__dropdown-option', { state: 'visible' });
  await page.getByRole('option', { name: 'Hummels' }).click();

  
  await page.getByPlaceholder('Select Customer').click();
  await page.waitForSelector('.vs__dropdown-option', { state: 'visible' });
await page.getByRole('option', { name: 'Yasir Rasool' }).first().click();
  await page.getByRole('textbox', { name: 'Enter order reference' }).click();
  await page.getByRole('textbox', { name: 'Enter order reference' }).fill('3344');


  // Click the "Select Address" dropdown
await page.getByPlaceholder('Select Address').click();

// Wait until at least one option appears
await page.waitForSelector('[role="option"]', { timeout: 10000 });

// Then select the option by its visible name
await page.getByRole('option', { name: 'cantt' }).first().click();
//   await page.getByPlaceholder('Select Address').click();
//   await page.locator('#vs8__option-0').click();
  await page.getByPlaceholder('Select Product').click();
//   await page.waitForSelector('.vs__dropdown-option', { state: 'visible' });
  await page.getByRole('option', { name: 'Custom Shortsleeve' }).click();
  await page.getByPlaceholder('Select Style').click();
  await page.getByRole('option', { name: 'CoreXK' }).click();
  await page.getByPlaceholder('Select Addons').click();
  await page.getByRole('option', { name: 'Back side: mesh fabric days' }).click();
  await page.getByRole('textbox', { name: 'Design nickname' }).click();
  await page.getByRole('textbox', { name: 'Design nickname' }).fill('5545');






// // Click the "Choose File" button if needed (optional)
await page.getByRole('button', { name: 'Choose File' }).nth(3).click();

// Then locate the actual hidden input element right before it in the DOM
const fileInput1 = page.locator('input[type="file"]').nth(3);
await fileInput1.setInputFiles(path.resolve('logo1.jpg'));

// Second upload
await page.getByRole('button', { name: 'Choose File' }).nth(4).click();
const fileInput2 = page.locator('input[type="file"]').nth(4);
await fileInput2.setInputFiles(path.resolve('logo2.jpg'));




page.getByRole('checkbox', { name: 'Enter Manual Roster' }).check();
  await page.locator('.w-full.px-3').click();
  await page.locator('.w-full.px-3').fill('test player');
  await page.getByRole('spinbutton').first().click();
  await page.getByRole('spinbutton').first().fill('34');
  await page.getByPlaceholder('Select', { exact: true }).click();
  await page.getByText('Women XS').click();

await page.waitForTimeout(3000);

//   await page.getByRole('spinbutton').nth(1).click();
//   await page.getByRole('spinbutton').nth(1).fill('2');




  await page.getByRole('button', { name: 'Add Player' }).click();
  await page.getByRole('button', { name: 'Add Player' }).click();

  

// Get all spinbutton (number) inputs in the roster table
const qtyInputs = await page.getByRole('spinbutton').all();

// Define the indexes (1,3,5 means index 0,2,4 in JS)
const targetIndexes = [1, 3, 5];

let expectedTotal = 0;

// Loop through only the selected spinbuttons
for (const index of targetIndexes) {
  if (qtyInputs[index]) { // avoid out-of-range errors
    const qty = Math.floor(Math.random() * 5) + 1; // between 1–5
    expectedTotal += qty;

    await qtyInputs[index].fill(String(qty));
  }
}

// // Wait for UI update (if needed)
// await page.waitForTimeout(1000);

// await page.locator('#create-manual-order-form').getByRole('cell', { name: 'Qty' }).click();


// // ✅ Verify total quantity in Order Summary
// const summaryQtys = await page
//   .locator('div.accordion:has-text("Order Summary") table tbody tr td:nth-child(4)')
//   .allTextContents();

// const actualTotal = summaryQtys
//   .map(q => Number(q.trim()))
//   .reduce((a, b) => a + b, 0);

// await expect(actualTotal).toBe(expectedTotal);


// Optional: small delay if UI sometimes lags
await page.waitForTimeout(1000);

// Click on Qty cell to ensure UI updates
await page.locator('#create-manual-order-form').getByRole('cell', { name: 'Qty' }).click();

// Log that we’re starting verification
console.log('🧾 Verifying total quantity in Order Summary...');

// ✅ Get all quantity values from Order Summary table
const summaryQtys = await page
  .locator('div.accordion:has-text("Order Summary") table tbody tr td:nth-child(4)')
  .allTextContents();

// Log the list of quantities found
console.log(`📦 Quantities found in summary: [${summaryQtys.join(', ')}]`);

// Convert text to numbers and calculate total
const actualTotal = summaryQtys
  .map(q => Number(q.trim()))
  .reduce((a, b) => a + b, 0);

// Log both actual vs expected for visibility
console.log(`✅ Expected Total: ${expectedTotal}`);
console.log(`🧮 Actual Total: ${actualTotal}`);

// Assertion
await expect(actualTotal, `Expected total (${expectedTotal}) should match actual total (${actualTotal})`)
  .toBe(expectedTotal);

// Final success log
console.log('🎉 Total quantity verification successful!');










  await page.locator('.w-full.mb-4 > tbody > tr:nth-child(2) > td > div > .w-full').click();
  await page.locator('.w-full.mb-4 > tbody > tr:nth-child(2) > td > div > .w-full').fill('new player ');
  await page.getByRole('spinbutton').nth(2).click();
  await page.getByRole('spinbutton').nth(2).fill('56');
  await page.waitForTimeout(1000);

await page.getByPlaceholder('Select', { exact: true }).nth(0).click();
await page.getByRole('option', { name: 'Kids 164' }).click();






//   await page.getByPlaceholder('Select', { exact: true }).click();
// //   await page.locator('#vs57__combobox > .vs__selected-options').click();
//   await page.getByRole('option', { name: 'Kids 164' }).click();




//   // Example: Select "Kids 164" in the 3rd dropdown
// await page.locator('input[placeholder="Select"]').nth(2).click();
// await page.waitForSelector('.vs__dropdown-menu', { state: 'visible' });
// await page.getByRole('option', { name: 'Kids 164' }).click();


//   await page.getByRole('spinbutton').nth(3).click();
//   await page.getByRole('spinbutton').nth(3).fill('2');


/////////////////
//   await page.locator('tr:nth-child(3) > td:nth-child(5) > .p-2').click();









// locate the quantity cell in the row you're about to delete


// const qtyCellSelector = 'tr:nth-child(3) > td:nth-child(4)'; // adjust if qty is in a different column
// const deleteBtnSelector = 'tr:nth-child(3) > td:nth-child(5) > .p-2';

// // read and parse the quantity to be deleted
// const qtyText = (await page.locator(qtyCellSelector).textContent()) ?? '0';
// const deletedQty = Number(qtyText.trim()) || 0;
// console.log(`🗑️ Deleting row 3 with quantity: ${deletedQty}`);

// // click delete
// await page.locator(deleteBtnSelector).click();
// // If there's a confirmation dialog, handle it here (example):
// // await page.getByRole('button', { name: 'Confirm' }).click();

// // Wait for UI to update — prefer a smart wait (example: wait until summary changes)
// await page.waitForTimeout(500); // temporary; replace with smarter wait below

// // Recalculate totals from the order summary
// const summaryQtysAfterDelete = await page
//   .locator('div.accordion:has-text("Order Summary") table tbody tr td:nth-child(4)')
//   .allTextContents();

// console.log(`📦 Updated quantities: [${summaryQtysAfterDelete.join(', ')}]`);

// const newTotal = summaryQtysAfterDelete
//   .map(q => Number(q.trim()) || 0)
//   .reduce((a, b) => a + b, 0);

// console.log(`🧮 New total: ${newTotal}, Expected total: ${expectedTotal - deletedQty}`);

// // Assert
// await expect(newTotal, 'Total should update after deletion').toBe(expectedTotal - deletedQty);



























// // 🗑️ Delete one player
// await page.locator('tr:nth-child(3) > td:nth-child(5) > .p-2').click();
// console.log('🗑️ Deleted player from row 3');

// // Wait for UI or summary table to update
// await page.waitForTimeout(1000); // or use smarter wait (see below)

// // 🧾 Re-check total quantity in Order Summary
// console.log('🔄 Recalculating total quantity after deletion...');

// const summaryQtysAfterDelete = await page
//   .locator('div.accordion:has-text("Order Summary") table tbody tr td:nth-child(4)')
//   .allTextContents();

// console.log(`📦 Updated quantities in summary: [${summaryQtysAfterDelete.join(', ')}]`);

// const newTotal = summaryQtysAfterDelete
//   .map(q => Number(q.trim()))
//   .reduce((a, b) => a + b, 0);

// console.log(`🧮 New total after deletion: ${newTotal}`);
// console.log(`🧮 Expected total after deletion: ${expectedTotal - deletedQty}`);

// // ✅ Assert total updated correctly
// await expect(newTotal, 'Total should update after player deletion')
//   .toBe(expectedTotal - deletedQty);





// const filePath3 = path.resolve('logo1.png'); // if image is in project root

// const fileInput3 = page.locator('input[type="file"]').nth(4); // or .nth(3) if multiple
// await fileInput3.setInputFiles(filePath3);

// const filePath4 = path.resolve('logo2.png');
// const fileInput4 = page.locator('input[type="file"]').nth(5); // or .nth(3) if multiple
// await fileInput4.setInputFiles(filePath4);

//   await page.getByRole('button', { name: 'Choose File' }).nth(3).click();
//   await page.getByRole('button', { name: 'Choose File' }).nth(3).setInputFiles('logo1.jpg');
//   await page.getByRole('button', { name: 'Choose File' }).nth(4).click();
//   await page.getByRole('button', { name: 'Choose File' }).nth(4).setInputFiles('logo2.jpg');

// page.getByRole('option', { name: 'CoreXK' }).click();
//   await page.getByRole('button', { name: 'Choose File' }).nth(3).click();
//   await page.getByRole('button', { name: 'Choose File' }).nth(3).setInputFiles('logo1.jpg');
//   await page.getByText('Choose File No file chosen').nth(3).click();
//   await page.getByRole('button', { name: 'Choose File' }).nth(4).click();
//   await page.getByRole('button', { name: 'Choose File' }).nth(4).setInputFiles('logo2.jpg');



//   await page.getByRole('checkbox', { name: 'Enter Manual Roster' }).check();
//   await page.locator('.w-full.px-3').click();
//   await page.locator('.w-full.px-3').fill('test name ');
//   await page.getByRole('spinbutton').first().click();
//   await page.getByRole('spinbutton').first().click();
//   await page.getByRole('spinbutton').first().fill('56');
//   await page.locator('#vs12__combobox > .vs__actions > .vs__open-indicator').click();
//   await page.getByText('Women XL').click();
//   await page.getByRole('spinbutton').nth(1).click();
//   await page.getByRole('spinbutton').nth(1).fill('3');
 

// await page.locator('button').filter({ hasText: /^Create Order$/ }).click();
//   await page.getByRole('heading', { name: 'Success' }).click();
//   await page.getByRole('button', { name: 'OK' }).click();

// tetsets?dfgdfg

});