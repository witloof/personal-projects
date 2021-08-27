class Travel < ApplicationRecord
  HUMANIZED_ATTRIBUTES = {
    :from_country_iso_code => "Pays de départ"
  }
  scope :unpaids, -> { where(payed: false) }
  belongs_to :traveler
  has_one :covid_test
  belongs_to :from_country, :primary_key => "iso_code", :foreign_key => "from_country_iso_code", :class_name => "Country"
  belongs_to :destination_country, :primary_key => "iso_code", :foreign_key => "destination_country_iso_code", :class_name => "Country"

  validates :from_country_iso_code, :destination_country_iso_code, presence: true
  validate  :date_connot_be_in_the_past
  enum traveled_by: {
    vol: 0,
    route: 1,
    bateau: 2
  }

  def date_connot_be_in_the_past
    today = Time.now.beginning_of_day
    if self.departure_date
      errors.add(:departure_date, "La date de départ ne doit pas être antérieure à aujourd'hui") if self.departure_date < (today - 1.day)
    else 
      errors.add(:departure_date, "La date de départ ne doit pas être vide")
    end
  end
end
