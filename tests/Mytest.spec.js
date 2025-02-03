

import { test, expect } from '@playwright/test';

test.only ('My test' , async ({page})=>{
  const email = 'dimitrispiper1993@gmail.com';
  const cardTitle = await page.locator('.card-body b');
  await page.goto('https://rahulshettyacademy.com/client/');
  await page.locator('#userEmail').fill(email);
  await page.locator('#userPassword').fill('Pipertzis1993');
  await page.getByRole('button' , { name : 'Login' }).click();
  // adding to cart
  await page.waitForSelector('.container .row');
  const products = await page.locator('.container .row .col-lg-4.col-md-6.col-sm-10.offset-md-0.offset-sm-1.mb-3.ng-star-inserted').count();
  const selecteProduct = await page.locator('.container .row .col-lg-4.col-md-6.col-sm-10.offset-md-0.offset-sm-1.mb-3.ng-star-inserted');
  //const countProducts = await products.count();
  console.log(`Total Products Found: ${products}`);
  
  for(let i = 0; i < products; i++)
  {
    const selectedCard = await selecteProduct.nth(i);

    const title = await selectedCard.locator(cardTitle).textContent();
    if (title?.trim() === 'IPHONE 13 PRO')
    {
      //await selectedCard.locator('.btn.w-10.rounded').click();
      await selectedCard.getByRole('button' , {name : ' Add To Cart'}).click();
      break;
    }
    if (title?.trim() === 'qwerty')
      {
        //await selectedCard.locator('.btn.w-10.rounded').click();
        await selectedCard.getByRole('button' , {name : ' Add To Cart'}).click();
      
      }
      if (title?.trim() === 'LG Refrigerator')
        {
          //await selectedCard.locator('.btn.w-10.rounded').click();
          await selectedCard.getByRole('button' , {name : ' Add To Cart'}).click();
          
        }
  }
  await page.getByRole('button', { name: '   Cart' }).click();
  await page.getByRole('button' , { name : 'Checkout' }).click();
  await page.locator("[placeholder*='Country']").type("ind", {delay:100});
  const dropDown = await page.locator('.ta-results');
  await dropDown.waitFor();
  const optionCount = await dropDown.locator('button').count();
  for(let i = 0; i < optionCount; i++)
  {
    const text = await dropDown.locator('button').nth(i).textContent();
    if(text?.trim() === 'India')
    {
      await dropDown.locator('button').nth(i).click();
      break;
    }
  }
//await page.getByRole('button' , { name : "Place Order "}).click();
await page.locator('.actions a').click();

 // Get the last order label text
const trimmedOrderText  = await page.locator('.box .ng-star-inserted label').last().innerText();
const orderText = trimmedOrderText.trim().replace(/\|/g, '').trim();
console.log(`Order ID : ${orderText.trim()}`);

// Click the "ORDERS" button
await page.getByRole('button', { name: "  ORDERS" }).click();

// Wait for the order table to load
await page.waitForSelector('.table-bordered .ng-star-inserted');

// Get the order ID elements
const myOrderId = page.locator('.table.table-bordered.table-hover.ng-star-inserted tbody tr');
const orderIdCount = await myOrderId.count();

let orderFound = false; // Track if order is found

for (let i = 0; i < orderIdCount; i++) {
    const lastOrderIdCheck = await myOrderId.nth(i).locator('th[scope="row"]').textContent();

    if (lastOrderIdCheck.trim() === orderText.trim()) {
        console.log('Order ok');
        orderFound = true;
        break; // Stop loop once order is found
    }
}

if (!orderFound) {
    console.log('No order found');
}


 await page.pause();
});

test('Testing the products orders' , async ({ page }) => {
  const email = 'dimitrispiper1993@gmail.com';

  await page.goto('https://rahulshettyacademy.com/client/');
  await page.locator('#userEmail').fill(email);
  await page.locator('#userPassword').fill('Pipertzis1993');
  await page.getByRole('button', { name: 'Login' }).click();
  
  await page.getByRole('button', { name: 'ORDERS' }).click();
  await page.waitForSelector('.table-bordered .ng-star-inserted');

  // Find all order rows
  const orderRows = await page.locator('.table.table-bordered.table-hover.ng-star-inserted tbody tr');
  const countid = await orderRows.count();  // Get the number of rows

  console.log(`Count ID: ${countid}`);

  if (countid > 0) {
    // Get the first Order ID dynamically
    const firstOrderID = await orderRows.first().locator('th[scope="row"]').textContent();
    console.log(`1st Order ID: ${firstOrderID}`);
  } else {
    console.log("No orders found.");
  }

  await page.pause();  // Uncomment if you want to debug
});