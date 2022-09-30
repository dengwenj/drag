interface IInfo {
  id: string
  yi: string
  er: string
  san: string
  si: string
  wu: string
  liu: string
  qi: string
  ba: string
  jiu: string
  shi: string
}
export interface ITableData {
  type: string
  jt: string
  info1: IInfo,
  info2: IInfo
}

export const tableData: ITableData[] = [
  {
    type: '1080染缸',
    jt: '1080A',
    info1: {
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
    },
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
]
