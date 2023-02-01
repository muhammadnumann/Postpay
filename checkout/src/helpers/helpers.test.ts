import { extractPhoneData } from './helpers';

describe('extract phone number', () => {
  it('555555555', () => {
    const phoneOjb1 = extractPhoneData('555555555');
    expect(phoneOjb1).toStrictEqual({
      number: '555555555',
    });
  });

  it('123456766878767', () => {
    const phoneOjb2 = extractPhoneData('123456766878767');
    expect(phoneOjb2).toBeNull();
  });

  it('+971 555 555 555', () => {
    const phoneObj3 = extractPhoneData('+971 555 555 555');
    expect(phoneObj3).toStrictEqual({
      code: '+971',
      number: '555555555',
    });
  });

  it('0555444333', () => {
    const phoneObj4 = extractPhoneData('0555444333');
    expect(phoneObj4).toStrictEqual({
      number: '555444333',
    });
  });

  it('00971555444333', () => {
    const phoneObj5 = extractPhoneData('00971555444333');
    expect(phoneObj5).toStrictEqual({
      code: '+971',
      number: '555444333',
    });
  });

  it('00971555444333', () => {
    const phoneObj = extractPhoneData('00971555444333');
    expect(phoneObj).toStrictEqual({
      code: '+971',
      number: '555444333',
    });
  });

  it('056 684 9791', () => {
    const phoneObj = extractPhoneData('056 684 9791');
    expect(phoneObj).toStrictEqual({
      number: '566849791',
    });
  });

  it('+966 55 448 5274', () => {
    const phoneObj = extractPhoneData('+966 55 448 5274');
    expect(phoneObj).toStrictEqual({
      code: '+966',
      number: '554485274',
    });
  });
});
