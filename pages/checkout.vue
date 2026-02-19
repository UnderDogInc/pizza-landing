<script lang="ts" setup>
import Button from "primevue/button";
import { useCart } from "#features/cart";
import { QuantityCounter, YandexDeliveryMap } from "#shared/ui";

definePageMeta({
  layout: "default",
});

const {
  cart,
  sum,
  pending,
  addProduct,
  decrementProduct,
  addPromo,
  decrementPromo,
} = useCart();
const deliveryAddress = ref("");
const addressForm = ref({
  city: "",
  street: "",
  house: "",
  apartment: "",
  comment: "",
});
const orderPending = ref(false);

const hasItems = computed(
  () => cart.value.products.length > 0 || cart.value.promo.length > 0
);

function formatPrice(value: number): string {
  return value.toLocaleString("ru-RU");
}

function handleSubmitOrder() {
  orderPending.value = true;
  // TODO: отправка заказа на бэкенд
  setTimeout(() => {
    orderPending.value = false;
  }, 500);
}
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-8">
    <h1 class="mb-8 text-2xl font-bold tracking-tight text-white sm:text-3xl">
      Оформление заказа
    </h1>

    <div v-if="!hasItems" class="rounded-xl border border-white/20 bg-white/5 p-8 text-center text-white/80">
      Корзина пуста. <NuxtLink to="/" class="font-medium text-primary hover:underline">Перейти в каталог</NuxtLink>
    </div>

    <template v-else>
      <section class="mb-8">
        <h2 class="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl">
          Состав заказа
        </h2>
        <ul class="space-y-3">
          <li
            v-for="line in cart.products"
            :key="`product-${line.id}`"
            class="flex flex-wrap items-center gap-3 rounded-xl border border-dark-100 bg-white p-3"
          >
            <div
              class="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-secondary/50"
            >
              <NuxtImg
                v-if="line.product.url"
                :src="line.product.url"
                :alt="line.product.name"
                class="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div class="min-w-0 flex-1">
              <p class="font-medium text-dark-900">
                {{ line.product.name }}
              </p>
              <p class="text-sm text-dark-500">
                {{ line.quantity }} × {{ formatPrice(line.product.price) }} ₽
              </p>
            </div>
            <div class="flex shrink-0 items-center gap-3">
              <p class="font-semibold text-dark-900">
                {{ formatPrice(line.product.price * line.quantity) }} ₽
              </p>
              <QuantityCounter
                :value="line.quantity"
                :loading="pending"
                @increment="addProduct(line.product)"
                @decrement="decrementProduct(line.product)"
              />
            </div>
          </li>
          <li
            v-for="line in cart.promo"
            :key="`promo-${line.id}`"
            class="flex flex-wrap items-center gap-3 rounded-xl border border-dark-100 bg-white p-3"
          >
            <div
              class="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-secondary/50"
            >
              <NuxtImg
                v-if="line.promo.url"
                :src="line.promo.url"
                :alt="line.promo.name"
                class="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div class="min-w-0 flex-1">
              <p class="font-medium text-dark-900">
                {{ line.promo.name }}
              </p>
              <p class="text-sm text-dark-500">
                {{ line.quantity }} × {{ formatPrice(line.promo.price) }} ₽
              </p>
            </div>
            <div class="flex shrink-0 items-center gap-3">
              <p class="font-semibold text-dark-900">
                {{ formatPrice(line.promo.price * line.quantity) }} ₽
              </p>
              <QuantityCounter
                :value="line.quantity"
                :loading="pending"
                @increment="addPromo(line.promo)"
                @decrement="decrementPromo(line.promo)"
              />
            </div>
          </li>
        </ul>
        <div class="mt-4 flex justify-end rounded-xl bg-secondary p-4">
          <span class="text-lg font-bold text-dark-900">
            Итого: {{ formatPrice(sum) }} ₽
          </span>
        </div>
      </section>

      <form class="space-y-8" @submit.prevent="handleSubmitOrder">
        <section>
          <h2 class="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl">
            Адрес доставки
          </h2>
          <ClientOnly>
            <YandexDeliveryMap v-model="deliveryAddress" />
            <template #fallback>
              <div class="flex flex-col gap-3">
                <input
                  v-model="deliveryAddress"
                  type="text"
                  placeholder="Введите адрес"
                  class="w-full rounded-xl border border-dark-200 bg-white px-4 py-3"
                />
                <div class="h-[280px] w-full rounded-xl bg-secondary/30" />
              </div>
            </template>
          </ClientOnly>

          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <label class="flex flex-col gap-1.5">
              <span class="text-sm font-medium text-white/90">Город</span>
              <input
                v-model="addressForm.city"
                type="text"
                placeholder="Москва"
                class="rounded-xl border border-dark-200 bg-white px-4 py-3 text-dark-900 placeholder:text-dark-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label class="flex flex-col gap-1.5">
              <span class="text-sm font-medium text-white/90">Улица</span>
              <input
                v-model="addressForm.street"
                type="text"
                placeholder="ул. Примерная"
                class="rounded-xl border border-dark-200 bg-white px-4 py-3 text-dark-900 placeholder:text-dark-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label class="flex flex-col gap-1.5">
              <span class="text-sm font-medium text-white/90">Дом</span>
              <input
                v-model="addressForm.house"
                type="text"
                placeholder="1"
                class="rounded-xl border border-dark-200 bg-white px-4 py-3 text-dark-900 placeholder:text-dark-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label class="flex flex-col gap-1.5">
              <span class="text-sm font-medium text-white/90">Квартира</span>
              <input
                v-model="addressForm.apartment"
                type="text"
                placeholder="10"
                class="rounded-xl border border-dark-200 bg-white px-4 py-3 text-dark-900 placeholder:text-dark-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </label>
          </div>

          <label class="mt-4 flex flex-col gap-1.5">
            <span class="text-sm font-medium text-white/90">Комментарий к заказу</span>
            <textarea
              v-model="addressForm.comment"
              rows="3"
              placeholder="Подъезд, этаж, домофон, время доставки..."
              class="w-full resize-y rounded-xl border border-dark-200 bg-white px-4 py-3 text-dark-900 placeholder:text-dark-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </section>

        <div class="flex flex-col gap-4">
          <Button
            type="submit"
            label="Заказать"
            :loading="orderPending"
            :disabled="orderPending"
            class="!w-full !rounded-xl !border-0 !bg-primary !py-3.5 !text-base !font-semibold !text-white hover:!bg-primary-600"
          />
        </div>
      </form>
    </template>
  </div>
</template>
