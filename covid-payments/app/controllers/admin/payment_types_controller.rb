class Admin::PaymentTypesController < AdminController
  before_action :set_admin_payment_type, only: [:show, :edit, :update, :destroy]

  # GET /admin/payment_types
  # GET /admin/payment_types.json
  def index
    @admin_payment_types = PaymentType.all
  end

  # GET /admin/payment_types/1
  # GET /admin/payment_types/1.json
  def show
  end

  # GET /admin/payment_types/new
  def new
    @admin_payment_type = PaymentType.new
  end

  # GET /admin/payment_types/1/edit
  def edit
  end

  # POST /admin/payment_types
  # POST /admin/payment_types.json
  def create
    @admin_payment_type = PaymentType.new(admin_payment_type_params)

    respond_to do |format|
      if @admin_payment_type.save
        format.html { redirect_to [:admin, @admin_payment_type], notice: "Payment type was successfully created." }
        format.json { render :show, status: :created, location: @admin_payment_type }
      else
        format.html { render :new }
        format.json { render json: @admin_payment_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/payment_types/1
  # PATCH/PUT /admin/payment_types/1.json
  def update
    respond_to do |format|
      if @admin_payment_type.update(admin_payment_type_params)
        format.html { redirect_to [:admin, @admin_payment_type], notice: "Payment type was successfully updated." }
        format.json { render :show, status: :ok, location: @admin_payment_type }
      else
        format.html { render :edit }
        format.json { render json: @admin_payment_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/payment_types/1
  # DELETE /admin/payment_types/1.json
  def destroy
    @admin_payment_type.destroy
    respond_to do |format|
      format.html { redirect_to admin_payment_types_url, notice: "Payment type was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_admin_payment_type
    @admin_payment_type = PaymentType.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def admin_payment_type_params
    params.require(:payment_type).permit(:name, :logo)
  end
end
