require "application_system_test_case"

class Admin::CommercialsTest < ApplicationSystemTestCase
  setup do
    @admin_commercial = admin_commercials(:one)
  end

  test "visiting the index" do
    visit admin_commercials_url
    assert_selector "h1", text: "Admin/Commercials"
  end

  test "creating a Commercial" do
    visit admin_commercials_url
    click_on "New Admin/Commercial"

    click_on "Create Commercial"

    assert_text "Commercial was successfully created"
    click_on "Back"
  end

  test "updating a Commercial" do
    visit admin_commercials_url
    click_on "Edit", match: :first

    click_on "Update Commercial"

    assert_text "Commercial was successfully updated"
    click_on "Back"
  end

  test "destroying a Commercial" do
    visit admin_commercials_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Commercial was successfully destroyed"
  end
end
