Rails.application.routes.draw do
  devise_for :users
  root to: "items#index"
  resources :items do
    resources :purchases, only: [:index, :create]
  end
  resources :users do
    resources :fgems, only: [:index]
    get "hpup" , to: "fgems#hpup"
    get "wchange" , to: "fgems#wchange"
    get "schange" , to: "fgems#schange"
  end
end
