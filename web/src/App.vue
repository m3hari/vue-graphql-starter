<template>
  <div v-if="error">Error : {{ error }}</div>

  <div v-if="todos" class="container">
    <h1>Todos</h1>
    <ul style="margin: 0; padding: 0">
      <ol v-for="item in todos" :key="item.id" class="item">
        <div class="content">{{ item.content }}</div>
        <div>
          by <strong>{{ item.owner.name }}</strong>
        </div>
      </ol>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useSubscription } from "@urql/vue";

import { TODOS } from "./gql/todos.gql";

export default defineComponent({
  setup() {
    const { data, error } = useSubscription(
      { query: TODOS },
      (_, updates) => updates.todos
    );

    return {
      todos: data,
      error,
    };
  },
});
</script>
<style>
.container {
  width: 960px;
  margin: auto;
}
.item {
  padding: 0;
  padding-bottom: 4px;
  margin-bottom: 4px;
}
.item .content {
  font-size: 1.2rem;
  padding: 2px;
}
</style>
