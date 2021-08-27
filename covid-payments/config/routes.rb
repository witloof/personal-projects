if ENV['RAILS_ENV'] == 'production'
  Rails.application.routes.default_url_options[:host] = "https://safecongo.com/"
end
Rails.application.routes.draw do
  resources :commercials
  resources :covid_tests do
    collection do
      get :results
    end
    member do
      post :validate_online_payment
    end
  end
  resources :travels
  resources :travelers
  devise_for :users
  root to: "home#index"
  
  namespace :admin do
    resources :payment_types
    resources :covid_tests do
      member do
        get :bill
        put :validate_payment
        get :test
        post :change_state
        get :test_report
        get :print_barcode
        post :proceed_to_test
      end
      collection do
        get :paids
        get :tested
        get :admin_covid_tests
      end
    end
    resources :commercials
    resources :counter_agents
    resources :travelers
    resources :airports
    resources :doctors
    get 'users/edit', to: 'users#edit', as: :edit_user
    post 'users/update', to: 'users#update', as: :update_user
    post 'users/change-password', to: 'users#change_password', as: :change_password
    get "dashboard", to: "dashboard#index"
  end
end
