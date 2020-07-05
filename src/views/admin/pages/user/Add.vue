<template>
  <el-dialog title="添加用户" :visible.sync="dialogFormVisible" :append-to-body="true">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.password2" show-password></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-cascader :options="roles" v-model="form.roles_id" :props="props" clearable></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { admin, role } from "@/apis/backend/index";
export default {
  mounted: function() {
    role().then(res => {
      if (res.data.status == true) {
        console.log(res.data.data);
        res.data.data.forEach(element => {
          this.roles.push({ value: element.id, label: element.name });
        });
      }
    });
  },
  methods: {
    onSubmit() {
      if (this.form.password != this.form.password2) {
        this.$message({ message: "密码不一致", type: "alert" });
        return;
      }
      admin(
        {
          username: this.form.username,
          password: this.form.password,
          rolesId: this.form.roles_id.join(",")
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
    }
  },
  data: function() {
    return {
      props: { multiple: true },
      dialogFormVisible: false,
      form: {
        name: "",
        memo: "",
        roles_id: ""
      },
      roles: []
    };
  }
};
</script>

<style>
</style>
