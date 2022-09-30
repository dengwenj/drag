import { useState } from 'react'
import { Table } from 'antd'

import { tableData } from '../../data'

import type { ColumnsType } from 'antd/es/table'
import type { ITableData } from '../../data'

export default function MyTable() {
  // 初始化必须有一个
  const [containerList, setContainerList] = useState<Record<string, any>[]>([{
    num: 0,
    who: ''
  }])

  const render = (cell: any) => {
    const cellKeys = Object.keys(cell)
    return  (
      <>
        {
          // 拖拽 必须要加 draggable 这个属性
          // id={cell.yi} 作为标识知道是拖动哪个单元格 唯一性的东西
          <div 
            draggable 
            id={cell.id} 
            data-cell={JSON.stringify(cell)}
          >
            {
              cellKeys.map((key, idx) => (
                <div 
                  style={{ 
                    borderBottom: idx === cellKeys.length - 1 ? 0 : '1px solid #eee', 
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
  }

  const onCell = (record: ITableData, rowIndex: number | undefined) => {
    return {
      style: {
        cursor: 'pointer'
      },
      // 被拖拽元素拖动将数据专递给目标元素
      onDragStart: (e: any) => {
        e.dataTransfer.setData('drag', JSON.stringify({ 
          cell: JSON.parse(e.target.getAttribute('data-cell')),
          id: e.target.id, 
          rowIndex
        }))
      },
      onDragOver(e: any) {
        e.preventDefault()
      },
      onDrop: (e: any) => {
        console.log(e)
      }
    }
  }

  // 当被拖拽元素停留在该元素（持续触发）。
  const handleDragOver = (e: any) => {
    e.preventDefault()
  }

  // 当拖拽到目标位置获取数据（做一系列事情）
  const handleDrop = (e: any) => {
    const data = e.dataTransfer.getData('drag')
    const { cell: { jiu, san }, id } = JSON.parse(data)
    
    const element = document.getElementById(id)
    console.log(element);
    
    element!.innerHTML = '暂无数据'

    setContainerList([
      ...containerList,
      {
        num: jiu,
        who: san
      }
    ])
  }

  // 
  const handleDragStart = (e: any) => {
    console.log(e);
    
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
      <div className='fixed'>
        {
          containerList.map((item, idx) => {
            return (
              item.who !== '' ? (
                <div
                  key={idx}
                  className='c'
                  draggable
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div>{item.num} KG</div>
                  <div>{item.who}</div>
                </div>
              ) : (
                <div
                  key={idx}
                  className='c'
                  // draggable
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div>放入容器里</div>
                </div>
              )
            )
          })
        }
        {/* <div 
          className='c'
          draggable
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          容器
        </div> */}
      </div>
    </>
  )
}
