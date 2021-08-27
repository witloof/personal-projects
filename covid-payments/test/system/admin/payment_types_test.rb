require "application_system_test_case"

class Admin::PaymentTypesTest < ApplicationSystemTestCase
  setup do
    @admin_payment_type = admin_payment_types(:one)
  end

  test "visiting the index" do
    visit admin_payment_types_url
    assert_selector "h1", text: "Admin/Payment Types"
  end

  test "creating a Payment type" do
    visit admin_payment_types_url
    click_on "New Admin/Payment Type"

    click_on "Create Payment type"

    assert_text "Payment type was successfully created"
    click_on "Back"
  end

  test "updating a Payment type" do
    visit admin_payment_types_url
    click_on "Edit", match: :first

    click_on "Update Payment type"

    assert_text "Payment type was successfully updated"
    click_on "Back"
  end

  test "destroying a Payment type" do
    visit admin_payment_types_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Payment type was successfully destroyed"
  end
end
