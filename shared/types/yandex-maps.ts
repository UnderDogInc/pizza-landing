/**
 * Минимальные типы для Яндекс.Карт API 2.1 (без полной типизации SDK).
 */

export interface YmapsRuntimeConfig {
  yandexMapsApikey: string;
  yandexSuggestApikey: string;
}

export interface YmapsWindow {
  ymaps?: YmapsGlobal;
}

export interface YmapsGlobal {
  ready(cb: () => void): void;
  Map: new (element: HTMLElement, state: object, options?: object) => YmapsMapInstance;
  Polygon: new (geometry: number[][][], properties?: object, options?: object) => object;
  SuggestView: new (element: HTMLElement | string, options?: object) => YmapsSuggestViewInstance;
}

export interface YmapsMapInstance {
  geoObjects: { add(obj: object): void };
  destroy(): void;
}

export interface YmapsSuggestViewInstance {
  events: { add(name: string, handler: (e: YmapsSuggestSelectEvent) => void): void };
  destroy(): void;
}

export interface YmapsSuggestSelectEvent {
  get(key: string): { value: string };
}
