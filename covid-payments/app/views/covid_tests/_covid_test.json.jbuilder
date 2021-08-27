json.extract! covid_test, :id, :travel_id, :payment_type_id, :payed, :result, :amount, :currency, :counter_agent_id, :result_date, :created_at, :updated_at
json.url covid_test_url(covid_test, format: :json)
