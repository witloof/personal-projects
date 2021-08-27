require "twilio-ruby"

class TwilioSms
  def initialize
    account_sid = Rails.configuration.twilio_account_sid
    auth_token = Rails.configuration.twilio_auth_token
    @client_api = Twilio::REST::Client.new account_sid, auth_token
  end

  def send_message(receiver, body)
    if Rails.env == "production"
    @client_api.messages.create(
      from: "+12314402729",
      to: receiver,
      body: body,
    )
    else
      ap "Sending to #{receiver} message #{body}"
      Rails.logger.info "Sending to #{receiver} message #{body}"
    end
  end
end
