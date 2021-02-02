class Villain < ApplicationRecord
	has_many :villain_users 
  has_many :users ,through: :villain_users
end
