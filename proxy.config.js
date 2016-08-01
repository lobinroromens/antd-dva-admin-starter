module.exports={
  'GET /api/addressList':function(req,res) {
    setTimeout(function(){
      res.json({
        success:true,
        data:[
          {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
          }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          }, {
            key: '3',
            name: '李大嘴',
            age: 32,
            address: '西湖区湖底公园1号',
          },
          {
            key: '4',
            name: '李大嘴',
            age: 33,
            address: '西湖区湖底公园4444号',
          },
          {
            key: '5',
            name: '李大嘴',
            age: 34,
            address: '西湖区湖底公园5号',
          }
        ]
      })
    },2000)
  },
  'POST /api/user/login':function(req,res){
          setTimeout(function(){
            res.json({
              success:true,
              data:{
                token:'132432543464',
                uid:'2',
                username:'test'
              }
            })
          },2000)
  }
}
