class AddFieldsToTraveler < ActiveRecord::Migration[6.0]
  def change
    add_column :travelers, :identification_type, :integer
    add_column :travelers, :identification_number, :string
    add_column :travelers, :date_emission, :date
    add_column :travelers, :date_expiration, :date
  end
end
