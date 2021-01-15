class FgemsController < ApplicationController

	def index
		gon.userHp = current_user.ability.hp
		gon.userMp = current_user.ability.mp
		gon.userSp = current_user.ability.speed
		gon.userGem = current_user.fgem.gem
		@weapons = Weapon.all
		@shields = Shield.all
		@skills = Skill.all
		@userskills = current_user.skills
	end

	def hpup
		if current_user.fgem.gem > 0
			current_user.ability.hp += 1
			gem_consumption_status
		end
		render json:{ user_hp:current_user.ability.hp }
			# redirect_to user_fgems_path(current_user.id)
	end

	def mpup
		if current_user.fgem.gem > 0
			current_user.ability.mp += 1
			gem_consumption_status
		end
		render json:{ user_mp:current_user.ability.mp }
			# redirect_to user_fgems_path(current_user.id)
	end

	def spup
		if current_user.fgem.gem > 0
			current_user.ability.speed += 1
			gem_consumption_status
		end
		render json:{ user_sp:current_user.ability.speed }
		# redirect_to user_fgems_path(current_user.id)
	end

	def wchange
		@weapon = Weapon.find(params[:weapon_id])
		if current_user.fgem.gem >= @weapon.price
			current_user.ability.weapon_id = params[:weapon_id]
			gem_consumption_weapon
		end
		render json:{ weapon_id:@weapon.id}
			# redirect_to user_fgems_path(current_user.id)
	end

	def schange
		@shield = Shield.find(params[:shield_id])
		if current_user.fgem.gem >= @shield.price
			current_user.ability.shield_id = params[:shield_id]
			gem_consumption_shield
		end
		render json:{ user_sp:current_user.ability.speed }
			# redirect_to user_fgems_path(current_user.id)
	end

	def skillget
		@skill = Skill.find(params[:skill_id])
		@skilluser = SkillUser.where(user_id:current_user)
		if	current_user.fgem.gem >= @skill.gem
			if  @skilluser.where(skill_id:params[:skill_id]) == []
				SkillUser.create(user_id:current_user.id,skill_id:params[:skill_id])
				gem_consumption_skill
			end
		end
		render json:{ skill_id:@skill.id}
		# redirect_to user_fgems_path(current_user.id)
	end

	private

	def gem_consumption_status
		@ability =current_user.ability
		@ability.save
		@fgem = current_user.fgem
		@fgem.gem -= 1
		@fgem.save
		
	end

	def gem_consumption_weapon
		@ability =current_user.ability
		@ability.save
		@fgem = current_user.fgem
		@fgem.gem -= @weapon.price
		@fgem.save
	end

	def gem_consumption_shield
		@ability =current_user.ability
		@ability.save
		@fgem = current_user.fgem
		@fgem.gem -= @shield.price
		@fgem.save
	end

	def gem_consumption_skill
		@fgem = current_user.fgem
		@fgem.gem -= @skill.gem
		@fgem.save
	end



end
