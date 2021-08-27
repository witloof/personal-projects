class CovidTestsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:validate_online_payment]
  before_action :set_covid_test, only: [:show, :edit, :update, :destroy]
  before_action :set_country, only: [:new, :create, :edit]
  before_action :set_travels, only: [:new, :create]
  before_action :set_payment_types, only: [:new, :create, :edit]
  before_action :set_default_travel, only: [:new, :create]
  before_action :selected_payment_type, only: [:create, :update]
  # GET /covid_tests
  # GET /covid_tests.json
  def index
    @covid_tests = current_user.covid_tests
  end

  # GET /covid_tests/1
  # GET /covid_tests/1.json
  def show
    @payment_status = params[:status]
  end

  # GET /covid_tests/new
  def new
    @covid_test = CovidTest.new
    @covid_test.payment_type_id = @payment_types.first.id
    @covid_test.build_travel(traveler_id: current_traveler.id)
  end

  # GET /covid_tests/1/edit
  def edit
    if (@covid_test.payed)
      redirect_to @covid_test
    end
    @status = params[:status]
  end

  # POST /covid_tests
  # POST /covid_tests.json
  def create
    @covid_test = CovidTest.new(covid_test_params)
    @covid_test.amount = @country.test_price
    @covid_test.currency = @country.currency
    @covid_test.payed = false

    respond_to do |format|
      if @covid_test.save
        @covid_test.generate_payment_qr_code
        @covid_test.generate_barcode

        if @selected_payment_type.name.casecmp("Paiement en ligne").zero?
          attempt = proceed_online_payment
          if attempt["code"] == 200
            format.html { redirect_to attempt["data"]["url_payment"] }
          else
            format.html { redirect_to edit_covid_test_path(@covid_test, status: "failed") }
          end
        else
          format.html { redirect_to @covid_test }
        end

        format.json { render :show, status: :created, location: @covid_test }
      else
        format.html { render :new }
        format.json { render json: @covid_test.errors, status: :unprocessable_entity }
      end
    end
  end

  def proceed_online_payment
    base_url = request.base_url
    online_payment = OnlinePayment.new(@covid_test, validate_online_payment_covid_test_url(@covid_test.id),
                                       covid_test_url(@covid_test.id, status: "success"),
                                       edit_covid_test_url(@covid_test.id, status: "cancel"),
                                       edit_covid_test_url(@covid_test.id, status: "failed"))
    online_payment.attempt_payment
  end

  # PATCH/PUT /covid_tests/1
  # PATCH/PUT /covid_tests/1.json
  def update
    respond_to do |format|
      if @covid_test.update(covid_test_params)
        @covid_test.set_payment_code
        @covid_test.generate_payment_qr_code
        @covid_test.generate_barcode
        if @selected_payment_type.name.casecmp("Paiement en ligne").zero?
          attempt = proceed_online_payment
          if attempt["code"] == 200
            format.html { redirect_to attempt["data"]["url_payment"] }
          else
            format.html { redirect_to edit_covid_test_path(@covid_test, status: "failed") }
          end
        else
          format.html { redirect_to @covid_test }
        end
        format.json { render :show, status: :ok, location: @covid_test }
      else
        format.html { render :edit }
        format.json { render json: @covid_test.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /covid_tests/1
  # DELETE /covid_tests/1.json
  def destroy
    @covid_test.destroy
    respond_to do |format|
      format.html { redirect_to covid_tests_url, notice: "Covid test was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def results; end

  def validate_online_payment
    received_hash_app_key = Digest::SHA512.hexdigest(params["hash_app_key"])
    received_hash_secret_key = Digest::SHA512.hexdigest(params["hash_secret_key"])
    received_hash_public_key = Digest::SHA512.hexdigest(params["hash_public_key"])
    hash_app_key = Digest::SHA512.hexdigest(Rails.configuration.app_key)
    hash_secret_key = Digest::SHA512.hexdigest(Rails.configuration.secrete_key)
    hash_public_key = Digest::SHA512.hexdigest(Rails.configuration.public_key)

    mode = params["mode"]
    id = params["id"]
    covid_test = CovidTest.where(id: id).first
    if covid_test && mode == "prod"
      if hash_app_key == received_hash_app_key && hash_secret_key == received_hash_secret_key && hash_public_key == received_hash_public_key
        covid_test.update(payed: true)
        covid_test.generate_payment_qr_code
      end
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_covid_test
    @covid_test = CovidTest.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def covid_test_params
    params.require(:covid_test).permit(:travel_id, :payment_type_id, :payment_code, :payment_code,
                                       travel_attributes: [:from_country_iso_code, :destination_country_iso_code, :flight, :company, :departure_date, :traveler_id])
  end

  def set_country
    @country = Country.find_by(iso_code: "CG")
  end

  def set_payment_types
    @payment_types = PaymentType.all
  end

  def set_travels
    @travels = current_traveler.travels.unpaids
  end

  def set_default_travel
    @default_travel = current_traveler.travels.unpaids.order(created_at: :desc).first
  end

  def selected_payment_type
    @selected_payment_type = PaymentType.where(id: covid_test_params[:payment_type_id]).first
  end
end
