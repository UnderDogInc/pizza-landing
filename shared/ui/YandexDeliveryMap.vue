<script lang="ts" setup>
/**
 * Карта с зоной доставки и подсказками адресов (SuggestView).
 * Требует NUXT_PUBLIC_YANDEX_MAPS_APIKEY и опционально NUXT_PUBLIC_YANDEX_SUGGEST_APIKEY.
 */
import type {
  YmapsMapInstance,
  YmapsRuntimeConfig,
  YmapsSuggestSelectEvent,
  YmapsWindow,
} from "~/shared/types/yandex-maps";

const config = useRuntimeConfig().public as YmapsRuntimeConfig;

const model = defineModel<string>({ default: "" });

const mapContainer = ref<HTMLElement | null>(null);
const suggestInput = ref<HTMLInputElement | null>(null);
const loaded = ref(false);
const error = ref("");

const deliveryZoneRing: [number, number][] = [
  [37.52, 55.72],
  [37.72, 55.72],
  [37.72, 55.82],
  [37.52, 55.82],
  [37.52, 55.72],
];
const mapCenter: [number, number] = [37.62, 55.77];

let mapInstance: YmapsMapInstance | null = null;
let suggestViewInstance: { destroy: () => void } | null = null;

function getWindowYmaps(): YmapsWindow {
  return typeof window !== "undefined" ? (window as YmapsWindow) : ({} as YmapsWindow);
}

function loadYandexMaps(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  const key = config.yandexMapsApikey;
  const suggestKey = config.yandexSuggestApikey || key;
  if (!key) {
    error.value = "NUXT_PUBLIC_YANDEX_MAPS_APIKEY";
    return Promise.resolve();
  }
  const url = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${encodeURIComponent(key)}&suggest_apikey=${encodeURIComponent(suggestKey)}`;
  return new Promise((resolve, reject) => {
    const win = getWindowYmaps();
    if (win.ymaps) {
      win.ymaps.ready(() => resolve());
      return;
    }
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onload = () => {
      getWindowYmaps().ymaps?.ready(() => resolve());
    };
    script.onerror = () => reject(new Error("Не удалось загрузить Яндекс.Карты"));
    document.head.appendChild(script);
  });
}

function initMap() {
  const ymaps = getWindowYmaps().ymaps;
  if (!ymaps || !mapContainer.value) return;

  const map = new ymaps.Map(mapContainer.value, {
    center: mapCenter,
    zoom: 11,
    controls: ["zoomControl"],
  });

  const polygon = new ymaps.Polygon(
    [deliveryZoneRing],
    {},
    {
      fillColor: "rgba(234, 179, 8, 0.2)",
      strokeColor: "rgba(234, 179, 8, 0.8)",
      strokeWidth: 2,
    }
  );
  map.geoObjects.add(polygon);
  mapInstance = map;
}

function initSuggest() {
  const ymaps = getWindowYmaps().ymaps;
  if (!ymaps || !suggestInput.value) return;

  suggestViewInstance = new ymaps.SuggestView(suggestInput.value, {
    results: 5,
  });
  suggestViewInstance.events.add("select", (e: YmapsSuggestSelectEvent) => {
    const item = e.get("item");
    if (item?.value) {
      model.value = item.value;
    }
  });
}

onMounted(async () => {
  try {
    await loadYandexMaps();
    loaded.value = true;
    await nextTick();
    initMap();
    initSuggest();
  } catch (e) {
    error.value =
      e instanceof Error ? e.message : "Не удалось загрузить карту";
  }
});

onBeforeUnmount(() => {
  suggestViewInstance?.destroy();
  suggestViewInstance = null;
  mapInstance?.destroy();
  mapInstance = null;
});
</script>

<template>
  <div class="flex flex-col gap-3">
    <label class="text-sm font-medium text-dark-700">
      Адрес доставки
    </label>
    <input
      ref="suggestInput"
      v-model="model"
      type="text"
      placeholder="Введите адрес"
      class="w-full rounded-xl border border-dark-200 bg-white px-4 py-3 text-dark-900 placeholder:text-dark-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      autocomplete="off"
    />
    <div
      ref="mapContainer"
      class="h-[280px] w-full overflow-hidden rounded-xl bg-secondary/30"
    />
    <p v-if="error" class="text-sm text-red-600">
      {{ error }}
    </p>
    <p v-if="!loaded && !error" class="text-sm text-dark-500">
      Загрузка карты…
    </p>
  </div>
</template>
