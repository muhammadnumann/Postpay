
export function validateEmptyForm(formValue: any, fields: string[], t:any) : [boolean, any] {
  let isError = false
  const errObj = {}
  fields.forEach(el => {
    if(!formValue[el]){
      isError = true
      errObj[el] = t('ThisFieldIsRequired')
    }
  });
  return [isError, errObj]
}