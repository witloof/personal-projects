class Admin::TravelersController < AdminController
  before_action :set_admin_traveler, only: [:show, :edit, :update, :destroy]

  # GET /admin/travelers
  # GET /admin/travelers.json
  def index
    if current_commercial
      @admin_travelers = current_commercial.travelers
    else 
      @admin_travelers = Traveler.all
    end

    unless params[:passport_number].blank?
      @admin_travelers = @admin_travelers.where(passport_number: params[:passport_number])
    end

    unless params[:date].blank?
      date = params[:date].to_s.to_date
      @admin_travelers = @admin_travelers.where('Date(created_at) = ? ', date)
    end

    unless params[:commercial].blank?
      @admin_travelers = @admin_travelers.where(commercial_id: params[:commercial])
    end

    respond_to do |format|
      format.html { @admin_travelers = @admin_travelers.page params[:page] }
      format.csv { send_data Traveler.to_csv(@admin_travelers), filename: "voyageurs-#{Date.today}.csv" }
    end
  end

  # GET /admin/travelers/1
  # GET /admin/travelers/1.json
  def show
  end

  # GET /admin/travelers/new
  def new
    @admin_traveler = Traveler.new
  end

  # GET /admin/travelers/1/edit
  def edit
  end

  # POST /admin/travelers
  # POST /admin/travelers.json
  def create
    @admin_traveler = Traveler.new(admin_traveler_params)
    @admin_traveler.commercial_id = current_commercial.id

    respond_to do |format|
      if @admin_traveler.save
        format.html { redirect_to new_admin_covid_test_path(traveler_id: @admin_traveler.id), notice: "Voyageur enregistré avec succés." }
        format.json { render :show, status: :created, location: @admin_traveler }
      else
        format.html { render :new }
        format.json { render json: @admin_traveler.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/travelers/1
  # PATCH/PUT /admin/travelers/1.json
  def update
    respond_to do |format|
      if @admin_traveler.update(admin_traveler_params)
        format.html { redirect_to [:admin, @admin_traveler], notice: "Les informations du voyageur ont été enregistré avec succés" }
        format.json { render :show, status: :ok, location: @admin_traveler }
      else
        format.html { render :edit }
        format.json { render json: @admin_traveler.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/travelers/1
  # DELETE /admin/travelers/1.json
  def destroy
    @admin_traveler.destroy
    respond_to do |format|
      format.html { redirect_to admin_travelers_url, notice: "Traveler was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_admin_traveler
    @admin_traveler = Traveler.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def admin_traveler_params
    params.require(:traveler).permit(:residence_country_iso_code, :date_expiration, :date_emission,
      :birthday, :sexe, :first_name, :last_name, :email, :phone_number, :phone_country_code,
      :identification_type, :identification_number)
  end
end
