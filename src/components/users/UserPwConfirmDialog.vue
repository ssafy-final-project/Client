<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600" persistent>
      <v-card title="본인인증">
        <template v-if="!store.userType">
          <v-divider></v-divider>
          <v-card-text>
            <small class="text-caption text-medium-emphasis"
              >비밀번호를 입력해주세요</small
            >
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn
              text="Close"
              variant="plain"
              @click="$emit('closeDialog', 'close')"
            ></v-btn>

            <v-btn
              color="primary"
              text="Save"
              variant="tonal"
              @click="$emit('closeDialog', 'save', password)"
            ></v-btn>
          </v-card-actions>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { oauthKakaoLogin } from "@/api/oauth";
import { useUserStore } from "@/stores/user";
import { ref, watch, watchEffect } from "vue";
const dialog = ref(false);
const props = defineProps(["isActive"]);
const password = ref("");

const store = useUserStore();

watchEffect(() => {
  // console.log(props.isActive);
  dialog.value = props.isActive;
});
</script>
