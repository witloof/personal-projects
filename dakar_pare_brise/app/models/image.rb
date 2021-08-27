class Image < ApplicationRecord
  belongs_to :imageable, polymorphic: true

  has_attached_file :asset, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :asset, :content_type => ["image/jpg", "image/png", "image/jpeg"]

  # add a delete_image method: 
  attr_accessor :delete_asset
  before_validation { self.asset.clear if self.delete_asset== '1' }
end
