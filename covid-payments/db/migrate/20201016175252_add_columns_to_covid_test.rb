class AddColumnsToCovidTest < ActiveRecord::Migration[6.0]
  def change
    add_column :covid_tests, :sample_id, :string
    add_column :covid_tests, :test_version, :string
    add_column :covid_tests, :test_reference, :string
    add_column :covid_tests, :expire_at, :datetime
    add_column :covid_tests, :lot_number, :string
    add_column :covid_tests, :tested_at, :datetime
  end
end
