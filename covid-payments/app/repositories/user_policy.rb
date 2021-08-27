class UserPolicy
  def initialize(role)
    @role = role
  end

  def can_access_admin?
    @role.casecmp("admin").zero? || @role.casecmp("counter_agent").zero? || @role.casecmp("commercial").zero? || @role.casecmp("doctor").zero?
  end

  def can_access_covid_tests?
    @role.casecmp("counter_agent").zero?
  end

  def can_access_payed_tests?
    @role.casecmp("doctor").zero? || @role.casecmp("counter_agent").zero?
  end

  def can_access_commercials?
    @role.casecmp("admin").zero?
  end

  def can_access_counter_agents?
    @role.casecmp("admin").zero?
  end

  def can_access_payment_methods?
    @role.casecmp("admin").zero?
  end

  def can_access_travelers?
    @role.casecmp("commercial").zero? || @role.casecmp("admin").zero? 
  end

  def can_access_airports?
    @role.casecmp("admin").zero?
  end

  def can_access_covid_testeds?
    @role.casecmp("doctor").zero?
  end

  def can_access_doctors?
    @role.casecmp("admin").zero?
  end

  def can_perform_test?
    @role.casecmp("doctor").zero?
  end

  def can_see_test_bill?
    @role.casecmp("counter_agent").zero?
  end

  def can_print_barcode?
    @role.casecmp("doctor").zero?
  end

  def can_edit_covid_tests?
    @role.casecmp("admin").zero?
  end
end
