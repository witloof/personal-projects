class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum role: [:traveler, :commercial, :counter_agent, :admin, :doctor]

  has_one :commercial, dependent: :destroy
  has_one :counter_agent, dependent: :destroy
  has_one :doctor, dependent: :destroy
  belongs_to :airport, optional: true

  validates :last_name, :first_name, :phone_number, presence: true

  has_one_attached :avatar
  after_create :send_password_mail
  attr_accessor :phone_country_code
  validates :phone_number, telephone_number: { country: proc { |record| record.phone_country_code }, types: [:mobile] },
                           if: :needs_to_validate_phone_number

  def set_role(role)
    self.role = role.to_s
  end

  def is_traveler?
    role == "traveler"
  end

  def set_user_password
    password_length = 6
    password = Devise.friendly_token.first(password_length)
    self.password = password
    self.password_confirmation = password
  end

  def full_name
    [self.first_name, self.last_name].join(" ")
  end

  def covid_tests
    travel_ids = self.traveler&.travels&.pluck(:id)
    CovidTest.where(id: travel_ids)
  end

  def commercial?
    self.role.casecmp("commercial").zero?
  end

  def administrator?
    self.role.casecmp("admin").zero?
  end

  def send_password_mail
    SendPasswordMailerJob.perform_now(self)
  end

  private

  def needs_to_validate_phone_number
    phone_country_code.present? && phone_number.present?
  end
end
