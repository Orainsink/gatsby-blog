import React from 'react';
import * as Sentry from '@sentry/react';

interface StateType {
  error: Error;
}
/**
 * Sentry ErrorBoundary
 * https://zh-hans.reactjs.org/docs/error-boundaries.html
 */
class ErrorBoundary extends React.Component<any, StateType> {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.configureScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });
    });
    Sentry.captureException(error);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ textAlign: 'center' }}>
          <h1>Oops!! Something went wrong! </h1>
          <h2>桌面端访问请重新加载或者挂代理</h2>
          <h2>移动端访问请升级浏览器, 您的浏览器可能不支持网站的一些新特性</h2>
          <h2>
            已知在UC, 老版本夸克浏览器上会报错, 在Firefox手机浏览器上动画会出错
          </h2>
          <h2>建议使用chrome手机浏览器</h2>
          <h2>作者比较懒, 没做向下兼容, 改是不可能改的</h2>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
