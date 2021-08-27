require "rest-client"

class RestClient
  def initialize()
    @default_params = {
      app_key: "5f89c8767bea8",
      public_key: "5f89c8767bea7",
      secrete_key: "5f89c8767bea6",
    }
    @amount = amount
  end

  def init_transaction
    url = "https://proxy.bgpay.digital"
    params = {
      amount: 
    }
    RestClient.post(
      "#{url}/api/payment/request",

    )
  end
end
"app_key": "string",
  "public_key": "string",
  "secrete_key": "string",
  "amount": 0,
  "commande_name": "string",
  "ref_commande": "string",
  "currency": "string",
  "data_transactions": {},
  "mode": "string",
  "ipn_url": "string",
  "success_url": "string",
  "cancel_url": "string",
  "failed_url": "string"