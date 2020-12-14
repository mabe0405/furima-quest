window.addEventListener('load', () => {
	const itemPrice = document.getElementById("item-price");
	const addTaxPrice = document.getElementById("add-tax-price");
	const profit = document.getElementById("profit");

	itemPrice.addEventListener("input", () => {
		addTaxPrice.innerHTML = Math.floor(itemPrice.value / 10)
		profit.innerHTML = itemPrice.value - Math.floor(itemPrice.value / 10)
	})
});