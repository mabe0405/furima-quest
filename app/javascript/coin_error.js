if(document.URL.match(/purchases/)){

const errorMessageCoinOver = function(){
	const coinInput = document.getElementById("coin");
	const coinMessage = document.getElementById("coin-message");

	if (coinInput.value > gon.userCoin){
		coinMessage.innerHTML = `使用コイン　(保有コイン：${gon.userCoin})<br><span class="coin-error-message"> 保有コイン以内にしてください</span>`
	}

	if (coinInput.value <= gon.userCoin){
		coinMessage.innerHTML = `使用コイン　(保有コイン：${gon.userCoin})`
		errorMessagePriceOver()
	}

	console.log("起動中")
}

const errorMessagePriceOver = function(){
	const coinInput = document.getElementById("coin");
	const coinMessage = document.getElementById("coin-message");

	if (coinInput.value > gon.itemPrice){
		coinMessage.innerHTML = `使用コイン　(保有コイン：${gon.userCoin})<br><span class="coin-error-message"> 商品金額以内にしてください</span>`
	}

	if (coinInput.value <= gon.itemPrice){
		coinMessage.innerHTML = `使用コイン　(保有コイン：${gon.userCoin})`
	}

}


setInterval(errorMessageCoinOver,100)
}