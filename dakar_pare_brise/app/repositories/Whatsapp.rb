require "whatsapp"

Whats.configure do |config|
  config.base_path = "http://dakarpare-brise.com"
  config.user = "admin"
  config.password = "secret password"
end

whats = Whats::Api.new

def send_message
	message = whats.send_message("221776239063", "Hello world.")
	p "#{message.inspect}"
end