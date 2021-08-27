class HomeController < ApplicationController

  def index
  	@products = Product.take(10)
  	@categories = Category.all
  end
  
end
