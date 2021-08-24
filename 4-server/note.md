<!--
-- package.json
-- src
   |-- index.js 入口文件， server.js, app.js
   |-- middleware 这是文件夹， 里面放各种middleware
   |-- routes 这里注册大路径 （use）
      |-- tasks  这里注册小路径 （get, post, put, delete）
      |-- users
      |-- other resources ...
   |--controllers 逻辑处理
      |-- tasks  这里的文件和上面routes里基本是一一对应
      |-- users
      |-- other resources ...
   |--models
      |-- tasks  对应数据库，进行CRUD操作
      |-- users
      |-- other resources ...
   |-- utils helper function，shared function


controllers -> controllers （经理） 不再具体做处理，负责调度，规划
            -> services    （程序员）实际逻辑
-->

GET example.com/tasks/:id
application -> (example.com) -> router
router -> /tasks -> taskRouter
taskRouter -> GET /:id -> taskController (get task by id)
