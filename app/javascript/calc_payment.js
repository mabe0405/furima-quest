window.addEventListener('load', () => {
	const purchasePrice = document.getElementById("purchase-price");
	const coin = document.getElementById("coin");
	const payment = document.getElementById("payment");

	coin.addEventListener("input", () => {
		payment.innerHTML = purchasePrice.textContent - coin.value + "円"
	})
});
