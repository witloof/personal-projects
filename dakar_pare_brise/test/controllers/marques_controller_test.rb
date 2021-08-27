require 'test_helper'

class MarquesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @marque = marques(:one)
  end

  test "should get index" do
    get marques_url
    assert_response :success
  end

  test "should get new" do
    get new_marque_url
    assert_response :success
  end

  test "should create marque" do
    assert_difference('Marque.count') do
      post marques_url, params: { marque: {  } }
    end

    assert_redirected_to marque_url(Marque.last)
  end

  test "should show marque" do
    get marque_url(@marque)
    assert_response :success
  end

  test "should get edit" do
    get edit_marque_url(@marque)
    assert_response :success
  end

  test "should update marque" do
    patch marque_url(@marque), params: { marque: {  } }
    assert_redirected_to marque_url(@marque)
  end

  test "should destroy marque" do
    assert_difference('Marque.count', -1) do
      delete marque_url(@marque)
    end

    assert_redirected_to marques_url
  end
end
