import vueSeamlessScroll from 'vue-seamless-scroll'

export default {
  components: {
    vueSeamlessScroll
  },
  name: 'yxy-table-body',
  props: {
    scrollOption: {
      type: Object,
      default: () => ({
        singleHeight: 50,
        waitTime: 3000
      })
    }
  },
  computed: {
    table() {
      return this.$parent
    }
  },
  methods: {
    getBodyCellStyle(column) {
      return {
        width: column.width + 'px',
        'text-align': column.align
      }
    },
  },
  render(h) {
    let tableData = this.table.data;
    let columns = this.table.columnList;
    return (
      <vue-seamless-scroll class="main" data={tableData} class-option={this.scrollOption}>
        {
          tableData.map((row, index) => 
            <div class="table-item">
              <div class="sequence id">{ index + 1 }</div>
                {columns.map(column => 
                      // 
                  <div style={{width: column.originWidth + '%', textAlign: column.textAlign}}>
                        {column.renderCell(row, index)}
                  </div>
                )}
          </div>
        )
        }
      </vue-seamless-scroll>
    )
  }
}