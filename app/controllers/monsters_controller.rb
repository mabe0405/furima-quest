class MonstersController < ApplicationController
	def show
		@monster = Villain.find(params[:monster_id])
		@userskills = SkillUser.where(user_id:current_user)
		
		gon.userName = current_user.nickname
		gon.userHp = current_user.ability.hp
		gon.userMp = current_user.ability.mp
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
		@monster = Villain.find(params[:monster_id])
		@coin = Coin.find_by(user_id:current_user.id)
		@coin.coin += @monster.coin
		@coin.save
		# binding.pry
		VillainUser.create(user_id:params[:user_id],villain_id:params[:monster_id])
		redirect_to user_path(current_user.id)
	end
end
