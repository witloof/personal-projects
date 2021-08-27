require 'test_helper'

class Admin::TravelersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin_traveler = admin_travelers(:one)
  end

  test "should get index" do
    get admin_travelers_url
    assert_response :success
  end

  test "should get new" do
    get new_admin_traveler_url
    assert_response :success
  end

  test "should create admin_traveler" do
    assert_difference('Admin::Traveler.count') do
      post admin_travelers_url, params: { admin_traveler: {  } }
    end

    assert_redirected_to admin_traveler_url(Admin::Traveler.last)
  end

  test "should show admin_traveler" do
    get admin_traveler_url(@admin_traveler)
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_traveler_url(@admin_traveler)
    assert_response :success
  end

  test "should update admin_traveler" do
    patch admin_traveler_url(@admin_traveler), params: { admin_traveler: {  } }
    assert_redirected_to admin_traveler_url(@admin_traveler)
  end

  test "should destroy admin_traveler" do
    assert_difference('Admin::Traveler.count', -1) do
      delete admin_traveler_url(@admin_traveler)
    end

    assert_redirected_to admin_travelers_url
  end
end
