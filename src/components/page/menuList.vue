<template>
  <div class="menulist">
    <search-box></search-box>
    <table-box :tableData="tableData"></table-box>
  </div>
</template>
<script>
  import searchBox from '../common/menulist/search'
  import tableBox from '../common/menulist/table'
  export default {
    name:'Menulist',
    data(){
      return{
        tableData:{
          type:'menulist',
          filterData:{},
           //列表查询                    / /修改                //新增                //分类
          api:['queryGoodsCategory','updateGoodsCategory','addGoodsCategory','queryGoodsList'],
          thData:[
            {
              key:'id',
              label:"分类ID",
            },
            {
              key:'name',
              label:"分类名称",
            },
            {
              key:'alias',
              label:"分类别名",
            },
            {
              key:'parentId',
              label:"上级ID",

            },
            {
              key:'level',
              label:"级别",
            },
            {
              key:'cateImgs',
              label:"图片组",
            },
            {
              key:'sort',
              label:"排序",
            },
            {
              key:'version',
              label:"当前版本号",
            },

            {
              fun:true,
              label:"操作",
              wd:150,
              chilren:[
                {
                  type: 'primary',
                  name: '修改'
                },
              ]
            }
          ]
        }
      }
    },
    created(){

    },
    methods:{

    },
    components:{
      searchBox,tableBox
    },
  }
</script>
<style scoped>

</style>
