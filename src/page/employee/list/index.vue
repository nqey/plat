<template>
  <div class="content">
    <div class="content_con">
      <div class="main_left_content">
    <div class="main_left_content_section_tit clearfix">
        <div class="pull-left">
            <p>筛选条件</p>
        </div>
    </div>
    <!--筛选条件-->
    <div class="filters datagrid-filter">
        <div class="form-inline row clearfix">
            <div class="form-group col-md-4">
                <label>姓名：</label>
                <input type="text" class="form-control" v-model="name" placeholder="请输入员工姓名">
            </div>
            <div class="form-group col-md-4">
                <label>手机号：</label>
                <input type="text" class="form-control" v-model="cellphone" placeholder="请输入员工手机号码">
            </div>
            <div class="form-group col-md-4">
                <label>职责：</label>
                <input type="text" class="form-control" v-model="duty" placeholder="请输入员工职责">
            </div>
            <div class="form-group col-md-4">
                <label>工厂：</label>
                <input type="text" class="form-control" v-model="factoryName" placeholder="请输员工所属工厂">
            </div>
            <div class="form-group col-md-4">
                <button type="button" class="search btn-primary btn datagrid-search" @click="search">
                    <span class="glyphicon glyphicon-search"></span>搜索
                </button>
                <button type="button" class="clear btn-primary btn datagrid-clear" @click="clear">
                    <span class="glyphicon glyphicon-clear"></span>清空
                </button>
            </div>
          </div>
        </div>
        <div class="list">
          <p>员工列表</p>
        </div>
        <div class="datagrid-title">
          <v-datagrid :columns="columns"
                      :data-url="dataUrl"
                      :count-url="countUrl">
          </v-datagrid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import datagrid from '@/components/datagrid';

  export default {
    name: 'index',
    props: {
      value: {
        type: String,
      },
    },
    data() {
      return {
        name: '',
        cellphone: '',
        duty: '',
        factoryName: '',
        liveAddress: '',
        dataUrl: '',
        countUrl: '',
        toolbar: [{
          title: '员工列表',
          handler() {
            window.console.log('员工列表');
          },
        }],
        checkable: true,
        columns: [{ field: 'name', header: '姓名', sort: 'name', width: 100 },
          { field: 'tel', header: '手机号', width: 180 },
          { field: 'id_card', header: '身份证号', width: 250 },
          { field: 'responsibilities', header: '职责', width: 100 },
          { field: 'code', header: '状态', width: 100 },
          { field: 'category', header: '所属工厂', width: 300 },
          {
            field: 'createTime',
            header: '创建时间',
            sort: 'create_time',
            width: 200,
            formatter(row, index, value) {
              return new Date(value).toUTCString();
            },
          },
          {
            field: 'number',
            header: '扫码总数',
            width: 120,
          }],
      };
    },
    components: {
      'v-datagrid': datagrid,
    },
    methods: {
      search() {
        this.datagridParams = {
          name: this.name || null,
          type: this.type || null,
          areaCode: this.liveAddress || null,
          page: 1,
          rows: 20,
        };
      },
      clear() {
        this.areaCode = '';
        setTimeout(() => { this.areaCode = null; }, 10);
        this.name = null;
        this.type = '';
        this.datagridParams = {};
      },
      setLiveAddress(d) {
        this.liveAddress = d;
      },
    },
  };
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

.list{
  margin: 30px 0;
}
.list p{
  font-size: 18px;
}
.datagrid-title{
  margin-top:20px;
}
.form-group{
  margin: 15px 0;
}
.btn{
  width: 118px; 
}
.datagrid-title{
  margin-top: 50px;
}
</style>