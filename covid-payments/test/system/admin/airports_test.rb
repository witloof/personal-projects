require "application_system_test_case"

class Admin::AirportsTest < ApplicationSystemTestCase
  setup do
    @admin_airport = admin_airports(:one)
  end

  test "visiting the index" do
    visit admin_airports_url
    assert_selector "h1", text: "Admin/Airports"
  end

  test "creating a Airport" do
    visit admin_airports_url
    click_on "New Admin/Airport"

    click_on "Create Airport"

    assert_text "Airport was successfully created"
    click_on "Back"
  end

  test "updating a Airport" do
    visit admin_airports_url
    click_on "Edit", match: :first

    click_on "Update Airport"

    assert_text "Airport was successfully updated"
    click_on "Back"
  end

  test "destroying a Airport" do
    visit admin_airports_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Airport was successfully destroyed"
  end
end
