require "rqrcode"

class QrCodeGenerator
  def self.payment_state(covid_test)
    if covid_test.payed
      state = "Payé"
    else
      state = "En attente de paiement"
    end
    qr_code_content = "code:#{covid_test.payment_code}, passager: #{covid_test.travel.traveler.full_name}, sexe: #{covid_test.travel.traveler.sexe}" 
    qr_code_content += "type prelevement #{covid_test.type_prelevement} date de prelevement: #{covid_test.created_at.strftime("%d/%m/%Y")}, date expiration: #{covid_test.expire_at&.strftime("%d/%m/%Y")}"
    qr_code_content += " resultat: #{covid_test.result}, lieu: DEL Biotechnologies, statut paiement: #{state}"
    qrcode = RQRCode::QRCode.new(qr_code_content)
    png = qrcode.as_png(
      bit_depth: 1,
      border_modules: 4,
      color_mode: ChunkyPNG::COLOR_GRAYSCALE,
      color: "black",
      file: nil,
      fill: "white",
      module_px_size: 6,
      resize_exactly_to: false,
      resize_gte_to: false,
      size: 120,
    )
    png.to_blob
  end
end
