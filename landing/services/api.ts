import axios from 'axios';

const leadApi = axios.create({
  baseURL: `https://sales${process.env.ENV === 'production' ? '' : '-dev'
    }.postpay.io/v1`,
});

const contactApi = axios.create({
  baseURL: `https://support${process.env.ENV === 'production' ? '' : '-dev'
    }.postpay.io/v1`,
});

const storesApi = axios.create({
  baseURL: `https://stores${process.env.ENV === 'production' ? '' : '-dev'
    }.postpay.io/v2`,
});

export async function fetchStores() {
  return storesApi.get('/stores.json');
}

export async function sendLead(leadData: SaleLead) {
  return leadApi.post('/leads', leadData);
}

export async function sendContact(contact: ContactFormData) {
  const formData = new FormData();
  formData.append('name', contact.name);
  formData.append('email', contact.email);
  formData.append('subject', contact.subject);
  formData.append('description', contact.description);
  formData.append("phone", contact.phone);
  return contactApi.post('/tickets', formData);
}

export async function addWishList(data: IWishlistPayload) {
  const url =
    process.env.ENV === 'production'
      ? 'https://marketing.postpay.io/v1/lists/12652b2c72/members'
      : 'https://marketing-dev.postpay.io/v1/lists/12652b2c72/members';
  return axios.post(
    url,
    data
  );
}

export async function getMobileApp(data: IGetAppPayload) {
  const url =
    process.env.ENV === 'production'
      ? 'https://sales.postpay.io/v1/leads/mobile-app'
      : 'https://sales-dev.postpay.io/v1/leads/mobile-app';
  return axios.post(
    url,
    data
  );
}
