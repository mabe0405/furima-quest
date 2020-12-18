class Shield < ActiveHash::Base
	self.data = [
		{ id: 0, name: '素手', defense: 2, price: 0},
    { id: 1, name: 'おなべのふた', defense: 4, price: 5},
    { id: 2, name: 'かわのたて', defense: 8, price: 5},
    { id: 3, name: 'うろこのたて', defense: 10, price: 5}
  ]

	include ActiveHash::Associations

	has_many: abilties

end