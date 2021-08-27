class CreateDoctors < ActiveRecord::Migration[6.0]
  def change
    create_table :doctors do |t|
      t.string :number
      t.string :centre
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
