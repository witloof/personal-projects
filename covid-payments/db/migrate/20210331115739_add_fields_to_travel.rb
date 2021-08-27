class AddFieldsToTravel < ActiveRecord::Migration[6.0]
  def change
    add_column :travels, :traveled_by, :integer
  end
end
