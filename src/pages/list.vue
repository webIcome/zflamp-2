<template>
  <div class="full-view-bg">
    <div class="content-view-bg">
      <header-component></header-component>
      <div class="section">
        <div class="aside">
          <!--<div class="title"></div>-->
          <div class="aside-nav">
            <div class="panel-group" id="nav" aria-multiselectable="true">
              <template v-for="nav in navs">
                <div class="panel panel-default" v-if="!nav.url">
                  <div class="panel-heading">
                    <h4 class="panel-title" :class="{active: nav.isActive}">
                      <a :class="nav.ename"  @click="collapse(nav)">
                        <div class="nav-icon"></div>
                        {{nav.modulename}}
                        <span class="nav-selected" v-show="nav.isActive"></span>
                        <span class="nav-selected-hide" v-show="!nav.isActive"></span>
                      </a>
                    </h4>
                  </div>
                  <el-collapse-transition>
                    <div class="panel-collapse collapse" role="tabpanel" style="display: block" v-show="nav.isActive">
                      <template v-for="child in nav.children">
                        <router-link v-if="child.url" :to="child.url" class="panel-body">
                          {{child.modulename}}
                        </router-link>
                      </template>
                    </div>
                  </el-collapse-transition>
                </div>
                <div class="panel panel-default" v-else>
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <router-link :class="nav.ename" :to="nav.url">
                        <div class="nav-icon"></div>
                        {{nav.modulename}}

                      </router-link>
                    </h4>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import HomeService from '../services/list';
    import User from '../store/user';
    export default {
        name: 'homePage',
        data() {
            return {
                activeName: '',
                navs: [],
                localNavs: [
                    {
                        modulename: '统计分析',
                        ename: 'analyze',
                        modulecode: 'STATISTICALANALYSIS',
                        url: 'analyze',
                        children: []
                    },
                    {
                        modulename: '路灯',
                        ename: 'light',
                        modulecode: 'LAMP',
                        children: [
                            {modulename: '任务管理', modulecode: 'LAMPCLGL', url: 'task'},
                            {modulename: '灯控器', modulecode: 'LAMPLIGHTCONTROL', url: 'light'},
                            {modulename: '回路控制器', modulecode: 'LAMPLOOPCONTROL', url: 'loop'},
                            {modulename: '灯具&电源', modulecode: 'LAMPSUPPLYLAT', url: 'lamps'},
                        ]
                    },
                    {
                        modulename: '市政终端',
                        ename: 'municipal',
                        modulecode: 'TERMINAL',
                        children: [
                            {modulename: '井盖', modulecode: 'TERMINALCOVER', url: 'well'},
                            {modulename: '门开关检测', modulecode: 'TERMINALDOOR', url: 'door'},
                            {modulename: '光照度检测', modulecode: 'TERMINALILLUMIDETE', url: 'illuminance'},
                            {modulename: '浸水检测', modulecode: 'TERMINALIMMERSION', url: 'inundate'},
                            {modulename: '姿态感应', modulecode: 'TERMINALGESTURE', url: 'pose'},
                            {modulename: '振动检测', modulecode: 'TERMINALSHOCK', url: 'shake'},
                            {modulename: '声音识别', modulecode: 'TERMINALVOICE', url: 'voice'},
                            {modulename: '水位监测', modulecode: 'TERMINALWATERLEVEL', url: 'water-level'},
                            {modulename: '气象监测', modulecode: 'TERMINALMETEMONITOR', url: 'weather'},
                            {modulename: '摄像头', modulecode: 'CAMERA', url: 'camera'},
                        ]
                    },
                    {
                        modulename: '系统管理',
                        ename: 'system',
                        modulecode: 'XTQX',
                        children: [
                            {modulename: '项目管理', url: 'organize', modulecode: 'INETLIGHTZZGL'},
                            {modulename: '用户管理', url: 'user', modulecode: 'INETLIGHTYHGL'},
                            {modulename: '操作日志', url: 'log', modulecode: 'INETLIGHTCZRZ'},
                        ]
                    },
                ]
            }
        },
        created: function () {
            this.getMenus();
        },
        methods: {
            initMenus(currentHash) {
                if (currentHash == '/list/' || currentHash == '/list') {
                    let url = this.navs[0].url || this.navs[0].children[0].url || this.navs[0].children[0].children[0].url;
                    this.$router.push({path: '/list/' + url})
                    this.collapse(this.navs[0]);

                } else {
                    this.$router.push({path: currentHash});
                    this.navs.forEach(item => {
                        if (exec(item) && item.children && item.children.length) {
                            item.isActive == true;
                        }
                        function exec(nav) {
                            if (nav && '/list/' +nav.url == currentHash) {
                                return true;
                            } else if (nav.children && nav.children.length) {
                                return nav.children.some(child => {
                                    if (exec(child)) {
                                        if (nav && !nav.url) {
                                            nav.isActive = true;
                                        }
                                        return true;
                                    } else {
                                        return false;
                                    }
                                })
                            }
                        }
                    })
                }
            },
            collapse(nav, two) {
                let isActive = nav.isActive;
                this.isActiveHide(two);
                nav.isActive = !isActive;
                this.navs = Array.concat(this.navs)
            },
            isActiveHide(two) {
                if (two) {
                    return;
                }
                this.navs.forEach(nav => {
                    add(nav);
                });
                function add(nav) {
                    if (nav && !nav.url) {
                        nav.isActive = false;
                    }
                    if (nav.children && nav.children.length) {
                        nav.children.forEach(child => {
                            add(child);
                        })
                    }
                }
            },
            getMenus(){
                let currentHash = window.location.hash.substring(window.location.hash.indexOf('/'));
                HomeService.getMenus(34).then(list => {
                    this.navs = list.map(item => {
                        this.localNavs.forEach((nav, index) => {
                            if (item.modulecode == nav.modulecode) {
                                item.ename = nav.ename;
                                if (!item.children.length) {
                                    item.url = nav.url;
                                } else {
                                    item.children = item.children.map(i => {
                                        nav.children.forEach(localItem => {
                                            if (localItem.modulecode == i.modulecode) {
                                                i.ename = localItem.ename;
                                                i.url = localItem.url;
                                            }
                                        })
                                        return i
                                    });
                                }
                            }

                        });
                        return item;
                    }).filter(item => {
                        let filter = false;
                        this.localNavs.forEach(nav => {
                            if (nav.modulecode == item.modulecode) {
                                filter = true;
                            }
                        });
                        return filter;
                    });
//                    this.navs = this.localNavs;
                    this.isActiveHide();
                    this.initMenus(currentHash);
                })
            }
        }
    }
