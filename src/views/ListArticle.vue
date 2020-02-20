<template>
    <div>
    <el-table :data="articles">
        <el-table-column prop="title" label="标题" width="120">
        </el-table-column>
        <el-table-column prop="body" label="内容" >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
                <el-button @click="edit(scope.row.title)" type="text" size="small">编辑</el-button>
                <el-button @click="remove(scope.row.title)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
export default {
    data() {
      return {
        articles: []
      }
    },
    methods: {
        fetch() {
            this.$http.get('articles').then(res =>{
                this.articles = res.data
            })
        },

        edit(id) {
            this.$router.push(`/article/${id}/edit`)
        },

        remove(id) {
            // eslint-disable-next-line no-unused-vars
            this.$http.delete(`articles/${id}`).then(res =>{
                this.$message({
                    message: '文章删除成功',
                    type: 'success'
                })
                this.fetch()
            })
        }
     },
    created() {
        this.fetch()
    }
};
</script>
