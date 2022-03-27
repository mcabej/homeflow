require 'httparty'
require 'dotenv'

Dotenv.load

class HomeflowClient
  def request_by_location(location)
    p "#{URL}/properties?api_key=#{API_KEY}&search[address]=#{location}"
    HTTParty.get("#{URL}/properties?api_key=#{API_KEY}&search[address]=#{location}")
  end
  
  private

  API_KEY = ENV['API_KEY'] || settings.api_key;
  URL = ENV['URL'] || settings.url;
end
