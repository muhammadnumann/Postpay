import axios from 'axios';
import Fingerprint2, {
  SourcesToComponents,
} from '@fingerprintjs/fingerprintjs';

const request = axios.create({
  baseURL: DATA_SERVICE_URL,
});

interface FingerPrintObject {
  [key: string]: string;
}

export async function requestAndSendFingerPrint(token: string) {
  if (!DATA_SERVICE_URL) {
    return;
  }

  let isFingerprintGenerated: string | null = '';
  try {
    isFingerprintGenerated = localStorage.getItem(`fingerprint-${token}`);
  } catch {
    // Can't read fingerprint from localStorage
  }

  if (isFingerprintGenerated) return;

  const fingerprint = await Fingerprint2.load();

  setTimeout(async () => {
    const result = await fingerprint.get();
    const components = await result.components;
    const hash = Fingerprint2.hashComponents(components);
    const sendDataObject = { fingerprintHash: hash };
    try {
      await request.post(`/${token}/fingerprints`, sendDataObject);
      localStorage.setItem(`fingerprint-${token}`, '1');
    } catch (e) {}
  }, 100);
}
