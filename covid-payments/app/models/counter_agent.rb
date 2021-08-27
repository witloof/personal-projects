class CounterAgent < ApplicationRecord
  belongs_to :user
  accepts_nested_attributes_for :user, :allow_destroy => true
  belongs_to :country, :primary_key => "iso_code", :foreign_key => "country_iso_code", :class_name => "Country"

  def payment_by_day
    today = Time.now.strftime("%d/%m/%Y")
    CovidTest.paids.where(counter_agent: self.id,
                          created_at: Time.zone.now.beginning_of_day..Time.zone.now.end_of_day)
  end
end
