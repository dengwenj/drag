import { useState, useEffect } from 'react'
import { Table } from 'antd'

import { tableData } from '../../data'

import type { ColumnsType } from 'antd/es/table'
import type { ITableData } from '../../data'

/**
 * 只要记住这几点 很简单
 * 1、知道位置（拖动的是那个单元格里面的数据）
 * 2、知道拖动的是哪个容器，放入的那个单元格
 * 3、当对应的触发事件触发时，做一系列的事情（比如：发送相应的请求），更新单元格和容器就行了
 */
export default function MyTable() {
  // 初始化必须有一个
  const [containerList, setContainerList] = useState<Record<string, any>[]>([])
  const [sTableData, setSTableData] = useState(tableData)

  /**
   * 初始化发送请求，拿到有没有东西放入容器里的
   * 如果没有，要添加一个
   * 如果有，拿到放入容器里
   * 
   * 一个获取表格数据的请求 更新表格
   * 一个获取容器数据的请求 更新容器
   */
  useEffect(() => {
    // localStorage.setItem('drag', JSON.stringify([{
    //   cellId: '0',
    //   num: '1310.00',
    //   who: 'UQ-孟加拉工厂',
    //   color: '31(30)浅米'
    // }]))

    // 模拟请求
    const data = JSON.parse(localStorage.getItem('drag') || '')
    // 如果没有，自己添加一个
    if (!data) {
      setContainerList([{cellId: '1001', num: '', who: '', color: ''}])
    } else {
      setContainerList([...data])
    }
  }, [])

  // useEffect(() => {
  //   // record {}
  //   const res = Object.values({
  //     type: '1080染缸',
  //     jt: '1080A',
  //     // info1: {
  //     //   id: '1001',
  //     //   yi: 'c:001152-0009',
  //     //   er: '经销',
  //     //   san: 'UQ-孟加拉工厂',
  //     //   si: '33S/3_BCI棉/莫代尔 60/40',
  //     //   wu: '悦达2261F03-A-2SW',
  //     //   liu: '02403KKYL22',
  //     //   qi: '31(30)浅米',
  //     //   ba: 'C22099978T,C22090231',
  //     //   jiu: '1128.12',
  //     //   shi: '2022/09/21'
  //     // },
  //     info2: {
  //       id: '1002',
  //       yi: 'C:000550-0200-R1',
  //       er: '经销',
  //       san: 'UNIQLO-晶苑',
  //       si: '32S/3_美棉_100+强捻+环锭',
  //       wu: '尚和J32S3-07',
  //       liu: '01787WHYL22',
  //       qi: '01(01J)白色',
  //       ba: 'C22090371',
  //       jiu: '1186.00',
  //       shi: '2022/09/23'
  //     }
  //   })
    
  //   const a: any[] = []
  //   res.forEach((item) => {
  //     if (typeof item !== 'string') {
  //       a.push(item)
  //     }
  //   })
  //   // a.find((item) => item.id === id)
  // }, [])

  const render = (cell: any = {id: Math.random()}) => {
    // console.log(cell); 要想拿到新数据必须要发送请求更新表格
    
    const cellKeys = Object.keys(cell)
    return  (
      <>
        {
          // 拖拽 必须要加 draggable 这个属性
          // id={cell.yi} 作为标识知道是拖动哪个单元格 唯一性的东西
          <div 
            draggable 
            id={cell.id} // 需要后端返回
            data-cell={JSON.stringify(cell)}
          >
            {
              cellKeys.map((key, idx) => {
                if (cellKeys.length > 1) {
                  return key !== 'id' && (<div 
                  style={{ 
                      borderBottom: idx === cellKeys.length - 1 ? 0 : '1px solid #eee', 
                      padding: 3 
                    }}
                    key={key}
                  >
                    {cell[key]}
                  </div>)
                }
                return <div>暂无数据</div>
              })
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
      // 当被拖拽元素停留在该元素（持续触发）。
      onDragOver(e: any) {
        e.preventDefault()
      },
      // 容器拖入到单元格里做的一系列事情
      onDrop: handleContainerDragCell
    }
  }

  // 当拖拽到目标位置获取数据（做一系列事情）
  const handleDrop = (e: any) => {
    const data = e.dataTransfer.getData('drag')
    const { cell: { jiu, san, id: cellId, qi }, id } = JSON.parse(data)
    
    // const element = document.getElementById(id)
    
    // element!.innerHTML = '暂无数据'
    // 发送请求更新数据 页面就会变化
    setSTableData([
      {
        type: '1080染缸',
        jt: '1080A',
        // info1: {
        //   id: '1001',
        //   yi: 'c:001152-0009',
        //   er: '经销',
        //   san: 'UQ-孟加拉工厂',
        //   si: '33S/3_BCI棉/莫代尔 60/40',
        //   wu: '悦达2261F03-A-2SW',
        //   liu: '02403KKYL22',
        //   qi: '31(30)浅米',
        //   ba: 'C22099978T,C22090231',
        //   jiu: '1128.12',
        //   shi: '2022/09/21'
        // },
        info2: {
          id: '1002',
          yi: 'C:000550-0200-R1',
          er: '经销',
          san: 'UNIQLO-晶苑',
          si: '32S/3_美棉_100+强捻+环锭',
          wu: '尚和J32S3-07',
          liu: '01787WHYL22',
          qi: '01(01J)白色',
          ba: 'C22090371',
          jiu: '1186.00',
          shi: '2022/09/23'
        }
      },
      {
        type: '1080染缸',
        jt: '1080B',
        info1: {
          id: '1003',
          yi: 'c:001152-0009',
          er: '经销',
          san: 'UQ-孟加拉工厂',
          si: '33S/3_BCI棉/莫代尔 60/40',
          wu: '悦达2261F03-A-2SW',
          liu: '02403KKYL22',
          qi: '31(30)浅米',
          ba: 'C22099978T,C22090231',
          jiu: '1128.12',
          shi: '2022/09/21'
        },
        info2: {
          id: '1004',
          yi: 'C:000550-0200-R1',
          er: '经销',
          san: 'UNIQLO-晶苑',
          si: '32S/3_美棉_100+强捻+环锭',
          wu: '尚和J32S3-07',
          liu: '01787WHYL22',
          qi: '01(01J)白色',
          ba: 'C22090371',
          jiu: '1186.00',
          shi: '2022/09/23'
        }
      }
    ])

    // 容器里的也要变化 发送请求

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

    // const element = document.getElementById(e.target.children[0] ? e.target.children[0].id : e.target.id)
    // element!.innerHTML = `
    //   <div>${formatData.cell.num}</div>
    //   <div>${formatData.cell.who}</div>
    //   <div>${formatData.cell.color}</div>
    // `

    // 发送请求更新表格数据 页面就会变化
    setSTableData([
      {
        type: '1080染缸',
        jt: '1080A',
        // info1: {
        //   id: '1001',
        //   yi: 'c:001152-0009',
        //   er: '经销',
        //   san: 'UQ-孟加拉工厂',
        //   si: '33S/3_BCI棉/莫代尔 60/40',
        //   wu: '悦达2261F03-A-2SW',
        //   liu: '02403KKYL22',
        //   qi: '31(30)浅米',
        //   ba: 'C22099978T,C22090231',
        //   jiu: '1128.12',
        //   shi: '2022/09/21'
        // },
        info2: {
          id: '1002',
          yi: 'C:000550-0200-R1',
          er: '经销',
          san: 'UNIQLO-晶苑',
          si: '32S/3_美棉_100+强捻+环锭',
          wu: '尚和J32S3-07',
          liu: '01787WHYL22',
          qi: '01(01J)白色',
          ba: 'C22090371',
          jiu: '1186.00',
          shi: '2022/09/23'
        },
        info3: {
          id: '1001',
          yi: 'c:001152-0009',
          er: '经销',
          san: 'UQ-孟加拉工厂',
          si: '33S/3_BCI棉/莫代尔 60/40',
          wu: '悦达2261F03-A-2SW',
          liu: '02403KKYL22',
          qi: '31(30)浅米',
          ba: 'C22099978T,C22090231',
          jiu: '1128.12',
          shi: '2022/09/21'
        }
      },
      {
        type: '1080染缸',
        jt: '1080B',
        info1: {
          id: '1003',
          yi: 'c:001152-0009',
          er: '经销',
          san: 'UQ-孟加拉工厂',
          si: '33S/3_BCI棉/莫代尔 60/40',
          wu: '悦达2261F03-A-2SW',
          liu: '02403KKYL22',
          qi: '31(30)浅米',
          ba: 'C22099978T,C22090231',
          jiu: '1128.12',
          shi: '2022/09/21'
        },
        info2: {
          id: '1004',
          yi: 'C:000550-0200-R1',
          er: '经销',
          san: 'UNIQLO-晶苑',
          si: '32S/3_美棉_100+强捻+环锭',
          wu: '尚和J32S3-07',
          liu: '01787WHYL22',
          qi: '01(01J)白色',
          ba: 'C22090371',
          jiu: '1186.00',
          shi: '2022/09/23'
        }
      }
    ])

    // 容器里的数据也要变化 发送请求
    const res = containerList.map((item) => {
      if (item.cellId === formatData.cell.cellId) {
        return {}
      }
      return item
    })
    setContainerList(res)

    /**
     * 当容器拖动到单元格里
     * 不相同的不能拖入 formatData(哪个容器) 和 formatCell(哪个单元格) 对比
     * 1、拖动到的那个单元格是不是空数据（直接拖入到里面即可）
     * 2、拖动到的单元格里面有数据（判断这个单元格里面是不是满载的）是满载的不允许了，不是就允许
     */
    // e.target 是你当前点击的元素
    // e.currentTarget 是你绑定事件的元素
    const ele = e.currentTarget.children[0] ? e.currentTarget.children[0] : e.currentTarget
    const formatCell = JSON.parse(ele.getAttribute('data-cell'))
    console.log(formatCell.jiu); // 这个量肯定要传给后端的，然后再更新数据
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
              dataIndex: 'info3',
              key: '2',
              render,
              onCell
            },
            {
              title: '14:00 ~ 18:00',
              align: 'center',
              dataIndex: 'info4',
              key: '3',
              render,
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
              dataIndex: 'info5',
              key: '4',
              render,
              onCell
            },
            {
              title: '14:00 ~ 18:00',
              align: 'center',
              dataIndex: 'info6',
              key: '5',
              render,
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
              dataIndex: 'info7',
              key: '6',
              render,
              onCell
            },
            {
              title: '14:00 ~ 18:00',
              align: 'center',
              dataIndex: 'info8',
              key: '7',
              render,
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
              dataIndex: 'info8',
              key: '8',
              render,
              onCell
            },
            {
              title: '14:00 ~ 18:00',
              align: 'center',
              dataIndex: 'info10',
              key: '9',
              render,
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
        dataSource={sTableData}
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
                  // 当被拖拽元素停留在该元素（持续触发）。
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  <div>容器</div>
                  <div>{item.num} KG</div>
                  <div>{item.who}</div>
                </div>
              ) : (
                <div
                  key={idx}
                  className='c'
                  id={item.cellId}
                  onDragStart={handleDragStart}
                  // 当被拖拽元素停留在该元素（持续触发）。
                  onDragOver={(e) => e.preventDefault()}
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
