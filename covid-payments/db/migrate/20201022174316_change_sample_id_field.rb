class ChangeSampleIdField < ActiveRecord::Migration[6.0]
  def up
    remove_column :covid_tests, :sample_id
    add_column :covid_tests, :sample_id, :integer

    execute "CREATE SEQUENCE covid_tests_sample_id_seq START 1"
  end

  def down
    drop_column :covid_tests, :sample_id
    execute "DROP SEQUENCE covid_tests_sample_id_seq"
  end
end
