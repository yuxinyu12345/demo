let columnIdSeed = 0 ;

export default {
  name: 'yxy-table-column',
  computed: {
    tableColumnId(){
      return 'columnId-' + (columnIdSeed++)
    },
    table() {
      return this.$parent
    },
  },
  props: {
    label: String,
    prop: String,
    width: String,
  },
  data() {
    return {
      column: {},
      value_2: false,
    }
  },
  methods: {
    renderCell(data,index){
      let curIndex = index + 1 ;
      if(this.prop) return data[this.prop]
      return this.$scopedSlots.default({
        $index: curIndex,
        row: data
      })
    },
  },
  created() {
    this.column = {
      tableId: this.table.tableId,
      columnId: this.tableColumnId,
      label: this.label,
      prop: this.prop,
      originWidth: this.width,
      width: 0,
      renderCell: this.renderCell,
      slots: this.$slots.default,
    }
    this.table.columnList.push(this.column)
  },
  render(h) {
    return h('div', this.$slots.default);
  }
}