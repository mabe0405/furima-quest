class MonstersController < ApplicationController
	def show
		@monster = Monster.find(params[:monster_id])
		
		gon.userName = current_user.nickname
		gon.userHp = current_user.ability.hp
		gon.userSpeed = current_user.ability.speed
		gon.userAttack = current_user.ability.weapon.attack
		gon.userDefense = current_user.ability.shield.defense
		gon.userSpeed = current_user.ability.speed

		
		gon.monsterName = @monster.name
		gon.monsterHp = @monster.hp
		gon.monsterMp = @monster.mp
		gon.monsterAttack = @monster.attack
		gon.monsterDefense = @monster.defense
		gon.monsterSpeed = @monster.speed
		gon.monsterImg = @monster.image
		gon.monsterCoin = @monster.coin
	end

	def coinget
		@monster = Monster.find(params[:monster_id])
		@coin = Coin.find_by(user_id:current_user.id)
		@coin.coin += @monster.coin
		@coin.save
		redirect_to user_path(current_user.id)
	end
end
