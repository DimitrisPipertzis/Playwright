
const { test, expect } = require('@playwright/test');

test('My test', async ({ page }) => {
  await page.goto('https://contact.com.gr/index.php?locale=el_GR');
  await page.waitForLoadState('domcontentloaded');

  // Click on the first category link
  const categories = page.locator('.categories-list__body a');
  await categories.first().click();

  // Click on 'Απόκρυψη φίλτρων' (Hide Filters)
  await page.getByRole('button', { name: 'Απόκρυψη φίλτρων' }).click();

  // Wait for product list to be visible
  await page.waitForSelector('.products-list__content');

  // Get the number of products
  const productCount = await page.locator('.products-list__content .products-list__item.mx-0.w-100').count();
  console.log(`Total Products Found: ${productCount}`);

  if (productCount > 1) {
    const selectedProduct = page.locator('.products-list__content .products-list__item.mx-0.w-100').nth(1);

    // Ensure elements are available before extracting text
    await selectedProduct.locator('.product-card a.product-title');
    const prodTitle = await selectedProduct.locator('.product-card a.product-title').first().innerText();

    await selectedProduct.locator('.qty-metrics .product-card__meta-value');
    let fsProductvl = await selectedProduct.locator('.qty-metrics .product-card__meta-value').first().innerText();

    //console.log(`Product Title: ${prodTitle}`);
    //console.log(`FS Product Value: ${fsProductvl}`);
    fsProductvl = parseInt(fsProductvl.replace(/\D/g, ''), 10) || 0;  
    /*if (fsProductvl > 0){
      await selectedProduct.locator('.btn.btn-primary.parking-btn').click();
    }else {
      console.log('Den exei temaxia.!');
    }
      */
  } 
});

