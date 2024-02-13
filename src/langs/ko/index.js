import common from './common';
import validation from './validation';
import error from './error';

const messages = { ...common, ...validation, ...error };

export default messages;
