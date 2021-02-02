//このページ以外JS読み込まない
if(document.URL.match(/monster/)){


//パラメータ取得


//

//定数・変数定義 ユーザーパラメータ
const userName = gon.userName
const userAttack = gon.userAttack
let userDefense = gon.userDefense
const userSpeed = gon.userSpeed

let userHp = gon.userHp
let userMp = gon.userMp
let userDamage = 0
let userDamageBase = 0
let userCure = 0
let userDefenseFlag = 0
let userOrder = 0
let selectedCommand = 0

//定数・変数定義 モンスターパラメータ
const monsterName = gon.monsterName
const monsterAttack = gon.monsterAttack
const monsterDefense = gon.monsterDefense
const monsterSpeed = gon.monsterSpeed
const monsterCoin = gon.monsterCoin


let monsterHp = gon.monsterHp
let monsterDamage = 0
let monsterDamageBase = 0


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
const seBeforeAttack = new Audio('/assets/se_before_attack.mp3')
const seBeforeAttack2 = new Audio('/assets/se_before_attack2.mp3')
const seCoinGet = new Audio('/assets/se_coinget.mp3')
const seSkill  = new Audio('/assets/se_skill.mp3')
const seHoimi  = new Audio('/assets/se_hoimi.mp3')
const seMera  = new Audio('/assets/se_mera.mp3')
const seEscape  = new Audio('/assets/se_escape.mp3')



//関数定義 ユーザーの被ダメ計算
const userDamageCalc = function(){
	userDamageBase = (monsterAttack / 2 - userDefense /4 )
	userDamage = Math.floor(userDamageBase + Math.random()*3 - Math.random()*3)
	if (userDefenseFlag == 1){userDamage = Math.floor(userDamage / 2)}
	if (userDamage <= 0){userDamage = 1}
	// const me = document.getElementById("battle-message")
	// me.innerHTML = `${userName}に${userDamage}のダメージ！`
}

//関数定義 モンスターの被ダメ計算
const monsterDamageCalc = function(){
	monsterDamageBase = (userAttack / 2 - monsterDefense /4 )
	monsterDamage = Math.floor(monsterDamageBase + Math.random()*3 - Math.random()*3)
	if (monsterDamage <= 0){monsterDamage = 1}
	// const me = document.getElementById("battle-message")
	// me.innerHTML = `${monsterName}に${monsterDamage}のダメージ！`
}

//関数定義 モンスターの被ダメ計算メラ
const monsterDamageCalcMera = function(){
	monsterDamage = Math.floor(20 + Math.random()*3 - Math.random()*3)
	// const me = document.getElementById("battle-message")
	// me.innerHTML = `${monsterName}に${monsterDamage}のダメージ！`
}

//関数定義 ユーザーの回復計算ホイミ
const userCureCalcHoimi = function(){
	userCure = Math.floor(20 + Math.random()*3 - Math.random()*3)
}

//関数定義 ユーザーの回復計算べホイミ
const userCureCalcBehoimi = function(){
	userCure = Math.floor(50 + Math.random()*3 - Math.random()*3)
}

//関数定義 クリックイベント付与
const addClickEvent = function(){
	const attackCommand = document.getElementById("attack-command")
	attackCommand.addEventListener("click", action)
	const magicCommand = document.getElementById("magic-command")
	magicCommand.addEventListener("click", skillSelect)
	const defenseCommand = document.getElementById("defense-command")
	defenseCommand.addEventListener("click", actionDefense)
	const escapeCommand = document.getElementById("escape-command")
	escapeCommand.addEventListener("click", actionEscape)
}

//関数定義 クリックイベント解除
const removeClickEvent = function(){
	const attackCommand = document.getElementById("attack-command")
	attackCommand.removeEventListener("click", action)
	const magicCommand = document.getElementById("magic-command")
	magicCommand.removeEventListener("click", skillSelect)
	const defenseCommand = document.getElementById("defense-command")
	defenseCommand.removeEventListener("click", actionDefense)
	const escapeCommand = document.getElementById("escape-command")
	escapeCommand.removeEventListener("click", actionEscape)
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

//「じゅもん」をクリックすると、保有呪文が表示される。
//保有呪文にイベント付与
const skillSelect = function(){
	const me = document.getElementById("battle-message")
	const skillHaving = document.getElementById("user-monster")
	const skillHaving1 = skillHaving.getAttribute("skillhaving-1")
	const skillHaving2 = skillHaving.getAttribute("skillhaving-2")
	const skillHaving3 = skillHaving.getAttribute("skillhaving-3")
	if(skillHaving1 != 1 && skillHaving2 != 1 && skillHaving3 != 1){
		me.innerHTML = `習得している呪文がありません。<br>`
	}else{
	me.innerHTML = "使用する呪文をクリックしてください"
	}
	if (skillHaving1 == 1){
		me.insertAdjacentHTML("beforeend" ,`<div id="skill1">ホイミ</div>`)
		document.getElementById("skill1").addEventListener("click", () => {
			if (userMp < 10){
				me.innerHTML = `MPが足りません`
			}else{
			actionHoimi()
			}
			selectedCommand = 2 
		})
	}
	if (skillHaving2 == 1){
		me.insertAdjacentHTML("beforeend" ,`<div id="skill2">メラ</div>`)
		document.getElementById("skill2").addEventListener("click", () => {
			if (userMp < 10){
				me.innerHTML = `MPが足りません`
			}else{
			actionMera()
			}
			selectedCommand = 1 
		})
	}
	if (skillHaving3 == 1){
		me.insertAdjacentHTML("beforeend" ,`<div id="skill3" effect="50">ベホイミ</div>`)
		document.getElementById("skill3").addEventListener("click", () => {
			if (userMp < 20){
				me.innerHTML = `MPが足りません`
			}else{
			actionBehoimi()
			}
			selectedCommand = 3
		})
	}
	// const magicCommand = document.getElementById("magic-command")
	// magicCommand.removeEventListener("click", skillSelect)
	phase = 2
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
	if (userDefenseFlag == 1){
		userDefenseFlag = 0
	}
	selectedCommand = 0
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

//関数定義 呪文メラ選択時 与ダメメッセージ
const userTurnMera = function(){
	seSkill.play()
	// phase = 2 //たたかうフェーズへ移行
	const me = document.getElementById("battle-message")
	me.innerHTML = `${userName}はメラを唱えた！`
	userMp -= 10
	const mp = document.getElementById("status-mp")
	mp.innerHTML = `MP:${userMp}`
	removeClickEvent()
	// const attackCommand = document.getElementById("attack-command")
	// attackCommand.removeEventListener("click", action)
}

//関数定義 呪文ホイミ選択時 メッセージ
const userTurnHoimi = function(){
	seSkill.play()
	// phase = 2 //たたかうフェーズへ移行
	const me = document.getElementById("battle-message")
	me.innerHTML = `${userName}はホイミを唱えた！`
	userMp -= 10
	const mp = document.getElementById("status-mp")
	mp.innerHTML = `MP:${userMp}`
	removeClickEvent()
	// const magicCommand = document.getElementById("magic-command")
	// magicCommand.removeEventListener("click", skillSelect)
	// const attackCommand = document.getElementById("attack-command")
	// attackCommand.removeEventListener("click", action)
}

//関数定義 呪文べホイミ選択時 メッセージ
const userTurnBehoimi = function(){
	seSkill.play()
	// phase = 2 //たたかうフェーズへ移行
	const me = document.getElementById("battle-message")
	me.innerHTML = `${userName}はべホイミを唱えた！`
	userMp -= 20
	const mp = document.getElementById("status-mp")
	mp.innerHTML = `MP:${userMp}`
	removeClickEvent()
	// const attackCommand = document.getElementById("attack-command")
	// attackCommand.removeEventListener("click", action)
}

//関数定義 防御選択時 メッセージ
const userTurnDefense = function(){
	phase = 2 //たたかうフェーズへ移行
	const me = document.getElementById("battle-message")
	me.innerHTML = `${userName}は身を守っている。`
	userDefenseFlag = 1
	setTimeout(monsterTurn, 1000)
	setTimeout(userAttacked, 2000)
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
		if (userOrder == 0){
			setTimeout(monsterTurn, 1000)
			setTimeout(userAttacked, 2000)
		}else if (userOrder == 1){
			setTimeout(commandSelect, 1000)
		}
	}
}

//関数定義 呪文メラ選択時 与ダメメッセージ２
const monsterAttackedMera = function(){
	monsterDamageCalcMera()
	monsterHp -= monsterDamage
	seMera.play()
	seUserAttack.play()
	const me = document.getElementById("battle-message")
	me.innerHTML = `${monsterName}に${monsterDamage}のダメージ！`
	if (monsterHp <= 0){
		setTimeout(userWin, 500)
		setTimeout(coinGet, 1500)
	} else {
		if(userOrder == 0){
		setTimeout(monsterTurn, 1000)
		setTimeout(userAttacked, 2000)
		}else if (userOrder == 1){
			setTimeout(commandSelect, 1000)
		}
	}
}

//関数定義 呪文ホイミ選択時 メッセージ２
const userCureHoimi = function(){
	userCureCalcHoimi()
	seHoimi.play()
	if (userHp + userCure >= gon.userHp){
		const me = document.getElementById("battle-message")
		me.innerHTML = `${userName}は${gon.userHp - userHp}回復！`
		userHp = gon.userHp
	}else{
		userHp += userCure
		const me = document.getElementById("battle-message")
		me.innerHTML = `${userName}は${userCure}回復！`
	}
	const hp = document.getElementById("status-hp")
	hp.innerHTML = `HP:${userHp}`
	if(userOrder == 0){
		setTimeout(monsterTurn, 1000)
		setTimeout(userAttacked, 2000)
	}else if (userOrder == 1){
			setTimeout(commandSelect, 1000)
	}
}

const userCureBehoimi = function(){
	userCureCalcBehoimi()
	seHoimi.play()
	if (userHp + userCure >= gon.userHp){
		const me = document.getElementById("battle-message")
		me.innerHTML = `${userName}は${gon.userHp - userHp}回復！`
		userHp = gon.userHp
	}else{
		userHp += userCure
		const me = document.getElementById("battle-message")
		me.innerHTML = `${userName}は${userCure}回復！`
	}
	const hp = document.getElementById("status-hp")
	hp.innerHTML = `HP:${userHp}`
	if(userOrder == 0){
		setTimeout(monsterTurn, 1000)
		setTimeout(userAttacked, 2000)
	}else if (userOrder == 1){
			setTimeout(commandSelect, 1000)
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
	me.innerHTML = `${userName}に${userDamage}のダメージ！`
	userHp -= userDamage
	hp.innerHTML = `HP:${userHp}`
	if (userHp > 0){
		if (userOrder == 0){
			setTimeout(commandSelect	, 1000)
		} else if (userOrder == 1){
		if (userDefenseFlag == 1){
			setTimeout(commandSelect	, 1000)
		} else {
			if (selectedCommand == 0){
				setTimeout(userTurn, 1000)
				setTimeout(monsterAttacked, 2000)
			}else if(selectedCommand == 1){
				setTimeout(userTurnMera, 1000)
				setTimeout(monsterAttackedMera, 2000)
			}else if(selectedCommand == 2){
				setTimeout(userTurnHoimi, 1000)
				setTimeout(userCureHoimi, 2000)
			}else if(selectedCommand == 3){
				setTimeout(userTurnBehoimi, 1000)
				setTimeout(userCureBehoimi, 2000)
			}
		}
		}
	}else{
		bgmBattle.pause()
		bgmGameOver.play()
		me.innerHTML = `${userName}に${userDamage}のダメージ！<br>あなたはやられてしまいました。`
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
	if (userOrder == 0){
		userTurn()
		setTimeout(monsterAttacked, 1000)
	}else{
		monsterTurn()
		setTimeout(userAttacked, 1000)
	}
	removeClickEvent()
}

const actionMera = function(){
	if (userOrder == 0){
		userTurnMera()
		setTimeout(monsterAttackedMera, 1000)
	}else{
		monsterTurn()
		setTimeout(userAttacked, 1000)
	}
	// const magicCommand = document.getElementById("attack-command")
	// magicCommand.removeEventListener("click", skillSelect)

}

const actionHoimi = function(){
	if (userOrder == 0){
		userTurnHoimi()
		setTimeout(userCureHoimi, 1000)
	}else{
		monsterTurn()
		setTimeout(userAttacked, 1000)
	}
	// const magicCommand = document.getElementById("attack-command")
	// magicCommand.removeEventListener("click", skillSelect)
}


const actionBehoimi = function(){
	if (userOrder == 0){
		userTurnBehoimi()
		setTimeout(userCureBehoimi, 1000)
	}else{
		monsterTurn()
		setTimeout(userAttacked, 1000)
	}
	// const magicCommand = document.getElementById("attack-command")
	// magicCommand.removeEventListener("click", skillSelect)
}

const actionDefense = function(){
		userTurnDefense()
		removeClickEvent()
}

const actionEscape = function(){
	bgmBattle.pause()
	seEscape.play()
	phase = 2
	removeClickEvent()
	const me = document.getElementById("battle-message")
	const userMonsterId = document.getElementById("user-monster")
	const userId = userMonsterId.getAttribute("user-id")
	me.innerHTML = `${userName}はうまく逃げ切れた！<br><a class="return-quest" href='/users/${userId}'>戻る</a>`
}

//コマンド選択フェーズの時「たたかう」クリックで、たたかうイベント発火
const settingGame = function(){
	if (phase == 1 ){
		addClickEvent()
	}
	console.log(`現在のフェーズ${phase}`)
	console.log(`先攻後攻${userOrder}`)
	console.log(`先攻後攻${selectedCommand}`)
	// console.log(`ディフェンスフラグ${userDefenseFlag}`)
}


//先攻後攻の決定
const orderDecide = function(){
	if (userSpeed < monsterSpeed){
		userOrder = 1
	}
}

orderDecide()
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
// })
