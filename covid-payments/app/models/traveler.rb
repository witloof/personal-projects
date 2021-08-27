require 'csv'
class Traveler < ApplicationRecord
  has_many :travels
  has_many :covid_tests, through: :travels
  belongs_to :commercial, optional: true
  accepts_nested_attributes_for :travels, :allow_destroy => true

  validates :residence_country_iso_code, :identification_type, :identification_number, :phone_number, :sexe, presence: true
  validates :passport_number, uniqueness: true

  belongs_to :residence_country, :primary_key => "iso_code", :foreign_key => "residence_country_iso_code", :class_name => "Country"
  enum sexe: [:homme, :femme]
  enum identification_type: {
    passeport: 0,
    cin: 1,
    autre: 2
  }
  attr_accessor :phone_country_code
  validates :phone_number, telephone_number: { country: proc { |record| record.phone_country_code }, types: [:mobile] },
                           if: :needs_to_validate_phone_number

  def full_name
    [self.first_name, self.last_name].join(" ")
  end

  def self.daily_travelers_count
    all.size
  end

  def last_covid_test
    self.covid_tests.order(created_at: :desc).first
  end

  def self.from_today
    self.where(created_at: Time.zone.now.beginning_of_day..Time.zone.now.end_of_day)
  end

  def self.enrolled_today
    self.where(created_at: Time.zone.now.beginning_of_day..Time.zone.now.end_of_day)
      .where
      .not(commercial_id: nil)
      .select(:commercial_id, 'COUNT(commercial_id)')
      .group(:commercial_id)
  end

  def self.to_csv(data)
    attributes = %w{passport_number sexe first_name last_name phone_number email}

    CSV.generate(headers: true) do |csv|
      csv << attributes

      data.each do |traveler|
        csv << attributes.map{ |attr| traveler.send(attr) }
      end
    end
  end

  private

  def needs_to_validate_phone_number
    phone_country_code.present? && phone_number.present?
  end
end
