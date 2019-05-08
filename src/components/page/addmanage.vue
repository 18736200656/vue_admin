
    <template>
      <div class="addmanage">
        <search-box></search-box>
        <table-box :tableData="tableData"></table-box>
      </div>
    </template>
    <script>
      import searchBox from '../common/Addm/search'
      import tableBox from '../common/Addm/table'
      export default {
        name:'Addm',
        data(){
          return{
            tableData:{
              type:'Addm',
              filterData:{},
              tableBtn:[
                {
                  api:'saveStudenChannel',
                  type:'primary',
                  name:'新增'
                },
              ],
              //接口名字方法           //修改                //新增
              api:['queryUserTaobao','editUserTaobao','saveUserNotice'],
              thData:[
                {
                  key:'appCount',
                  label:"APP安装量",
                  align:'right'
                },
                {
                  key:'shopCount',
                  label:"收购完成量",
                },
                {
                  key:'creditCount',
                  label:"信用卡开卡量",
                  align:'right'

                },
                {
                  key:'cloudPayCount',
                  label:"云闪付完成量",
                  align:'right'

                },
                {
                  key:'jingdongCount',
                  label:"京东白条完成量",
                  align:'right'
                },
                {
                  key:'status',
                  label:"状态",
                  Tag:true,
                },
                {
                  key:'status',
                  fun:true,
                  label:"操作",
                  wd:150,
                  chilren:[
                    {
                      num: '1',
                      type: 'primary',
                      name: '启用'
                    },
                    {
                      num: '2',
                      type: 'danger',
                      name: '禁用'
                    }
                  ]
                }
              ]
            }
          }
        },
        components:{
          searchBox,tableBox
        },
      }
    </script>
    <style scoped>

    </style>
