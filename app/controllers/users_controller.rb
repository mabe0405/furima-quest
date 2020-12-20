class UsersController < ApplicationController
	def show
		initial_setting
		@ability = current_user.ability
		@user = current_user
	end

	private

	def initial_setting
		unless current_user.ability.present?
			Ability.create(hp:10, mp:10, speed:10, weapon_id:0, shield_id:0,user_id: current_user.id)
		end
		unless current_user.fgem.present?
			Fgem.create(gem: 0,user_id: current_user.id)
		end
		unless current_user.coin.present?
			Coin.create(coin: 0,user_id: current_user.id)
		end
	end

end
