class Monster < ActiveHash::Base
	self.data = [
    { id: 1, name: 'スライム', hp: 5,mp: 2,attack: 2,defense: 2,speed: 1,gem: 10,coin: 10},
    { id: 2, name: '赤スライム', hp: 5,mp: 2,attack: 2,defense: 2,speed: 1,gem: 10,coin: 10 },
    { id: 3, name: '金スライム', hp: 5,mp: 2,attack: 2,defense: 2,speed: 1,gem: 10,coin: 10 }
  ]

  include ActiveHash::Associations

end
