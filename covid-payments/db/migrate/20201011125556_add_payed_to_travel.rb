class AddPayedToTravel < ActiveRecord::Migration[6.0]
  def change
    add_column :travels, :payed, :boolean, default: false
  end
end
