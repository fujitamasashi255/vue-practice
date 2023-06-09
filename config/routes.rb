Rails.application.routes.draw do
  root 'home#index'
  namespace :api, format: 'json' do
    resources :tasks
    resources :users, only: %i[create update]
    get 'user', to: 'users#me'
    post 'login' => 'user_sessions#create'
    post 'logout' => 'user_sessions#destroy', :as => :logout
  end
  get '*path', to: 'home#index', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
