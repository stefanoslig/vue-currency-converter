import "jest";
import { mount } from "@vue/test-utils";
import CurrencyConverter from "../CurrencyConverter.vue";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("CurrencyConverter.vue", () => {
  const axiosMock = new MockAdapter(axios);
  test("the value of the first input should be 1", () => {
    const wrapper = mount(CurrencyConverter);
    const inputFromValue = wrapper.findAll("input")[0].element.value;
    expect(inputFromValue).toBe("1");
  });
});
