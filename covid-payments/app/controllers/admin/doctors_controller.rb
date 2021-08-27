class Admin::DoctorsController < AdminController
  before_action :set_admin_doctor, only: [:show, :edit, :update, :destroy]

  # GET /admin/doctors
  # GET /admin/doctors.json
  def index
    @admin_doctors = Doctor.order(created_at: :desc).page params[:page]
  end

  # GET /admin/doctors/1
  # GET /admin/doctors/1.json
  def show
  end

  # GET /admin/doctors/new
  def new
    @admin_doctor = Doctor.new
    @admin_doctor.build_user
  end

  # GET /admin/doctors/1/edit
  def edit
  end

  # POST /admin/doctors
  # POST /admin/doctors.json
  def create
    @admin_doctor = Doctor.new(admin_doctor_params)
    @admin_doctor.user.set_user_password
    @admin_doctor.user.set_role("doctor")
    respond_to do |format|
      if @admin_doctor.save
        format.html { redirect_to [:admin, @admin_doctor], notice: "Docteur cree avec succes." }
        format.json { render :show, status: :created, location: @admin_doctor }
      else
        format.html { render :new }
        format.json { render json: @admin_doctor.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/doctors/1
  # PATCH/PUT /admin/doctors/1.json
  def update
    respond_to do |format|
      if @admin_doctor.update(admin_doctor_params)
        format.html { redirect_to @admin_doctor, notice: "Enregistré avec succés." }
        format.json { render :show, status: :ok, location: @admin_doctor }
      else
        format.html { render :edit }
        format.json { render json: @admin_doctor.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/doctors/1
  # DELETE /admin/doctors/1.json
  def destroy
    @admin_doctor.destroy
    respond_to do |format|
      format.html { redirect_to admin_doctors_url, notice: "Doctor was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_admin_doctor
    @admin_doctor = Doctor.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def admin_doctor_params
    params.require(:doctor).permit(:number, :centre, :signature,
                                   user_attributes: [:email, :first_name, :last_name, :phone_number, :avatar, :airport_id])
  end
end
