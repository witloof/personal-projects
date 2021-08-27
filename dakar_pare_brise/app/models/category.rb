class Category < ApplicationRecord
	before_save :slugify_name

	has_attached_file :image, styles: { medium: "300x300#", thumb: "150x150#" }, default_url: "/images/:style/missing.png"
	validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  default_scope { order(name: :asc) }
	# add a delete_image method: 
  attr_accessor :delete_image
  before_validation { self.image.clear if self.delete_image== '1' }

  #Associations
  has_many :products

  def slugify_name 
  	self.slug_name = self.name.parameterize
  end 
end
