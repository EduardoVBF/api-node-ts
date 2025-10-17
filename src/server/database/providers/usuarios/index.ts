import * as getByEmail from './GetByEmail.js';
import * as create from './Create.js';

export const UsuariosProvider = {
  ...getByEmail,
  ...create,
};