class ApplicationController < ActionController::Base
  def verify_has_admin_role!
    unless current_user.role = "admin"
      redirect_to root_path
    end
  end

  def current_traveler
    Traveler.where(id:session[:traveler_id]).first
  end

  def after_sign_in_path_for(resource)
    unless current_user.is_traveler?
      return admin_dashboard_path
    end
    root_path
  end

  helper_method :current_traveler
end
