class AdduserReferencesToCounterAgent < ActiveRecord::Migration[6.0]
  def change
    add_reference :counter_agents, :user, foreign_key: true, index: true
  end
end
