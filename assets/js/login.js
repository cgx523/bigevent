$(function() {
    $('#link_reg').on('click',function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    let form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            const password = $('.reg-box [name=password]').val()
      if (password !== value) {
        return '两次密码不一致！'
            }
        }
    })

    $('#reg-form').on('submit',function(e) {
        e.preventDefault()

        $.ajax({
            url:'/api/reguser' ,
            type:'POST',
            data: {
                username: $('#reg-form [name=username]').val(),
                password: $('#reg-form [name=password]').val()
            },
            success:function(res) {
                if (res.status !== 0) {
                //   return console.log();(res.message)
                 return layer.msg(res.message)
                }
                // console.log('注册成功');
                layer.msg('注册成功')
                $('#link_login').click()
            }
         
        })
    })

    $('#form-login').on('submit',function(e) {
        e.preventDefault()

        $.ajax({
            url:'/api/login',
            type:'POST',
            data:$(this).serialize(),
            success(res) {
                console.log(res);
           if(res.status !== 0) {
               return layer.msg(res.message)
           }

           localStorage.setItem('token',res.token)

           location.href = '/index.html';
            }
        })
    })
})