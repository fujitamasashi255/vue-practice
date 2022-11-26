class Api::UserSessionsController < ApplicationController
  def create
    user = login(user_sessions_params[:email], user_sessions_params[:password])
    if user
      # JWTを返す
      jwt = JWT.encode({ user_id: user.id, exp: login_token_expire_at }, Rails.application.credentials.secret_key_base)
      response = { token: jwt }
      render json: response
    else
      head 400
    end
  end

  def destroy
  end
  
  private

  def login_token_expire_at
    Time.current.tomorrow.to_i
  end

  def user_sessions_params
    params.require(:user).permit(:email, :password)
  end
end
