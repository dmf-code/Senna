<template>
  <el-dialog title="添加角色-菜单" :visible.sync="dialogFormVisible" :append-to-body="true">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="角色">
        <el-select v-model="form.role_id" placeholder="请选择">
          <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单">
        <el-transfer
          filterable
          :filter-method="filterMethod"
          :titles="['未绑定菜单', '已绑定菜单']"
          filter-placeholder="请输入菜单名称"
          v-model="form.menus"
          :data="menus"
          :left-default-checked="leftChecked"
          :right-default-checked="rightChecked"
          @change="handleChange"
        ></el-transfer>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { role, menu, roleMenu } from "@/apis/backend/index";
export default {
  mounted() {
    role().then(res => {
      if (res.data.status == true) {
        this.roles = res.data.data;
      } else {
        console.log("失败");
      }
    });
    menu().then(res => {
      if (res.data.status == true) {
        let menus = res.data.data;
        menus.forEach(element => {
          this.menus.push({
            key: element.id,
            label: element.name + "-" + element.url
          });
        });
      }
    });
  },
  methods: {
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    onSubmit() {
      roleMenu(
        {
          role_id: this.form.role_id,
          menu_id: this.form.menus.join(",")
        },
        "POST"
      ).then(res => {
        if (res.data.status == true) {
          this.$message({ message: "添加成功", type: "success" });
          this.dialogFormVisible = false;
          this.$router.replace("/refresh");
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    filterMethod(query, item) {
      return item.label.indexOf(query) > -1;
    }
  },
  data: function() {
    return {
      dialogFormVisible: false,
      roles: [],
      menus: [],
      leftChecked: [],
      rightChecked: [],
      form: {
        role_id: 1,
        menus: []
      }
    };
  }
};
</script>

<style>
</style>
