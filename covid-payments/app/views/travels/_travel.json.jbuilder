json.extract! travel, :id, :traveler_id, :from_country_iso_code, :destination_country_iso_code, :departure_date, :arrival_date, :flight, :company, :created_at, :updated_at
json.url travel_url(travel, format: :json)
