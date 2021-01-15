class Monster < ActiveHash::Base
	self.data = [
    { id: 1, name: 'スライム', hp: 5,mp: 2,attack: 2,defense: 2,speed: 1,gem: 10,coin: 10,image: "/assets/m1_suraimu.png"},
    { id: 2, name: 'スライムベス', hp: 11,mp: 5,attack: 12,defense: 2,speed: 1,gem: 10,coin: 20,image: "/assets/m2_suraimubesu.png" },
    { id: 3, name: 'ドラキー', hp: 70,mp: 20,attack: 32,defense: 2,speed: 1,gem: 10,coin: 30,image: "/assets/m3_doraki-.png" },
    { id: 4, name: 'ゴースト', hp: 5,mp: 2,attack: 2,defense: 2,speed: 1,gem: 10,coin: 40,image: "/assets/m4_gosuto.png"},
    { id: 5, name: 'まほうつかい', hp: 30,mp: 5,attack: 12,defense: 2,speed: 1,gem: 10,coin: 50,image: "/assets/m5_mahoutukai.png" },
    { id: 6, name: 'メイジドラキー', hp: 70,mp: 20,attack: 32,defense: 2,speed: 1,gem: 10,coin: 60,image: "/assets/m6_meijidoraki-.png" },
    { id: 7, name: 'おおさそり', hp: 5,mp: 2,attack: 2,defense: 2,speed: 1,gem: 10,coin: 70,image: "/assets/m7_osasori.png"},
    { id: 8, name: 'がいこつ', hp: 30,mp: 5,attack: 12,defense: 2,speed: 1,gem: 10,coin: 80,image: "/assets/m8_gaikotu.png" },
    { id: 9, name: 'メーダ', hp: 70,mp: 20,attack: 32,defense: 2,speed: 1,gem: 10,coin: 90,image: "/assets/m9_me-da.png" },
    { id: 10, name: 'メトロゴースト', hp: 5,mp: 2,attack: 2,defense: 2,speed: 1,gem: 10,coin: 100,image: "/assets/m10_metorogosuto.png"},
    { id: 11, name: 'ドラゴン', hp: 30,mp: 5,attack: 65,defense: 2,speed: 1,gem: 10,coin: 110,image: "/assets/m30_doragon.png" },
    { id: 12, name: 'ゴーレム', hp: 70,mp: 20,attack: 32,defense: 2,speed: 1,gem: 10,coin: 120,image: "/assets/m33_goremu.png" }
  ]

  include ActiveHash::Associations

end
