import { useState } from 'react'
import { Table } from 'antd'

import { tableData } from '../../data'

import type { ColumnsType } from 'antd/es/table'
import type { ITableData } from '../../data'

export default function MyTable() {
  // 初始化必须有一个
  const [containerList, setContainerList] = useState<Record<string, any>[]>([{
    cellId: '0',
    num: 0,
    who: '',
    color: ''
  }])

  const render = (cell: any) => {
    // console.log(cell); 要想拿到新数据必须要发送请求更新表格
    
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
                key !== 'id' && <div 
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
      // 容器拖入到单元格里做的一系列事情
      onDrop: handleContainerDragCell
    }
  }

  // 当被拖拽元素停留在该元素（持续触发）。
  const handleDragOver = (e: any) => {
    e.preventDefault()
  }

  // 当拖拽到目标位置获取数据（做一系列事情）
  const handleDrop = (e: any) => {
    const data = e.dataTransfer.getData('drag')
    const { cell: { jiu, san, id: cellId, qi }, id } = JSON.parse(data)
    
    const element = document.getElementById(id)
    
    element!.innerHTML = '暂无数据'

    const findIdx = containerList.findIndex((item) => item.color === qi)
    // 说明没有找到
    if (findIdx === -1) {
      setContainerList([...containerList, { cellId, num: jiu, who: san, color: qi }])
    } else {
      // 说明找到了
      const formatContainerList = containerList.map((item, idx) => {
        if (idx === findIdx) {
          return {
            ...item,
            num: Number(Number(item.num) + Number(jiu)).toFixed(2)
          }
        }
        return item
      })
      setContainerList(formatContainerList)
    }
  }

  /**
   * 拖入到单元格里面
   */
  // 拖动容器到单元格里面去
  const handleDragStart = (e: any) => {
    const findRes = containerList.find((item) => item.cellId === e.target.id)
    
    e.dataTransfer.setData('item', JSON.stringify({
      cell: findRes
    }))
  }

  // 容器拖入到单元格里做的一系列事情
  const handleContainerDragCell = (e: any) => {
    const data = e.dataTransfer.getData('item')
    const formatData = JSON.parse(data)

    const element = document.getElementById(e.target.children[0] ? e.target.children[0].id : e.target.id)
    element!.innerHTML = `
      <div>${formatData.cell.num}</div>
      <div>${formatData.cell.who}</div>
      <div>${formatData.cell.color}</div>
    `
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
              key: '2',
              onCell
            },
            {
              title: '14:00 ~ 18:00',
              align: 'center',
              key: '3',
              onCell
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
              key: '4',
              onCell
            },
            {
              title: '14:00 ~ 18:00',
              align: 'center',
              key: '5',
              onCell
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
              key: '6',
              onCell
            },
            {
              title: '14:00 ~ 18:00',
              align: 'center',
              key: '7',
              onCell
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
              key: '8',
              onCell
            },
            {
              title: '14:00 ~ 18:00',
              align: 'center',
              key: '9',
              onCell
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
                  id={item.cellId}
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
                  id={item.cellId}
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
      </div>
    </>
  )
}
