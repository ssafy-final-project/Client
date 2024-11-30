<template>
  <div class="form-container">
    <div class="form-header">
      <h2 class="form-title">회원정보 입력</h2>
    </div>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      status-icon
      class="registration-form"
      label-width="120px"
      @validate="onValidate"
    >
      <!-- 아이디 -->
      <el-form-item label="아이디" prop="id" class="mb-2">
        <div class="d-flex align-items-center">
          <el-input v-model="form.id" placeholder="아이디 입력" />
          <el-button
            type="primary"
            class="ms-2"
            @click="checkDuplicate"
            :disabled="idCheckDisabled"
          >
            중복체크
          </el-button>
        </div>
        <div id="id-message" :class="idAvailableTextColor">{{ idAvailableText }}</div>
      </el-form-item>

      <!-- 비밀번호 -->
      <el-form-item label="비밀번호" prop="pw">
        <el-input v-model="form.pw" type="password" placeholder="비밀번호 입력" />
      </el-form-item>

      <!-- 비밀번호 확인 -->
      <el-form-item label="비밀번호 확인" prop="confirmpw">
        <el-input v-model="form.confirmpw" type="password" placeholder="비밀번호 확인" />
      </el-form-item>

      <!-- 이름 -->
      <el-form-item label="이름" prop="name">
        <el-input v-model="form.name" placeholder="이름 입력" />
      </el-form-item>

      <!-- 주소 -->
      <el-form-item label="주소" prop="address">
        <el-input v-model="form.address" placeholder="주소 입력" />
      </el-form-item>

      <!-- 전화번호 -->
      <el-form-item label="전화번호" prop="phone">
        <el-input v-model="form.phone" placeholder="전화번호 입력 (010-1234-5678)" />
      </el-form-item>

      <!-- 버튼 -->
      <el-form-item class="form-buttons">
        <el-button type="primary" @click="submitForm">제출</el-button>
        <el-button @click="resetForm">초기화</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { userSignUp, checkUserId } from "@/api/user";
import { useRouter } from "vue-router";

const router = useRouter();
const idAvailableText = ref("");
const idAvailableTextColor = ref("");
const idAvailable = ref(false);
const idCheckDisabled = ref(true);

const onValidate = (prop, isValid) => {
  if (prop === "id") {
    if (isValid) {
      console.log("아이디 유효성 검사 통과");
      idCheckDisabled.value = false;
    } else {
      console.log("아이디 유효성 검사 실패");
      idCheckDisabled.value = true;
    }
  }
};

function signUp() {
  userSignUp(
    form,
    ({ data }) => {
      console.log(data);
      if (data === 1) {
        alert("회원가입 성공적으로 완료!");
        router.push({ name: "login" });
      }
    },
    (error) => console.log(error)
  );
}

function checkDuplicate() {
  checkUserId(
    form.id,
    ({ data }) => {
      // idAvailableId.value = data == 1 ? true : false;
      if (data == 1) {
        console.log("아이디가 이미 사용중입니다.");
        idAvailableText.value = "이미 사용중인 아이디입니다";
        idAvailableTextColor.value = "text-red-500";
        idAvailable.value = false;
        return;
      } else {
        console.log("사용 가능한 아이디입니다");
        idAvailableText.value = "사용 가능한 아이디입니다";
        idAvailableTextColor.value = "text-blue-500";
        idAvailable.value = true;
      }
    },
    console.log
  );
}

const formRef = ref(null);

const form = reactive({
  id: "",
  pw: "",
  confirmpw: "",
  name: "",
  address: "",
  phone: "",
});

const rules = reactive({
  id: [
    { required: true, message: "아이디를 입력해주세요.", trigger: "blur" },
    {
      pattern: /^[a-zA-Z0-9]{6,10}$/, // 영문, 숫자만 허용하며 길이는 6~10자
      message: "아이디는 영문자와 숫자만 포함되며, 6자 이상 10자 이하로 입력해주세요.",
      trigger: "blur",
    },
    {
      pattern: /^[^_]*$/,
      message: '아이디에 "_"는 들어갈 수 없습니다.',
      trigger: "blur",
    },
  ],
  pw: [
    { required: true, message: "비밀번호를 입력해주세요.", trigger: "blur" },
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
      // pattern: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
      message: "비밀번호는 영문자, 숫자, 특수문자를 포함한 8자리 이상이어야 합니다.",
      trigger: "blur",
    },
  ],
  confirmpw: [
    { required: true, message: "비밀번호 확인을 입력해주세요.", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== form.pw) {
          callback(new Error("비밀번호가 일치하지 않습니다."));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  name: [{ required: true, message: "이름을 입력해주세요.", trigger: "blur" }],
  address: [{ required: true, message: "주소를 입력해주세요.", trigger: "blur" }],
  phone: [
    { required: true, message: "전화번호를 입력해주세요.", trigger: "blur" },
    {
      pattern: /^010-\d{4}-\d{4}$/,
      message: "전화번호는 010-1234-5678 형식이어야 합니다.",
      trigger: "blur",
    },
  ],
});

const submitForm = () => {
  if (!formRef.value) return;
  formRef.value.validate((valid) => {
    if (valid && idAvailable.value) {
      console.log("폼 제출:", form);
      signUp();
    } else {
      console.log("폼 제출 실패!");
    }
  });
};

const resetForm = () => {
  if (!formRef.value) return;
  formRef.value.resetFields();
};
</script>

<style scoped>
/* 부모 컨테이너의 높이를 기준으로 중앙 정렬 */
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
}

/* 제목과 구분선 */
.form-header {
  width: 100%;
  max-width: 400px;
  text-align: center;
  margin-bottom: 24px;
}
.form-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 8px;
}
.form-divider {
  border: none;
  border-top: 1px solid #ccc;
  margin: 0;
}

/* 폼 스타일 */
.registration-form {
  padding: 24px; /* 추가 여백 */
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px; /* 항목 간의 간격 */
}

/* 버튼 정렬 */
.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
