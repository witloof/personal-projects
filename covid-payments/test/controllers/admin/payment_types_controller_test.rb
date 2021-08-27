require 'test_helper'

class Admin::PaymentTypesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin_payment_type = admin_payment_types(:one)
  end

  test "should get index" do
    get admin_payment_types_url
    assert_response :success
  end

  test "should get new" do
    get new_admin_payment_type_url
    assert_response :success
  end

  test "should create admin_payment_type" do
    assert_difference('Admin::PaymentType.count') do
      post admin_payment_types_url, params: { admin_payment_type: {  } }
    end

    assert_redirected_to admin_payment_type_url(Admin::PaymentType.last)
  end

  test "should show admin_payment_type" do
    get admin_payment_type_url(@admin_payment_type)
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_payment_type_url(@admin_payment_type)
    assert_response :success
  end

  test "should update admin_payment_type" do
    patch admin_payment_type_url(@admin_payment_type), params: { admin_payment_type: {  } }
    assert_redirected_to admin_payment_type_url(@admin_payment_type)
  end

  test "should destroy admin_payment_type" do
    assert_difference('Admin::PaymentType.count', -1) do
      delete admin_payment_type_url(@admin_payment_type)
    end

    assert_redirected_to admin_payment_types_url
  end
end
