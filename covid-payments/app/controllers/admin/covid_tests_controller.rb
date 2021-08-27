class Admin::CovidTestsController < AdminController
  before_action :set_admin_covid_test, only: [:show, :edit, :update, 
    :destroy, :bill, :validate_payment, :change_state, :test_report, :print_barcode, :proceed_to_test]
  before_action :set_payment_types, only: [:new, :edit, :create]
  before_action :set_country, only: [:new]

  # GET /admin/covid_tests
  # GET /admin/covid_tests.json
  def index
    @admin_covid_tests = CovidTest.unpaids
 
    unless params[:payment_code].blank?
      @admin_covid_tests = @admin_covid_tests.where(payment_code: search_params[:payment_code])
    end

    @admin_covid_tests = @admin_covid_tests.order(created_at: :desc).page params[:page] 
  end

  def admin_covid_tests
    @request_url = request.url.split('?').join('.csv?')
    @admin_covid_tests = CovidTest.all

    unless params[:date].blank?
      date = params[:date].to_s.to_date
      @admin_covid_tests = @admin_covid_tests.where('Date(created_at) = ? ', date)
    end
    
    unless params[:payment_type].blank?
      @admin_covid_tests = @admin_covid_tests.where(payment_type_id: params[:payment_type])
    end

    unless params[:payment_code].blank?
      @admin_covid_tests = @admin_covid_tests.where(payment_code: params[:payment_code])
    end

    respond_to do |format|
      format.html { @admin_covid_tests = @admin_covid_tests.order(created_at: :desc).page params[:page]}
      format.csv { send_data CovidTest.to_csv(@admin_covid_tests), filename: "paiements-#{Date.today}.csv" }
    end
  end


  def paids
    if params[:payment_code].blank?
      @admin_covid_tests = CovidTest.paids
    else
      @admin_covid_tests = CovidTest.paids.where(payment_code: params[:payment_code])
    end
  end

  def change_state
    respond_to do |format|
      if @admin_covid_test.update(result: params[:result])
        
        @admin_covid_test.send_report_to_negative if params[:result] == "negative"
        
        format.html { redirect_to tested_admin_covid_tests_path, notice: "Test Covid enregistré avec succés." }
        format.json { render :show, status: :ok, location: @admin_covid_test }
      else
        format.html { redirect_to tested_admin_covid_tests_path }
        format.json { render json: @admin_covid_test.errors, status: :unprocessable_entity }
      end
    end
  end

  def tested
    if params[:payment_code].blank?
      @admin_covid_tests = CovidTest.testeds
    else
      @admin_covid_tests = CovidTest.testeds.where(payment_code: params[:payment_code])
    end
  end

  def test_report
    locale = params[:lang] || 'fr'

    respond_to do |format|
      format.html
      format.pdf do
          render pdf: "Invoice No. #{@admin_covid_test.id}",
          page_size: 'A4',
          template: "admin/covid_tests/report_#{locale}.html.erb",
          layout: "pdf.html",
          lowquality: true,
          zoom: 1,
          page_width: 10,
          dpi: 75
      end
    end
  end

  # GET /admin/covid_tests/1
  # GET /admin/covid_tests/1.json
  def show;end

  # GET /admin/covid_tests/new
  def new
    @admin_covid_test = CovidTest.new
    @admin_covid_test.build_travel
    @admin_covid_test.travel.destination_country_iso_code = current_user.airport&.country_iso_code
    @admin_covid_test.payment_type_id = @payment_types.first&.id
    @traveler = Traveler.where(id: params[:traveler_id]).first
    @admin_covid_test.travel.traveler_id = @traveler&.id
    @admin_covid_test.amount = @country.test_price
    @admin_covid_test.currency = @country.currency
  end

  # GET /admin/covid_tests/1/edit
  def edit
  end

  # POST /admin/covid_tests
  # POST /admin/covid_tests.json
  def create
    @admin_covid_test = CovidTest.new(admin_covid_test_params)
    @admin_covid_test.commercial_id = current_commercial.id
    @admin_covid_test.travel.commercial_id = current_commercial.id
    @admin_covid_test.payment_type_id = @payment_types.first&.id
    @admin_covid_test.payment_type = PaymentType.default_payment

    respond_to do |format|
      if @admin_covid_test.save
        format.html { redirect_to admin_travelers_path, notice: "Test crée avec succés." }
        format.json { render :show, status: :created, location: @admin_covid_test }
      else
        format.html { render :new }
        format.json { render json: @admin_covid_test.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/covid_tests/1
  # PATCH/PUT /admin/covid_tests/1.json
  def update
    respond_to do |format|
      if @admin_covid_test.update(admin_covid_test_params)
        format.html { redirect_to admin_covid_tests_admin_covid_tests_path, notice: "Test modifié avec succés." }
        format.json { render :show, status: :ok, location: @admin_covid_test }
      else
        format.html { render :edit }
        format.json { render json: @admin_covid_test.errors, status: :unprocessable_entity }
      end
    end
    
  end

  def proceed_to_test
    respond_to do |format|
      @admin_covid_test.tested_at = Time.now
      @admin_covid_test.doctor_id = current_user.doctor&.id
      @admin_covid_test.type_prelevement =  params[:type_prelevement]
      @admin_covid_test.expire_at = Time.now + 3.days
      @admin_covid_test.test_place = params[:test_place]
      @admin_covid_test.ct = params[:ct]
      if @admin_covid_test.save
        format.html { redirect_to admin_covid_test_url(@admin_covid_test), notice: "Test effectué avec succés" }
        format.json { render :show, status: :ok, location: @admin_covid_test }
      else
        format.html { render :edit }
        format.json { render json: @admin_covid_test.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/covid_tests/1
  # DELETE /admin/covid_tests/1.json
  def destroy
    @admin_covid_test.destroy
    respond_to do |format|
      format.html { redirect_to admin_covid_tests_url, notice: "Covid test was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def bill
    respond_to do |format|
      format.html
      format.pdf do
          render pdf: "Invoice No. #{@admin_covid_test.id}",
          page_size: 'A4',
          template: "admin/covid_tests/bill.html.erb",
          layout: "pdf.html",
          lowquality: true,
          zoom: 1,
          page_width: 10,
          dpi: 75
      end
    end
  end

  def validate_payment
    @admin_covid_test.update(payed: true, counter_agent_id: current_counter_agent.id)
    @admin_covid_test.payed_sms
    @admin_covid_test.generate_payment_qr_code
    @admin_covid_test.generate_barcode
    redirect_to admin_covid_tests_url, notice: "Paiement validé avec succés!." 
  end

  def print_barcode
    respond_to do |format|
      format.html
      format.pdf do
          render pdf: "Invoice No. #{@admin_covid_test.id}",
          page_size: 'A4',
          template: "admin/covid_tests/barcode.html.erb",
          layout: "pdf.html",
          lowquality: true,
          zoom: 1,
          page_width: 10,
          dpi: 75
      end
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_admin_covid_test
    @admin_covid_test = CovidTest.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def admin_covid_test_params
    params.require(:covid_test).permit(
      :payment_type_id,
      travel_attributes: [
      :from_country_iso_code, :destination_country_iso_code,
      :departure_date, :flight, :company, :traveler_id, :amount,
      :traveled_by, :currency, :arrival_date]
    )
  end

  def covid_test_params
    params.require(:covid_test).permit( :test_version, :lot_number )
  end

  def set_country
    @country = Country.find_by(iso_code: "CG")
  end

  def set_payment_types
    @payment_types = [PaymentType.default_payment]
  end
end
