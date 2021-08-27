class CreateCounterAgents < ActiveRecord::Migration[6.0]
  def change
    create_table :counter_agents do |t|
      t.string :number
      t.string :country_iso_code

      t.timestamps
    end
  end
end
