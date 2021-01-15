class UsersController < ApplicationController
	def show
		initial_setting
		@ability = current_user.ability
		@user = current_user
		@monsters = Monster.all
		@userskills = current_user.skills
	end

end
