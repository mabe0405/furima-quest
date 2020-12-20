class PurchasesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_item

  def index
    if @item.user == current_user || @item.purchase.present?
      redirect_to root_path
    end
    @purchase_address = PurchaseAddress.new
  end

  def create
    initial_setting_item_user
    @item.user.fgem.gem += @item.price / 100
    @item.user.fgem.save

    initial_setting_purchase_user
    current_user.fgem.gem += @item.price / 100
    current_user.fgem.save

    @purchase_address = PurchaseAddress.new(purchase_params)
    if @purchase_address.valid?
      pay_item
      @purchase_address.save
      redirect_to root_path
    else
      render action: :index
    end
  end

  private

  def set_item
    @item = Item.find(params[:item_id])
  end

  def purchase_params
    params.require(:purchase_address).permit(:postal_code, :prefecture_id, :city, :address, :building, :phone_number).merge(user_id: current_user.id, item_id: params[:item_id], price: @item.price, token: params[:token])
  end

  def pay_item
    Payjp.api_key = ENV['PAYJP_SECRET_KEY']
    Payjp::Charge.create(
      amount: purchase_params[:price],
      card: purchase_params[:token],
      currency: 'jpy'
    )
  end

  def initial_setting_item_user
		unless @item.user.ability.present?
			Ability.create(hp:10, mp:10, speed:10, weapon_id:0, shield_id:0,user_id: @item.user.id)
		end
		unless @item.user.fgem.present?
			Fgem.create(gem: 0,user_id: @item.user.id)
		end
		unless @item.user.coin.present?
			Coin.create(coin: 0,user_id: @item.user.id)
		end
  end
  
  def initial_setting_purchase_user
		unless current_user.ability.present?
			Ability.create(hp:10, mp:10, speed:10, weapon_id:0, shield_id:0,user_id: cuurent_user)
		end
		unless current_user.fgem.present?
			Fgem.create(gem: 0,user_id: @item.user.id)
		end
		unless current_user.coin.present?
			Coin.create(coin: 0,user_id: @item.user.id)
		end
  end

end
