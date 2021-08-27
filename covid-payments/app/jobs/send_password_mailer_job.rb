class SendPasswordMailerJob < ApplicationJob
  queue_as :default

  def perform(user)
    UserMailer.with(email: user.email, full_name: user.full_name, password: user.password, role: user.role)
    .password_mail.deliver_now unless user.email.blank?
  end
end
