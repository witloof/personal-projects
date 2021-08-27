class PaymentType < ApplicationRecord
  has_one_attached :logo

  def self.default_payment
    self.where("name LIKE ?", "%cash%").first
  end

  def paid_today
    CovidTest.where(created_at: Time.zone.now.beginning_of_day..Time.zone.now.end_of_day,
      payment_type_id: self.id
    )
  end
end
