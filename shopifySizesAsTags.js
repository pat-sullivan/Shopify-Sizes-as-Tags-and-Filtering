let counter = 0, 
	allProducts = [], 
	interval, 
	prodCount = 0;

class sizesAsTags {
	constructor() {}

	// Calculate product count and paginate by 250
	// Then run the script
	getStarted() {
		$.get('/admin/products/count.json', data => {
			let num = Math.ceil(data.count/250);
			this.fetchAll(num);
		});
	}

	// Fetch and build array of all products 
	fetchAll(stop) {
		if (counter <= stop) {
			$.get('/admin/products.json', {limit: 250, page: counter, fields:['id','title','options','tags','variants'] })
			.done( data => {
				counter++;
				allProducts = allProducts.concat(data.products);
				this.fetchAll(stop);
				if (counter == (stop)) {
					this.buildTags(allProducts);
				}
			});
		}
	}

	// Grab all Sizes for each product, then append them as tags to 
	// the tag array for each product.
	buildTags(data) {
		let products = [];
		for (let i = 0; i < data.length; i++) {
			let tags = data[i].tags.trim().split(', ');
			let temp = [data[i].id];
			let sizes;
			for (let index = 0; index < data[i]["options"].length; index++) {
				if (data[i]["options"][index]["name"] == "Size") {
					sizes = data[i]["options"][index]["values"];
				}
			}
			tags = tags.concat(sizes);
			temp.push(tags);
			products.push(temp);
		}
		interval = setInterval(this.postTags, 520, products, products.length);
	}

	// Update product with the new tag array
	// Limit rate of interval (520 ms) to prevent API bucket overflow
	postTags(data, iterations) {
		if (prodCount >= (iterations - 1)) {
			clearInterval(interval);
		}
		let pushData = {"product": {"id": data[prodCount][0],"tags": data[prodCount][1]}};
		let prodID = data[prodCount][0];
		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: '/admin/products/' + prodID + '.json',
			headers: {"X-HTTP-Method-Override": "PUT"},
			data: pushData
		}).done( () => {
			console.log("%c" + prodID + " - OK", "color: green");
		}).fail( () => {
			console.log("%c" + prodID + " - FAIL", "color: red");
		});
		prodCount++;
		if (prodCount >= (iterations)) {
			setTimeout( () => {
				console.log("%c ALL DONE!", "color: black; font-weight: bold;");
			}, 4000);
		}
	}
}

const initScript = new sizesAsTags();
/****
To Run: 
	While in Shopify admin, in devtools/js console, call: initScript.getStarted();

To Stop, call: clearInterval(interval);
****/
