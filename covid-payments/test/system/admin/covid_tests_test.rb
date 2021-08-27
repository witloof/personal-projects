require "application_system_test_case"

class Admin::CovidTestsTest < ApplicationSystemTestCase
  setup do
    @admin_covid_test = admin_covid_tests(:one)
  end

  test "visiting the index" do
    visit admin_covid_tests_url
    assert_selector "h1", text: "Admin/Covid Tests"
  end

  test "creating a Covid test" do
    visit admin_covid_tests_url
    click_on "New Admin/Covid Test"

    click_on "Create Covid test"

    assert_text "Covid test was successfully created"
    click_on "Back"
  end

  test "updating a Covid test" do
    visit admin_covid_tests_url
    click_on "Edit", match: :first

    click_on "Update Covid test"

    assert_text "Covid test was successfully updated"
    click_on "Back"
  end

  test "destroying a Covid test" do
    visit admin_covid_tests_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Covid test was successfully destroyed"
  end
end
