class SendSms
  def initialize
    account_sid = 'ACfedcd7240b6980a23cd600f582bf4a2e'
    auth_token = '6f7e5a9fb2c6dd476414cf230acbeceb'
    @client = Twilio::REST::Client.new account_sid, auth_token
  end

  def call
    @client.messages.create(
      from: '+221776239063',
      to: '+221763615148',
      body: 'Hey there!'
    )
  end
end