module ApplicationHelper
  def countries_options
    Country.all.collect { |s| [s.name, s.iso_code] }
  end

  def all_payment_types
    PaymentType.all
  end

  def companies_options
    companies = ["AIR FRANCE", "ROYAL AIR MAROC", "ETHIOPIAN AIRLINES", "XIAMEN AIRLINES", "KENYA AIRWAYS",
                 "ASKY AIRLINES", "RWANDAIR", "HAPAGFLY", "MAURITANIA AIRLINES INTERNATIONAL", "AFRIJET", "BRUSSELS AIRLINES",
                 "AIR BURKINA", "MIDDLE EAST AIRLINES-AIR LIBAN", "WEST WING AFRICA CARGOLUX", "AIR ALGERIE", "EMIRATES AIRLINES",
                 "SOUTH AFRICAN AIRWAYS", "TUNISAIR", "CAMAIR-CO", "TURKISH AIRLINES", "EGYPTAIR", "AIR COTE D'IVOIRE", "CORSAIR",
                 "CEIBA INTERNATIONAL", "ARIK AIR", "Trans Air Angola TAAG", "Air Sénégal", "Trans Air Congo", "Vol privé"]
    companies.sort { |c1, c2| c1 <=> c2 }
      .collect { |c| [c.capitalize, c.capitalize] }
  end

  def airports_options
    Airport.all.collect { |s| [s.name, s.id] }
  end

  def options_test_result_select
    CovidTest.results.collect { |k, v| [I18n.t(".test_results.#{k}"), k] }
  end

  def wicked_blob_path(active_storage_attachment)
    service = active_storage_attachment.service

    case service
    when ActiveStorage::Service::DiskService
      service.path_for(active_storage_attachment.blob.key)
    when ActiveStorage::Service::S3Service
      active_storage_attachment.service_url
    else
      raise "Unsupported ActiveStorage service for WickedPDF integration: #{service.name}"
    end
  end

  def show_errors(object, field_name)
    if object.errors.any?
      if !object.errors.messages[field_name].blank?
        object.errors.messages[field_name].join(", ")
      end
    end
  end
end
