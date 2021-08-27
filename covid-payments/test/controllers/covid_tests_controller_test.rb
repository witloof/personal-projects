require 'test_helper'

class CovidTestsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @covid_test = covid_tests(:one)
  end

  test "should get index" do
    get covid_tests_url
    assert_response :success
  end

  test "should get new" do
    get new_covid_test_url
    assert_response :success
  end

  test "should create covid_test" do
    assert_difference('CovidTest.count') do
      post covid_tests_url, params: { covid_test: { amount: @covid_test.amount, counter_agent_id: @covid_test.counter_agent_id, currency: @covid_test.currency, payed: @covid_test.payed, payment_type_id: @covid_test.payment_type_id, result: @covid_test.result, result_date: @covid_test.result_date, travel_id: @covid_test.travel_id } }
    end

    assert_redirected_to covid_test_url(CovidTest.last)
  end

  test "should show covid_test" do
    get covid_test_url(@covid_test)
    assert_response :success
  end

  test "should get edit" do
    get edit_covid_test_url(@covid_test)
    assert_response :success
  end

  test "should update covid_test" do
    patch covid_test_url(@covid_test), params: { covid_test: { amount: @covid_test.amount, counter_agent_id: @covid_test.counter_agent_id, currency: @covid_test.currency, payed: @covid_test.payed, payment_type_id: @covid_test.payment_type_id, result: @covid_test.result, result_date: @covid_test.result_date, travel_id: @covid_test.travel_id } }
    assert_redirected_to covid_test_url(@covid_test)
  end

  test "should destroy covid_test" do
    assert_difference('CovidTest.count', -1) do
      delete covid_test_url(@covid_test)
    end

    assert_redirected_to covid_tests_url
  end
end
