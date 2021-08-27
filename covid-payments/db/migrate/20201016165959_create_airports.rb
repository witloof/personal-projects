class CreateAirports < ActiveRecord::Migration[6.0]
  def change
    create_table :airports do |t|
      t.string :name
      t.string :country_iso_code, null: false

      t.timestamps
    end
  end
end
