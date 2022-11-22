import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { Button, ConfigProvider, DatePicker, Divider, Radio } from 'antd';
import {HeartOutlined} from "@ant-design/icons";
import dayjs from 'dayjs';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';


// vite - get .env parameter
// console.log('import.meta.env', import.meta.env)

export default function App() {
  const [theme, setTheme] = useState('default')
  const [local, setLocal] = useState('enUS');

  useEffect(() => {
    setTheme('default')
  }, [])

  function changeTheme(v:string) {
    setTheme(v)

    // ConfigProvider.config({
    //   theme: {
    //     primaryColor: v === 'default' ? '#1890FF' : '#25b864',
    //   },
    // });
  }

  function changeLocal(v:string) {
    setLocal(v)
    if (v === '') {
      dayjs.locale('en');
      // ConfigProvider.config({
      //   locale: zhCN
      // });
    } else {
      dayjs.locale('zh-cn');
      // ConfigProvider.config({
      //   locale: zhCN
      // });
    }
  }

  return (
    <div>
      <div>
        <span>Base: </span>
        <Link to="/mapbox/base/streets">streets</Link>
        <Divider type="vertical" />
        <Link to="/mapbox/base/satellite">satellite</Link>
        <Divider type="vertical" />
        <Link to="/mapbox/base/geocoder">geocoder</Link>
        <Divider type="vertical" />
        <Link to="/mapbox/base/geocoderWithCood">geocoderWithCood</Link>
        <Divider type="vertical" />
        <Link to="/mapbox/base/cursorPoint">cursorPoint</Link>
      </div>
      <div>
        <span>GeoJSON: </span>
        <Link to="/mapbox/GeoJSON/LineString">LineString</Link>
      </div>

      <div style={{ marginTop: 12 }}>
        <Radio.Group
          options={[
            { label: 'default', value: 'default' },
            { label: 'green', value: 'green' },
          ]}
          onChange={(e) => changeTheme(e.target.value)}
          value={theme}
          optionType="button"
          buttonStyle="solid"
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <Radio.Group
          options={[
            { label: 'English', value: 'enUS' },
            { label: '中文', value: 'zhCN' },
          ]}
          onChange={(e) => changeLocal(e.target.value)}
          value={local}
          optionType="button"
          buttonStyle="solid"
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <Button type="primary" icon={<HeartOutlined />}>Hello</Button>
      </div>

      <div style={{ marginTop: 12 }}>
        <DatePicker />
      </div>
    </div>
  )
}
