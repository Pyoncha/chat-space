class UsersController < ApplicationController

  def edit
  end

  #もしログイン中のユーザー情報がアップデートしたら、root_pathへ
  def update
    if current_user.update(user_params)
      redirect_to root_path
    #アップデートできない場合、テキスト内容そのまま残し編集
    else
      render :edit
    end
  end

  private
  
  #現在ログイン中のユーザ名、メールアドレスをparamsで取得
  def user_params
    params.require(:user).permit(:name, :email)
  end

end
