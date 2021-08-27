module CovidTestsHelper
  def payment_types_options
    PaymentType.all.collect { |p| [p.name, p.id] }
  end
end
