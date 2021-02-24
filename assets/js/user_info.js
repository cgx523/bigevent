$(function() {
    const {form ,layer}= layui

    form.verify ({
        nickname: function(value) {
            if(value.length > 6) {
                return '昵称不能大于六位'
            }
        }
    })
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            type:'GET',
            url:'/my/userinfo',
            success(res) {
                if(res.status !== 0) {
                    return layer.msg('用户信息获取失败')
                }
                // console.log(res);
                form.val('userInfo',res.data)
            }
        })
    }
    
    $('#btnReset').on('click',function(e) {
        e.preventDefault()
        ires.messagenitUserInfo()
    })

    $('.layui-form').on('submit',function(e) {
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success(res) {
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                window.parent.getUserInfo()
            }
        })
    })
})