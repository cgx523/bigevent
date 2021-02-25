$(function() {

  const form = layui.form
    initCateInfo()
    function initCateInfo() {
  $.ajax({
      type:'GET',
      url:'/my/article/cates',
      success(res) {
          if(res.status !== 0) {
              return layer.msg(res.message)
          }
          const htmlStr = template('tpl-table',res)
        //   console.log(htmlStr);
          $('tbody').html(htmlStr)
      }
  })
    }
    // 为添加类别按钮绑定点击事件
    let indexAdd = null
$('#btnAddCate').on('click', function() {
   indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()
    })
  })

  $('body').on('submit', '#form-add' ,function(e) {
      e.preventDefault()
      $.ajax({
        method: 'POST',
        url: '/my/article/addcates',
        data: $(this).serialize(),
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg('新增分类失败！')
          }
          initCateInfo()
          layer.msg('新增分类成功！')
          // 根据索引，关闭对应的弹出层
          layer.close(indexAdd)
        }
      })
  })
  let indexEdit = null
  $('tbody').on('click','.btn-edit', function() {
    indexEdit = layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '修改文章分类',
        content: $('#dialog-edit').html()
      })
      const id = $(this).attr('data-id')
      // console.log(id);
// 发起请求获取对应分类的数据
   $.ajax({
       method: 'GET',
       url: '/my/article/cates/' + id,
       success: function(res) {
        form.val('form-edit', res.data)
  }
})
  })
  $('body').on('submit', '#form-edit', function(e) {
    e.preventDefault()
    $.ajax({
          method: 'POST',
          url: '/my/article/updatecate',
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('更新分类数据失败！')
            }
            layer.msg('更新分类数据成功！')
            layer.close(indexEdit)
            initCateInfo()
          }
    })
})

$('tbody').on('click', '.btn-delete', function() {
 const id = $(this).attr('data-id')
  // 提示用户是否要删除
  layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
    $.ajax({
      method: 'GET',
      url: '/my/article/deletecate/' + id,
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('删除分类失败！')
        }
        layer.msg('删除分类成功！')
        layer.close(index)
        initCateInfo()
      }
    })
  })
})
})