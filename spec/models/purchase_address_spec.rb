require 'rails_helper'

RSpec.describe PurchaseAddress, type: :model do
  describe '購入情報の保存' do
    before do
      @purchase_address = FactoryBot.build(:purchase_address)
    end
    context '商品が購入ができる時' do
      it 'すべての値が正しく入力されていれば保存できること' do
        expect(@purchase_address).to be_valid
      end
      it 'builidingに値が入っていても保存できること' do
       @purchase_address.building = "ああああ"
       expect(@purchase_address).to be_valid
      end
    end
    context '商品が購入ができない時' do
      it 'postal_codeが空だと保存できないこと' do
        @purchase_address.postal_code = nil
        @purchase_address.valid?
        expect(@purchase_address.errors.full_messages).to include("Postal code can't be blank")
      end
      it 'postal_codeにハイフンがないと保存できないこと' do
       @purchase_address.postal_code = '1111111'
       @purchase_address.valid?
       expect(@purchase_address.errors.full_messages).to include('Postal code Input correctly')
      end
      it 'prefectureが未選択(0)だと保存できないこと' do
       @purchase_address.prefecture_id = 0
       @purchase_address.valid?
       expect(@purchase_address.errors.full_messages).to include('Prefecture Select')
      end
      it 'cityが空だと保存できないこと' do
       @purchase_address.city = nil
       @purchase_address.valid?
        expect(@purchase_address.errors.full_messages).to include("City can't be blank")
      end
      it 'adressが空だと保存できないこと' do
       @purchase_address.address = nil
       @purchase_address.valid?
       expect(@purchase_address.errors.full_messages).to include("Address can't be blank")
      end
      it 'phone_numberが空だと保存できないこと' do
       @purchase_address.phone_number = nil
       @purchase_address.valid?
       expect(@purchase_address.errors.full_messages).to include("Phone number can't be blank")
      end
      it 'phone_numberが数字のみでないと保存できないこと' do
       @purchase_address.phone_number = 'a1111'
       @purchase_address.valid?
       expect(@purchase_address.errors.full_messages).to include('Phone number Input only number')
      end
      it 'phone_numberが12文字以上だと保存できないこと' do
        @purchase_address.phone_number = '111111111111'
        @purchase_address.valid?
        expect(@purchase_address.errors.full_messages).to include('Phone number is too long (maximum is 11 characters)')
       end
      it 'userが紐付いていないと保存できないこと' do
       @purchase_address.user_id = nil
       @purchase_address.valid?
       expect(@purchase_address.errors.full_messages).to include("User can't be blank")
      end
      it 'itemが紐付いていないと保存できないこと' do
       @purchase_address.item_id = nil
       @purchase_address.valid?
       expect(@purchase_address.errors.full_messages).to include("Item can't be blank")
      end
      it 'tokenが空だと保存できないこと' do
       @purchase_address.token = nil
       @purchase_address.valid?
       expect(@purchase_address.errors.full_messages).to include("Token can't be blank")
      end
    end  
  end
end
