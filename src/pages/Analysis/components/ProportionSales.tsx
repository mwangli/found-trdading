import { Card, Radio, Typography } from 'antd';
import numeral from 'numeral';
import type { RadioChangeEvent } from 'antd/es/radio';
import { Donut } from '@ant-design/charts';
import type { DonutConfig } from '@ant-design/charts/es/donut';
import React from 'react';
import type { DataItem } from '../data';
import styles from '../style.less';

const { Text } = Typography;

const ProportionSales = ({
  dropdownGroup,
  salesType,
  loading,
  salesPieData,
  handleChangeSalesType,
}: {
  loading: boolean;
  dropdownGroup: React.ReactNode;
  salesType: 'all' | 'online' | 'stores';
  salesPieData: DataItem[];
  handleChangeSalesType?: (e: RadioChangeEvent) => void;
}) => (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    title="持有天数占比"
    style={{
      height: '100%',
    }}
    extra={
      <div className={styles.salesCardExtra}>
        {dropdownGroup}
        <div className={styles.salesTypeRadio}>
          <Radio.Group value={salesType} onChange={handleChangeSalesType}>
            {/*<Radio.Button value="all">全部渠道</Radio.Button>*/}
            {/*<Radio.Button value="online">线上</Radio.Button>*/}
            {/*<Radio.Button value="stores">门店</Radio.Button>*/}
          </Radio.Group>
        </div>
      </div>
    }
  >
    <div>
      <Text>持有天数</Text>
      <Donut
        forceFit
        height={460}
        radius={0.8}
        angleField="y"
        colorField="x"
        data={salesPieData as any}
        legend={{
          visible: false,
        }}
        label={{
          visible: true,
          type: 'spider',
          formatter: (text, item) => {
            // eslint-disable-next-line no-underscore-dangle
            return `天数 ${item._origin.x}，占比数: ${numeral(item._origin.y).format('0,0')}`;
          },
        }}
        statistic={
          {
            totalLabel: '总交易股数',
          } as DonutConfig['statistic']
        }
      />
    </div>
  </Card>
);

export default ProportionSales;
