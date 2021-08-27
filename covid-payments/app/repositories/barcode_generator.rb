require "barby"
require "barby/barcode/code_128"
require "barby/outputter/png_outputter"

if ENV['RAILS_ENV'] == 'production'
  Rails.application.routes.default_url_options[:host] = "https://safecongo.com/"
else 
  Rails.application.routes.default_url_options[:host] = "http://localhost:3000/"
end

class BarcodeGenerator
  def self.generate_image(id)
    Barby::Code128B.new(Rails.application.routes.url_helpers.admin_covid_test_url(id)).to_image.to_blob
  end
end
