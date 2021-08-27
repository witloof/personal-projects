module ApplicationHelper

	def formatted_price(price)
		number_to_currency(price, unit: "cfa", separator: "", delimiter: " ", format: "%n %u", locale: :fr,  precision: 0)
	end
end
