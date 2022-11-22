import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter as Router,
  useRoutes,
} from 'react-router-dom'
import { ConfigProvider } from 'antd';

// 国际化
import 'dayjs/locale/en';
// import 'dayjs/locale/zh-cn';
import enUS from 'antd/locale/en_US';
// import zhCN from 'antd/es/locale/zh_CN';

import './index.less'

import routes from '~react-pages'

// eslint-disable-next-line no-console
console.log(routes)

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {useRoutes(routes)}
    </Suspense>
  )
}

const app = createRoot(document.getElementById('root')!)

app.render(
  <StrictMode>
    <Router>
      <ConfigProvider locale={enUS}>
        <App />
      </ConfigProvider>
    </Router>
  </StrictMode>,
)
