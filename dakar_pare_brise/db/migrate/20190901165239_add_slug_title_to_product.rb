class AddSlugTitleToProduct < ActiveRecord::Migration[5.0]
  def change
    add_column :products, :slug_title, :string
  end
end
