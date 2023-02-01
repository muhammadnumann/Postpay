export function setLoginData() {
  localStorage.setItem('customerLogin', '1');
}

export async function deleteLoginData() {
  localStorage.removeItem('customerLogin');
}

export function hasLoginData() {
  return !!localStorage.getItem('customerLogin');
}
