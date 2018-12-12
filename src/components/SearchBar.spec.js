/*eslint-env jest */

import { shallowMount } from "@vue/test-utils";
import SearchBar from "./SearchBar.vue";

describe("SearchBar.vue", () => {
  let cities;
  let wrapper;
  beforeEach(() => {
    cities = [];
    wrapper = shallowMount(SearchBar, {
      propsData: { cities }
    });
  });
  it("renders an input for cities", () => {
    const cityInput = wrapper.find("#city");
    expect(cityInput.is("input")).toBe(true);
  });
  it("renders a select for states", () => {
    const stateSelect = wrapper.find("#state");
    expect(stateSelect.is("select")).toBe(true);
  });
});
