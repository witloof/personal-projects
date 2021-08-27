class CreateTravels < ActiveRecord::Migration[6.0]
  def change
    create_table :travels do |t|
      t.references :traveler, null: false, foreign_key: true
      t.string :from_country_iso_code
      t.string :destination_country_iso_code
      t.date :departure_date
      t.date :arrival_date
      t.string :flight
      t.string :company

      t.timestamps
    end

    add_index :travels, :from_country_iso_code
    add_index :travels, :destination_country_iso_code
    add_index :travels, :departure_date
    add_index :travels, :arrival_date
  end
end
