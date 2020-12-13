export const RAP_NUM_DATA = [
  { value: 1, label: '单押', style: { width: '22%' } },
  { value: 2, label: '双押', style: { width: '22%' } },
  { value: 3, label: '三押', style: { width: '22%' } },
  { value: 4, label: '四押及以上', style: { width: '34%' } },
];
export const RAP_TONE_DATA = [
  { value: 0, label: '音调不限', style: { width: '33.3%' } },
  { value: 1, label: '尾调一致', style: { width: '33.3%' } },
  { value: 2, label: '完全一致', style: { width: '33.4%' } },
];
export const RAP_WORD_LEN = [
  { value: 2, label: '双字', style: { width: '22%' } },
  { value: 3, label: '三字', style: { width: '22%' } },
  { value: 4, label: '四字', style: { width: '22%' } },
  {
    value: 5,
    label: '五字及以上',
    style: { width: '34%' },
  },
];
// 热度map
const HOT_MAP = ['rate-hot', 'rate-popular', 'rate-common', 'rate-rare'];
// 热度阶梯
const HOT_LEVEL = {
  2: [5000, 500, 30],
  3: [1500, 300, 30],
  4: [5000, 500, 10],
  5: [300, 50, 5],
};
// 划分热度阶梯的功能函数
const getLevel = (numberArray: number[], rate: number) => {
  for (let i = 0; i < numberArray.length; i++) {
    if (rate > numberArray[i]) {
      return HOT_MAP[i];
    }
  }
  return HOT_MAP[HOT_MAP.length - 1];
};
// 获取词汇热度
export const getHotLevel = (length: number, rate: number) => {
  return getLevel(HOT_LEVEL[length > 5 ? 5 : length], rate);
};
