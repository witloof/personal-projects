require "application_system_test_case"

class Admin::TravelersTest < ApplicationSystemTestCase
  setup do
    @admin_traveler = admin_travelers(:one)
  end

  test "visiting the index" do
    visit admin_travelers_url
    assert_selector "h1", text: "Admin/Travelers"
  end

  test "creating a Traveler" do
    visit admin_travelers_url
    click_on "New Admin/Traveler"

    click_on "Create Traveler"

    assert_text "Traveler was successfully created"
    click_on "Back"
  end

  test "updating a Traveler" do
    visit admin_travelers_url
    click_on "Edit", match: :first

    click_on "Update Traveler"

    assert_text "Traveler was successfully updated"
    click_on "Back"
  end

  test "destroying a Traveler" do
    visit admin_travelers_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Traveler was successfully destroyed"
  end
end
