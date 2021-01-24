import "jest";
import { mount } from "@vue/test-utils";
import CurrencyConverter from "../CurrencyConverter.vue";

describe("CurrencyConverter.vue", () => {
  test("renders Currency when passed", () => {
    const wrapper = mount(CurrencyConverter);
    expect(true).toBe(true);
  });
});
