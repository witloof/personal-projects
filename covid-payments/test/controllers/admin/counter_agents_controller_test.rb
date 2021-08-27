require 'test_helper'

class Admin::CounterAgentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin_counter_agent = admin_counter_agents(:one)
  end

  test "should get index" do
    get admin_counter_agents_url
    assert_response :success
  end

  test "should get new" do
    get new_admin_counter_agent_url
    assert_response :success
  end

  test "should create admin_counter_agent" do
    assert_difference('Admin::CounterAgent.count') do
      post admin_counter_agents_url, params: { admin_counter_agent: {  } }
    end

    assert_redirected_to admin_counter_agent_url(Admin::CounterAgent.last)
  end

  test "should show admin_counter_agent" do
    get admin_counter_agent_url(@admin_counter_agent)
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_counter_agent_url(@admin_counter_agent)
    assert_response :success
  end

  test "should update admin_counter_agent" do
    patch admin_counter_agent_url(@admin_counter_agent), params: { admin_counter_agent: {  } }
    assert_redirected_to admin_counter_agent_url(@admin_counter_agent)
  end

  test "should destroy admin_counter_agent" do
    assert_difference('Admin::CounterAgent.count', -1) do
      delete admin_counter_agent_url(@admin_counter_agent)
    end

    assert_redirected_to admin_counter_agents_url
  end
end
