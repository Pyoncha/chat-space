class ApplicationController < ActionController::Base
  #CSRF(クロスサイトリクエストフォージェリ)対策
  protect_from_forgery with: :exception
  #ログインしていると表示可能。ログイン認証されていなければrootパスへリダイレクトする
  before_action :authenticate_user!
  # before_actionで定義したメソッドを実行
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end
