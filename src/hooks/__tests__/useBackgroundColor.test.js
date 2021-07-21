import { useBackgroundColor } from '../useBackgroundColor';
import { renderHook } from '@testing-library/react-hooks';
describe('useBackgroundColor', () => {
  it('should test', () => {
    renderHook(() => useBackgroundColor(true));
  });
});
