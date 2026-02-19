<script lang="ts" setup>
import Drawer from "primevue/drawer";
import Button from "primevue/button";
import { useAuthModal, useCurrentUser } from "#features/auth";
import { useCart } from "#features/cart";
import { QuantityCounter } from "#shared/ui";

const isVisible = ref(false);
const { user, load: loadUser } = useCurrentUser();
const { open: openAuthModal } = useAuthModal();

const {
  cart,
  totalCount,
  sum,
  pending,
  addProduct,
  decrementProduct,
  addPromo,
  decrementPromo,
} = useCart();

const hasItems = computed(
  () => cart.value.products.length > 0 || cart.value.promo.length > 0
);

function formatPrice(value: number): string {
  return value.toLocaleString("ru-RU");
}

async function handleCheckoutClick() {
  await loadUser();
  if (user.value) {
    isVisible.value = false;
    await navigateTo("/checkout");
  } else {
    isVisible.value = false;
    openAuthModal("register");
  }
}
</script>

<template>
  <div>
    <div class="fixed bottom-8 right-8 z-[99] hidden md:block">
      <button
        type="button"
        class="cart-fab relative flex h-16 w-16 items-center justify-center rounded-full border-0 bg-primary text-white shadow-[0_4px_20px_rgba(255,107,53,0.4)] transition-all hover:scale-110 hover:rotate-[10deg] hover:shadow-[0_6px_30px_rgba(255,107,53,0.6)]"
        aria-label="Корзина"
        @click="isVisible = true"
      >
        <i class="pi pi-shopping-cart text-2xl" aria-hidden="true" />
        <span
          v-if="totalCount > 0"
          class="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-primary shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
        >
          {{ totalCount }}
        </span>
      </button>
    </div>

    <div
      class="fixed bottom-4 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 px-4 md:hidden"
    >
      <Button
        :label="`В корзине ${totalCount}`"
        icon="pi pi-shopping-cart"
        class="!w-full !rounded-full !border-0 !bg-primary !px-4 !py-3 !text-sm !font-semibold !text-white !shadow-lg hover:!bg-primary-600"
        @click="isVisible = true"
      />
    </div>

    <Drawer
      v-model:visible="isVisible"
      position="right"
      header="Корзина"
      class="!w-full sm:!w-[440px]"
    >
      <div v-if="!hasItems" class="py-8 text-center text-dark-500">
        Корзина пока пустая
      </div>

      <div v-else class="flex h-full flex-col gap-6">
        <section v-if="cart.products.length">
          <h3
            class="mb-3 text-sm font-semibold uppercase tracking-wider text-dark-500"
          >
            Товары
          </h3>
          <ul class="space-y-3">
            <li
              v-for="line in cart.products"
              :key="`product-${line.id}`"
              class="rounded-xl border border-dark-100 p-3"
            >
              <div class="flex items-start justify-between gap-3">
                <div
                  class="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-secondary/50 sm:h-16 sm:w-16"
                >
                  <NuxtImg
                    v-if="line.product.url"
                    :src="line.product.url"
                    :alt="line.product.name"
                    class="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-semibold text-dark-900">
                    {{ line.product.name }}
                  </p>
                  <p
                    v-if="line.product.description"
                    class="mt-1 text-xs text-dark-500"
                  >
                    {{ line.product.description }}
                  </p>
                </div>
                <p class="shrink-0 text-sm font-bold text-dark-900">
                  {{ formatPrice(line.product.price * line.quantity) }} ₽
                </p>
              </div>
              <div class="mt-2">
                <QuantityCounter
                  :value="line.quantity"
                  :loading="pending"
                  @increment="addProduct(line.product)"
                  @decrement="decrementProduct(line.product)"
                />
              </div>
            </li>
          </ul>
        </section>

        <section v-if="cart.promo.length">
          <h3
            class="mb-3 text-sm font-semibold uppercase tracking-wider text-dark-500"
          >
            Комбо
          </h3>
          <ul class="space-y-3">
            <li
              v-for="line in cart.promo"
              :key="`promo-${line.id}`"
              class="rounded-xl border border-dark-100 p-3"
            >
              <div class="flex items-start justify-between gap-3">
                <div
                  class="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-secondary/50 sm:h-16 sm:w-16"
                >
                  <NuxtImg
                    v-if="line.promo.url"
                    :src="line.promo.url"
                    :alt="line.promo.name"
                    class="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-semibold text-dark-900">
                    {{ line.promo.name }}
                  </p>
                  <p
                    v-if="line.promo.description"
                    class="mt-1 text-xs text-dark-500"
                  >
                    {{ line.promo.description }}
                  </p>
                </div>
                <p class="shrink-0 text-sm font-bold text-dark-900">
                  {{ formatPrice(line.promo.price * line.quantity) }} ₽
                </p>
              </div>
              <div class="mt-2">
                <QuantityCounter
                  :value="line.quantity"
                  :loading="pending"
                  @increment="addPromo(line.promo)"
                  @decrement="decrementPromo(line.promo)"
                />
              </div>
            </li>
          </ul>
        </section>

        <div class="mt-auto space-y-3">
          <div class="rounded-xl bg-secondary p-4">
            <div class="flex items-center justify-between">
              <span class="text-sm text-dark-600">Итого</span>
              <span class="text-lg font-bold text-dark-900"
                >{{ formatPrice(sum) }} ₽</span
              >
            </div>
          </div>
          <Button
            class="!w-full !rounded-xl !border-0 !bg-primary !py-3 !font-semibold !text-white hover:!bg-primary/80"
            label="Перейти к оформлению"
            @click="handleCheckoutClick"
          />
        </div>
      </div>
    </Drawer>
  </div>
</template>
