<template>
  <div>
    <div class="modal fade in" style="display: block; padding-right: 17px;">
      <div class="modal-dialog" role="document" style="width: 450px">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span></button>
            <h4 class="modal-title">修改密码</h4></div>
          <div class="modal-body">
            <div style="margin: 30px 20px" class="dialog-content">
              <table class="changePassword_new">
                <tbody>
                  <tr>
                    <td>原密码：</td>
                    <td>
                      <input type="password" name="orginPassword" class="form-control" validtype="required"></td>
                  </tr>
                  <tr>
                    <td>新密码：</td>
                    <td>
                      <input type="password" name="newPassword" class="form-control" validtype="required password"></td>
                  </tr>
                  <tr>
                    <td>确认密码：</td>
                    <td>
                      <input type="password" name="confirmPassword" class="form-control" validtype="required">
                      <div class="confirm-shower red hidden">两次密码输入不一致</div></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="dialog-btn-panel">
              <button type="button" data-loading-text="确定" class="dialog-btn btn btn-primary ok">确定</button>
              <button type="button" class="dialog-btn btn btn-primary">取消</button></div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade in"></div>
  </div>
</template>

<script>

export default {
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';

</style>