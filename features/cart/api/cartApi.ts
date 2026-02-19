import type {
  ApiResponse,
  CartGetCartData,
  CartGetCounterData,
  CartMutationDto,
} from "../model/types";
import { useBackendRequest } from "~/shared/api/useBackendRequest";

export async function fetchCart() {
  const { request } = useBackendRequest();
  return request<ApiResponse<CartGetCartData>>("/api/cart/get-cart");
}

export async function fetchCartCounter() {
  const { request } = useBackendRequest();
  return request<ApiResponse<CartGetCounterData>>("/api/cart/get-counter");
}

export async function addCartItem(dto: CartMutationDto) {
  const { request } = useBackendRequest();
  return request<ApiResponse<unknown>>("/api/cart/add", {
    method: "POST",
    body: dto,
  });
}

export async function deleteCartItem(dto: CartMutationDto) {
  const { request } = useBackendRequest();
  return request<ApiResponse<unknown>>("/api/cart/delete-product", {
    method: "POST",
    body: dto,
  });
}

export async function deleteFullCartItem(dto: CartMutationDto) {
  const { request } = useBackendRequest();
  return request<ApiResponse<unknown>>("/api/cart/delete-full-product", {
    method: "POST",
    body: dto,
  });
}
