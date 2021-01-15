const seStatusUp = new Audio('/assets/se_status_up.mp3')
const seEquip = new Audio('/assets/se_equip.mp3')
const seError = new Audio('/assets/se_error.mp3')

let hp = gon.userHp
let mp = gon.userMp
let sp = gon.userSp
let presetWeaponName = 0
let presetWeaponAttack = 0
let gem = gon.userGem

const statusUpHp = function () {
	const hpup = document.getElementById("status-up-hp")
	const userId = hpup.getAttribute("user-id")
	const statusWindowHp = document.getElementById("status-window-hp")
	const statusWindowGem = document.getElementById("status-window-gem")
	hpup.addEventListener("click", (e) => {
		const XHR = new XMLHttpRequest();
		XHR.open("GET", `/users/${userId}/hpup`, true);
		XHR.responseType = "json";
		XHR.send();
		XHR.onload = () => {
			if (XHR.status != 200) {
				alert(`Error ${XHR.status}: ${XHR.statusText}`)
				return null;
			}
			if (gem > 0){
			seStatusUp.pause()
			seStatusUp.currentTime = 0;
			seStatusUp.play()
			hp += 1
			gem -= 1
			statusWindowHp.innerHTML = `ＨＰ　：${hp}`
			statusWindowGem.innerHTML =`保有ジェム：${gem}`
			}else{
			seError.pause()
			seError.currentTime = 0;
			seError.play()
			statusWindowGem.innerHTML =`保有ジェム：${gem}<br>ジェムが不足してます。`
			}
		}
			e.preventDefault()
	})
}

const statusUpMp = function () {
	const mpup = document.getElementById("status-up-mp")
	const userId = mpup.getAttribute("user-id")
	const statusWindowMp = document.getElementById("status-window-mp")
	const statusWindowGem = document.getElementById("status-window-gem")
	mpup.addEventListener("click", (e) => {
		const XHR = new XMLHttpRequest();
		XHR.open("GET", `/users/${userId}/mpup`, true);
		XHR.responseType = "json";
		XHR.send();
		XHR.onload = () => {
			if (XHR.status != 200) {
				alert(`Error ${XHR.status}: ${XHR.statusText}`)
				return null;
			}
			if (gem > 0){
			seStatusUp.pause()
			seStatusUp.currentTime = 0;
			seStatusUp.play()
			mp += 1
			gem -= 1
			statusWindowMp.innerHTML = `ＭＰ　：${mp}`
			statusWindowGem.innerHTML =`保有ジェム：${gem}`
			}else{
			seError.pause()
			seError.currentTime = 0;
			seError.play()
			statusWindowGem.innerHTML =`保有ジェム：${gem}<br>ジェムが不足してます。`
			}
		}
			e.preventDefault()
	})
}

const statusUpSp = function () {
	const spup = document.getElementById("status-up-sp")
	const userId = spup.getAttribute("user-id")
	const statusWindowSp = document.getElementById("status-window-sp")
	const statusWindowGem = document.getElementById("status-window-gem")
	spup.addEventListener("click", (e) => {
		const XHR = new XMLHttpRequest();
		XHR.open("GET", `/users/${userId}/spup`, true);
		XHR.responseType = "json";
		XHR.send();
		XHR.onload = () => {
			if (XHR.status != 200) {
				alert(`Error ${XHR.status}: ${XHR.statusText}`)
				return null;
			}
			if (gem >0){
			seStatusUp.pause()
			seStatusUp.currentTime = 0;
			seStatusUp.play()
			sp += 1
			gem -= 1
			statusWindowSp.innerHTML = `素早さ：${sp}`
			statusWindowGem.innerHTML =`保有ジェム：${gem}`
			}else{
			seError.pause()
			seError.currentTime = 0;
			seError.play()
			statusWindowGem.innerHTML =`保有ジェム：${gem}<br>ジェムが不足してます。`
			}
		}
			e.preventDefault()
	})
}

