<template>
  <div>
    <v-modal
      :title="title"
      :ok="commit"
      :width="+800"
      ref="viewmodal">
      <div slot="body">
        <div class="filters">
          <div class="form-inline">
            <div class="row clearfix sssrk">
              <div class="form-group col-md-6">
                <label>姓&#12288;&#12288;名</label>
                <input type="text" class="form-control" v-model="filter.name" placeholder="输入申报官姓名">
              </div>
              <div class="form-group col-md-4">
                <button type="button" class="btn btn-primary" @click="search">
                  <span class="glyphicon glyphicon-search"></span>搜索
                </button>
              </div>
            </div>
          </div>
        </div>
        <v-datagrid :columns="columns"
                    :checkable="checkable"
                    :singleCheck="singleCheck"
                    :onSelected="onSelected"
                    :data-url="dataUrl"
                    :params="params"
                    :pageSize="5"
                    :count-url="countUrl"/>
      </div>
    </v-modal>
  </div>
</template>

<script>
  import modal from '@/components/modal';
  import datagrid from '@/components/datagrid';
  import { formatDate, reomveBlank } from '@/config/utils';
  import { PLATFORM_AUTHOFFICER_QUERY, PLATFORM_AUTHOFFICER_QUERY_COUNT, PLATFORM_EP_AUTHOFFICER } from '@/config/env';
  import { Notification } from 'element-ui';

  export default {
    name: 'viewModal',
    props: {
      goodsId: {
        type: Number,
        default: null,
      },
      handler: {
        type: Function,
        default: null,
      },
    },
    data() {
      return {
        params: {},
        filter: {
          name: null,
        },
        title: '认证官列表',
        PLATFORM_EP_AUTHOFFICER,
        onSelected: (row) => {
          this.authofficerId = row.id;
        },
        authofficerId: '',
        enterpriseId: this.$route.params.id,
        checkable: true,
        singleCheck: true,
        dataUrl: PLATFORM_AUTHOFFICER_QUERY,
        countUrl: PLATFORM_AUTHOFFICER_QUERY_COUNT,
        columns: [{ field: 'name', header: '姓名', width: 150 },
          { field: 'organizTel', header: '联系电话', width: 150 },
          { field: 'organiz', header: '服务中心', width: 300 },
          {
            field: 'createTime',
            header: '提交时间',
            sort: 'create_time',
            width: 200,
            formatter(row, index, value) {
              return formatDate(value);
            },
          },
        ],
      };
    },
    components: {
      'v-modal': modal,
      'v-datagrid': datagrid,
    },
    watch: {
      goodsId() {
        this.init();
      },
    },
    methods: {
      async commit() {
        const param = {
          authofficerId: this.authofficerId,
        };
        const res = await this.$http.post(`${this.PLATFORM_EP_AUTHOFFICER}/${this.enterpriseId}`, param);
        if (res.success) {
          Notification({
            type: 'success',
            position: 'bottom-right',
            message: res.message || '操作成功！',
            title: '成功',
          });
          this.handler();
          return true;
        }
        return false;
      },
      search() {
        this.params = reomveBlank(this.filter);
      },
    },
  };
</script>

<style scoped>
</style>
