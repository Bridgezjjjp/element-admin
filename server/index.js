const express = require('express')
const app = express()

app.use(require('cors')())
app.use(express.json());

//连接数据库
const mysql = require('mysql')
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    port : '3306',
    database : 'element_admin'
});

connection.connect();


app.get("/", async (req, res) => {
    res.send('index');
});

//新增文章
// eslint-disable-next-line no-unused-vars
app.post("/api/articles", async (req, res) => {
    const addSqlParams = {
        "title" : req.body.name,
        "body" : req.body.body,
    }
    const addSql = 'insert into article(title,body) VALUES ('  + '"' + addSqlParams.title + '"' + ',' + '"' + addSqlParams.body + '"' + ')'

    connection.query(addSql,function (err) {
        if(err){
            console.log('[Insert Error]-',err.message)
            return
        }
        res.send()
    })
})
//文章列表
app.get('/api/articles',async (req, res) =>{
    const sql = 'SELECT * FROM article'
    connection.query(sql,function (err,result) {
        if (err){
            console.log('[Error]-',err.message)
            return
        }
        else{
            res.send(result)
        }
    })
})
//删除文章
app.delete('/api/articles/:id',async (req, res) => {
    const sql = 'DELETE FROM article where title=' + '"' + req.params.id + '"'
    connection.query(sql,function (err) {
        if (err){
            console.log('[ERROR]-',err.message)
            return
        }
        res.send()
    })
})

//文章详情
app.get('/api/articles/:id',async (req, res) => {
    const sql = 'SELECT * FROM article where title=' + '"' + req.params.id + '"'
    connection.query(sql,function (err,result) {
        if (err){
            console.log('[ERROR]-',err.message)
            return
        }
        res.send(result)
    })
})
//修改文章,put/post/petch请求皆可，put是覆盖性修改
app.put('/api/articles/:id',async (req, res) => {
    const sql = 'UPDATE article set ' +
        'body=' + '"' + req.body.body + '"' +
        'where title=' + '"' + req.params.id + '"'
    connection.query(sql,function (err,result) {
        if (err){
            console.log('[ERROR]-',err.message)
            return
        }
        res.send(result)
    })
})

app.listen(3001,() => {
    console.log('http://localhost:3001/')
})
