class AddColumnsToTraveler < ActiveRecord::Migration[6.0]
  def change
    add_column :travelers, :first_name, :string, null: true, default: ""
    add_column :travelers, :last_name, :string, null: true, default: ""
    add_column :travelers, :phone_number, :string, null: true, default: ""
    add_column :travelers, :email, :string, null: true, default: ""
    remove_reference :travelers, :user
  end
end
