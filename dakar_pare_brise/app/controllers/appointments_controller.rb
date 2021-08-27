class AppointmentsController < ApplicationController

  def new
    @appointment = Appointment.new
    @appointment.build_user
    @appointment.build_vehicule
  end

  def edit

  end

  def create
    @appointment = Appointment.new
    user_email = appointment_params[:user_attributes][:email]
    user = User.find_by(email:user_email)
    if(user)
      @appointment.user = user
    else
      @appointment.build_user(appointment_params[:user_attributes])
    end
    @appointment.build_vehicule(appointment_params[:vehicule_attributes])
    @appointment.dommage = appointment_params[:dommage]
    @appointment.lieu = appointment_params[:lieu]
    @appointment.adresse = appointment_params[:adresse]

    respond_to do |format|
      if @appointment.save
        format.html { redirect_to root_path, notice: 'Merci votre demande est bien enregistré nous allons vous contacter.' }
        format.json { render :show, status: :created, location: @appointment }
      else
        format.html { render :new }
        format.json { render json: @appointment.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def appointment_params
    params.require(:appointment).permit(:dommage, :lieu, :adresse, vehicule_attributes:[:marque_id, :model, :annee, :matricule, :type_vehicule],
    user_attributes:[:prenom, :nom, :telephone, :email])
  end
end
