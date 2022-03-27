require 'sinatra'
require 'json'
require './lib/homeflow_client.rb'
require 'dotenv'

Dotenv.load

before do
  @client = HomeflowClient.new
end

# root path - renders static html file
get '/' do
  send_file 'public/index.html'
end

# property searching path
get '/api/properties' do
  api_response = @client.request_by_location(params['location'])
  content_type :json
  JSON.parse(api_response.body).to_json
end