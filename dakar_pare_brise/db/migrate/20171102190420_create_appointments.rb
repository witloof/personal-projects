class CreateAppointments < ActiveRecord::Migration[5.0]
  def change
    create_table :appointments do |t|
      t.references :vehicule, foreign_key: true
      t.references :user, foreign_key: true
      t.integer :dommage
      t.string :lieu
      t.boolean :delai
      t.string :adresse
      t.date :to_repare_at
      t.text :commentaire
      t.date :confirmed_at

      t.timestamps
    end
  end
end
