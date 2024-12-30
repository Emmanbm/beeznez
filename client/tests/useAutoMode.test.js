import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useAutoMode from "../src/hooks/useAutoMode";

describe("useAutoMode", () => {
  it("should use the default mode", () => {
    const { result } = renderHook(() => useAutoMode());
    expect(result.current).toBe("light");
  });
});
