const BREAKPOINTS = {
  mobile: 576,
  tablet: 992,
  desktop: 1200
};

class BreakpointManager {
  constructor() {
    this.current = this._getCurrent();
    this._listeners = [];
    this._init();
  }

  _init() {
    const queries = {
      mobile: window.matchMedia(`(max-width: ${BREAKPOINTS.mobile}px)`),
      tablet: window.matchMedia(`(min-width: ${BREAKPOINTS.mobile + 1}px) and (max-width: ${BREAKPOINTS.tablet}px)`),
      desktop: window.matchMedia(`(min-width: ${BREAKPOINTS.tablet + 1}px)`)
    };

    Object.values(queries).forEach(query => {
      query.addEventListener('change', () => {
        const newBreakpoint = this._getCurrent();
        if (this.current !== newBreakpoint) {
          this.current = newBreakpoint;
          this._listeners.forEach(fn => fn(this.current));
        }
      });
    });
  }

  _getCurrent() {
    const width = window.innerWidth;
    if (width <= BREAKPOINTS.mobile) return 'mobile';
    if (width <= BREAKPOINTS.tablet) return 'tablet';
    if (width <= BREAKPOINTS.desktop) return 'desktop';
    return 'large';
  }

  onChange(callback) {
    this._listeners.push(callback);
    callback(this.current);
  }

  is(breakpoint) {
    return this.current === breakpoint;
  }

  isMobile() {
    return this.is('mobile');
  }

  isTablet() {
    return this.is('tablet');
  }

  isDesktop() {
    return this.is('desktop') || this.is('large');
  }
}

export const breakpoints = new BreakpointManager();

/*
import { breakpoints } from './breakpoints.js';

breakpoints.onChange((bp) => {
  console.log('', bp);
});

if (breakpoints.isMobile()) {

}
*/