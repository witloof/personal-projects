class CategoriesController < ApplicationController
	before_action :set_category

	def show
		@categories = Category.except(@category.id)
	end


	private 

	def set_category
		@category = Category.find_by(slug_name: params[:slug_name])
	end
end
