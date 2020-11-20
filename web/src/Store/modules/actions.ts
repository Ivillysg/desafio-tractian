import { toastr } from 'react-redux-toastr';
import Api from '../../Helpers/Services/api';

export const FindAll = (router: string) => (dispatchEvent: any) => {
  Api.get(`/${router}`).then(resp => {
    dispatchEvent({
      type: `@${router}/FIND_ALL`,
      payload: resp.data,
    });
  });
};

export const CreateAction = (router: string, values: any, args = '') => (
  dispatchEvent: any,
) => {
  Api.post(`${router}/${args}`, values)
    .then(() => {
      dispatchEvent({
        type: `@${router}/CREATE`,
      });
      toastr.success('Success', 'Cadastrado com sucesso!');
    })
    .then(() => {
      dispatchEvent(FindAll(router));
    })
    .catch(() => {
      toastr.error('Error', 'Ocorreu um error!');
    });
};

export const EditAction = (router: string, id: string, values: any) => (
  dispatchEvent: any,
) => {
  Api.put(`/${router}/${id}`, values)
    .then(() => {
      dispatchEvent({
        type: `@${router}/EDIT`,
      });
      toastr.success('Success', 'Foi editado com sucesso!');
    })
    .then(() => {
      dispatchEvent(FindAll(router));
    });
};

export const DeleteAction = (router: string, id: string) => (
  dispatchEvent: any,
) => {
  Api.delete(`/${router}/${id}`)
    .then(() => {
      dispatchEvent({
        type: `@${router}/DELETE`,
      });
      toastr.success('Success', 'Foi excluído com sucesso!');
    })
    .then(() => {
      dispatchEvent(FindAll(router));
    });
};
