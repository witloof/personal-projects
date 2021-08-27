class Product < ApplicationRecord
	before_save :slugify_title

	has_many :images, as: :imageable, :inverse_of => :imageable 
	belongs_to :category
	accepts_nested_attributes_for :images, :allow_destroy => true


	def slugify_title
		self.slug_title = [self.title.parameterize, id].join('-')
	end

	def primary_image(size = :original)
		images.first.asset(size)
	end
end
