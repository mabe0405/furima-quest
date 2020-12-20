class FgemsController < ApplicationController

	def index
		@weapons = Weapon.all
		@shields = Shield.all
	end

	def hpup
		if current_user.fgem.gem > 0
			current_user.ability.hp += 1
			gem_consumption_status
		end
			redirect_to user_fgems_path(current_user.id)
	end

	def wchange
		@weapon = Weapon.find(params[:weapon_id])
		if current_user.fgem.gem >= @weapon.price
			current_user.ability.weapon_id = params[:weapon_id]
			gem_consumption_weapon
		end
			redirect_to user_fgems_path(current_user.id)
	end

	def schange
		@shield = Shield.find(params[:shield_id])
		if current_user.fgem.gem >= @shield.price
			current_user.ability.shield_id = params[:shield_id]
			gem_consumption_shield
		end
			redirect_to user_fgems_path(current_user.id)
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



end
