class Doctor < ApplicationRecord
  belongs_to :user
  accepts_nested_attributes_for :user, :allow_destroy => true
  has_one_attached :signature
  validate :signature_validation

  private
  def signature_validation
    unless signature.attached?
    #   if signature.blob.byte_size > 1000000
    #     signature.purge
    #     errors[:base] << 'Too big'
    #   elsif !signature.blob.content_type.starts_with?('image/')
    #     signature.purge
    #     errors[:base] << 'Wrong format'
    #   end
    # else
      errors[:base] << 'Charger une signature'
    end
  end
end

