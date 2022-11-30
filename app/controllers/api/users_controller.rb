class Api::UsersController < ApplicationController
  include Api::UserAuthenticator

  before_action :authenticate!, only: %i[create update]

  def create
    if User.create(user_params)
      head 200
    else
      head 400
    end
  end
  
  def update
    if current_user.update(user_params)
      head 200
    else
      head 400
    end
  end

  def me
    render json: current_user, methods: [:avatar_url]
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :avatar)
  end
end
