class MagicUser < ApplicationRecord
	belongs_to :magic
  belongs_to :user
end
