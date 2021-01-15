class Weapon < ActiveHash::Base
	self.data = [
		{ id: 0, name: '素手', attack: 2, price: 5, img:""},
    { id: 1, name: 'ひのきのぼう', attack: 4, price: 5, img:"/assets/we1_hinokinobou.png"},
    { id: 2, name: 'どうのつるぎ', attack: 15, price: 30, img:"/assets/we2_dounoturugi.png"},
    { id: 3, name: 'てつのやり', attack: 30, price: 60, img:"/assets/we3_tetunoyari.png"}
  ]

	include ActiveHash::Associations

	has_many :abilities

end