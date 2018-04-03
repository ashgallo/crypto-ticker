class Coin < ApplicationRecord
  validates_uniqueness_of :cmc_id, :name, :symbol, { case_sensitive: false }
  validates_presence_of :cmc_id, :name, :symbol

  has_many :watched_coins, dependent: :destroy
  has_many :users, through: :watched_coins

  def self.create_by_cmc_id(res) #self.create is ref to coin.create. call is self since we're in coin model
    if /^2\d\d$/ =~ res.code.to_s  #try to find coin, if not, return nil #regular expression. starts with ^2\anyonedigit\anyone\digit$end
      match = res[0].with_indifferent_access
      coin_params = {  #want to see if a coin with these params exist, if not, find it
        name: match[:name],
        symbol: match[:symbol],
        cmc_id: match[:id]
      }
      Coin.find_or_create_by(coin_params) do |coin|  #or can also create it
        coin.price = match[:price_usd]
        coin.last_fetched = DateTime.now
      end
    else
      nil
    end
  end

end
