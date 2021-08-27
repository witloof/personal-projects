require "application_system_test_case"

class TravelsTest < ApplicationSystemTestCase
  setup do
    @travel = travels(:one)
  end

  test "visiting the index" do
    visit travels_url
    assert_selector "h1", text: "Travels"
  end

  test "creating a Travel" do
    visit travels_url
    click_on "New Travel"

    fill_in "Arrival date", with: @travel.arrival_date
    fill_in "Company", with: @travel.company
    fill_in "Departure date", with: @travel.departure_date
    fill_in "Destination country iso code", with: @travel.destination_country_iso_code
    fill_in "Flight", with: @travel.flight
    fill_in "From country iso code", with: @travel.from_country_iso_code
    fill_in "Traveler", with: @travel.traveler_id
    click_on "Create Travel"

    assert_text "Travel was successfully created"
    click_on "Back"
  end

  test "updating a Travel" do
    visit travels_url
    click_on "Edit", match: :first

    fill_in "Arrival date", with: @travel.arrival_date
    fill_in "Company", with: @travel.company
    fill_in "Departure date", with: @travel.departure_date
    fill_in "Destination country iso code", with: @travel.destination_country_iso_code
    fill_in "Flight", with: @travel.flight
    fill_in "From country iso code", with: @travel.from_country_iso_code
    fill_in "Traveler", with: @travel.traveler_id
    click_on "Update Travel"

    assert_text "Travel was successfully updated"
    click_on "Back"
  end

  test "destroying a Travel" do
    visit travels_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Travel was successfully destroyed"
  end
end
