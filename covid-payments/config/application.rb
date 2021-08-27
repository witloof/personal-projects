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
    config.payment_service_url = ""
    config.app_key = ""
    config.public_key = ""
    config.secrete_key = ""
    config.twilio_account_sid = ""
    config.twilio_auth_token = ""


    Sentry.init do |config|
      config.dsn = ''
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
