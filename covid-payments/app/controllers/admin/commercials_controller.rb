class Admin::CommercialsController < AdminController
  before_action :set_admin_commercial, only: [:show, :edit, :update, :destroy]

  # GET /admin/commercials
  # GET /admin/commercials.json
  def index
    @admin_commercials = Commercial.order(created_at: :desc).page params[:page]
  end

  # GET /admin/commercials/1
  # GET /admin/commercials/1.json
  def show
  end

  # GET /admin/commercials/new
  def new
    @admin_commercial = Commercial.new
    @admin_commercial.build_user
  end

  # GET /admin/commercials/1/edit
  def edit
  end

  # POST /admin/commercials
  # POST /admin/commercials.json
  def create
    @admin_commercial = Commercial.new(admin_commercial_params)
    @admin_commercial.user.set_user_password
    @admin_commercial.user.set_role("commercial")

    respond_to do |format|
      if @admin_commercial.save
        format.html { redirect_to [:admin, @admin_commercial], notice: "Commercial was successfully created." }
        format.json { render :show, status: :created, location: @admin_commercial }
      else
        format.html { render :new }
        format.json { render json: @admin_commercial.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/commercials/1
  # PATCH/PUT /admin/commercials/1.json
  def update
    respond_to do |format|
      if @admin_commercial.update(number: admin_commercial_params[:number]) && @admin_commercial.user.update_without_password(admin_commercial_params[:user_attributes])
        format.html { redirect_to [:admin, @admin_commercial], notice: "Commercial was successfully updated." }
        format.json { render :show, status: :ok, location: @admin_commercial }
      else
        format.html { render :edit }
        format.json { render json: @admin_commercial.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/commercials/1
  # DELETE /admin/commercials/1.json
  def destroy
    @admin_commercial.destroy
    respond_to do |format|
      format.html { redirect_to admin_commercials_url, notice: "Commercial was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_admin_commercial
    @admin_commercial = Commercial.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def admin_commercial_params
    params.require(:commercial).permit(:number,
                                       user_attributes: [:email, :first_name, :last_name, :phone_number, :airport_id, :avatar])
  end
end
