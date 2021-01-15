if(document.URL.match(/monster/)){


//パラメータ取得


//

//定数・変数定義 ユーザーパラメータ
const userName = gon.userName
const userAttack = gon.userAttack
const userDefense = gon.userDefense
const userSpeed = gon.userSpeed

let userHp = gon.userHp
let userDamage = 0

//定数・変数定義 モンスターパラメータ
const monsterName = gon.monsterName
const monsterAttack = gon.monsterAttack
const monsterDefense = gon.monsterDefense
const monsterSpeed = gon.monsterSpeed
const monsterCoin = gon.monsterCoin


let monsterHp = gon.monsterHp
let monsterDamage = 0

//定数・変数定義 その他パラメータ
let phase = 0
// 各phaseの説明
// 0:戦闘開始
// 1:コマンド選択
// 2:たたかう 

//定数・変数定義 画面揺れ用
const x = new Array( 10, 3,-6, 8,-10,-7,5,-3,0,0,0,0,0,0,0,0,0,0,0,0);
const y = new Array(-12, 6,-3,10, -9,-2,8, 2,0,0,0,0,0,0,0,0,0,0,0,0);
let count = 0

//定数・変数定義 BGM・SE
const bgmBattle = new Audio('/assets/bgm_battle.mp3')
const bgmVictory = new Audio('/assets/bgm_funfare.mp3')
const bgmGameOver = new Audio('/assets/bgm_gameover.mp3')
const seUserAttack = new Audio('/assets/se_user_attack.mp3')
const seMonsterAttack = new Audio('/assets/se_monster_attack.mp3')
const seBeforeAttack = new Audio('/assets/se_before_attack.wav')
const seBeforeAttack2 = new Audio('/assets/se_before_attack2.wav')
const seCoinGet = new Audio('/assets/se_coinget.mp3')


//関数定義 ユーザーの被ダメ計算
const userDamageCalc = function(){
	userDamage = Math.floor(monsterAttack + Math.random()*3 - Math.random()*3)
	if (userDamage <0){userDamage = 0}
	const me = document.getElementById("battle-message")
	me.innerHTML = `${userName}に${userDamage}のダメージ！`
}

//関数定義 モンスターの被ダメ計算
const monsterDamageCalc = function(){
	monsterDamage = Math.floor(userAttack + Math.random()*3 - Math.random()*3)
	if (monsterDamage <0){monsterDamage = 0}
	const me = document.getElementById("battle-message")
	me.innerHTML = `${monsterName}に${monsterDamage}のダメージ！`
}

// コマンドをホバーすると⇒が出る
window.onload = function(){
	const me = document.getElementById("battle-message")
	const hp = document.getElementById("status-hp")
	const attackCommand = document.getElementById("attack-command")
	const magicCommand = document.getElementById("magic-command")
	const defenseCommand = document.getElementById("defense-command")
	const escapeCommand = document.getElementById("escape-command")

	const attackCursor = document.getElementById("attack-cursor")
	const magicCursor = document.getElementById("magic-cursor")
	const defenseCursor = document.getElementById("defense-cursor")
	const escapeCursor = document.getElementById("escape-cursor")

	attackCommand.addEventListener("mouseover", () => {
		attackCursor.innerHTML = "⇒"
	})
	attackCommand.addEventListener("mouseout", () => {
		attackCursor.innerHTML = "　"
	})
	magicCommand.addEventListener("mouseover", () => {
		magicCursor.innerHTML = "⇒"
	})
	magicCommand.addEventListener("mouseout", () => {
		magicCursor.innerHTML = "　"
	})
	defenseCommand.addEventListener("mouseover", () => {
		defenseCursor.innerHTML = "⇒"
	})
	defenseCommand.addEventListener("mouseout", () => {
		defenseCursor.innerHTML = "　"
	})
	escapeCommand.addEventListener("mouseover", () => {
		escapeCursor.innerHTML = "⇒"
	})
	escapeCommand.addEventListener("mouseout", () => {
		escapeCursor.innerHTML = "　"
	})

	bgmBattle.play();
}

//関数定義 画面揺れ
const purupuruWin = function (){
	const canvas = document.getElementById("canvas")
	canvas.moveBy(100,100);
	// count++
	// if (count >= x.length) count = 0;
	// setTimeout(purupuruWin,100);
}

//関数定義 始まって1.5秒後にバトルメッセージを「どうする？」に変更
const commandSelect = function(){
	const me = document.getElementById("battle-message")
	me.innerHTML = `どうする?<BR>（左のコマンドをクリック）`
	phase = 1 //コマンド選択フェーズへ移行
}

//処理 コマンド選択
setTimeout(commandSelect, 1000)

//関数定義 たたかう選択時 与ダメメッセージ
const userTurn = function(){
	seBeforeAttack.play()
	phase = 2 //たたかうフェーズへ移行
	const me = document.getElementById("battle-message")
	me.innerHTML = `${userName}の攻撃！`
}

//関数定義 たたかう選択時 与ダメメッセージ２
const monsterAttacked = function(){
	monsterDamageCalc()
	monsterHp -= monsterDamage
	seUserAttack.play()
	const me = document.getElementById("battle-message")
	me.innerHTML = `${monsterName}に${monsterDamage}のダメージ！`
	if (monsterHp <= 0){
		setTimeout(userWin, 500)
		setTimeout(coinGet, 1500)
	} else {

		setTimeout(monsterTurn, 1000)
		setTimeout(userAttacked, 2000)
	}
	
}
//関数定義 たたかう選択時 被ダメメッセージ１
const monsterTurn = function(){
	seBeforeAttack2.play()
	phase = 2 //たたかうフェーズへ移行
	const me = document.getElementById("battle-message")
	me.innerHTML = `${monsterName}の攻撃`}

//関数定義 たたかう選択時 被ダメメッセージ２
const userAttacked =function(){
	// purupuruWin()
	seMonsterAttack.play()
	window.moveBy(100,100)
	const hp = document.getElementById("status-hp")
	const me = document.getElementById("battle-message")
	userDamageCalc()
	userHp -= userDamage
	if (userHp > 0){
		hp.innerHTML = `HP:${userHp}`
		setTimeout(commandSelect, 1000)
		}else{
		bgmBattle.pause()
		bgmGameOver.play()
		hp.innerHTML = `HP:${0}`
		me.innerHTML = `あなたはやられてしまいました。`
		const userMonsterId = document.getElementById("user-monster")
		const userId = userMonsterId.getAttribute("user-id")
		me.insertAdjacentHTML ("afterend" ,`<a class="return-quest" href='/users/${userId}'>戻る</a>`)
		}
	
}

const userWin = function(){
	bgmBattle.pause()
	bgmVictory.play()
	const monsterImg = document.getElementById("monster-image")
	monsterImg.src = ``
	const me = document.getElementById("battle-message")
	me.innerHTML = `${monsterName}をやっつけた！`
}

const coinGet = function(){
	const userMonsterId = document.getElementById("user-monster")
	const userId = userMonsterId.getAttribute("user-id")
	const monsterId = userMonsterId.getAttribute("monster-id")
	seCoinGet.play()
	const me = document.getElementById("battle-message")
	me.innerHTML = `${monsterCoin}FURIMAコインを手に入れた！<br><br>FURIMAコインで商品を買おう！<br>(１FURIMAコイン ＝ １円としてご利用できます。)`
	me.insertAdjacentHTML ("afterend" ,`<a class="return-quest" href='/users/${userId}/monsters/${monsterId}/coinget'>戻る</a>`)
	// const XHR = XMLHttpRequest new()
}

//たたかうイベント
const action = function(){
	if (userSpeed >= monsterSpeed){
		userTurn()
		setTimeout(monsterAttacked, 1000)
	}else{
		monsterTurn()
	}
	const attackCommand = document.getElementById("attack-command")
	attackCommand.removeEventListener("click", action
	)
}

//コマンド選択フェーズの時「たたかう」クリックで、たたかうイベント発火
const settingGame = function(){
	if (phase == 1 ){
		const attackCommand = document.getElementById("attack-command")
		attackCommand.addEventListener("click", action)
	}
	// console.log(phase)
}


setInterval(settingGame,100)
}



