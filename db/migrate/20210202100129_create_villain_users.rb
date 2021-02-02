class CreateVillainUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :villain_users do |t|
      t.references :villain, foreign_key: true
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
