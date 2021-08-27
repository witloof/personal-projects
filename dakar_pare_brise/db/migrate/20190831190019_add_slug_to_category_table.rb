class AddSlugToCategoryTable < ActiveRecord::Migration[5.0]
  def change
    add_column :categories, :slug_name, :string, unique: true
  end
end
