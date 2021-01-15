class Shield < ActiveHash::Base
	self.data = [
		{ id: 0, name: '素手', defense: 2, price: 0,img:""},
    { id: 1, name: 'おなべのふた', defense: 4, price: 5, img:"/assets/sh1_onabenohuta.png"},
    { id: 2, name: 'かわのたて', defense: 15, price: 20, img:"/assets/sh2_kawanotate.png"},
    { id: 3, name: 'うろこのたて', defense: 25, price: 50, img:"/assets/sh3_urokonotate.png"}
  ]

	include ActiveHash::Associations

	has_many :abilities

end