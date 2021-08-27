class AddColumnToCovidTest < ActiveRecord::Migration[6.0]
  def change
    add_column :covid_tests, :type_prelevement, :string
    add_column :covid_tests, :test_place, :string
  end
end
