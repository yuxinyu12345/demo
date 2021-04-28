<template>
  <div>
    <el-form :model="formData3" :inline="true" ref="formData3" label-width="65px" size="medium"  >
      <el-form-item
          label="测试"
          required
          class="test"
      >
        </el-form-item>
      <el-row
        v-for="(item,index) in formData3.powerAttrList"
        :key="item.key"
        style="border-bottom: 1px solid #f0f0f0;padding: 10px;"
      >
        <!-- 首先是怎么实现换行的，还有为什么需要添加这个index -->
        <el-form-item
          label="参数名"
          :prop="'powerAttrList[' + index + '].fieldName'"
          :rules="[{ required: true, message: '参数名不能为空',trigger: 'change'},{max: 32, message: '不超过32个字符', trigger: 'change'}]"
        >
          <el-input v-model="item.fieldName" placeholder="请输入参数名" />
        </el-form-item>
        <el-form-item
          label="时间"
          :prop="'powerAttrList.' + index + '.fieldTime'"
          :rules="[{ required: true, message: '时间不能为空',trigger: 'change'}]"
        >
          <el-date-picker
            v-model="item.fieldTime"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="描述"
          :prop="'powerAttrList.' + index + '.fieldDesc'"
          :rules="[{ required: true, message: '描述不能为空',trigger: 'change'}]"
        >
          <el-select clearable v-model="item.fieldDesc" placeholder="请选择描述">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="排序"
          :prop="'powerAttrList.' + index + '.fieldSort'"
          :rules="moreRules.fieldSort"
        >
          <el-input type="number" v-model="item.fieldSort" autocomplete="off" placeholder="请输入排序" />
        </el-form-item>
        <el-button
          type="danger"
          v-if="formData3.powerAttrList.length > 1"
          size="medium"
          @click="removeRow(index)"
        >删除</el-button>
      </el-row>
      <el-row>
        <el-button type="primary" size="medium" @click="addRow">新增属性</el-button>
        <el-button type="primary" size="medium" @click="submit('formData3')">提交</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // select下拉项
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      formData3: {
        powerAttrList: [
          {
            fieldName: "",
            fieldSort: "",
            fieldDesc: "",
            fieldTime: "",
            key: Date.now() // 更改前没有
          }
        ]
      },

      // 新增表单的验证规则
      moreRules: {
        fieldSort: [
          { required: true, message: "请输入排序", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              if (value < 0) {
                callback(new Error("必须大于0"));
              } else if (value.length > 5) {
                callback(new Error("不超过5位数字"));
              } else if (!value) {
                callback(new Error("排序不能为空"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    addRow() {
      this.formData3.powerAttrList.push({
        fieldName: "",
        fieldSort: "",
        fieldDesc: "",
        fieldTime: "",
        key: Date.now() // 更改前没有
      });
    },
    // 删除属性列
    removeRow(index) {
      this.formData3.powerAttrList.splice(index, 1);
    },
    // 提交
    submit(formName) {
      console.log(formName);
      this.$refs[formName].validate(valid => {
        console.log(this.formData3);
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style>
  /* .form {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .test {
    
    padding: 0px;
    margin: 0px;
  } */
</style>
