class AddCommercialToCovidTest < ActiveRecord::Migration[6.0]
  def change
    add_column :covid_tests, :commercial_id, :integer
    add_column :travelers, :commercial_id, :integer
    add_column :travels, :commercial_id, :integer
  end
end
