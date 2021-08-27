class Admin::AirportsController < AdminController
  before_action :set_admin_airport, only: [:show, :edit, :update, :destroy]

  # GET /admin/airports
  # GET /admin/airports.json
  def index
    @admin_airports = Airport.all
  end

  # GET /admin/airports/1
  # GET /admin/airports/1.json
  def show
  end

  # GET /admin/airports/new
  def new
    @admin_airport = Airport.new
  end

  # GET /admin/airports/1/edit
  def edit
  end

  # POST /admin/airports
  # POST /admin/airports.json
  def create
    @admin_airport = Airport.new(admin_airport_params)

    respond_to do |format|
      if @admin_airport.save
        format.html { redirect_to [:admin, @admin_airport], notice: "Airport was successfully created." }
        format.json { render :show, status: :created, location: @admin_airport }
      else
        format.html { render :new }
        format.json { render json: @admin_airport.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/airports/1
  # PATCH/PUT /admin/airports/1.json
  def update
    respond_to do |format|
      if @admin_airport.update(admin_airport_params)
        format.html { redirect_to [:admin, @admin_airport], notice: "Airport was successfully updated." }
        format.json { render :show, status: :ok, location: @admin_airport }
      else
        format.html { render :edit }
        format.json { render json: @admin_airport.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/airports/1
  # DELETE /admin/airports/1.json
  def destroy
    @admin_airport.destroy
    respond_to do |format|
      format.html { redirect_to admin_airports_url, notice: "Airport was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_admin_airport
    @admin_airport = Airport.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def admin_airport_params
    params.require(:airport).permit(:country_iso_code, :name)
  end
end
