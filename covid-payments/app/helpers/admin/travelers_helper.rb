module Admin::TravelersHelper
  def identifications_options
    Traveler.identification_types.keys.collect { |i| [I18n.t("identification_types.#{i}"), i] }
  end
end
