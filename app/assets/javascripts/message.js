$(function(){
  function buildHTML(message){
    if (message.image){
      var html = `<div class="chat-main__message-lists__message">
                    <div class="chat-main__message-lists__message__info">
                      <div class="chat-main__message-lists__message__info__talker">
                        ${message.user_name}
                      </div>
                      <div class="chat-main__message-lists__message__info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="chat-main__message-list__message__text">
                      <div class="chat-main__message-list__message__text__content">
                        ${message.content}
                      </div>
                      <img class="chat-main__message-list__message__text__image" src=${message.image}>
                    </div>
                  </div>`
      return html;
    } else {
      var html = `<div class="chat-main__message-lists__message">
                    <div class="chat-main__message-lists__message__info">
                      <div class="chat-main__message-lists__message__info__talker">
                        ${message.user_name}
                      </div>
                      <div class="chat-main__message-lists__message__info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="chat-main__message-list__message__text">
                      <div class="chat-main__message-list__message__text__content">
                        ${message.content}
                      </div>
                    </div>
                  </div>`
      return html;
    };
  }

  function formReset(){
    $('form')[0].reset();
    $('.chat-main__message-form__new-message__send-btn__btn').prop('disabled', false);
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-lists').append(html);
      $('.chat-main__message-lists').animate({ scrollTop: $('.chat-main__message-lists')[0].scrollHeight });
      formReset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      formReset();
    });
  })
});