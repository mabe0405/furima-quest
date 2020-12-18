class CreateAbilities < ActiveRecord::Migration[6.0]
  def change
    create_table :abilities do |t|
      t.integer :hp,          null: false
      t.integer :mp,          null: false
      t.integer :weapon_id,   null: false,default: 0
      t.integer :shield_id,   null: false,default: 0
      t.integer :speed,       null: false
      t.references :user,     null: false, foreign_key: true
      t.timestamps
    end
  end
end
