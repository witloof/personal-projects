require "rest-client"

class OnlinePayment
  def initialize(covid_test, ipn_url, success_url, cancel_url, failed_url)
    @params = {
      app_key: Rails.configuration.app_key,
      public_key: Rails.configuration.public_key,
      secrete_key: Rails.configuration.secrete_key,
      ipn_url: ipn_url,
      success_url: success_url,
      cancel_url: cancel_url,
      failed_url: failed_url,
    }
    @covid_test = covid_test
  end

  def attempt_payment
    service_url = Rails.configuration.payment_service_url
    begin
      payload = {
        amount: @covid_test.amount,
        commande_name: "Paiement COVID 19 TEST #{Time.now.strftime("%d/%m/%Y %H:%m:%s")}",
        ref_commande: ["test-covid", @covid_test.payment_code].join,
        currency: @covid_test.currency,
        data_transactions: { transaction_id: @covid_test.id, client_name: @covid_test.travel.traveler.full_name }.to_json,
        mode: "prod",
      }
      @params.merge!(payload)
      response = RestClient.post(service_url,
                                 @params.to_json,
                                 content_type: :json,
                                 accept: :json,
                                 timeout: 300,
                                 open_timeout: 300)
      return JSON.parse(response)
    rescue => e
      Rails.logger.error("Failled to call #{Rails.configuration.payment_service_url}; got #{e}")
      return OpenStruct.new(
               data: {
                 code: 503,
                 description: ["SERVICE UNAVAILABLE"],
               }.to_json,
             )
    end
  end
end
