import JSX from './interface';
import { ElementType } from '../types';

// 实现jsx-automatic 入口
export default function(type: ElementType, config, key?: string): JSX.Element {
  const { ref, ...props } = config || {};
  return {
    key,
    ref,
    type,
    props,
    // 存储一些过程中的cache值
    _cache: {},
  };
}