</script>
<style scoped lang="less">
  @navWidth: 250px;
  @navBackgroundColor: #25273E;
  .content-view-bg {
    position: relative;
    &:before {
      position: absolute;
      content: '';
      padding-top: 100px;
      z-index: -1;
      height: 100%;
      width: @navWidth;
      background-color: @navBackgroundColor;
    }
  }

  .full-view-bg {
    &:before {
      position: absolute;
      content: '';
      height: 100%;
      width: @navWidth;
      background-color: @navBackgroundColor;
    }
  }

  .section {
    position: relative;
    .aside {
      position: absolute;
      left: 0;
      z-index: 999;
      width: @navWidth;
      background-color: @navBackgroundColor;
      .isActive {
        display: block;
      }
      .aside-nav {
        font-size: 14px;
        .panel {
          border-radius: 0;
          margin: 0;
          border: none;
          background-color: transparent;
          .panel-heading {
            .panel-title {
              margin-top: 0;
              margin-bottom: 0;
              a {
                font-size: 18px;
              }
              &.active {
                a {
                  background-color: #317BD3;
                  color: #fff;
                }
              }
            }
            padding: 0;
            background-color: transparent;
            a {
              cursor: pointer;
              position: relative;
              display: flex;
              align-items: center;
              width: 100%;
              height: 60px;
              color: #8FABD2;
              font-size: 14px;
              &.router-link-active {
                color: #fff;
                background-color: #3C689D;
                &.energy {
                  .nav-icon {
                    width: 26px;
                    height: 26px;
                    background-image: url("../assets/home/energy-active.png");
                  }
                }
              }
              .nav-selected-hide {
                position: absolute;
                right: 30px;
                top: 50%;
                width: 10px;
                height: 18px;
                margin-top: -10px;
                background-image: url("../assets/home/hide-nav.png");
                background-size: cover;
              }
              .nav-selected {
                position: absolute;
                right: 30px;
                top: 50%;
                margin-top: -3px;
                display: inline-block;
                width: 18px;
                height: 10px;
                background-image: url("../assets/home/show-nav.png");
                background-size: cover;
              }
              &:hover {
                color: #66bbff;
                background-color: #15283f;
              }
              &.analyze,
              &.light,
              &.municipal,
              &.system {
                .nav-icon {
                  display: inline-block;
                  margin-right: 17px;
                  margin-left: 32px;
                  background-size: contain;
                }
              }
              &.analyze {
                .nav-icon {
                  width: 24px;
                  height: 23px;
                  background-image: url("../assets/list/analyze.png");
                }
                &:hover {
                  .nav-icon {
                  }
                }
              }
              &.light {
                .nav-icon {
                  width: 24px;
                  height: 24px;
                  background-image: url("../assets/list/light.png");
                }
                &:hover {
                  .nav-icon {
                  }
                }
              }
              &.municipal {
                .nav-icon {
                  width: 24px;
                  height: 24px;
                  background-image: url("../assets/list/municipal.png");
                }
                &:hover {
                  .nav-icon {
                  }
                }
              }
              &.system {
                .nav-icon {
                  width: 26px;
                  height: 26px;
                  background-image: url("../assets/list/system.png");
                }
                &:hover {
                  .nav-icon {
                  }
                }
              }
            }
          }
          .panel-collapse {
            .panel-body {
              display: inline-block;
              width: 100%;
              font-size: 14px;
              border: none;
              padding-left: 83px;
              cursor: pointer;
              color: #8FABD2;
              text-align: left;
              &:hover,
              &.router-link-active {
                color: #fff;
                background-color: #3C689D;
              }
            }
          }
        }
        ul {
          padding: 0;
        }
        .nav-icon {
          margin-right: 25px;
          vertical-align: text-top;
        }
      }

    }

    .content {
      margin-left: @navWidth;
    }
  }
</style>
