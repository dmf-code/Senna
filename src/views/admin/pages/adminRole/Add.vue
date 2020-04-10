<template>
  <el-dialog title="添加角色-菜单" :visible.sync="dialogFormVisible" :append-to-body="true">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户">
        <el-select v-model="form.admin_id" placeholder="请选择">
          <el-option v-for="item in admins" :key="item.id" :label="item.username" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色">
        <el-transfer
          filterable
          :filter-method="filterMethod"
          :titles="['未绑定角色', '已绑定角色']"
          filter-placeholder="请输入菜单名称"
          v-model="form.roles"
          :data="roles"
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
export default {
  mounted() {
    this.axios.get("/api/backend/admin").then(res => {
      if (res.data.status == true) {
        this.admins = res.data.data;

        console.log(this.admins);
      } else {
        console.log("失败");
      }
    });

    this.axios.get("/api/backend/role").then(res => {
      if (res.data.status == true) {
        let roles = res.data.data;
        roles.forEach(element => {
          this.roles.push({
            key: element.id,
            label: element.name
          });
        });
      }
    });

    this.axios.get("/api/backend/adminRole").then(response => {
      if (response.data.status == true) {
        this.form.roles = response.data.args[0] ? response.data.args[0] : [];
        console.log("this.form.roles", this.form.roles);
      }
    });
  },
  watch: {
    "form.admin_id": {
      handler(val, oldval) {
        console.log("watch");
        console.log(val, oldval);
      },
      deep: true
    }
  },
  methods: {
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    onSubmit() {
      if (this.form.menus.length == 0) {
        this.$message({ message: "菜单不能为空", type: "alert" });
        return;
      }
      this.axios
        .post("/api/backend/adminRole", {
          role_id: this.form.role_id,
          menu_id: this.form.menus.join(",")
        })
        .then(res => {
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
      admins: [],
      roles: [],
      leftChecked: [],
      rightChecked: [],
      form: {
        admin_id: null,
        roles: []
      }
    };
  }
};
</script>

<style>
</style>
