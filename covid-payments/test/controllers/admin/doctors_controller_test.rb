require 'test_helper'

class Admin::DoctorsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin_doctor = admin_doctors(:one)
  end

  test "should get index" do
    get admin_doctors_url
    assert_response :success
  end

  test "should get new" do
    get new_admin_doctor_url
    assert_response :success
  end

  test "should create admin_doctor" do
    assert_difference('Admin::Doctor.count') do
      post admin_doctors_url, params: { admin_doctor: {  } }
    end

    assert_redirected_to admin_doctor_url(Admin::Doctor.last)
  end

  test "should show admin_doctor" do
    get admin_doctor_url(@admin_doctor)
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_doctor_url(@admin_doctor)
    assert_response :success
  end

  test "should update admin_doctor" do
    patch admin_doctor_url(@admin_doctor), params: { admin_doctor: {  } }
    assert_redirected_to admin_doctor_url(@admin_doctor)
  end

  test "should destroy admin_doctor" do
    assert_difference('Admin::Doctor.count', -1) do
      delete admin_doctor_url(@admin_doctor)
    end

    assert_redirected_to admin_doctors_url
  end
end
