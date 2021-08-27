require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module CovidPayments
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0
    config.i18n.default_locale = :fr
    config.i18n.available_locales = [:fr, :en]
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
    config.payment_api_request_timeout = 300
    config.payment_api_request_timeout = 300
    config.payment_service_url = "https://proxy.bgpay.digital/api/payment/request"
    config.app_key = "5f89c8767bea8"
    config.public_key = "5f89c8767bea5"
    config.secrete_key = "5f89c8767bea3"
    config.twilio_account_sid = "AC01b87b75342719b555c2c6562d926b79"
    config.twilio_auth_token = "89d273ef975e65b670c0c9b8bb741e99"


    Sentry.init do |config|
      config.dsn = 'https://ece5ba9e44224882bf9bda4f9e9a30d9@o547738.ingest.sentry.io/5670373'
      config.breadcrumbs_logger = [:active_support_logger]
    
      # Set tracesSampleRate to 1.0 to capture 100%
      # of transactions for performance monitoring.
      # We recommend adjusting this value in production
      config.traces_sample_rate = 0.5
      # or
      config.traces_sampler = lambda do |context|
        true
      end
    end
    
  end
end
