class ProductsController < ApplicationController
	before_action :set_product, only:[:show]
	
	def show 
		@categories = Category.except(@product.category.id)
	end


	private 

	def set_product
		@product = Product.find_by(slug_title: params[:slug_title])
	end
end
