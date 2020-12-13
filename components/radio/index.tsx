import React, { useState } from 'react';
import styles from './index.module.scss';
type Item = {
  value: any;
  label: string;
  style?: Object;
};
type Data = Array<Item>;
type Props = {
  label?: string;
  defaultValue?: any;
  data: Data;
  style?: object;
  type?: string;
  onChange?: (value: any) => any;
};
export default function Radio(props: Props) {
  const { label, defaultValue, data, style, type, onChange } = props;
  const init_value = defaultValue || data[0].value;
  const [value, setValue] = useState(init_value);
  const handleChange = (value: any) => {
    setValue(value);
    if (onChange) {
      onChange(value);
    }
  };
  return (
    <div className={`${styles[type] || styles.btn}`} style={style}>
      <div>{label}</div>
      {data.map((item) => {
        return (
          <div
            key={item.value}
            className={`${styles.radio} ${
              value === item.value ? styles.active : ''
            }`}
            onClick={() => {
              handleChange(item.value);
            }}
            style={item.style}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
}
