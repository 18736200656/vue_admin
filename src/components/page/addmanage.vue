
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
                  api:'saveAdvertising',
                  type:'primary',
                  name:'新增'
                },
              ],
              //接口名字方法           //修改                删除               //新增             
              api:['queryAdvertising','updateAdvertising','deleteAdvertising','saveAdvertising'],
              thData:[
                // {
                //   key:'id',
                //   label:"广告ID",
  
                // },
                {
                  key:'imgUrl',
                  label:"广告",
                  img:true,
                },
                {
                  key:'clickUrl',
                  label:"点击链接",
                  link:true
                },
                {
                  key:'status',
                  label:"状态",
                  Tag:true,
                },
                {
                  key:'status',
                  changeStatus:true,
                  label:"启用/禁用",
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
                },
                // {
                //   key:'version',
                //   label:"版本号",
                // },
                {
                  fun:true,
                  label:"操作",
                  chilren:[
                    {
                      num: '1',
                      type: 'primary',
                      name: '修改'
                    },
                    {
                      num: '2',
                      type: '',
                      name: '删除'
                    }
                  ]
                },
                 
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
