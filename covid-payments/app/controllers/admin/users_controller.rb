class Admin::UsersController < AdminController
   before_action :set_user

  def edit;
    
  end

  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to admin_edit_user_path, notice: "Informations enregistrées avec succés" }
        format.json { render :show, status: :ok, location: @admin_traveler }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def change_password
    @user = current_user
    if @user.update_with_password(password_params)
      bypass_sign_in(@user)
      redirect_to root_path
    else
      render "edit"
    end
  end

  private

  def set_user
    @user = User.find(current_user.id)
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :phone_number)
  end

  def password_params
    params.require(:user).permit(:password, :password_confirmation, :current_password)
  end

end
  