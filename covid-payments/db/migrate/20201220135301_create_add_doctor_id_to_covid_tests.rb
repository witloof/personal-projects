class CreateAddDoctorIdToCovidTests < ActiveRecord::Migration[6.0]
  def change
    add_column :covid_tests, :doctor_id, :string
  end
end
