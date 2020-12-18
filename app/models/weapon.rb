class Weapon < ActiveHash::Base
	self.data = [
		{ id: 0, name: '素手', attack: 2, price: 5},
    { id: 1, name: 'ひのきのぼう', attack: 4, price: 5},
    { id: 2, name: 'こんぼう', attack: 8, price: 5},
    { id: 3, name: 'どうのつるぎ', attack: 10, price: 5}
  ]

	include ActiveHash::Associations

	has_many: abilties

end