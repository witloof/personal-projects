class NegativeReportMailJob < ApplicationJob
  queue_as :default

  def perform(covid_test)
    UserMailer.with(covid_test: covid_test).send_report_to_negative.deliver_now if covid_test.travel.traveler.email
  end
end
