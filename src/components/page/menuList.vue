<template>
  <div class="menulist">
    <el-card>
      <el-form>
        <el-item-form>
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
        </el-item-form>
      </el-form>
      <div class="tree_box">
        <el-tree
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          default-expand-all
          show-checkbox
          node-key="id"
          :filter-node-method="filterNode"
          @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          ref="tree2">
          <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="append(data)">
              增加
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="remove(node, data)">
              删除
            </el-button>
          </span>
          </span>
        </el-tree>

      </div>

    </el-card>
  </div>
</template>
<script>
export default {
  name:'menuList',
  data(){
    const data = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
    return{
      data: JSON.parse(JSON.stringify(data)),
      filterText:'',
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
   methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
       handleDragStart(node, ev) {
        console.log('drag start', node);
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType);
      },
      allowDrop(draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
          return type !== 'inner';
        } else {
          return true;
        }
      },
      allowDrag(draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
      },

       append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      // renderContent(h, { node, data, store }) {
      //   return (
      //     <span class="custom-tree-node">
      //       <span>{node.label}</span>
      //       <span>
      //         <el-button size="mini" type="text" on-click={ () => this.append(data) }>添加</el-button>
      //         <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
      //       </span>
      //     </span>);
      // }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
}
</script>
<style scoped>
  .tree_box{
    margin-top: 20px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
