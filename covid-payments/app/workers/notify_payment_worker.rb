class NotifyPaymentWorker
  include Sidekiq::Worker
  sidekiq_options queue: :medium

  def perform(user, payment_code)
    UserMailer.with(user: user, payment_code: payment_code).cofirm_payment_email.deliver_now
  end
end
