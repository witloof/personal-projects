module Admin::CovidTestsHelper
  def traveled_bies_options
    Travel.traveled_bies.keys.collect{|i| [I18n.t("travel_bies.#{i}"), i]}
  end
end
