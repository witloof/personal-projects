class Admin::DashboardController < AdminController
  def index
    @daily_travelers = Traveler.daily_travelers_count
    @daily_waiting_payments = CovidTest.daily_waiting_payments_count
    @daily_payed = CovidTest.daily_payed_count
    @daily_payed_amount = CovidTest.daily_payed_amount_count
    @daily_total_payed_amount = CovidTest.daily_total_payed_amount

    case current_user.role
    when 'admin'
      @enrolled_today = Traveler.enrolled_today.includes(:commercial)
      @payment_types =  PaymentType.all
    else
    end
  end
end
