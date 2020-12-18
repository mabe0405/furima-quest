class CreateFgems < ActiveRecord::Migration[6.0]
  def change
    create_table :fgems do |t|
      t.integer :gem,          null: false
      t.references :user,      null: false, foreign_key: true
      t.timestamps
    end
  end
end
