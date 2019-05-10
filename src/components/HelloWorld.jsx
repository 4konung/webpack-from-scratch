import React, { memo } from 'react';
import styles from './HelloWorld.module.scss';

function HelloWorld() {
  console.log('hello')
  return (
    <div className={styles.header}>
      <h1 className={styles.header}>Hello World!</h1>
    </div>
  );
}

export default memo(HelloWorld);
