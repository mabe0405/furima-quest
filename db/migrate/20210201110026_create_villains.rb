class CreateVillains < ActiveRecord::Migration[6.0]
  def change
    create_table :villains do |t|
      t.string  :name,            null: false
      t.integer :hp,              null: false
      t.integer :mp,              null: false
      t.integer :attack,          null: false
      t.integer :defense,         null: false
      t.integer :speed,           null: false
      t.integer :gem,             null: false
      t.integer :coin,            null: false
      t.binary :image,           null: false
    end
  end
end
