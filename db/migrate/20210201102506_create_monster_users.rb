class CreateMonsterUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :monster_users do |t|
      t.integer :monster_id
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
