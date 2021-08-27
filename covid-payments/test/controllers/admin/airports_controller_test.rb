require 'test_helper'

class Admin::AirportsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin_airport = admin_airports(:one)
  end

  test "should get index" do
    get admin_airports_url
    assert_response :success
  end

  test "should get new" do
    get new_admin_airport_url
    assert_response :success
  end

  test "should create admin_airport" do
    assert_difference('Admin::Airport.count') do
      post admin_airports_url, params: { admin_airport: {  } }
    end

    assert_redirected_to admin_airport_url(Admin::Airport.last)
  end

  test "should show admin_airport" do
    get admin_airport_url(@admin_airport)
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_airport_url(@admin_airport)
    assert_response :success
  end

  test "should update admin_airport" do
    patch admin_airport_url(@admin_airport), params: { admin_airport: {  } }
    assert_redirected_to admin_airport_url(@admin_airport)
  end

  test "should destroy admin_airport" do
    assert_difference('Admin::Airport.count', -1) do
      delete admin_airport_url(@admin_airport)
    end

    assert_redirected_to admin_airports_url
  end
end
