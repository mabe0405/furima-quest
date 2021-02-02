Rails.application.routes.draw do
  devise_for :users
  root to: "items#index"
  resources :top ,only:[:index]
  resources :items do
    resources :purchases, only: [:index, :create]
  end
  resources :users do
    resources :fgems, only: [:index]
    get "hpup" , to: "fgems#hpup"
    get "mpup" , to: "fgems#mpup"
    get "spup" , to: "fgems#spup"
    get "wchange" , to: "fgems#wchange"
    get "schange" , to: "fgems#schange"
    get "skillget", to: "fgems#skillget"
    resources :monsters, only: [:show] do
     get "coinget" , to: "monsters#coinget"
    end
  end
end
