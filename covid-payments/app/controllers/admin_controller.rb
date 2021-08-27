class AdminController < ActionController::Base
  before_action :authenticate_user!
  before_action :set_user_policy, :if => :user_signed_in?
  before_action :can_access_admin?

  layout "admin_application"

  def set_user_policy
    @user_policy = UserPolicy.new(current_user.role)
  end

  def can_access_admin?
    redirect_to root_path unless @user_policy.can_access_admin?
  end

  def current_commercial
    current_commercial = current_user.commercial if current_user.commercial?
  end

  def current_counter_agent
    current_user.counter_agent
  end

  helper_method :current_commercial
  helper_method :current_counter_agent
end
