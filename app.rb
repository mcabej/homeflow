require 'sinatra'
require 'json'
require './lib/homeflow_client.rb'

before do
  @client = HomeflowClient.new
end

# root path - renders static html file
get '/' do
  send_file 'public/index.html'
end

# property searching path
if ENV['RACK_ENV'] == 'production'
  get '/api/properties' do
    api_response = @client.request(params['location'])
    content_type :json
    JSON.parse(api_response.body).to_json  
  end
else
  get '/api/properties' do
    api_response = @client.example_request(params['location'])
    content_type :json
    JSON.parse(api_response.body).to_json
  end
end