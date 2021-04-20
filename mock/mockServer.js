import Mock from 'mockjs'
const swipes =
{
  code: 200,
  data: [
    {
      imgUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.kanzhun.com%2Fimages%2Fseo%2Fmianshiti%2F20191126%2Fc9140a2d7c1ce1e340854ba065450568.jpg&refer=http%3A%2F%2Fimg.kanzhun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621406639&t=7a4464962f1ff69184c73549e6167ddb"
    },
    {
      imgUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fgss0.baidu.com%2F7Po3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F37d3d539b6003af31d5ddb66362ac65c1138b6d4.jpg&refer=http%3A%2F%2Fgss0.baidu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621413852&t=fba38d6249d5343781b2d87e5e585e19"
    },
    {
      imgUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fgss0.baidu.com%2F7Po3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F37d3d539b6003af31d5ddb66362ac65c1138b6d4.jpg&refer=http%3A%2F%2Fgss0.baidu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621413852&t=fba38d6249d5343781b2d87e5e585e19"
    }
  ]
};
const patients =[
  {
    id:'1',
    title:'张大爷',
    label:'男',
    path:'/patient',
    imgUrl:'../../static/images/20170622131955_h4eZS.thumb.700_0.jpeg'
  },
  {
    id:'2',
    title:'李大爷',
    label:'男',
    path:'/patient',
    imgUrl:'../../static/images/20170622131955_h4eZS.thumb.700_0.jpeg'
  },
  {
    id:'3',
    title:'张奶奶',
    label:'女',
    path:'/patient',
    imgUrl:'../../static/images/20170622131955_h4eZS.thumb.700_0.jpeg'
  },
  {
    id:'4',
    title:'李大爷',
    label:'男',
    path:'/patient',
    imgUrl:'../../static/images/20170622131955_h4eZS.thumb.700_0.jpeg'
  },
  {
    id:'5',
    title:'王奶奶',
    label:'女',
    path:'/patient',
    imgUrl:'../../static/images/20170622131955_h4eZS.thumb.700_0.jpeg'
  }
];
Mock.mock('/swipes',swipes);
Mock.mock('/patients',patients);
Mock.mock("/patient", "post", (options)=>{
  const jsonObj = eval('(' + options.body + ')');
  const patient = patients.filter(p=>p.id == jsonObj.pid);
  return patient[0];
});