////////////////////////////////////////////////
////////////////////////////////////////////////



// const userName = gon.userName
// const monsterName = gon.monsterName
// const monsterCoin = gon.monsterCoin
// const userDamage = Math.floor(gon.monsterAttack + Math.random()*3 - Math.random()*3)
// const monsterDamage = Math.floor(gon.userAttack + Math.random()*3 - Math.random()*3)
// const HTML = `
// <span id="attack">   こうげき</span>
// <span id="attack">   じゅもん</span>
// <span id="escape">   にげる</span>
// `

// let phase = 1													//戦闘フェーズ
// let userHp = gon.userHp
// let monsterHp = gon.monsterHp


// window.onkeydown = function(){ 
// 	const me = document.getElementById("battle-message")
//   const at = document.getElementById("attack")
// 	const es = document.getElementById("escape")
// 	const hp = document.getElementById("status-hp")
// 	const monsterImg = document.getElementById("monster-image")

// 	if(phase == 0){
// 		phase=1
// 		me.innerHTML = `どうする？<br>
// 		(左のコマンドをクリック)`
// 	}

// 	if(phase == 1){
// 		me.innerHTML = `どうする？<br>
// 		(左のコマンドをクリック)`
// 	}
// 	if(phase == 2){
// 		phase = 3
// 			me.innerHTML = `${userName}の攻撃`
// 		  return
// 	}
// 	if(phase ==3){
// 			monsterDamageCalc()
// 			me.innerHTML = `${monsterName}に${monsterDamage}のダメージ！`
// 			monsterHp -= monsterDamage
// 			if (monsterHp > 0){
// 				phase = 4
// 			}else{
// 			  phase = 7
// 			}
// 			return
// 	}
// 	if(phase == 4){
// 		phase = 5
// 			me.innerHTML = `${monsterName}の攻撃`
// 		  return
// 	}
// 	if(phase ==5){
// 			userDamageCalc()
// 			me.innerHTML = `${userName}に${userDamage}のダメージ！`
// 			userHp -= userDamage
// 			if (userHp >= 0){
// 			hp.innerHTML = `HP:${userHp}`
// 			phase = 0
// 			}else{
// 			hp.innerHTML = `HP:${0}`
// 			phase = 9
// 			}
// 			return
// 	}
// 	if(phase == 7){
// 		me.innerHTML = `${monsterName}をやっつけた！`
// 		monsterImg.src = ``
// 		phase = 8
// 		return
// 	}
// 	if(phase == 8){
// 		me.innerHTML = `${monsterCoin}FURIMAコイン手に入れた！`
// 		me.insertAdjacentHTML ("afterend" ,`<a href="/">マイページへ戻る</a>`)
// 		phase =10
// 		return
// 	}
// 	if(phase == 9){
// 			me.innerHTML = `あなたはやられてしまいました。`
// 			me.insertAdjacentHTML ("afterend" ,`<a href="/">戻る</a>`)
// 			phase =10
// 		  return
// 	}
// }
 


// const FONT = "24px monospace";
// const WIDTH = 500
// const HEIGHT = 500

//g.fillText( gon.monsterName ,1 ,64 )
//g.fillText( gon.monsterHp ,1 ,128 )
//g.fillText( gon.monsterMp ,1 ,180 )
//g.fillStyle = "#000000";							//	描画範囲黒
//g.fillRect( 0, 0, WIDTH, HEIGHT )     //	描画範囲指定
	

// function wmTimer(){
// 	const ca = document.getElementById("canvas");
	
// 	const g = ca.getContext("2d");

// 	g.font = FONT 
// 	gImgMonster = new Image(); gImgMonster.src = gon.monsterImg
// 	g.drawImage(gImgMonster ,100,100)   //モンスター画像描画
	
// }

// window.addEventListener('load', function() {
// 	setInterval(function(){wmTimer()},33)
// });
