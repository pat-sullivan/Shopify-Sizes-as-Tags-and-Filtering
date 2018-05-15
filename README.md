# Shopify-Sizes-as-Tags-Build-Filtering
Simple JS script to bulk add product sizes as tags via API. Also HTML/Liquid suggested usage for better filtering by size tags

This is not a complete solution, and isn't intended to be.
This is intended to help other Shopify developers save some time trying to filter products by size.

## First: 
**The included JS file will look for products that have "Size" variants, and will add each Size as a product tag. It does this by making API calls via the Shopify REST API.**
- To create size tags for each product, log into the shopify admin.
- From the admin, open devtools, and go to the console.
- Copy/paste the included js code into the console.
- Call: initScript.getStarted(); to run the script
- The console will update after each successful product run.
- To exit the script early, run: clearInterval(interval);

** *Only run this from the admin, connected via HTTPS*

** *Use at your own risk. I have used this for multiple production sites, but it is not massively tested. I highly suggest doing a full product export before running, so you have a backup.*


## Second:
You're much more on your own here, as each theme will be different. But the included HTML/Liquid can be used as a reference to correctly display the size tags and products. The issue/benefit here is that Shopify's built in tag filtering will filter products at the PRODUCT level, but we need to filter at the VARIANT level. (Otherwise size "Large" products that are out of stock, for example, will show available if they are in-stock in other sizes).  

The included code should help you get started on that. If your theme doesn't have any built in tag filtering (usually tag dropdowns), you will need to write some Javascript to toggle the filters.
