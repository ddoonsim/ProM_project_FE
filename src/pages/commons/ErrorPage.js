import { Component } from 'react';
import CommonErrorMessage from '../../components/commons/CommonErrorMessage';

class ErrorPage extends Component {
  state = {
    error: false,
    message: '',
  };

  componentDidCatch(error, info) {
    this.setState({ error: true, message: error.message });
    console.error('error', error, 'info', info);
  }

  render() {
    const { children } = this.props;

    return this.error ? <CommonErrorMessage error={this.error} /> : children;
  }
}

export default ErrorPage;
