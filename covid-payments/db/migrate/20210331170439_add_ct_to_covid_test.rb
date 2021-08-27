class AddCtToCovidTest < ActiveRecord::Migration[6.0]
  def change
    add_column :covid_tests, :ct, :string
  end
end
