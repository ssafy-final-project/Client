<template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" width="auto" persistent>
      <v-card
        max-width="400"
        prepend-icon="mdi-update"
        text="정말로 탈퇴하시겠습니까?"
        title="회원탈퇴"
      >
        <template v-slot:actions>
          <v-btn text="취소" @click="$emit('closeDialog', 'cancel')"></v-btn>
          <v-btn text="확인" @click="$emit('closeDialog', 'delete')"></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, watch, watchEffect } from "vue";
const dialog = ref(false);
const props = defineProps(["isActive"]);

watchEffect(() => {
  // console.log(props.isActive);
  dialog.value = props.isActive;
});
</script>
