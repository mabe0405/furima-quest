FactoryBot.define do
  factory :item do
    name                  { 'テスト' }
    description           { 'テスト' }
    category_id           { 2 }
    status_id             { 2 }
    shipping_cost_id      { 2 }
    shipping_source_id    { 2 }
    delivery_date_id      { 2 }
    price                 { 5000 }

    association :user

    after(:build) do |item|
      item.image.attach(io: File.open('public/images/test_image.png'), filename: 'test_image.png')
    end
  end
end
