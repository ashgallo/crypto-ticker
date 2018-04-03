class Api::CoinsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_coin, only: [:show, :update, :destroy]

  BASE_URL = 'https://api.coinmarketcap.com/v1/ticker/'

  def index
    render json: current_user.coins #can do this because the before action is listed with user auth
  end

  def create 
    cmc_id = params[:coin].downcase #this is the coin the user wants to watch 
    res = HTTParty.get("#BASE_URL}#{cmc_id}")   #find out if the coin exists on coin market cap. 
    if coin = Coin.create_by_cmc_id(res)   #create a coin in our db (or find it). If it doesn't exist, don't put it in the db.
      watched = WatchedCoin.find_or_create_by(  #create a watched_coin record & render back the coin
        coin_id: coind.id,
        user_id: current_user.id
      )
      watched.udpate(initial_price: coin.price) if watched.initial_price.nil?  
    else
      render json: { errors: 'Coin Not Found' }, status: 422
  end

  def show
    render json: @coin #this will show whatever the coin is
  end

  def update #PUT request /api/coins/:id. We'll use this to stop watching the coin instead of having to make a controller to do this one thing.  We can hijack update to do what we need since we won't be using it for anything else.
    def update
      current_user
        .watched_coins
        .find_by(coin_id: @coin.id)
        .destroy
  end

  def destroy
    @coin.destroy
  end
end
