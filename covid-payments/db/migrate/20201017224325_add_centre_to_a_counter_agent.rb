class AddCentreToACounterAgent < ActiveRecord::Migration[6.0]
  def change
    add_column :counter_agents, :centre, :string
  end
end
