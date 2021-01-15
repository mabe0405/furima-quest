class Magic < ActiveHash::Base
	self.data = [
    { id: 1, name: 'ホイミ', power: 10,target: "user",gem: 50,image: "/assets/m1_suraimu.png"},
    { id: 2, name: 'メラ', power: 20,target: "monster",gem: 100,image: "/assets/m2_suraimubesu.png" },
    { id: 3, name: 'ベホイミ', power: 50,target: "user",gem: 500,image: "/assets/m3_doraki-.png" },
  ]

	include ActiveHash::Associations
	
	has_many :magic_users 
  has_many :magics ,through: :magic_users

end
