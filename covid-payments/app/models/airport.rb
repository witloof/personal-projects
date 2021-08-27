class Airport < ApplicationRecord
  belongs_to :country, :primary_key => "iso_code", :foreign_key => "country_iso_code", :class_name => "Country"
end
