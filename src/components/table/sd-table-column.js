let columnIdSeed = 0 ;
export default  {
  name: 'sd-table-column',
  computed:{
    tableColumnId(){
      return 'columnId-' + (columnIdSeed++)
    },
    table(){
      return this.$parent
    },
  },
    props:{
      label: String,
      prop: String,
      width: String,
      align: String,
      type: String,
      sortable:{
        type:Boolean,
        default:false,
      }
    },
  data(){
    return{
      column:{},
      value_2: false,
    }
  },
    methods:{
      renderCell(data,index){
        let curIndex = index + 1 ;
        if(this.type ==='index') {
          return curIndex ;
        }
        if(this.type ==='selection') {
          this.column.renderCell = (data,index) => (
            <div class="cell">
            <input type="checkbox"   checked={data.$checked}  on-click={ ($event) => this.selectionChange($event, data) }  id={index}/>
          </div>
          );
          return ;
        }
        if(this.prop) return data[this.prop]
        return this.$scopedSlots.default({
          $index: curIndex,
          row: data
        })
      },
      selectionChange(event,row){
        let isExist = false ;
 
        if(row.$checked){
          //row.$checked = !row.$checked
          this.$set(row,'$checked',!row.$checked);
        }else{
          this.$set(row,'$checked',true);
          //row.$checked = true ;
        }
 
        if(row.$checked){
          this.table.selectRowData.forEach((item)=>{
            if(item == row){
              isExist = true ;
            }
          })
          if(!isExist){
            this.table.selectRowData.push(row) ;
          }
        }else{
          for(let i = 0 ; i <  this.table.selectRowData.length ; i ++){
            if(this.table.selectRowData[i] == row){
              this.table.selectRowData.splice(i,1);
            }
          }
        }
        this.table.$emit("selection-change",this.table.selectRowData) ;
      },
      test(event,data){
        console.log(event.target.id);
      }
    },
    watch:{
      value_2(newVal){
        console.log(newVal)
      }
    },
    created(){
      this.column = {
        tableId: this.table.tableId,
        columnId: this.tableColumnId,
        label: this.label,
        prop: this.prop,
        originWidth: this.width,
        width: 0 ,
        slots: this.$slots.default,
        align: this.align,
        renderCell: this.renderCell,
        type: this.type,
        sortable:this.sortable,
      }
      this.table.store.insertColumn(this.column)
    },
    render(h){
      return h('div', this.$slots.default) ;
    }
}