class Appointment < ApplicationRecord
  belongs_to :vehicule
  belongs_to :user
  has_many :images

  #Nedted attributes
  accepts_nested_attributes_for :vehicule
  accepts_nested_attributes_for :user

  #Enum fields
  enum dommage: ["Pare-brise", "Vitre latérale gauche", "Vitre latérale droite", "Lunette arriére"]
  after_create :send_sms_notif
  #After save methods
  #after_save :send_mail_notification

  # def send_mail_notification
  #   print "sendind mail"
  #   NewRendezVousMailer.notifier_rendez_vous(self).deliver
  # end

  def send_sms_notif
    RendezVousSmsNotifJob.perform_now(self)
  end
end
