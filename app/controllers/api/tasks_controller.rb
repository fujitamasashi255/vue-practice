class Api::TasksController < ApplicationController
  include Api::UserAuthenticator

  before_action :set_task, only: %i[show update destroy]
  before_action :authenticate!

  def index
    @tasks = Task.all
    render json: @tasks
  end

  def show
    render json: @task
  end

  def create
    @task = current_user.tasks.new(task_params)
    if @task.save
      render json: @task
    else
      render json: @task.errors, status: :bad_request
    end
  end

  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :bad_request
    end
  end

  def destroy
    @task.destroy!
    render json: @task
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :description, :status)
  end
end
