transport layer -> udp tcp
transmission control protocol 
user datagram protocol

IP address
A       ->      B
1 2 3        1 2 3
1 2 3        3 2 (数据可能丢失，顺序会改变)  （udp速度快）

TCP/IP 

persistent connection

http -> https (secure)

SPDY
QUIC UDP


https -> 443
http -> 80

anchor

flag

client (curl, browser, postman, server)
server

status code

cache-control:
private 只有浏览器可以做缓存
public  任意地方都可以缓存
no-cache  可以缓存，但是要进行验证
no-store   不能缓存

x-Custom-header

报文

CORS

serialize and deserialize
序列号与反序列化



CREATE -> POST
READ -> GET
UPDATE -> PUT
DELETE -> DELETE
CRUD



RESTful api设计规范
1. versioning
版本
example.com/v1/resource 
example.com/v2/resource
api.example.com/v1/xxx
example.com/api/v1/xxx
2. url里面尽量使用名词，不要包含动词, 资源尽量使用复数
resource: books
Post /v1/books 
/v1/addBooks x
3. GET 方法不会对资源状态有所改变
GET /v1/books -> 获取书，而不是删除或者更新书
4. 资源在url里尽量使用嵌套结构
book = {
  author: mason
}
/v1/books/{bookId}/author
5. 注意返回的数据大小 （注意分页）
1w数据 -> 分页 -> 返回第一页10个数据
6. 返回正确的status code来表示请求的状态
（不要所有请求都200）
7. 如果是一个错误返回，那么最好返回可读的文本信息

const obj = new Obj();
// dependency injection
// de-coupling

// single responsibility 
function(obj) {
  obj.xxxx
}



sequence diagram
时序图

/books/{id}

monolith server

cluster
