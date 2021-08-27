class NotifiyPaymentMailJob < ApplicationJob
  queue_as :default

  def perform(covid_test)
    UserMailer.with(
      payment_code: covid_test.payment_code,
      flight: covid_test.travel.flight,
      created_at: covid_test.created_at,
      traveler: covid_test.travel.traveler
    ).confirm_payment_email.deliver_now unless covid_test.travel.traveler.email.blank?
  end
end
