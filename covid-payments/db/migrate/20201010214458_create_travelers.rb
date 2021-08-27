class CreateTravelers < ActiveRecord::Migration[6.0]
  def change
    create_table :travelers do |t|
      t.string :residence_country_iso_code
      t.string :passport_number
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_index :travelers, :residence_country_iso_code
  end
end
