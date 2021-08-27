class CreateVehicules < ActiveRecord::Migration[5.0]
  def change
    create_table :vehicules do |t|
      t.string :matricule
      t.references :marque, foreign_key: true
      t.string :model
      t.string :annee
      t.string :type_vehicule

      t.timestamps
    end
  end
end
