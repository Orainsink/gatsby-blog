import { useBackgroundColor } from '../useBackgroundColor';
import { renderHook, act } from '@testing-library/react-hooks';

/**
 * !!! jest cant test css variables
 */
describe('useBackTop', () => {
  it('should change background properly', () => {
    act(() => {
      renderHook(() => useBackgroundColor());
    });
    expect(document.body.style.background).toBe('');
  });
});
