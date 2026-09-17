import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/** The module reads the measurement ID once, at import time. Every case therefore sets the
 *  environment first and imports a fresh copy. */
const loadModule = async (measurementId?: string) => {
  vi.resetModules();
  vi.stubEnv('NEXT_PUBLIC_GA_MEASUREMENT_ID', measurementId ?? '');
  return import('./analytics');
};

const gtagScripts = () =>
  [...document.head.querySelectorAll('script')].filter((s) => s.src.includes('googletagmanager'));

beforeEach(() => {
  document.head.innerHTML = '';
  window.dataLayer = undefined;
});

afterEach(() => vi.unstubAllEnvs());

describe('without a measurement ID', () => {
  it('reports itself unconfigured, so no banner is rendered to guard nothing', async () => {
    const { analyticsConfigured } = await loadModule();
    expect(analyticsConfigured).toBe(false);
  });

  it('never requests the tag', async () => {
    const { loadGoogleAnalytics } = await loadModule();
    loadGoogleAnalytics();
    expect(gtagScripts()).toHaveLength(0);
  });
});

describe('with a measurement ID', () => {
  it('denies every signal before the tag exists', async () => {
    const { setDefaultConsent } = await loadModule('G-TEST123');
    setDefaultConsent();

    expect(Array.from(window.dataLayer![0] as IArguments)).toEqual([
      'consent',
      'default',
      {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
      },
    ]);
  });

  it('grants analytics only, never the advertising signals', async () => {
    const { updateConsent } = await loadModule('G-TEST123');
    updateConsent(true);

    const [, , signals] = Array.from(window.dataLayer![0] as IArguments);
    expect(signals).toMatchObject({ analytics_storage: 'granted', ad_storage: 'denied' });
  });

  it('fetches the tag once however often consent is re-confirmed', async () => {
    const { loadGoogleAnalytics } = await loadModule('G-TEST123');
    loadGoogleAnalytics();
    loadGoogleAnalytics();

    expect(gtagScripts()).toHaveLength(1);
    expect(gtagScripts()[0].src).toContain('id=G-TEST123');
  });
});
