import { Table } from 'antd'

import { tableData } from '../../data'

import type { ColumnsType } from 'antd/es/table'

export default function MyTable() {
  /**
   * 机台为一行
   */
  const columns: ColumnsType<any> = [
    {
      title: '类别',
      dataIndex: 'type',
      align: 'center'
    },
    {
      title: '机台',
      dataIndex: 'jt',
      align: 'center'
    },
    {
      title: '2022年9月12日 ~ 2022年9月16日',
      align: 'center',
      children: [
        {
          title: '12号 周一',
          align: 'center',
          children: [
            {
              title: '9:00 ~ 12:00',
              align: 'center'
            },
            {
              title: '14:00 ~ 18:00',
              align: 'center'
            }
          ]
        },
        {
          title: '13号 周二',
          align: 'center',
          children: [
            {
              title: '9:00 ~ 12:00',
              align: 'center'
            },
            {
              title: '14:00 ~ 18:00',
              align: 'center'
            }
          ]
        },
        {
          title: '14号 周三',
          align: 'center',
          children: [
            {
              title: '9:00 ~ 12:00',
              align: 'center'
            },
            {
              title: '14:00 ~ 18:00',
              align: 'center'
            }
          ]
        },
        {
          title: '15号 周四',
          align: 'center',
          children: [
            {
              title: '9:00 ~ 12:00',
              align: 'center'
            },
            {
              title: '14:00 ~ 18:00',
              align: 'center'
            }
          ]
        },
        {
          title: '16号 周五',
          align: 'center',
          children: [
            {
              title: '9:00 ~ 12:00',
              align: 'center'
            },
            {
              title: '14:00 ~ 18:00',
              align: 'center'
            }
          ]
        }
      ]
    }
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={tableData}
        bordered
      />
    </>
  )
}
