class CreateSkills < ActiveRecord::Migration[6.0]
  def change
    create_table :skills do |t|
      t.string :name,          null: false
      t.integer :power,        null: false
      t.integer :object,       null: false
      t.integer :gem,          null: false
      t.string :img,           null: false
    end
  end
end
