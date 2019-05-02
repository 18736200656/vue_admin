<template>
  <div class="tablebox">
    <section class="table_container">
      <el-table
        ref="multipleTable"
        :class="formData.type+'_table'"
        :data="tableList"
        highlight-current-row
        tooltip-effect="dark"
        :header-cell-style="{background:'#f7f7f7'}"
        @selection-change="handleSelectionChange"
        height="250">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          :prop="goodsName"
          label="商品名称"
          width="150">
        </el-table-column>
        <el-table-column
          v-for="(item,index) in tableData.thData"
          :key="index"
          :label="item.label"
          :align="'item.align || center'"
          :width=" item.wd || 'auto'">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row[item.key]}}</span>
            </div>
            <div v-if="item.handdle">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </div>
            <el-tag v-if="item.Tag" :type="item.status==1 ?'success':'info'">
              {{this.$valid.statusStr(scope.row[status])}}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div class="b_pagation">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    name: 'tablebox',
    data() {
      return {
        tableList:[]
      }
    },
    props:{
      formData:{
        type:Object,
        default:{}
      }
    }
  }
</script>
<style scoped lang="less">
</style>
