require 'csv'
class CovidTest < ApplicationRecord
  belongs_to :travel
  belongs_to :doctor, optional: true
  belongs_to :payment_type
  belongs_to :counter_agent, optional: true
  validates :payment_type_id, presence: true
  after_create :set_payment_code, :generate_payment_qr_code, :notify_payment, :notify_sms

  scope :unpaids, -> { where(payed: false, tested_at: nil) }
  scope :paids, -> { where(payed: true).order(tested_at: :desc) }
  scope :testeds, -> { where.not(tested_at: nil) }
  default_scope { order(created_at: :desc) }

  enum result: [:positive, :negative]

  accepts_nested_attributes_for :travel, :allow_destroy => true
  has_one_attached :payment_qr_code
  has_one_attached :barcode

  def set_payment_code
    loop do
      self.payment_code = SecureRandom.hex(5)
      break unless self.class.exists?(:payment_code => payment_code)
    end
    self.save
  end

  def notify_payment
    NotifiyPaymentMailJob.perform_now(self)
  end

  def self.daily_waiting_payments_count
    where(payed: false).size
  end

  def self.daily_payed_count
    where(payed: true).size
  end

  def self.daily_payed_amount_count
    where(payed: true).sum(:amount)
  end

  def self.daily_total_payed_amount
    all.sum(:amount)
  end

  def notify_sms
    receiver = self.travel.traveler.phone_number
    unless receiver.blank?
      body = "Test COVID 19 CONGO: Inscription enregistrée avec succés ce #{self.created_at.strftime("%d-%m-%Y %H:%M:%S")} : votre code de paiement est : #{self.payment_code}"
      NotifiySmsJob.perform_now(receiver, body)
    end
  end

  def generate_payment_qr_code
    decoded_data = QrCodeGenerator.payment_state(self)
    self.payment_qr_code.attach(io: StringIO.new(decoded_data), filename: "qr_#{self.id}_code.png", content_type: "image/png")
  end

  def generate_barcode
    decoded_data = BarcodeGenerator.generate_image(self.id)
    self.barcode.attach(io: StringIO.new(decoded_data), filename: "barcode_#{self.id}.png", content_type: "image/png")
  end

  def payed_sms
    if self.payed
      receiver = self.travel.traveler.phone_number
      if(receiver)
        body = "Test COVID 19 CONGO: Paiement de #{self.travel.traveler.full_name}. " +
        "Numéro #{self.payment_code} passager du vol #{self.travel.flight} a été effectué avec succés ce #{self.created_at.strftime("%d-%m-%Y %H:%M:%S")}"
        NotifiySmsJob.perform_now(receiver, body)
      end
    end
  end

  def self.payed_today
    self.paids.where(created_at: Time.zone.now.beginning_of_day..Time.zone.now.end_of_day)
  end

  def send_report_to_negative
    NegativeReportMailJob.perform_now(self)

    receiver = self.travel.traveler.phone_number
    body = "Test COVID 19 CONGO: M/Mme #{self.travel.traveler.full_name}. " +
      "le resultat de votre test effectué le#{self.created_at.strftime("%d-%m-%Y %H:%M:%S")} est négatif"
    NotifiySmsJob.perform_now(receiver, body)
  end

  def voyageur
    self.travel.traveler.full_name
  end

  def date_creation
    I18n.l(self.created_at)
  end

  def paye
    if self.payed
      'oui'
    else
      'non'
    end
  end
  

  def self.to_csv(data)
    attributes = %w{voyageur payment_code date_creation amount paye }

    CSV.generate(headers: true) do |csv|
      csv << attributes

      data.each do |test_covid|
        csv << attributes.map{ |attr| test_covid.send(attr) }
      end
    end
  end

end
