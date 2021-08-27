class CreateCountries < ActiveRecord::Migration[6.0]
  def change
    create_table :countries do |t|
      t.string :iso_code
      t.string :name
      t.integer :test_price
      t.string :currency

      t.timestamps
    end
    add_index :countries, :iso_code, unique: true
    add_index :countries, :test_price
    add_index :countries, :currency
  end
end
