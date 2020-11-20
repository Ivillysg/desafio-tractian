import { toastr } from 'react-redux-toastr';
import api from '../Helpers/Services/api';
import history from '../Helpers/Utils/history';
import { signIn } from '../Helpers/Utils/storage';

export const SignIn = async (values: any) => {
  await api
    .get(`usermail/${values.email}`)
    .then(resp => {
      signIn(resp.data.email);
      history.push('/app');
      toastr.success('Success', 'Acesso permitido!');
    })

    .catch(() => toastr.error('Error', 'O e-mail não existe!'));
};

export const SignUp = async (values: any) => {
  await api
    .post('/user', values)
    .then(resp => {
      signIn(resp.data.email);
      history.push('/app');
      toastr.success('Success', 'Cadastrado com sucesso!');
    })

    .catch(() => toastr.error('Error', 'O e-mail já existe!'));
};
