import { useForm } from './'
import { renderHook, act } from "@testing-library/react-hooks";

// mock timer using jest
jest.useFakeTimers();

describe('useMyHook', () => {
  it('intial setup ', () => {
    const { result } = renderHook(() => useForm({
      name: {
        value: '',
        isValid: false,
      }
    }, false));
  })
})
