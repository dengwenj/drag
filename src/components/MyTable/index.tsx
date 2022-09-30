import { Table } from 'antd'

import { tableData } from '../../data'

import type { ColumnsType } from 'antd/es/table'
import type { ITableData } from '../../data'

export default function MyTable() {
  const render = (cell: any) => (
    <>
      {
        // 拖拽 必须要加 draggable 这个属性
        <div draggable>
          {
            Object.keys(cell).map((key, idx) => (
              <div 
                style={{ 
                  borderBottom: idx === Object.keys(cell).length - 1 ? 0 : '1px solid #eee', 
                  padding: 3 
                }}
                key={key}
              >
                {cell[key]}
              </div>
            ))
          }
        </div>
      }
    </>
  )

  const onCell = (record: ITableData, rowIndex: number | undefined) => {
    return {
      style: {
        cursor: 'pointer'
      },
      onDragStart: (e: any) => {
        console.log(rowIndex);
        
        e.dataTransfer.setData('drag', JSON.stringify(record))
      }
    }
  }

  const handleDragOver = (e: any) => {
    console.log(e);
    
    e.preventDefault()
  }

  const handleDrop = (e: any) => {
    const data = e.dataTransfer.getData('drag')
    console.log(JSON.parse(data))
  }
  
  /**
   * 机台为一行
   */
  const columns: ColumnsType<ITableData> = [
    {
      title: '类别',
      dataIndex: 'type',
      key: 't',
      align: 'center',
      onCell(a, rowIndex) {
        if (rowIndex === 0) {
          return {
            rowSpan: tableData.length
          } 
        }
        if (rowIndex! >= 1) {
          return {
            rowSpan: 0
          }
        }
        return {
          rowSpan: tableData.length
        }
      }
    },
    {
      title: '机台',
      dataIndex: 'jt',
      align: 'center',
      key: 'j'
    },
    {
      title: '2022年9月12日 ~ 2022年9月16日',
      align: 'center',
      key: 'c',
      children: [
        {
          title: '12号 周一',
          align: 'center',
          key: '1',
          children: [
            {
              title: '9:00 ~ 12:00',
              dataIndex: 'info1',
              key: 'info1',
              align: 'center',
              render,
              onCell
            },
            {
              title: '14:00 ~ 18:00',
              dataIndex: 'info2',
              key: 'info2',
              align: 'center',
              render,
              onCell
            }
          ]
        },
        {
          title: '13号 周二',
          align: 'center',
          key: '11',
          children: [
            {
              title: '9:00 ~ 12:00',
              align: 'center',
              key: '2'
            },
            {
              title: '14:00 ~ 18:00',
              align: 'center',
              key: '3'
            }
          ]
        },
        {
          title: '14号 周三',
          align: 'center',
          key: '22',
          children: [
            {
              title: '9:00 ~ 12:00',
              align: 'center',
              key: '4'
            },
            {
              title: '14:00 ~ 18:00',
              align: 'center',
              key: '5'
            }
          ]
        },
        {
          title: '15号 周四',
          align: 'center',
          key: '33',
          children: [
            {
              title: '9:00 ~ 12:00',
              align: 'center',
              key: '6'
            },
            {
              title: '14:00 ~ 18:00',
              align: 'center',
              key: '7'
            }
          ]
        },
        {
          title: '16号 周五',
          align: 'center',
          key: '44',
          children: [
            {
              title: '9:00 ~ 12:00',
              align: 'center',
              key: '8'
            },
            {
              title: '14:00 ~ 18:00',
              align: 'center',
              key: '9'
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
        rowKey={(record) => record.jt}
      />

      {/* 容器 */}
      <div 
        draggable
        className='c' 
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >容器</div>
    </>
  )
}
