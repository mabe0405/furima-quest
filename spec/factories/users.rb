FactoryBot.define do
  factory :user do
    nickname              { Faker::Name.initials }
    email                 { Faker::Internet.free_email }
    password              { Faker::Internet.password }
    password_confirmation { password }
    last_name { 'ああ' }
    first_name { 'ああ' }
    last_name_kana { 'アア' }
    first_name_kana { 'アア' }
    birth_date { '2000-01-01' }
  end
end
