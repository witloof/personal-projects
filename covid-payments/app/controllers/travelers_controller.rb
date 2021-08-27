class TravelersController < ApplicationController
  before_action :set_traveler, only: [:show, :edit, :update, :destroy]
  # GET /travelers
  # GET /travelers.json
  def index
    redirect_to new_traveler_path
  end

  # GET /travelers/1
  # GET /travelers/1.json
  def show
  end

  # GET /travelers/new
  def new
    redirect_to new_covid_test_path unless current_traveler.nil?
    @traveler = Traveler.new
  end

  # GET /travelers/1/edit
  def edit
  end

  # POST /travelers
  # POST /travelers.json
  def create
    traveler_params[:phone_number].delete!(" ") unless traveler_params[:phone_number].nil?
    @traveler = Traveler.find_by(passport_number: traveler_params[:passport_number]) || Traveler.new(traveler_params)
    
    if @traveler.persisted?
      session[:traveler_id] = @traveler.id
      return new_covid_test_path
    end
     

    respond_to do |format|
      if @traveler.save
        session[:traveler_id] = @traveler.id
        format.html { redirect_to new_covid_test_path, notice: "Voyageur créé avec succés." }
        format.json { render :show, status: :created, location: @traveler }
      else
        format.html { render :new }
        format.json { render json: @traveler.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /travelers/1
  # PATCH/PUT /travelers/1.json
  def update
    respond_to do |format|
      if @traveler.update(traveler_params)
        format.html { redirect_to @traveler, notice: "Les informations du voyageur ont été enregistré avec succés." }
        format.json { render :show, status: :ok, location: @traveler }
      else
        format.html { render :edit }
        format.json { render json: @traveler.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /travelers/1
  # DELETE /travelers/1.json
  def destroy
    @traveler.destroy
    respond_to do |format|
      format.html { redirect_to travelers_url, notice: "Traveler was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_traveler
    @traveler = Traveler.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def traveler_params
    params.require(:traveler).permit(:passport_number, :email, :residence_country_iso_code, :birthday, :sexe,
      :first_name, :last_name, :phone_number, :phone_country_code)
  end
end
