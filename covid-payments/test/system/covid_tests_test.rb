require "application_system_test_case"

class CovidTestsTest < ApplicationSystemTestCase
  setup do
    @covid_test = covid_tests(:one)
  end

  test "visiting the index" do
    visit covid_tests_url
    assert_selector "h1", text: "Covid Tests"
  end

  test "creating a Covid test" do
    visit covid_tests_url
    click_on "New Covid Test"

    fill_in "Amount", with: @covid_test.amount
    fill_in "Counter agent", with: @covid_test.counter_agent_id
    fill_in "Currency", with: @covid_test.currency
    check "Payed" if @covid_test.payed
    fill_in "Payment type", with: @covid_test.payment_type_id
    fill_in "Result", with: @covid_test.result
    fill_in "Result date", with: @covid_test.result_date
    fill_in "Travel", with: @covid_test.travel_id
    click_on "Create Covid test"

    assert_text "Covid test was successfully created"
    click_on "Back"
  end

  test "updating a Covid test" do
    visit covid_tests_url
    click_on "Edit", match: :first

    fill_in "Amount", with: @covid_test.amount
    fill_in "Counter agent", with: @covid_test.counter_agent_id
    fill_in "Currency", with: @covid_test.currency
    check "Payed" if @covid_test.payed
    fill_in "Payment type", with: @covid_test.payment_type_id
    fill_in "Result", with: @covid_test.result
    fill_in "Result date", with: @covid_test.result_date
    fill_in "Travel", with: @covid_test.travel_id
    click_on "Update Covid test"

    assert_text "Covid test was successfully updated"
    click_on "Back"
  end

  test "destroying a Covid test" do
    visit covid_tests_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Covid test was successfully destroyed"
  end
end
