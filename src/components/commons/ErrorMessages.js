import loadable from '@loadable/component';

const Message = loadable(() => import('./ErrorMsgStyle'));

const ErrorMessages = ({ errors, field }) => {
  return (
    errors &&
    errors[field] &&
    errors[field].map((s, i) => <Message key={`${field}_${i}`}>{s}</Message>)
  );
};

export default ErrorMessages;
