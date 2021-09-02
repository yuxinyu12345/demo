let a = [{
  name: '集团',
  id: 1,
  children: [{
      name: '1部',
      id: 2
    },
    {
      name: '2部',
      id: 3
    },
    {
      name: '4部',
      id: 4
    },
    {
      name: '5部',
      id: 5
    },
    {
      name: '7部',
      id: 6,
      children: [{
          name: '7部',
          id: 7
        },
        {
          name: '8部',
          id: 8
        },
        {
          name: '9部',
          id: 9
        },
      ]
    },
  ]
}]

/* function find(id, arr) {
 if(arr.length == 0) return
 for(let item of arr) {
   if(item.id == id) {
     return item.name
   }else if(item?.children) {
     find(id, item.children)
   }
 }
} */

function find(arr, id) {
  if (arr == null) return null;
  for (let obj of arr) {
      if (obj.id == id) {
          return obj.name;
      }
      let ret = find(obj.children, id);
      if (ret) return ret;
  }
  return null;
}

function collect(obj) {
  let ret = [obj.name];
  return ret;
}

console.log(find(a,9));