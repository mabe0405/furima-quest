class CreateCoins < ActiveRecord::Migration[6.0]
  def change
    create_table :coins do |t|
      t.integer :coin,          null: false
      t.references :user,      null: false, foreign_key: true
      t.timestamps
    end
  end
end
