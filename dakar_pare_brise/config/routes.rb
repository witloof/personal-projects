Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  root to:"home#index"

  resources :marques
  resources :appointments, only:[:create, :new, :show]

  devise_for :users

  get "marques/:id/models", to:"marque#models"
  get "contact", to:"contact#index"
  get "categories/:slug_name", to: "categories#show", as: :category
  get "products/:slug_title", to: "products#show", as: :product
  match 'contact/new', to: 'contact#create', via: [:get, :post]

end
