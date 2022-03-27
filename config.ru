require './app'
require 'dotenv'

Dotenv.load

configure do
    set :server, :thin    
end

configure :production do
    set :api_key, ENV['API_KEY']
    set :url, ENV['URL']
end

run Sinatra::Application