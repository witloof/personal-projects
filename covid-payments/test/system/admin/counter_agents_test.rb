require "application_system_test_case"

class Admin::CounterAgentsTest < ApplicationSystemTestCase
  setup do
    @admin_counter_agent = admin_counter_agents(:one)
  end

  test "visiting the index" do
    visit admin_counter_agents_url
    assert_selector "h1", text: "Admin/Counter Agents"
  end

  test "creating a Counter agent" do
    visit admin_counter_agents_url
    click_on "New Admin/Counter Agent"

    click_on "Create Counter agent"

    assert_text "Counter agent was successfully created"
    click_on "Back"
  end

  test "updating a Counter agent" do
    visit admin_counter_agents_url
    click_on "Edit", match: :first

    click_on "Update Counter agent"

    assert_text "Counter agent was successfully updated"
    click_on "Back"
  end

  test "destroying a Counter agent" do
    visit admin_counter_agents_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Counter agent was successfully destroyed"
  end
end
