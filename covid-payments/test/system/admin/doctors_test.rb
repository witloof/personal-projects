require "application_system_test_case"

class Admin::DoctorsTest < ApplicationSystemTestCase
  setup do
    @admin_doctor = admin_doctors(:one)
  end

  test "visiting the index" do
    visit admin_doctors_url
    assert_selector "h1", text: "Admin/Doctors"
  end

  test "creating a Doctor" do
    visit admin_doctors_url
    click_on "New Admin/Doctor"

    click_on "Create Doctor"

    assert_text "Doctor was successfully created"
    click_on "Back"
  end

  test "updating a Doctor" do
    visit admin_doctors_url
    click_on "Edit", match: :first

    click_on "Update Doctor"

    assert_text "Doctor was successfully updated"
    click_on "Back"
  end

  test "destroying a Doctor" do
    visit admin_doctors_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Doctor was successfully destroyed"
  end
end
