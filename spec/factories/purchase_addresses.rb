FactoryBot.define do
  factory :purchase_address do
    token { 'tok_abcdefghijk00000000000000000' }
    user_id { 1 }
    item_id { 1 }
    postal_code { '111-1111' }
    prefecture_id { 1 }
    city { '中央区' }
    address { '1-1-1-1' }
    building { '' }
    phone_number { 11_111_111_111 }
  end
end
