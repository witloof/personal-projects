class Commercial < ApplicationRecord
  belongs_to :user
  has_many :travelers
  has_many :covid_tests
  accepts_nested_attributes_for :user, :allow_destroy => true

  def set_user_password
    password_length = 6
    password = Devise.friendly_token.first(password_length)
    user.password = password
    user.password_confirmation = password
  end

  def enrolled_travelers
    Traveler.where(commercial_id: self.id, created_at: Time.zone.now.beginning_of_day..Time.zone.now.end_of_day).count
  end

  def enrolled_tests
    CovidTest.where(commercial_id: self.id, created_at: Time.zone.now.beginning_of_day..Time.zone.now.end_of_day).count
  end
end
