class NewRendezVousMailer < ApplicationMailer
  default from: "dakarparebrise@gmail.com"

  def notifier_rendez_vous(appointment)
    @appointment = appointment
    mail(to: 'dakarparebrise@gmail.com', subject: 'Demande de rendez-vous?')
  end
end
