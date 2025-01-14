<script setup>
import { computed, ref } from 'vue';
import { editVideoInfoService } from '@/services/videos';

const { videoId } = defineProps(['videoId']);
const emit = defineEmits(['update']);

const dialog = ref(false);
const rules = ref({
  required: value => !!value || 'Campo obrigatório.',
  description: value => value.length <= 300 || 'A descrição deve ter no máximo 300 caracteres.'
});
const formRef = ref(null);
const title = ref('')
const description = ref('')
const loading = ref(false)

const formCompleted = computed(() => {
  return title.value !== "" && description.value !== "" 
})

async function onSubmit() {
  loading.value = true
  try {
    const body = {
      title: title.value,
      description: description.value
    }
    const res = await editVideoInfoService(videoId, body)
    emit('update', res)
  } catch (error) {
    console.log(error);
  }
  loading.value = false
  dialog.value = false
}

</script>
<template>
  <v-btn append-icon="mdi-pencil" @click="dialog = true">
    Editar
  </v-btn>

  <v-dialog v-model="dialog" width="auto">
    <form ref="formRef" @submit.prevent="onSubmit">
      <v-card max-width="500" prepend-icon="mdi-update" title="Editar informações do vídeo">
        <v-divider />
        <v-card-text>
          <div class="text-medium-emphasis mb-6">
            Preencha os campos abaixo para editar as informações do vídeo.
          </div>
          <v-text-field v-model="title" :rules="[rules.required]" label="Título" placeholder="Digite o título do vídeo"
            variant="outlined" class="mb-3" />
          <v-textarea v-model="description" :rules="[rules.required, rules.description]" label="Descrição"
            placeholder="Digite a descrição do vídeo" :counter="300" class="mb-2" rows="2" variant="outlined"
            persistent-counter />
        </v-card-text>

        <v-divider />
        <template #actions>
          <v-spacer />

          <v-btn text="Cancelar" variant="plain" @click="dialog = false" />

          <v-btn :disabled="!formCompleted" :loading="loading" text="Salvar" variant="tonal" type="submit"/>
        </template>
      </v-card>
    </form>
  </v-dialog>
</template>