module Api
  module UserAuthenticator
    extend ActiveSupport::Concern

    def current_user
      # リクエストの認証ヘッダーから渡ってくるJWTトークンをもとに 認証されたユーザを返す
      authenticate_with_http_token do |token, _options|
        User.find_by(id: authenticated_user_id(token))
      end
    end

    def authenticate!
      # 未ログイン状態のときに unauthorized http status をクライアントに返す
      head :unauthorized if current_user.nil?
    end

    private

    def authenticated_user_id(token)
      if token == 'null'
        nil
      else
        decoded_token = JWT.decode(token, Rails.application.credentials.secret_key_base)
        decoded_token[0]['user_id']
      end
    rescue JWT::ExpiredSignature
      # Handle expired token, e.g. logout user or deny access
      nil
    end
  end
end
