<script setup lang="ts">
import { Table as TableV2 } from './main'
</script>

<template>
  <div class="font-sans">
    <Suspense>
      <TableSearch />
    </Suspense>

    <Suspense>
      <TableFilters />
    </Suspense>
    <Suspense>
      <TableV2
        source="http://3.85.80.143:7700"
        password="NtUvZv5Q87e355b807622149c350ac38679645b4e2603a1d3eb48cda080f977e76329aeb"
        type="orders"
        columns="
          id: Order,
          customer_name: Customer,
          customer_po: PO#,
          part_name: Parts,
          created_at: Ordered,
          due_at: Due,
          stage_name: Status"
        sort="id:desc"
        sorts="created_at, customer_name, customer_po, due_at, id, part_name, stage_name"
        filters="
          created_at: date-range,
          customer_name: multi-select,
          customer_po: multi-select,
          document_types: multi-select,
          due_at: date-range,
          id: multi-select,
          invoice_number: multi-select,
          part_name: multi-select,
          stage_name: multi-select,
          vendor_name: multi-select"
        actions="Info"
        per-page="50"
        selectable="true"
      >
        <template #id="id">
          <a href="#" class="flex font-medium text-yellow-600">
            {{ id.value }}
          </a>
        </template>

        <template #customer_name="customerName">
          <a href="#" class="flex font-medium text-yellow-600">
            {{ customerName.value }}
          </a>
        </template>
        <template #part_name="parts">
          <a v-for="(part, index) in parts.value" :key="index" href="#" class="flex font-medium text-yellow-600">
            {{ part }}
          </a>
        </template>
      </TableV2>
    </Suspense>

    <Suspense>
      <TablePagination />
    </Suspense>
  </div>
</template>
