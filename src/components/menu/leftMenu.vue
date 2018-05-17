<template>
  <div class="left_menu">
    <div class="left_menu2">
      <div class="logo">
        <img src="//pic.cpsdb.com/72747ee92c3fdf007ae76c8e259f46cf?w=120&f=png">
        <h3>
          中国商品诚信数据库
          <br>
          <span>管理后台</span>
        </h3>
      </div>
      <div class="left-nav">
        <nav>
          <ul>
            <li v-for="(v, i) of menu" style="position: relative;">
                <router-link v-if="v.link" :to="v.link">
                  {{v.title}}
                </router-link>
                <a href="javascript:void 0" v-if="!v.link" class="link" @click="foldMenu(i)">
                  {{v.title}}
                  <img :src="v.icon" class="licon"></img>
                  <span v-if="!v.link" class="glyphicon glyphicon-triangle-right lplay" :style="v.transformObject"></span>
                </a>
              <!-- <span v-if="v.tip">{{v.tip}}</span> -->
              <div class="sidebar" :style="v.heightObject">
                <ul :ref="'menu' + i">
                  <li v-for="(v2, m) of v.menu" style="position: relative;">
                    <router-link v-if="v2.link" :to="v2.link">
                      {{v2.title}}
                      <span v-if="v2.link" class="glyphicon glyphicon-minus lplay2"></span>
                    </router-link>
                    <a v-if="!v2.link" href="javascript:void 0" @click="foldSubMenu(i, m)">
                      {{v2.title}}
                      <span v-if="!v2.link" class="glyphicon glyphicon-menu-right lplay2" :style="v2.transformObject"></span>
                    </a>
                    <!-- <span v-if="v2.tip">{{v2.tip}}</span> -->
                    <div class="subSidebar" :style="v2.heightObject">
                      <ul :ref="'menu2' + i + m">
                        <li v-for="v3 of v2.menu" style="position: relative;">
                          <router-link :to="v3.link" style="position: relative;left: 30px;">
                            {{v3.title}}
                            <span class="glyphicon glyphicon-minus lplay3"></span>
                          </router-link>
                          <!-- <span v-if="v3.tip">{{v3.tip}}</span> -->
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import homeIcon from '@/assets/img/home_icon@2x.png';
import qiyeIcon from '@/assets/img/qiye_icon@2x.png';
import erweimaIcon from '@/assets/img/erweima_icon@2x.png';
import renzhengguanIcon from '@/assets/img/renzhengguan_icon@2x.png';
import shenbaoIcon from '@/assets/img/shenbao_icon@2x.png';
import noticeIcon from '@/assets/img/notice_icon@2x.png';
import setupIcon from '@/assets/img/setup_icon@2x.png';
import wodebutieIcon from '@/assets/img/wodebutie_icon@2x.png';

