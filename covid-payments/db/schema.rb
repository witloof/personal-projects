# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_03_31_170439) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "airports", force: :cascade do |t|
    t.string "name"
    t.string "country_iso_code", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "commercials", force: :cascade do |t|
    t.string "number"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_commercials_on_user_id"
  end

  create_table "counter_agents", force: :cascade do |t|
    t.string "number"
    t.string "country_iso_code"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id"
    t.string "centre"
    t.index ["user_id"], name: "index_counter_agents_on_user_id"
  end

  create_table "countries", force: :cascade do |t|
    t.string "iso_code"
    t.string "name"
    t.integer "test_price"
    t.string "currency"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["currency"], name: "index_countries_on_currency"
    t.index ["iso_code"], name: "index_countries_on_iso_code", unique: true
    t.index ["test_price"], name: "index_countries_on_test_price"
  end

  create_table "covid_tests", force: :cascade do |t|
    t.bigint "travel_id", null: false
    t.bigint "payment_type_id"
    t.boolean "payed", default: false
    t.integer "result"
    t.integer "amount"
    t.string "currency"
    t.bigint "counter_agent_id"
    t.datetime "result_date"
    t.string "payment_code"
    t.string "ref_number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "commercial_id"
    t.string "test_version"
    t.string "test_reference"
    t.datetime "expire_at"
    t.string "lot_number"
    t.datetime "tested_at"
    t.integer "sample_id"
    t.string "doctor_id"
    t.string "type_prelevement"
    t.string "test_place"
    t.string "ct"
    t.index ["counter_agent_id"], name: "index_covid_tests_on_counter_agent_id"
    t.index ["payment_code"], name: "index_covid_tests_on_payment_code", unique: true
    t.index ["payment_type_id"], name: "index_covid_tests_on_payment_type_id"
    t.index ["travel_id"], name: "index_covid_tests_on_travel_id"
  end

  create_table "doctors", force: :cascade do |t|
    t.string "number"
    t.string "centre"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_doctors_on_user_id"
  end

  create_table "payment_types", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "travelers", force: :cascade do |t|
    t.string "residence_country_iso_code"
    t.string "passport_number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "sexe"
    t.date "birthday"
    t.integer "commercial_id"
    t.string "first_name", default: ""
    t.string "last_name", default: ""
    t.string "phone_number", default: ""
    t.string "email", default: ""
    t.integer "identification_type"
    t.string "identification_number"
    t.date "date_emission"
    t.date "date_expiration"
    t.index ["residence_country_iso_code"], name: "index_travelers_on_residence_country_iso_code"
  end

  create_table "travels", force: :cascade do |t|
    t.bigint "traveler_id", null: false
    t.string "from_country_iso_code"
    t.string "destination_country_iso_code"
    t.date "departure_date"
    t.date "arrival_date"
    t.string "flight"
    t.string "company"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "payed", default: false
    t.integer "commercial_id"
    t.integer "traveled_by"
    t.index ["arrival_date"], name: "index_travels_on_arrival_date"
    t.index ["departure_date"], name: "index_travels_on_departure_date"
    t.index ["destination_country_iso_code"], name: "index_travels_on_destination_country_iso_code"
    t.index ["from_country_iso_code"], name: "index_travels_on_from_country_iso_code"
    t.index ["traveler_id"], name: "index_travels_on_traveler_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: ""
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "first_name"
    t.string "last_name"
    t.integer "role"
    t.string "phone_number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "airport_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "commercials", "users"
  add_foreign_key "counter_agents", "users"
  add_foreign_key "covid_tests", "counter_agents"
  add_foreign_key "covid_tests", "travels"
  add_foreign_key "doctors", "users"
  add_foreign_key "travels", "travelers"
end
