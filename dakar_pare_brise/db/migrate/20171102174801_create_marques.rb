class CreateMarques < ActiveRecord::Migration[5.0]
  def change
    create_table :marques do |t|
      t.string :nom
      t.json :models
      t.timestamps
    end
  end
end
