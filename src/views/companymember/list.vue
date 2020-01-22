<template>
  	<div class="app-container">
	    <div class="filter-container">
	      <el-input
        v-model="listQuery.username"
        clearable
        placeholder="姓名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
      />
      <el-input
        v-model="listQuery.mobile"
        clearable
        placeholder="电话号码"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left: 10px"
        @click="handleSearch"
      >
        查询
      </el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        style="margin-left: 5px"
        @click="handleCreate"
      >
        新增
      </el-button>
	  </div>
		<el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="120"
      />
      <el-table-column label="用户名" width="150" align="center" prop="username">
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" fixed="right">
        <template slot-scope="{ row }">
          <PreviewDialog title="档案信息" :data="row">
            <el-button type="text" icon="el-icon-view" />
          </PreviewDialog>
          <PreviewDialog title="派发订单" :data="row">
            <svg-icon class="send-order" icon-class="send-order" @click="handleSendOrder(row)" />
          </PreviewDialog>
          <PreviewDialog title="完结订单" :data="row">
            <svg-icon class="done-order" icon-class="done" @click="handleDoneOrder(row)" />
          </PreviewDialog>
          <el-button type="text" icon="el-icon-edit" @click="handleUpdate(row)" />
          <el-button type="text" icon="el-icon-delete" style="color:#f56c6c" @click="handleDelete(row)" />
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pageSize"
      @pagination="refresh"
    />
    </pagination>
	</div>
</template>

<script>
	import { CompanyMemberList } from '@/api/companymember'
	import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive
  import { parseTime } from '@/utils'

	export default{
		name: 'companymemberlist',
		components: {Pagination},
    directives: { waves },
		data() {
			return {
				listQuery:{
					page: 1,
					pageSize: 10
				},
				list: null,
				listLoading: true,
				total: 0
			}
		},
		created() {
			this.parseQuery()
		},
		mounted() {
			this.getData()
		},
		methods: {
			handleFilter() {

			},
			getData() {
				const that = this
				const listQuery = this.listQuery
				CompanyMemberList(listQuery).then(response => {
					console.log(response)
					that.list = response.data.items
					that.listLoading = false
					that.total = response.data.total
				})
			},
			parseQuery() {
      // 收集查询条件
        const query = Object.assign({}, this.$route.query)
        let listQuery = {
          page: 1,
          pageSize: 10,
          sort: 'id'
        }
        if (query) {
          query.page && (query.page = Number(query.page))
          query.pageSize && (query.pageSize = Number(query.pageSize))
          listQuery = {
            ...listQuery,
            ...query
          }
        }
        this.listQuery = listQuery
    	},
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          status: 'published',
          type: ''
        }
      },
			sortChange() {

			},
			handleSearch() {

			},
			handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
			handleUpdate(row) {
        console.log(row)
        this.temp = row
        Object.assign(this.temp, row)
        console.log(this.temp)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
			},
			handleDelete() {

			},
      createData() {
        console.log(this.$refs['dataForm'])
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '创建工单成功',
          type: 'success',
          duration: 2000
        })
        /*this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.temp.author = 'vue-element-admin'
            createArticle(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建工单成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })*/
      },
      handleSendOrder(row) {
        console.log(row)
        this.dialogPvVisible = true
        this.sendTemp.device = row.device
        this.sendTemp.des = row.des
      },
      sendOrder() {
        console.log(this.$refs['sendOrderForm'])
        this.dialogPvVisible = false
        this.$notify({
          title: '成功',
          message: '工单派发成功',
          type: 'success',
          duration: 3000
        })
      },
      handleDoneOrder() {
        this.$notify({
          title: "成功",
          message: '完结订单成功',
          type: 'success',
          duration: 3000
        })
      },
			refresh() {
        this.getData()
			}
		}
	}
</script>

<style scoped>
.guid-handler{
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.send-order{
  cursor: pointer;
}
.done-order{
  cursor: pointer;
}
</style>