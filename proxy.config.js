const qs = require('qs');
const mockjs = require('mockjs');
let addressBook = {};
if (!global.addressBook) {
  const data = mockjs.mock({
    'data|20': [{
      'key|+1': 1,
      name: '@cname',
      'age|11-99': 1,
      address: '@region',
    }],
    page: {
      total: 100,
      current: 1,
    },
  });
  addressBook = data;
  global.addressBook = addressBook;
} else {
  addressBook = global.addressBook;
}
module.exports={
  'GET /api/addressList':function(req,res) {
    setTimeout(function(){
      res.json({
        success:true,
        data:addressBook.data
      })
    },2000)
  },
  'DELETE /api/addressList': function (req, res) {
    setTimeout(function () {
      const deleteItem = req.query;
      addressBook.data = addressBook.data.filter(function (item) {
        if (item.key == deleteItem.key) {
          return false;
        }
        return true;
      });

      global.addressBook = addressBook;
      res.json({
        success: true,
        del:deleteItem,
        data: addressBook.data
      });
    }, 500);
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
