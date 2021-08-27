require 'test_helper'

class Admin::CovidTestsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin_covid_test = admin_covid_tests(:one)
  end

  test "should get index" do
    get admin_covid_tests_url
    assert_response :success
  end

  test "should get new" do
    get new_admin_covid_test_url
    assert_response :success
  end

  test "should create admin_covid_test" do
    assert_difference('Admin::CovidTest.count') do
      post admin_covid_tests_url, params: { admin_covid_test: {  } }
    end

    assert_redirected_to admin_covid_test_url(Admin::CovidTest.last)
  end

  test "should show admin_covid_test" do
    get admin_covid_test_url(@admin_covid_test)
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_covid_test_url(@admin_covid_test)
    assert_response :success
  end

  test "should update admin_covid_test" do
    patch admin_covid_test_url(@admin_covid_test), params: { admin_covid_test: {  } }
    assert_redirected_to admin_covid_test_url(@admin_covid_test)
  end

  test "should destroy admin_covid_test" do
    assert_difference('Admin::CovidTest.count', -1) do
      delete admin_covid_test_url(@admin_covid_test)
    end

    assert_redirected_to admin_covid_tests_url
  end
end
