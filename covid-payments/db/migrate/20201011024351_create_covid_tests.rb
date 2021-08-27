class CreateCovidTests < ActiveRecord::Migration[6.0]
  def change
    create_table :covid_tests do |t|
      t.references :travel, null: false, foreign_key: true
      t.references :payment_type
      t.boolean :payed, default: false
      t.integer :result
      t.integer :amount
      t.string :currency
      t.references :counter_agent, null: true, foreign_key: true
      t.datetime :result_date
      t.string :payment_code
      t.string :ref_number

      t.timestamps
    end
    add_index :covid_tests, :payment_code, unique: true
  end
end
