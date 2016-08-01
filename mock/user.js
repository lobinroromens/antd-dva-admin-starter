
// module.exports = {
//   'POST /api/user/login':function (req,res) {
//     if(true){
//       setTimeout(function(){
//         res.json({
//           success:true,
//           data:{
//             token:'132432543464',
//             uid:'2',
//             username:'test'
//           }
//         })
//       },2000)
//     }else {
//       setTimeout(function(){
//         res.json(){
//           success:false,
//           data:{}
//         }
//       },2000)
//     }
//   },
//   'GET /api/user': function (req, res) {
//     setTimeout(function () {
//       res.json({
//         success: true,
//         data: ['foo', 'bar'],
//       });
//     }, 500);
//   },
//
// };
module.exports={
  'GET /api/user':function(req,res) {
    res.json({
      take:'111111'
    })
  }
}
