# Preview all emails at http://localhost:3000/rails/mailers/new_rendez_vous_mailer
class NewRendezVousMailerPreview < ActionMailer::Preview
  def rendez_vous_mail_preview
    NewRendezVousMailer.notifier_rendez_vous(Appointment.first)
  end
end
