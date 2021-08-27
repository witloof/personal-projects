class UserMailer < ApplicationMailer
  default from: "depot@bgdigit-all.com"

  def confirm_payment_email
    @traveler = params[:traveler]
    @payment_code = params[:payment_code]
    @flight = params[:flight]
    @created_at = params[:created_at]
    mail(to: @traveler.email, subject: "INSCRIPTION PAIEMENT DEPISTAGE COVID 19")
  end

  def payment_bill
    @user = params[:user]
    @covid_test = params[:covid_test]
    mail(to: @user.email, subject: "BON DE PRISE EN CHARGE DEPISTAGE COVID 19")
  end

  def password_mail
    @email = params[:email]
    @password = params[:password]
    @full_name = params[:full_name]
    @role = params[:role]
    mail(to: @email, subject: "COMPTE PAIEMENT DEPISTAGE COVID 19")
  end

  def send_report_to_negative
    @covid_test = params[:covid_test]
   
    attachments["rapport_test_#{@covid_test.id}.pdf"] = WickedPdf.new.pdf_from_string(
      render_to_string(pdf: 'covid_test', template: 'admin/covid_tests/attachment_report.html.erb', layout: 'pdf.html', locals: { admin_covid_test: @covid_test } )
    )
    mail(to: @covid_test.travel.traveler.email, subject: "RESULTAT TEST COVID 19 NEGATIF")
  end
end