const statusUpWeapon = function () {
	const weapons = document.querySelectorAll(".fgem-weapon-list")
	const equipUseId = document.getElementById("equip-user-id")
	const userId = equipUseId.getAttribute("user-id")
	const statusWindowWeapon = document.getElementById("status-window-weapon")
	const statusWindowGem = document.getElementById("status-window-gem")
	weapons.forEach(function (weapon) {
		weapon.addEventListener("click", (e) => {
			const weaponId = weapon.getAttribute("weapon-id")
			const weaponName = weapon.getAttribute("weapon-name")
			const weaponAttack = weapon.getAttribute("weapon-attack")
			const weaponPrice = weapon.getAttribute("weapon-price")
			const XHR = new XMLHttpRequest();
			XHR.open("GET", `/users/${userId}/wchange?weapon_id=${weaponId}`, true);
			XHR.responseType = "json";
			XHR.send();
			XHR.onload = () => {
				if (XHR.status != 200) {
					alert(`Error ${XHR.status}: ${XHR.statusText}`)
					return null;
				}
				if (gem >= weaponPrice){
				seEquip.pause()
				seEquip.currentTime = 0;
				seEquip.play()
				presentWeaponName = weaponName
				presentWeaponAttack = weaponAttack
				gem -= weaponPrice
				statusWindowWeapon.innerHTML = `武器：${presentWeaponName}（攻撃力：${presentWeaponAttack}）`
				statusWindowGem.innerHTML =`保有ジェム：${gem}`
				}else{
				seError.pause()
				seError.currentTime = 0;
				seError.play()
				statusWindowGem.innerHTML =`保有ジェム：${gem}<br>ジェムが不足してます。`
				}
			}
			e.preventDefault()
		})
	})
}

const statusUpShield = function () {
	const shields = document.querySelectorAll(".fgem-shield-list")
	const equipUseId = document.getElementById("equip-user-id")
	const userId = equipUseId.getAttribute("user-id")
	const statusWindowShield = document.getElementById("status-window-shield")
	const statusWindowGem = document.getElementById("status-window-gem")
	shields.forEach(function (shield) {
		shield.addEventListener("click", (e) => {
			const shieldId = shield.getAttribute("shield-id")
			const shieldName = shield.getAttribute("shield-name")
			const shieldDefense = shield.getAttribute("shield-defense")
			const shieldPrice = shield.getAttribute("shield-price")
			const XHR = new XMLHttpRequest();
			XHR.open("GET", `/users/${userId}/schange?shield_id=${shieldId}`, true);
			XHR.responseType = "json";
			XHR.send();
			XHR.onload = () => {
				if (XHR.status != 200) {
					alert(`Error ${XHR.status}: ${XHR.statusText}`)
					return
				}
				if (gem >= shieldPrice){
				seEquip.pause()
				seEquip.currentTime = 0;
				seEquip.play()
				presentShieldName = shieldName
				presentShieldDefense = shieldDefense
				gem -= shieldPrice
				statusWindowShield.innerHTML = `盾　：${presentShieldName}（防御力：${presentShieldDefense}）`
				statusWindowGem.innerHTML =`保有ジェム：${gem}`
				}else{
				seError.pause()
				seError.currentTime = 0;
				seError.play()
				statusWindowGem.innerHTML =`保有ジェム：${gem}<br>ジェムが不足してます。`
				}
			}
			e.preventDefault()
		})
	})
}

const skillGet = function () {
	const skills = document.querySelectorAll(".skill-list")
	const skillUseId = document.getElementById("skill-user-id")
	const userId = skillUseId.getAttribute("user-id")
	const statusWindowGem = document.getElementById("status-window-gem")
	const lastSkill = document.getElementById("last-skill")
	const afterSkill = document.getElementById("status-skill")
	skills.forEach(function (skill) {
		skill.addEventListener("click", (e) => {
			const skillId = skill.getAttribute("skill-id")
			const skillName = skill.getAttribute("skill-name")
			const skillPrice = skill.getAttribute("skill-price")
			let userHaving = skill.getAttribute("user-having")
			const XHR = new XMLHttpRequest();
			XHR.open("GET", `/users/${userId}/skillget?skill_id=${skillId}`, true);
			XHR.responseType = "json";
			XHR.send();
			XHR.onload = () => {
				if (XHR.status != 200) {
					alert(`Error ${XHR.status}: ${XHR.statusText}`)
					return
				}
					if (userHaving == 1){
						if (gem >= skillPrice){
							seStatusUp.pause()
							seStatusUp.currentTime = 0;
							seStatusUp.play()
							gem -= skillPrice
							afterSkill.insertAdjacentHTML ("beforeend" ,`<div>${skillName} 　</div>`)
							statusWindowGem.innerHTML =`保有ジェム：${gem}`
							skill.setAttribute("user-having","3")
						}else{
							seError.pause()
							seError.currentTime = 0;
							seError.play()
							statusWindowGem.innerHTML =`保有ジェム：${gem}<br>ジェムが不足してます。`
						}
					}else if(userHaving ==2 ){
						seError.pause()
						seError.currentTime = 0;
						seError.play()
						afterSkill.insertAdjacentHTML ("afterend" ,`<div>${skillName}は覚えています。</div>`)
						skill.setAttribute("user-having","3")
					}

			}
			e.preventDefault()
		})
	})
}



window.addEventListener("load", statusUpHp)
window.addEventListener("load", statusUpMp)
window.addEventListener("load", statusUpSp)
window.addEventListener("load", statusUpWeapon)
window.addEventListener("load", statusUpShield)
window.addEventListener("load", skillGet)
