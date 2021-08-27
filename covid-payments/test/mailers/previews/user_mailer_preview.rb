# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def password_mail
    user = User.first
    UserMailer.with(email: user.email, full_name: user.full_name, password: "passer", role: user.role).password_mail
  end
end
