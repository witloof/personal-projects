class NotifiySmsJob < ApplicationJob
  queue_as :default

  def perform(receiver, body)
    twilio_sms = TwilioSms.new
    twilio_sms.send_message(receiver, body)
  end
end
