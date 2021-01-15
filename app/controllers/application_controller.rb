class ApplicationController < ActionController::Base
  before_action :basic_auth
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :initial_setting

  private

  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|
      username == ENV['BASIC_AUTH_USER'] && password == ENV['BASIC_AUTH_PASSWORD']
    end
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname, :last_name, :first_name, :last_name_kana, :first_name_kana, :birth_date])
  end

  def initial_setting
    if user_signed_in?
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

end
