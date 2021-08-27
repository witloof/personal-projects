require 'test_helper'

class Admin::CommercialsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin_commercial = admin_commercials(:one)
  end

  test "should get index" do
    get admin_commercials_url
    assert_response :success
  end

  test "should get new" do
    get new_admin_commercial_url
    assert_response :success
  end

  test "should create admin_commercial" do
    assert_difference('Admin::Commercial.count') do
      post admin_commercials_url, params: { admin_commercial: {  } }
    end

    assert_redirected_to admin_commercial_url(Admin::Commercial.last)
  end

  test "should show admin_commercial" do
    get admin_commercial_url(@admin_commercial)
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_commercial_url(@admin_commercial)
    assert_response :success
  end

  test "should update admin_commercial" do
    patch admin_commercial_url(@admin_commercial), params: { admin_commercial: {  } }
    assert_redirected_to admin_commercial_url(@admin_commercial)
  end

  test "should destroy admin_commercial" do
    assert_difference('Admin::Commercial.count', -1) do
      delete admin_commercial_url(@admin_commercial)
    end

    assert_redirected_to admin_commercials_url
  end
end
