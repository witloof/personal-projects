class Admin::CounterAgentsController < AdminController
  before_action :set_admin_counter_agent, only: [:show, :edit, :update, :destroy]

  # GET /admin/counter_agents
  # GET /admin/counter_agents.json
  def index
    @admin_counter_agents = CounterAgent.order(created_at: :desc).page params[:page]
  end

  # GET /admin/counter_agents/1
  # GET /admin/counter_agents/1.json
  def show
  end

  # GET /admin/counter_agents/new
  def new
    @admin_counter_agent = CounterAgent.new
    @admin_counter_agent.build_user
  end

  # GET /admin/counter_agents/1/edit
  def edit
  end

  # POST /admin/counter_agents
  # POST /admin/counter_agents.json
  def create
    @admin_counter_agent = CounterAgent.new(admin_counter_agent_params)
    @admin_counter_agent.user.set_user_password
    @admin_counter_agent.user.set_role("counter_agent")

    respond_to do |format|
      if @admin_counter_agent.save
        format.html { redirect_to [:admin, @admin_counter_agent], notice: "Counter agent was successfully created." }
        format.json { render :show, status: :created, location: @admin_counter_agent }
      else
        format.html { render :new }
        format.json { render json: @admin_counter_agent.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/counter_agents/1
  # PATCH/PUT /admin/counter_agents/1.json
  def update
    respond_to do |format|
      if (@admin_counter_agent.update(number: admin_counter_agent_params[:number],
                                      centre: admin_counter_agent_params[:centre], country_iso_code: admin_counter_agent_params[:country_iso_code]) && @admin_counter_agent.user.update_without_password(admin_counter_agent_params[:user_attributes]))
        format.html { redirect_to [:admin, @admin_counter_agent], notice: "Counter agent was successfully updated." }
        format.json { render :show, status: :ok, location: @admin_counter_agent }
      else
        format.html { render :edit }
        format.json { render json: @admin_counter_agent.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/counter_agents/1
  # DELETE /admin/counter_agents/1.json
  def destroy
    @admin_counter_agent.destroy
    respond_to do |format|
      format.html { redirect_to admin_counter_agents_url, notice: "Counter agent was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_admin_counter_agent
    @admin_counter_agent = CounterAgent.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def admin_counter_agent_params
    params.require(:counter_agent).permit(:number, :centre, :country_iso_code,
                                          user_attributes: [:email, :first_name, :last_name, :phone_number, :avatar, :airport_id])
  end
end
