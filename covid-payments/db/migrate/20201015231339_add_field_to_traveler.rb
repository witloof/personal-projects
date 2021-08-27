class AddFieldToTraveler < ActiveRecord::Migration[6.0]
  def change
    add_column :travelers, :sexe, :integer
    add_column :travelers, :birthday, :date
  end
end
