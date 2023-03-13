export default {
  name:'sd-table-body',
  computed:{
    table(){
      return this.$parent
    }
  },
  props:{
    store: {
      require: true
    }
  },
  methods:{
    getBodyCellStyle(column){
      return {
        width: column.width + 'px',
        'text-align': column.align
      }
    },
  },
  render(h) {
    let tableData = this.table.tableData ;
    let columns = this.store.getColumns() ;
    let tableWidth = this.store.getTableWidth() ;
    return (
      <table cellspacing="0" border='0' cellpadding="0" style={{width: tableWidth + 'px'}}>
        {tableData.map((row, index) =>
          <tr  class={['sd-table-tr',row.$checked?'sd-table-tr-choose':'']}>
            {columns.map(column => <td class={'sd-table-body__td'} style={this.getBodyCellStyle(column)}>
              <div>{column.renderCell(row, index)}</div>
            </td>)}
          </tr>)
        }
      </table>
    )
  }
}