export default {
  name: 'leftMemu',
  data() {
    return {
      menu: [
        {
          title: '首　　页',
          link: '/index',
          icon: homeIcon,
          menu: [],
        },
        {
          title: '企业管理',
          icon: qiyeIcon,
          open: false,
          heightObject: {
            transition: 'height 0.2s linear',
            height: '0px',
          },
          transformObject: {
            transition: 'transform 0.2s linear',
            transform: 'rotate(0deg)',
          },
          menu: [
            {
              title: '企业状态',
              icon: '',
              open: false,
              heightObject: {
                transition: 'height 0.2s linear',
                height: '0px',
              },
              transformObject: {
                transition: 'transform 0.2s linear',
                transform: 'rotate(0deg)',
              },
              menu: [
                {
                  title: '待初审',
                  link: '/enterprise/pending',
                  tip: 1,
                  icon: '',
                },
                {
                  title: '待认证采集',
                  link: '/enterprise/collectting',
                  tip: 1,
                  icon: '',
                },
                {
                  title: '待复审',
                  link: '/enterprise/pending2',
                  tip: 1,
                  icon: '',
                },
                {
                  title: '已入库',
                  link: '/enterprise/passed',
                  tip: 1,
                  icon: '',
                },
              ],
            },
            {
              title: '商品中心',
              icon: '',
              open: false,
              heightObject: {
                transition: 'height 0.2s linear',
                height: '0px',
              },
              transformObject: {
                transition: 'transform 0.2s linear',
                transform: 'rotate(0deg)',
              },
              menu: [
                {
                  title: '分类管理',
                  link: '/goods/category',
                  tip: 1,
                  icon: '',
                },
                {
                  title: '条码管理',
                  link: '/goods/barcode',
                  tip: 1,
                  icon: '',
                },
                {
                  title: '销售属性',
                  link: '/goods/attribute',
                  tip: 1,
                  icon: '',
                },
                {
                  title: '商品列表',
                  link: '/goods/list',
                  tip: 1,
                  icon: '',
                },
                {
                  title: '模块管理',
                  link: '/template/module',
                  tip: 1,
                  icon: '',
                },
                {
                  title: '模板管理',
                  link: '/template/list',
                  tip: 1,
                  icon: '',
                },
              ],
            },
            {
              title: '工厂中心',
              icon: '',
              open: false,
              heightObject: {
                transition: 'height 0.2s linear',
                height: '0px',
              },
              transformObject: {
                transition: 'transform 0.2s linear',
                transform: 'rotate(0deg)',
              },
              menu: [
                {
                  title: '工厂列表',
                  link: '/factory/list',
                  tip: 1,
                  icon: '',
                },
                {
                  title: '待审核',
                  link: '/factory/pending',
                  tip: 1,
                  icon: '',
                },
              ],
            },
            {
              title: '操作员工',
              icon: '',
              open: false,
              heightObject: {
                transition: 'height 0.2s linear',
                height: '0px',
              },
              transformObject: {
                transition: 'transform 0.2s linear',
                transform: 'rotate(0deg)',
              },
              menu: [
                {
                  title: '员工列表',
                  link: '/employee/list',
                  tip: 1,
                  icon: '',
                },
              ],
            },
            {
              title: '经销商',
              icon: '',
              open: false,
              heightObject: {
                transition: 'height 0.2s linear',
                height: '0px',
              },
              transformObject: {
                transition: 'transform 0.2s linear',
                transform: 'rotate(0deg)',
              },
              menu: [
                {
                  title: '经销商列表',
                  link: '/franchiser/list',
                  tip: 1,
                  icon: '',
                },
              ],
            },
          ],
        },
        {
          title: '二维码管理',
          icon: erweimaIcon,
          open: false,
          heightObject: {
            transition: 'height 0.2s linear',
            height: '0px',
          },
          transformObject: {
            transition: 'transform 0.2s linear',
            transform: 'rotate(0deg)',
          },
          menu: [
            {
              title: '二维码列表',
              link: '/code/list',
              tip: 1,
              icon: '',
            },
          ],
        },
        {
          title: '认证官管理',
          icon: renzhengguanIcon,
          open: false,
          heightObject: {
            transition: 'height 0.2s linear',
            height: '0px',
          },
          transformObject: {
            transition: 'transform 0.2s linear',
            transform: 'rotate(0deg)',
          },
          menu: [
            {
              title: '添加认证官',
              link: '/authofficer/entry',
              tip: 1,
              icon: '',
            },
            {
              title: '认证官列表',
              link: '/authofficer/list',
              tip: 1,
              icon: '',
            },
          ],
        },
        {
          title: '申报管理',
          icon: shenbaoIcon,
          open: false,
          heightObject: {
            transition: 'height 0.2s linear',
            height: '0px',
          },
          transformObject: {
            transition: 'transform 0.2s linear',
            transform: 'rotate(0deg)',
          },
          menu: [
            {
              title: '申报机构',
              link: '/declarer/agency',
              tip: 1,
              icon: '',
            },
            {
              title: '申报官',
              link: '/declarer/officer',
              tip: 1,
              icon: '',
            },
            {
              title: '申报企业',
              link: '/declarer/enterprise',
              tip: 1,
              icon: '',
            },
            {
              title: '考试系统',
              link: '/declarer/exam',
              tip: 1,
              icon: '',
            },
          ],
        },
        {
          title: '系统消息',
          icon: noticeIcon,
          open: false,
          heightObject: {
            transition: 'height 0.2s linear',
            height: '0px',
          },
          transformObject: {
            transition: 'transform 0.2s linear',
            transform: 'rotate(0deg)',
          },
          menu: [
            {
              title: '公告通知',
              open: false,
              heightObject: {
                transition: 'height 0.2s linear',
                height: '0px',
              },
              transformObject: {
                transition: 'transform 0.2s linear',
                transform: 'rotate(0deg)',
              },
              menu: [
                {
                  title: '创建公告',
                  link: '/message/create',
                  tip: 1,
                  icon: '',
                },
                {
                  title: '公告列表',
                  link: '/message/list',
                  tip: 1,
                  icon: '',
                },
              ],
            },
            {
              title: '投诉列表',
              link: '/complaint/list',
              tip: 1,
              icon: '',
            },
          ],
        },
        {
          title: '系统管理',
          icon: setupIcon,
          open: false,
          heightObject: {
            transition: 'height 0.2s linear',
            height: '0px',
          },
          transformObject: {
            transition: 'transform 0.2s linear',
            transform: 'rotate(0deg)',
          },
          menu: [
            {
              title: '菜单列表',
              link: '/system/menu',
              tip: 1,
              icon: '',
            },
            {
              title: '用户列表',
              link: '/system/user',
              tip: 1,
              icon: '',
            },
            {
              title: '角色列表',
              link: '/system/role',
              tip: 1,
              icon: '',
            },
            {
              title: '支付设置',
              link: '/system/paymethod',
              tip: 1,
              icon: '',
            },
            {
              title: 'APP版本管理',
              link: '/system/version',
              tip: 1,
              icon: '',
            },
          ],
        },
        {
          title: '补贴管理',
          icon: wodebutieIcon,
          open: false,
          heightObject: {
            transition: 'height 0.2s linear',
            height: '0px',
          },
          transformObject: {
            transition: 'transform 0.2s linear',
            transform: 'rotate(0deg)',
          },
          menu: [
            {
              title: '补贴审核',
              link: '/subsidy/pending',
              tip: 1,
              icon: '',
              menu: [],
            },
            {
              title: '申请补贴',
              link: '/subsidy/apply',
              tip: 1,
              icon: '',
            },
            {
              title: '补贴明细',
              link: '/subsidy/detail/list',
              tip: 1,
              icon: '',
            },
            {
              title: '申请记录',
              link: '/subsidy/record',
              tip: 1,
              icon: '',
            },
          ],
        },
      ],
    };
  },
  methods: {
    foldMenu(i, open) {
      const e = this.menu[i];
      if (open === 'open') e.open = false;
      if (!e.open) {
        e.transformObject.transform = 'rotate(90deg)';
        e.heightObject.height = `${this.$refs[`menu${i}`][0].clientHeight}px`;
      } else {
        e.transformObject.transform = 'rotate(0deg)';
        e.heightObject.height = '0px';
      }
      e.open = !e.open;
    },
    foldSubMenu(i, m) {
      const e = this.menu[i].menu[m];
      if (!e.open) {
        e.transformObject.transform = 'rotate(90deg)';
        e.heightObject.height = `${this.$refs[`menu2${i}${m}`][0].clientHeight}px`;
      } else {
        e.transformObject.transform = 'rotate(0deg)';
        e.heightObject.height = '0px';
      }
      e.open = !e.open;
      setTimeout(() => this.foldMenu(i, 'open'), 201);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';

* {
  font-size: 16px;
}

.left_menu {
    width: 240px;
    min-width: 240px;
    height: 100%;
    position: fixed;
    left: 0;
    background: #fff;
    background-size: 100% 100%;
    text-align: center;
    z-index: 101;
    overflow: hidden;
}
.left_menu2 {
  width: 257px;
  overflow-y: auto;  
  overflow-x: hidden;
  height: 100%;
}
.logo {
    width: 240px;
    min-width: 240px;
    height: 250px;
    padding-top: 40px;
    text-align: center;
    display: list-item;
    background: #4063FF;
    position: fixed;
    z-index: 102;
}
.logo h3 {
    color: #fff;
    line-height: 35px;
    font-size: 20px;
    font-weight: bold;
}
.left-nav{
    padding: 20px 0 60px 0;
    margin-top: 250px;
    width: 240px;
}

nav > ul > li > a {
  font-weight: bold;
}

a {
    display: block;
    padding: 15px;
    color: #4e4e4e;
}

a:focus {
    color: #015FE5;
}

a:focus > img {
    filter: drop-shadow(77px 0px 0px #015FE5);
    left: -32px;
}

.subSidebar > ul > li:hover {
  background: #e2e2e2;
}

.subSidebar > ul > li:focus {
  background: #e2e2e2;
}

.sidebar, .subSidebar {
  height: 0px;
  overflow: hidden;
  transition: height 0.2s ease;
}

.lplay {
  position: absolute;
  left: 20px;
  top: 19px;
  font-size: 12px;
}

.lplay2 {
  position: absolute;
  left: 50px;
  top: 19px;
  font-size: 12px;
}

.lplay3 {
  position: absolute;
  left: 58px;
  top: 19px;
  font-size: 12px;
}

.licon {
  position: absolute;
  left: 45px;
  top: 10px;
}



</style>